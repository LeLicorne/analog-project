---
name: quizz-security-review
description: Relit un changement de Quizz du jour du point de vue sécurité (CSP, XSS, secrets, règles Firestore, service worker, serveur). À utiliser avant de valider tout changement touchant au serveur, à l'authentification, aux en-têtes, au service worker ou à une dépendance.
---

# Revue de sécurité

Référence : `docs/securite.md`. La CSP est `script-src 'self'` **sans nonce** : le site ne doit émettre aucun script ni style inline exécutable.

## Points bloquants (refuser le changement)

- `innerHTML`, `outerHTML`, `insertAdjacentHTML`, `bypassSecurityTrust*`, `eval`, `new Function`, `document.write`, attribut `on*` ou `style=` : interdits (ESLint + `static-analysis.spec.ts`).
- Un script ou style inline, ou une source externe ajoutée à la CSP sans test dans `src/data/security/headers.spec.ts`.
- Une bibliothèque qui sonde `eval` (Zod 4 l'a fait) ou charge des scripts externes (Firebase `getAuth` avec popup).
- Un secret dans le dépôt (clé privée, jeton, compte de service). Rappel : la config web Firebase n'est **pas** un secret, un compte de service l'est.
- Un cookie de session ou une route qui écrit sans protection CSRF (`SameSite`, `HttpOnly`, `Secure`, jeton ou contrôle d'`Origin`) : le serveur n'a aujourd'hui aucune route d'écriture, `request-guard.ts` refuse le reste.
- Une règle Firestore plus large que « le propriétaire lit et écrit son document » sans test dans `rules-tests/`.

## Points à examiner

- Entrée non fiable (stockage local, Firestore, environnement, adresse) : une fonction de validation typée et ses cas limites (`parseResults`, `parseFirebaseConfig`).
- Messages d'erreur : jamais de réflexion de l'entrée utilisateur (`request-guard.ts` répond par un texte fixe) ni d'énumération de comptes (`auth-errors.ts`).
- Service worker (`public/sw.js`) : pas d'import externe, n'intercepte jamais Firebase ni robots/sitemap/llms ; l'adresse ouverte au clic d'une notification reste sur le site.
- Écouteurs sur `window` retirés à la destruction ; données personnelles : seulement `users/{uid}` (résultats, appareils de notification).
- Dépendances : `bun audit --prod`, et pour toute alerte, dire si elle est atteignable dans le navigateur ou le serveur servi.

## Vérifier

`bun run test` (CSP, analyse statique), `bun run test:rules` (règles Firestore, Java requis), `bun run test:e2e` (en-têtes, méthodes, XSS, violations CSP : toute violation fait échouer un test). Une seule fois chacun.

## Format de la réponse

`gravité | constat | scénario d'attaque concret | correction`. Si aucun scénario réaliste n'existe, ne pas gonfler : écrire « non exploitable » et pourquoi.
