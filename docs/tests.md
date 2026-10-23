# Stratégie de tests

Principe : chaque couche teste ce que les autres ne voient pas, et chaque suite se lance **une seule fois** par vérification.

| Couche                               | Outil                                  | Quoi                                                                                                                                                                           | Lancer               | Ordre de grandeur     |
| ------------------------------------ | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------- | --------------------- |
| **Unitaire**                         | Vitest                                 | Logique pure : tirage du jour, dates, score, série, validation des entrées, métadonnées SEO, JSON-LD, robots, sitemap, en-têtes de sécurité                                    | `bun run test`       | 333 tests, < 2 s      |
| **Intégration (composants)**         | Vitest + TestBed                       | Composants avec leurs services : joueur de quiz (focus, annonces, score, partage), formulaire de compte, menu, page de corrigé, synchronisation avec Firestore (module simulé) | `bun run test`       | inclus ci-dessus      |
| **Intégration (règles de sécurité)** | Vitest + émulateur Firestore           | Règles `firestore.rules` contre un vrai moteur de règles                                                                                                                       | `bun run test:rules` | 11 tests, Java requis |
| **E2E**                              | Playwright (Chromium bureau et mobile) | Parcours réels sur le build de production : jeu complet, compte, SEO, sécurité, accessibilité (axe, clair et sombre, 320 px, focus, espacement)                                | `bun run test:e2e`   | 69 tests x 2 profils  |

Couverture (`bun run test:coverage`) : environ 94 % des instructions et 86 % des branches, seuil bloquant à 80 % / 70 %. Sont exclus : les pages (simple assemblage, couvertes par l'e2e), la configuration de démarrage et la colle vers le SDK Firebase (vérifiée contre les émulateurs).

## Ce qui rend l'e2e fiable

- **Le build testé est celui de la production** (`NODE_ENV=production`, SSR et prérendu actifs) : Playwright force `NODE_ENV=test`, ce qui coupe le SSR d'Analog.
- **Les comptes de test vivent dans les émulateurs Firebase**, jamais dans le vrai projet. `e2e/global-setup.ts` attend que l'émulateur Auth et Firestore répondent.
- **`e2e/fixtures.ts` fait échouer tout test** qui provoque une erreur JavaScript non capturée ou une violation de Content-Security-Policy.
- **Les tests de sécurité** vérifient les en-têtes sur pages statiques, pages rendues, erreurs 404 et fichiers ; le refus des méthodes d'écriture ; l'absence de cookie ; la non-réflexion d'adresses piégées ; et que le parcours complet ne contacte que le site et Firebase.

## Pièges rencontrés

Voir `docs/mesures.md` (build non déterministe, `NODE_ENV=test`, `afterNextRender` côté serveur, `[disabled]` absent du HTML serveur) et `docs/securite.md` (hydratation incrémentale, Zod et `eval`, `getAuth`).

## Écrire un test

- Logique pure : fichier `*.spec.ts` voisin, aucune dépendance Angular.
- Composant : `TestBed`, services remplacés par de simples objets (`{ provide: AuthService, useValue: fake }`), vérification de ce que voit l'utilisateur (texte, attributs ARIA, focus), pas des détails internes.
- Nouvelle page : l'ajouter à `e2e/a11y.spec.ts`, `e2e/a11y-modes.spec.ts` et `e2e/seo.spec.ts`.
- Toute entrée externe nouvelle : une fonction de validation et ses cas limites.
