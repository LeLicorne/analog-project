# Sécurité

## Vue d'ensemble

| Menace                                          | Mesure                                                                                                                                                                                           | Où                                                                   | Vérifié par                                                              |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| Injection de script (XSS)                       | CSP stricte sans `unsafe-inline` ni `unsafe-eval` ; échappement automatique d'Angular ; ESLint interdit `innerHTML`, `bypassSecurityTrust*`, `eval`, `document.write` ; JSON-LD avec `<` échappé | `src/data/security/headers.ts`, `eslint.config.js`, `seo.service.ts` | `e2e/security.spec.ts`, `static-analysis.spec.ts`, `seo.service.spec.ts` |
| Détournement par cadre (clickjacking)           | `frame-ancestors 'none'` + `X-Frame-Options: DENY`                                                                                                                                               | en-têtes                                                             | e2e                                                                      |
| Sniffing de type MIME                           | `X-Content-Type-Options: nosniff`                                                                                                                                                                | en-têtes                                                             | e2e                                                                      |
| Fuite d'adresses                                | `Referrer-Policy: strict-origin-when-cross-origin`                                                                                                                                               | en-têtes                                                             | e2e                                                                      |
| Capteurs et API sensibles                       | `Permissions-Policy` (caméra, micro, paiement, USB, série, Bluetooth)                                                                                                                            | en-têtes                                                             | e2e                                                                      |
| Interception                                    | HSTS (`max-age` 2 ans, sous-domaines, preload), envoyé seulement si le site est en https                                                                                                         | en-têtes                                                             | test unitaire                                                            |
| CSRF                                            | Pas de cookie, pas de session serveur, pas de route qui écrit ; méthodes autres que GET/HEAD/OPTIONS refusées (405)                                                                              | `src/server/middleware/request-guard.ts`                             | e2e                                                                      |
| Données d'un autre utilisateur                  | Règles Firestore : seul le propriétaire lit et écrit `users/{uid}`, champs et taille bornés, suppression interdite                                                                               | `firestore.rules`                                                    | `bun run test:rules` (11 tests, émulateur)                               |
| Secrets dans le dépôt                           | `.env*` ignorés (sauf `.env.example`, sans valeur) ; analyse du code à chaque test                                                                                                               | `.gitignore`, `static-analysis.spec.ts`                              | tests unitaires                                                          |
| Énumération des comptes                         | Même message pour « compte inconnu » et « mauvais mot de passe » ; l'inscription ne révèle pas qu'une adresse existe                                                                             | `auth-errors.ts`                                                     | tests unitaires et e2e                                                   |
| Données non fiables (stockage local, Firestore) | Validation à la lecture (`parseResults`), refus du format invalide                                                                                                                               | `progress.store.ts`                                                  | tests unitaires                                                          |

## La CSP, expliquée

```
default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self';
connect-src 'self' https://identitytoolkit.googleapis.com https://securetoken.googleapis.com https://firestore.googleapis.com;
manifest-src 'self'; worker-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'
```

