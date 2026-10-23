# AGENTS.md

App **AnalogJS** (méta-framework Angular, Vite) en TypeScript, exécutée avec **Bun**. Projet : « Quizz du jour » (quiz quotidien, PWA).
Conventions du framework : `node_modules/@analogjs/platform/AGENTS.md` (à lire avant de toucher au routing, aux routes serveur ou au contenu).

## Commandes (toujours avec `bun`)

| Commande                              | Rôle                                                                                                |
| ------------------------------------- | --------------------------------------------------------------------------------------------------- |
| `bun run dev`                         | Serveur de dev                                                                                      |
| `bun run check`                       | **Point d'entrée unique** : format + lint + typecheck + tests unitaires                             |
| `bun run lint:fix` / `bun run format` | Corrections automatiques                                                                            |
| `bun run test:coverage`               | Vitest avec seuils de couverture                                                                    |
| `bun run test:rules`                  | Règles Firestore sur l'émulateur (Java requis), à relancer à chaque changement de `firestore.rules` |
| `bun run test:e2e`                    | Playwright (parcours + axe-core) sur les émulateurs Firebase, build puis preview                    |

**Définition de « terminé » : `bun run check` est vert**, et `bun run test:e2e` pour toute page ou tout parcours touché.

## Structure

```
src/app/pages/      routes (fichiers *.page.ts, export default), minces : elles assemblent des features
src/app/features/   une feature = un dossier autonome (composants, services, état)
src/app/shared/     UI et utilitaires génériques, sans logique métier
src/app/core/       services transverses (auth, sync du compte, firebase, progression, seo)
src/data/           types et données de quiz (pur TypeScript, sans Angular)
src/content/        markdown (explications, pages éditoriales)
src/server/         routes Nitro (rendu, headers de sécurité), aucune logique métier
e2e/                tests Playwright
```

Règles de dépendances (appliquées par ESLint) : `pages → features/shared/core/data` ; une feature n'importe pas une autre feature ; `shared`, `core` et `data` n'importent jamais `features` ni `pages`. Alias : `@app/*`, `@data/*`, `@content/*`.

## Règles de code

- Angular moderne : composants standalone, `inject()`, signals, `@if/@for/@switch`, `ChangeDetectionStrategy.OnPush`.
- TypeScript strict (`noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `verbatimModuleSyntax`). Pas de `any`, pas de `!` hors tests, types de retour explicites. `import type` pour les types.
- Préfixe `app-` pour les sélecteurs. Pas de `console.log`.
- Tests colocalisés `*.spec.ts` (Vitest). **Tout code généré doit être relu, compris et testé** : pas de logique métier sans test.
- Pas de `innerHTML` ni `bypassSecurityTrust*`. Entrées externes (stockage local, Firestore, environnement) validées par des fonctions typées écrites à la main (`parseResults`, `parseFirebaseConfig`) : pas de Zod, qui sonde `eval` et viole la CSP.
- Firebase : Auth et Firestore sont chargés à la demande (`import()`), jamais en import statique ; les écritures Firestore respectent `firestore.rules` (testées par `test:rules`). Chaque suite de tests se lance une seule fois par vérification. Les tests e2e ne touchent jamais le vrai projet : émulateurs uniquement.
- Secrets : jamais dans le dépôt. `.env` ignoré, `.env.example` à jour.

## Accessibilité, SEO, GEO (priorité du projet)

- WCAG 2.2 AA minimum et RGAA 4 : HTML sémantique d'abord, ARIA seulement si nécessaire, focus visible, contraste ≥ 4.5:1, rien n'est transmis par la couleur seule, `prefers-reduced-motion` respecté, aucune limite de temps.
- Toute nouvelle page : `title` unique, meta description, canonical, un seul `h1`, JSON-LD adapté, contenu présent dans le HTML rendu côté serveur (SSG/SSR).
- Chaque page ajoutée est ajoutée à `e2e/a11y.spec.ts` et aux routes prérendues de `vite.config.ts`.
- `/llms.txt` existe (généré par `src/data/seo/llms.ts`) comme point d'entrée lisible, mais le GEO repose d'abord sur du contenu rendu côté serveur, factuel, sourcé, daté, avec données structurées.

## Sécurité (détails dans `docs/securite.md`)

- CSP stricte `script-src 'self'`, sans nonce : le site ne doit émettre **aucun script ni style inline**. Un test e2e fait échouer toute violation. Ajouter une source externe = modifier `src/data/security/headers.ts` et son test.
- Hydratation : `withNoIncrementalHydration()` est obligatoire (sinon Angular 22 injecte des scripts inline). Pas de Zod (il sonde `eval`). Firebase Auth : `initializeAuth`, pas `getAuth`.
- Interdits par ESLint et par test : `innerHTML`, `bypassSecurityTrust*`, `eval`, `document.write`, gestionnaires `on*` et `style=` inline.
- Le serveur n'a que des routes en lecture (`src/server/middleware/request-guard.ts` refuse le reste). Pas de cookie : si un cookie de session est ajouté, prévoir SameSite, HttpOnly, Secure et une protection CSRF.
- Jamais de secret dans le dépôt (un test le vérifie). La config web Firebase n'est pas un secret, une clé privée ou un jeton serveur l'est.

## Pièges connus (détails dans `docs/mesures.md`)

- `afterNextRender` s'exécute aussi côté serveur : tester `isPlatformBrowser` avant de poser un drapeau « navigateur ».
- Désactiver un contrôle avant hydratation : `[attr.disabled]`, jamais `[disabled]` (non écrit dans le HTML serveur).
- Playwright force `NODE_ENV=test`, qui coupe le SSR d'Analog : le build e2e passe par `bun run build:e2e` (`NODE_ENV=production`).
- Variables d'URL : `VITE_SITE_URL` au build et `SITE_URL` à l'exécution du serveur (robots.txt, sitemap), même valeur.

## À ne pas faire

- Ne pas retirer `fastCompile` de `vite.config.ts` : sans lui, le build produit au hasard des composants non compilés. `bun run typecheck` (ngc) vérifie les templates à sa place.
- Ne pas désactiver une règle ESLint ou TypeScript pour faire passer un check : corriger la cause.
- Ne pas ajouter de dépendance sans justification.
- Ne pas commiter, pousser ni déployer sans demande explicite.
