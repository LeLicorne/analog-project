# PWA : installable, hors ligne, notifications

## Ce que fait l'application

| Capacité                                        | Utilité réelle pour un quiz quotidien                                                                                                                              | Où                                                                             |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| **Installable** (manifeste, icônes, raccourcis) | Une icône sur l'écran d'accueil : on joue en un geste, sans barre d'adresse. Un raccourci par thème (appui long sur l'icône).                                      | `public/manifest.webmanifest`, `public/icons/`                                 |
| **Hors ligne**                                  | Les six quiz du jour se jouent sans réseau (métro, avion). Les résultats restent sur l'appareil et partent vers le compte au retour du réseau.                     | `public/sw.js`, `pwa.service.ts`, `cloud-sync.service.ts`                      |
| **Notification quotidienne**                    | Un rappel par jour, personnalisé : « Ne perds pas ta série de 4 jours », « Plus que 3 quiz à jouer aujourd'hui ». C'est le moteur de rétention d'un jeu quotidien. | `push.service.ts`, `src/data/push/daily-push.ts`, `scripts/send-daily-push.ts` |
| **Mise à jour**                                 | Une bannière propose de recharger quand une nouvelle version est prête, au lieu de casser la page en cours.                                                        | `pwa.service.ts`, `pwa-banner.component.ts`                                    |
| **État du réseau annoncé**                      | Une région `role="status"` annonce « Vous êtes hors ligne » aux lecteurs d'écran (WCAG 4.1.3).                                                                     | `pwa-banner.component.ts`                                                      |

## Choix de plateforme : PWA, TWA, hybride ou desktop

| Critère                  | **PWA** (choix)                                                                              | **TWA** (Trusted Web Activity)                                    | **Hybride** (Capacitor, Ionic, React Native)                        | **Desktop** (Electron, Tauri)                      |
| ------------------------ | -------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------- | -------------------------------------------------- |
| Principe                 | Le site lui-même, installable                                                                | La PWA empaquetée dans une application Android pour le Play Store | Code web dans une coque native (WebView) avec accès aux API natives | Navigateur embarqué dans une application de bureau |
| Distribution             | Lien, sans validation, sans commission                                                       | Google Play                                                       | App Store et Play Store                                             | Téléchargement, magasins                           |
| Mises à jour             | Instantanées, comme un site                                                                  | Instantanées (contenu web)                                        | Web instantané, natif via le store                                  | À gérer (auto-update)                              |
| iOS                      | Oui (Safari ; notifications push uniquement une fois installée, iOS 16.4+)                   | Non (Android seulement)                                           | Oui                                                                 | Non                                                |
| API natives              | Celles du web : notifications, géolocalisation, WebAuthn, Web NFC (Chrome Android seulement) | Idem PWA                                                          | Toutes (NFC complet, paiement natif, Bluetooth, capteurs)           | Système de fichiers, fenêtres, menus               |
| SEO / liens partageables | **Oui, c'est le même site**                                                                  | Oui                                                               | Non (application fermée)                                            | Non                                                |
| Coût et maintenance      | Une seule base de code                                                                       | PWA + un paquet Android                                           | Coque et plugins à maintenir, revue des stores                      | Binaire par plateforme                             |

**Pourquoi la PWA ici.** Le produit est un contenu public à indexer (SEO, GEO) et à partager par lien : une application fermée ferait perdre l'essentiel. Elle ne demande aucune API native, et les stores ajouteraient revue, commission et frottement. **Quand choisir autre chose** : TWA pour être présent sur le Play Store avec le même code ; hybride pour du NFC complet, du paiement natif ou de l'iOS avec notifications sans installation ; desktop pour une application métier sur poste fixe.

**Limites à connaître (iOS surtout).** Pas de notification push sans installation sur l'écran d'accueil ; pas de Web NFC ni de Background Sync ; le navigateur peut vider le stockage d'un site peu utilisé (7 jours sans visite sur Safari).

## Service worker

Écrit à la main, sans bibliothèque, en JavaScript classique (compatible avec la CSP `script-src 'self'`).