- **Pas de nonce.** Un nonce se génère par requête, ce qui est impossible pour les pages statiques (accueil, thèmes, corrigés) servies telles quelles. Plutôt que de l'imposer, le site n'émet **aucun script ni style inline exécutable** : la CSP reste `script-src 'self'`. Les blocs JSON (`ld+json`, `ng-state`) ne sont pas exécutés, la CSP ne les concerne pas.
- **Ce qu'il a fallu retirer pour y arriver** (chacun détecté par le test e2e « aucune violation CSP ») :
  1. l'hydratation incrémentale d'Angular 22, active par défaut, qui injecte des scripts inline de relecture d'événements ;
  2. **Zod 4**, qui teste `eval` avec `new Function` (la CSP le signale même si l'erreur est capturée) ;
  3. `getAuth` de Firebase, qui charge un iframe et un script Google : remplacé par `initializeAuth` sans résolveur de popup.
- **`connect-src` minimal** : seuls les trois services Firebase réellement appelés. Un test e2e vérifie qu'un parcours complet (inscription, partie, sauvegarde) ne contacte rien d'autre.
- **Ajouter une source** : modifier `src/data/security/headers.ts` et son test, jamais contourner la CSP ailleurs.
- **Le test de non-régression** : `e2e/fixtures.ts` fait échouer **tout** test e2e qui provoque une violation de CSP ou une erreur JavaScript non capturée.

## CSRF : pourquoi aucun jeton

Une attaque CSRF fait envoyer à un navigateur une requête authentifiée par un **cookie** vers un site cible. Ici :

- l'authentification Firebase repose sur un jeton gardé en JavaScript (IndexedDB), envoyé dans un en-tête : un site tiers ne peut pas le joindre à une requête ;
- le serveur ne pose aucun cookie et n'a aucune route qui modifie un état ;
- les écritures vont à Firestore, contrôlées par les règles de sécurité et le jeton de l'utilisateur.

Le garde-fou `request-guard` refuse en plus toute méthode d'écriture et tout chemin contenant des caractères suspects (`{`, `<`, `"`), avec une réponse à texte fixe qui ne recopie jamais l'adresse. **Si un cookie de session ou une route d'écriture est un jour ajouté**, il faudra : `SameSite=Lax` ou `Strict`, `HttpOnly`, `Secure`, un jeton anti-CSRF ou la vérification de l'en-tête `Origin`.

## Secrets

- **La config web Firebase n'est pas un secret** (clé API, identifiants) : elle est visible dans le navigateur par conception. Sa protection vient des règles Firestore, de la restriction de la clé par domaine dans Google Cloud et, à terme, de App Check.
- Aucun vrai secret n'est utilisé par le site (pas de clé privée, pas de jeton serveur).
- `.env.local` est ignoré par git. `.env.example` liste les variables **sans valeur** ; un test échoue si une variable de type clé, jeton ou mot de passe y contient quelque chose.
- Analyse automatique du dépôt à chaque test (`static-analysis.spec.ts`) : clés Google, clés privées, jetons Stripe, GitHub, Slack, AWS.
- **En CI/CD (thème 7)** : variables `VITE_*` passées comme variables de build (elles finissent dans le JavaScript public, donc rien de secret dedans) ; tout vrai secret en « secret » GitHub Actions, jamais dans un `ARG` ou une couche d'image Docker.

## Dépendances (`bun audit`)

7 alertes, aucune exploitable dans le site servi :

| Paquet                                                           | Gravité        | Chemin                                                                       | Pourquoi ce n'est pas atteignable                                                                                                           |
| ---------------------------------------------------------------- | -------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `@grpc/grpc-js` 1.9                                              | haute          | `firebase > firestore`                                                       | Code Node (gRPC) : le navigateur utilise WebChannel, il n'est pas embarqué dans le bundle. Seule alerte en production (`bun audit --prod`). |
| `braces`, `esbuild`, `node-forge`, `uuid`, `@opentelemetry/core` | haute à faible | outils de développement (chokidar, Nitro en dev, Lighthouse, firebase-tools) | Jamais exécutés en production.                                                                                                              |

À faire en CI : `bun audit --prod` bloquant sur les alertes hautes, et revue des dépendances à chaque mise à jour.

## Non couvert (à connaître)

- **Trusted Types** (`require-trusted-types-for 'script'`) : protection supplémentaire contre le XSS par le DOM, non activée.
- **App Check** (Firebase) : limiterait l'usage de la clé API aux seules applications légitimes ; demande reCAPTCHA.
- **Limitation de débit** : à mettre devant le site (Traefik) ; Firebase Auth limite déjà les tentatives de connexion.
- **Protection contre l'énumération d'e-mails** : activer le réglage correspondant dans la console Firebase (Authentication > Paramètres).
- **Rapports CSP** (`report-to`) : à brancher avec la supervision (thème 7).
- **Soumission HSTS preload** : à faire une fois le domaine définitif et le https en place.
