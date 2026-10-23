# Mesures Lighthouse

Conditions : Lighthouse en ligne de commande (Chromium headless), build de production servi en local (`node dist/analog/server/index.mjs`), thème « mobile » (Moto G Power, 4G simulée, CPU ralenti x4) et « desktop ». Le réseau local ne représente pas la réalité : ces chiffres servent à **comparer avant et après**, pas à prédire les données terrain (CrUX / Search Console, une fois le site en ligne).

## Phase 2 : SEO et GEO

| Page         | Plateforme | SEO avant | SEO après | Perf avant | Perf après | LCP avant | LCP après |
| ------------ | ---------- | --------- | --------- | ---------- | ---------- | --------- | --------- |
| Accueil      | mobile     | 82        | **100**   | 83         | 83         | 3,52 s    | 3,51 s    |
| Accueil      | desktop    | 82        | **100**   | 100        | 100        | 0,70 s    | 0,64 s    |
| Thème        | mobile     | 82        | **100**   | 85         | 80         | 3,30 s    | 3,83 s    |
| Quiz du jour | mobile     | 82        | **100**   | 85         | 75         | 3,30 s    | 4,43 s    |
| Quiz du jour | desktop    | 99        | 100       | 99         | 100        | 0,82 s    | 0,64 s    |

Accessibilité (100) et bonnes pratiques (100) inchangées partout.

Note : `/llms.txt` a été ajouté après ces mesures. Il n'a pas d'effet sur les scores.

### Ce que le score SEO de 82 cachait

- **Pas de meta description** sur aucune page.
- **`robots.txt` invalide** : `/robots.txt` renvoyait la page d'accueil (« 16 erreurs »).
- **L'accueil était une coquille vide** : `/` était servie comme `index.html` statique (rendu côté client), sans aucun contenu dans le HTML. Lighthouse ne le signale pas, mais un robot qui n'exécute pas JavaScript, dont la plupart des crawlers d'IA, ne voyait rien. Corrigé en prérendant `/`.
- **Les pages inexistantes répondaient 200** au lieu de 404.

### Coût mesuré

Le JavaScript a grossi (+20 kB : fil d'Ariane, FAQ, données structurées, compte) et la performance mobile recule de 3 à 10 points. C'est le point de départ de la phase 3 (performance), notamment : poids de Zod et de `@angular/router` dans le bundle principal, découpage du formulaire de compte, CLS de 0,043 sur le quiz.

## Pièges rencontrés (à connaître avant de toucher au build ou aux tests)

1. **Build non déterministe sans `fastCompile`** : environ 1 build sur 4 (3 sur 12 mesurés) émettait des composants non compilés (« JIT compiler unavailable »), au hasard, côté client comme côté serveur. Avec `fastCompile: true` : 0 défaut sur 25 builds. Les templates restent vérifiés par `ngc` dans `bun run typecheck`.
2. **Playwright force `NODE_ENV=test`**, ce qui désactive le SSR et le prérendu d'Analog. Les premiers tests e2e tournaient donc sans le rendu serveur, sur la seule version client. Désormais : `NODE_ENV=production` forcé, build séparé (`bun run build:e2e`).
3. **`afterNextRender` s'exécute aussi côté serveur** : un drapeau « prêt » posé dedans est déjà vrai dans le HTML. Il faut tester `isPlatformBrowser`.
4. **`[disabled]` n'est pas écrit dans le HTML serveur** (propriété DOM), alors que `[attr.disabled]` l'est. Avant l'hydratation, un formulaire serait soumis nativement par le navigateur (pour la connexion : mot de passe dans l'adresse).
5. **Les émulateurs Firebase démarrent chacun à leur rythme** : `e2e/global-setup.ts` attend qu'Auth et Firestore répondent.