| Ressource                                                  | Stratégie                                                              | Raison                                               |
| ---------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------- |
| `/assets/*` (fichiers au hash)                             | Cache d'abord                                                          | Immuables : leur nom change quand le contenu change. |
| Pages HTML                                                 | Réseau d'abord (4 s), cache si le réseau échoue, sinon `/offline.html` | Contenu frais en ligne, jouable hors ligne.          |
| Autres fichiers du site                                    | Cache avec revalidation en arrière-plan                                | Icônes, manifeste.                                   |
| Firebase, `robots.txt`, `sitemap.xml`, `llms.txt`, `/api/` | Jamais interceptés                                                     | Données vivantes, ou destinées aux robots.           |

**Précache d'après le build.** Le code d'une page n'est chargé que quand on la visite : sans précache, un joueur qui perd le réseau juste après avoir ouvert l'accueil n'aurait pas le code du quiz. Un plugin Vite (`assetManifest`, dans `vite.config.ts`) écrit `asset-manifest.json` (tous les fichiers JS et CSS du build) et le service worker télécharge ce qui manque, à l'installation et à chaque démarrage. Les morceaux Firebase (plus de 800 ko) en sont exclus : ils se mettent en cache à la première utilisation.

**Préchargement du jour.** Une fois par jour, après la prise de contrôle du service worker, l'application télécharge les pages de l'accueil et des six quiz. Elle respecte le mode économie de données et n'agit jamais hors ligne.

**Cycle de vie.** `/sw.js` est servi `Cache-Control: no-cache` : le navigateur le revalide à chaque visite et détecte les mises à jour. Une nouvelle version attend (`waiting`) ; la bannière propose de recharger, ce qui envoie `SKIP_WAITING` puis recharge la page.

## Notifications push : architecture

```
 Navigateur                       Firestore                 Serveur d'envoi (cron)
 ──────────                       ─────────                 ──────────────────────
 [Activer le rappel] ─► FCM register() ─► FID (identifiant d'installation)
        │                                      │
        └─ users/{uid}.pushTokens[FID] = true ─┘
                                               │   scripts/send-daily-push.ts
                                               └─► lit users/*, planifie (planDailyPush)
                                                   ─► Admin SDK sendEach({ fid, data })
                                                          │
 Service worker ◄──────── Web Push (FCM) ◄────────────────┘
   showNotification(titre, texte, icône)  ·  clic : ouvre une adresse du site
```

- **Identifiant d'appareil** : le _Firebase Installation ID_ (API `register` / `onRegistered`, qui remplace `getToken`, déprécié). Il est rangé dans `users/{uid}.pushTokens` (10 appareils maximum, borné par les règles Firestore).
- **Message de type « data » seul** : le service worker du site l'affiche lui-même, avec ses icônes, sans importer de script externe (la CSP l'interdirait).
- **Personnalisation** : `planDailyPush` (logique pure, testée) choisit le texte selon la série en cours et les quiz déjà joués ; elle ne dérange pas celui qui a tout fini.
- **Déconnexion** : l'appareil est retiré du compte (sinon il recevrait encore les rappels de l'ancien compte).
- **Appareils morts** : le script supprime les identifiants que FCM déclare invalides.
- **Vie privée** : le rappel est facultatif, activé par un geste explicite, désactivable à tout moment ; la permission du navigateur n'est jamais demandée au chargement de la page.

### Bouton de test (démonstration)

Sur l'accueil, « Envoyer une notification de test » affiche une notification sur l'appareil en quelques secondes, **sans compte, sans clé VAPID et sans FCM**. Le bouton envoie un message au service worker, qui l'affiche avec **le même code que pour un vrai push** (`showNotificationFrom` dans `public/sw.js`) : on voit donc exactement le rendu du rappel quotidien (titre, texte, icône, clic qui ouvre le site). Il demande la permission du navigateur au clic, jamais avant. En développement le service worker n'est pas actif : le bouton l'explique au lieu d'échouer en silence. Ce test ne prouve pas l'acheminement par FCM (voir plus bas).

### Mise en service (une seule fois, par vous)

