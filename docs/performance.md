# Performance : ce qui a été fait et pourquoi

## Les métriques en bref

| Métrique                            | Ce qu'elle mesure                                              | Bon seuil | Pourquoi elle compte                                                                   |
| ----------------------------------- | -------------------------------------------------------------- | --------- | -------------------------------------------------------------------------------------- |
| **LCP** (Largest Contentful Paint)  | Quand le plus gros élément visible est affiché                 | <= 2,5 s  | Le visiteur voit-il la page ? C'est un critère de classement Google (Core Web Vitals). |
| **INP** (Interaction to Next Paint) | Délai entre un clic ou une touche et la mise à jour de l'écran | <= 200 ms | La page répond-elle ? Remplace FID depuis 2024. Mesurable seulement sur le terrain.    |
| **CLS** (Cumulative Layout Shift)   | Décalages de mise en page inattendus                           | <= 0,1    | Évite de cliquer sur le mauvais bouton quand la page bouge.                            |
| **FCP**                             | Premier contenu affiché                                        | <= 1,8 s  | Indicateur de diagnostic, pas un Core Web Vital.                                       |
| **TBT**                             | Temps pendant lequel le fil principal est bloqué               | <= 200 ms | Équivalent « labo » de l'INP.                                                          |

**Labo ou terrain.** Lighthouse mesure en laboratoire (appareil et réseau simulés, reproductible). CrUX et Search Console mesurent le terrain (vrais visiteurs, sur 28 jours) : c'est ce que Google utilise pour le classement, et seul le terrain mesure l'INP. Le labo sert à diagnostiquer et à comparer, le terrain à juger.

## Diagnostic de départ (phase 2, mobile)

Accueil : performance 83, LCP 3,5 s. Quiz : performance 75, LCP 4,4 s, CLS 0,043. Poids transféré : 460 à 510 ko.

Le LCP était dominé par la **contention de bande passante** : environ 460 ko de JavaScript non compressé, préchargé en même temps que le CSS bloquant le rendu, se partageaient un réseau simulé à 1,6 Mbit/s. Le CSS, seule ressource nécessaire à l'affichage, arrivait en retard.

## Corrections et effet

| Cause                                                               | Correction                                                                                          | Effet                                                                                 |
| ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| Aucune compression                                                  | Fichiers statiques précompressés en gzip et brotli (Nitro `compressPublicAssets`)                   | Chunk Angular : 273 ko → 71 ko en brotli. Poids total : 460 ko → 96 ko.               |
| Aucun cache sur les fichiers au hash                                | `Cache-Control: public, max-age=31536000, immutable` sur `/assets/**`                               | Visites suivantes : zéro téléchargement.                                              |
| Zod (92 ko) dans le chemin critique                                 | Validation des résultats réécrite à la main (`parseResults`), testée                                | -25 ko compressés sur chaque page.                                                    |
| `firebase/app` chargé pour tous                                     | Tout Firebase en import dynamique (`FirebaseService`)                                               | Un visiteur anonyme ne télécharge plus aucun code Firebase.                           |
| `HttpClient` inutilisé                                              | Retiré de la configuration                                                                          | Moins de code Angular dans le bundle principal.                                       |
| État « Chargement du quiz… » au moment de l'hydratation (CLS 0,043) | Les questions sont chargées par la route (résolveur) avant l'affichage, côté serveur et côté client | CLS 0,043 → 0 : le HTML du serveur et le premier rendu du navigateur sont identiques. |

## Résultat (Lighthouse mobile)

| Page         | Perf avant → après | LCP avant → après | Poids avant → après |
| ------------ | ------------------ | ----------------- | ------------------- |
| Accueil      | 83 → 99            | 3,51 s → 1,73 s   | 460 ko → 96 ko      |
| Thème        | 80 → 99            | 3,83 s → 1,65 s   | 464 ko → 100 ko     |
| Quiz du jour | 75 → 96            | 4,43 s → 2,48 s   | 510 ko → 119 ko     |

## Pistes restantes

- Intégrer le CSS critique dans le HTML : supprimerait la requête bloquante (13 ko, 3,4 ko compressés).
- Le quiz garde un LCP de 2,5 s : le rendu serveur est à la limite, à investiguer sur des mesures terrain.
- Mesurer en conditions réelles (PageSpeed Insights, CrUX) une fois le site en ligne.
- Derrière Traefik, activer la compression des pages rendues dynamiquement (middleware `compress`) : les pages prérendues et les fichiers statiques sont déjà compressés par le serveur Node.