1. **Clé Web Push** : console Firebase > Paramètres du projet > Cloud Messaging > Certificats Web Push > générer une paire de clés. Mettre la clé **publique** dans `VITE_FIREBASE_VAPID_KEY` au build. Sans elle, le réglage est masqué.
2. **Règles Firestore** : elles n'existent que dans le dépôt. Les publier : `bunx firebase deploy --only firestore:rules --project <votre-projet>`. **Sans cela, ni la sauvegarde des résultats ni l'enregistrement d'appareil ne fonctionneront contre le vrai projet.**
3. **Script d'envoi** : créer un compte de service (console Google Cloud > IAM), garder le fichier JSON **secret** (secret GitHub Actions ou fichier hors dépôt). Tester sans rien envoyer : `GOOGLE_APPLICATION_CREDENTIALS=/chemin/cle.json bun scripts/send-daily-push.ts --dry-run`.
4. **Planification** : cron quotidien (GitHub Actions ou VPS), à l'heure où vos joueurs jouent (thème 7).

### Ce qui est vérifié, et ce qui ne l'est pas

- Vérifié automatiquement : le service worker affiche la notification (titre, texte, icône, adresse) quand un message push lui est livré (test e2e via le protocole Chrome DevTools) ; la logique d'abonnement et de désabonnement (tests unitaires, FCM simulé) ; le planificateur de messages ; les règles Firestore.
- **Non vérifié de bout en bout** : l'envoi réel par FCM jusqu'à un appareil, qui demande votre clé VAPID, un compte de service et un appareil. À tester à la main une fois ces éléments en place.

## Passkey (connexion par empreinte) : non implémenté, et pourquoi

**Ce que dit la spécification** ([MDN, Web Authentication API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Authentication_API)) : l'API se limite à deux appels dans le navigateur, `navigator.credentials.create()` (inscription) et `navigator.credentials.get()` (connexion). L'empreinte ou le visage est géré par l'authentificateur de l'appareil (`userVerification: "required"`), la clé privée ne le quitte jamais. **Tout le reste est le travail du serveur** (le « relying party ») : émettre un défi aléatoire à usage unique, stocker la clé publique de chaque utilisateur, puis vérifier la signature, le défi, l'origine et l'identifiant du site à chaque connexion. Sans cette vérification, le protocole n'apporte aucune protection : un passkey sans serveur qui vérifie n'est qu'un geste de confort.

**Firebase Auth** : je n'ai trouvé aucune prise en charge native des passkeys dans le SDK JavaScript (une demande ouverte depuis 2022 dans le dépôt `firebase-js-sdk`, et des solutions tierces : extension communautaire, Corbado, justpass.me). Cela peut avoir changé : vérifier dans la documentation actuelle avant de décider.

**Options réalistes**

1. **Serveur maison** : routes d'inscription et de connexion (bibliothèque SimpleWebAuthn pour vérifier), clés publiques dans Firestore, et SDK Admin pour émettre un jeton personnalisé que le navigateur échange contre une session Firebase. Il faut des routes en écriture (POST), un secret de compte de service sur le serveur, une gestion des défis à usage unique, et une protection CSRF et de débit : cela contredit le choix « pas de backend » et agrandit la surface d'attaque.
2. **Service tiers** gérant les passkeys pour Firebase (Corbado, etc.) : moins de code à écrire et à sécuriser, mais une dépendance et un coût.
3. **Remplacer Firebase Auth** par un fournisseur qui gère nativement les passkeys (Auth0, Clerk...).
4. **Déverrouillage local seulement** (WebAuthn comme verrou d'interface sur un appareil déjà connecté) : possible sans serveur, mais ce n'est pas une authentification ; à présenter comme du confort, jamais comme de la sécurité.

## Paiement sécurisé : non implémenté (aucune fonction payante)

Si une fonction payante existait : **Payment Request API** avec Apple Pay et Google Pay, ou un formulaire hébergé par le prestataire (Stripe Checkout) ; l'empreinte intervient via WebAuthn (vérification de l'utilisateur par l'appareil) et la double authentification 3-D Secure (SCA) ; **les données de carte ne transitent jamais par le site** (conformité PCI-DSS). Le **NFC ne sert pas au paiement sur le web** : Web NFC lit et écrit des étiquettes NDEF (Chrome Android) ; le paiement sans contact passe par le portefeuille du système, donc par Apple Pay ou Google Pay.
