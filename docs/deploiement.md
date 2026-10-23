# Mise en production : CI/CD, Docker, VPS

## Vue d'ensemble

```
 git push main ──► GitHub Actions ──────────────────────────────────────────────┐
                    │ qualité · règles Firestore · e2e · Lighthouse · image Docker│  tout vert ?
                    └─────────────────────────────────────────────────────────────┘
                                         │ oui
                                         ▼  SSH (empreinte du serveur vérifiée)
 VPS :  git reset --hard <commit>  ─►  scripts/deploy.sh
          docker compose build  ─►  up -d  ─►  attente « healthy »  ──non──► retour à l'image précédente
                                         │ oui
                                         ▼
                              Traefik (https, Let's Encrypt, www -> domaine nu, compression)
                                         │
                                         ▼  GitHub vérifie ensuite https://<domaine>/healthz : le bon commit est-il en ligne ?
```

## Ce que la CI vérifie

| Job            | Ce qu'il empêche                                                                                                                                                                                                                |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **quality**    | Code mal formaté, erreur de lint ou de type (templates compris), test unitaire cassé, couverture sous le seuil. `bun audit --prod` est affiché, non bloquant (voir `docs/securite.md`).                                         |
| **rules**      | Une règle Firestore qui ouvre les données d'un utilisateur à un autre (émulateur, 15 tests).                                                                                                                                    |
| **e2e**        | Un parcours cassé, une violation de CSP, une erreur JavaScript, une régression d'accessibilité, de SEO ou de PWA, sur le build de production.                                                                                   |
| **lighthouse** | Une dégradation des budgets : performance >= 90, accessibilité 100, bonnes pratiques >= 95, SEO 100, LCP <= 2,8 s, CLS <= 0,1, TBT <= 200 ms (médiane de 3 mesures par page).                                                   |
| **docker**     | Une image qui ne se construit pas, ne démarre pas, tourne en root, n'est pas saine, ou ne sert pas les bons en-têtes, canoniques et `robots.txt`. Le conteneur de test a le **même durcissement** que le compose de production. |
| **deploy**     | Seulement après les cinq jobs, sur `main`.                                                                                                                                                                                      |

Chaque semaine, `links.yml` contrôle les 346 liens sources. Chaque jour à 18 h ou 19 h (Paris), `daily-push.yml` envoie le rappel (voir `docs/pwa.md`). Chaque nuit après minuit, `deploy.yml` redéploie : **la liste des quiz passés est figée à la construction**, sans cela les pages de thème n'afficheraient pas les corrigés de la veille.

## Pourquoi cette image Docker

- **Deux étapes** : Bun construit, Node exécute. Le serveur Nitro est autonome : l'image finale (environ 250 Mo) ne contient ni Bun, ni `node_modules`, ni code source.
- **Utilisateur non privilégié** (`node`), système de fichiers en lecture seule, aucune capacité Linux, pas d'élévation de privilèges, mémoire et processus bornés, journaux tournants (`docker-compose.yml`). Vérifié : le conteneur écrit dans `/tmp` seulement et ses capacités effectives sont nulles.
- **Aucun secret dans l'image.** Les variables `VITE_*` sont injectées dans le JavaScript public au build : elles ne doivent jamais contenir de secret. `.dockerignore` exclut `.env*`, `.git` et les dépendances locales.
- **`HEALTHCHECK`** sur `/healthz` : Docker, le script de déploiement et GitHub savent si le service répond, et quel commit tourne.

## Préparer le VPS (une seule fois)

1. **Domaine** : enregistrements DNS `A` (et `AAAA`) pour `domaine` et `www.domaine` vers le VPS.
2. **Réseau Traefik** : le réseau Docker externe `web` existe déjà (c'est celui de vos autres applications).
3. **Dépôt** : `git clone git@github.com:LeLicorne/analog-project.git <dossier>`. Le dépôt étant privé, créer une **clé de déploiement en lecture seule** : `ssh-keygen -t ed25519 -f ~/.ssh/quizz_deploy`, puis ajouter la clé publique dans GitHub > Settings > Deploy keys (sans droit d'écriture).
4. **`.env`** dans le dossier, à partir de `.env.example` : `APP_NAME`, `DOMAIN` (sans `https://`, sans `www`) et les valeurs **publiques** `VITE_*` (config web Firebase, clé VAPID, contact, auteur). Jamais de compte de service ici.
5. **Premier déploiement à la main** : `bash scripts/deploy.sh`.
6. **Clé pour GitHub Actions** : `ssh-keygen -t ed25519 -f quizz_actions -C "github-actions"`, ajouter `quizz_actions.pub` aux `~/.ssh/authorized_keys` du VPS (idéalement d'un utilisateur dédié, membre du groupe `docker`), et récupérer l'empreinte du serveur : `ssh-keyscan -t ed25519 <ip-ou-nom-du-vps>`.

## Secrets et variables GitHub

Settings > Secrets and variables > Actions. Créer aussi un environnement `production` (Settings > Environments) : vous pouvez y exiger une validation manuelle avant chaque déploiement.

| Nom                        | Type     | Contenu                                                                      |
| -------------------------- | -------- | ---------------------------------------------------------------------------- |
| `VPS_HOST`                 | secret   | Adresse du VPS                                                               |
| `VPS_USER`                 | secret   | Utilisateur SSH                                                              |
| `VPS_SSH_KEY`              | secret   | Clé **privée** `quizz_actions`                                               |
| `VPS_KNOWN_HOSTS`          | secret   | Sortie de `ssh-keyscan` : la connexion échoue si le serveur n'est pas le bon |
| `VPS_APP_DIR`              | secret   | Dossier du dépôt sur le VPS                                                  |
| `SITE_URL`                 | variable | `https://votre-domaine` : active la vérification en ligne du commit déployé  |
| `FIREBASE_SERVICE_ACCOUNT` | secret   | JSON du compte de service (rappel quotidien seulement)                       |

Tant que ces secrets manquent, `deploy.yml` et `daily-push.yml` s'arrêtent **sans erreur** avec un message : la CI reste verte.

## Retour arrière

- **Automatique** : si le conteneur n'est pas sain en 90 s, `scripts/deploy.sh` rétablit l'image précédente (étiquette `:rollback`) et sort en erreur : le déploiement échoue et GitHub vous prévient.
- **Manuel** : sur le VPS, `git reset --hard <ancien-commit> && bash scripts/deploy.sh`.
- **Coupure** : `docker compose up -d --build` remplace le conteneur : quelques secondes d'indisponibilité par déploiement. Pour du zéro-coupure il faudrait deux conteneurs derrière Traefik (ou Kubernetes, voir `docs/monitoring.md`).

## Points d'attention

- **Deux couches d'accès pour les robots** (votre récap) : le `robots.txt` du site autorise les robots IA, mais un pare-feu, un CDN ou Traefik peut les bloquer avant. Après la mise en ligne : `curl -A "GPTBot" https://domaine/` doit renvoyer le HTML complet.
- **HSTS** : l'application envoie `max-age` 2 ans, `includeSubDomains`, `preload` dès que `VITE_SITE_URL` est en https. Si d'autres sous-domaines du même domaine ne sont pas encore en https, retirer `includeSubDomains` dans `src/data/security/headers.ts` **avant** le premier déploiement (un navigateur retient le HSTS longtemps). Ne demander l'inscription à la liste « preload » qu'une fois sûr.
- **Version des actions** : épinglées sur une version majeure et mises à jour par Dependabot (`.github/dependabot.yml`). Pour une sécurité maximale, les épingler sur un hash de commit.
- **Compression** : les fichiers statiques sont précompressés par l'application, le middleware Traefik `compress` couvre les pages rendues à la demande.

## Ce qui est vérifié, et ce qui ne l'est pas

- **Vérifié localement** : construction de l'image, démarrage avec le durcissement du compose, santé, utilisateur non privilégié, système de fichiers en lecture seule, en-têtes, canoniques en https ; `scripts/deploy.sh` en déploiement normal **et** en échec (release volontairement cassée : retour automatique à l'image saine) ; les assertions du job Docker rejouées à l'identique ; Lighthouse CI (12 mesures, toutes les assertions passent) ; analyse des workflows par `act`.
- **Non vérifié** : l'exécution sur les serveurs de GitHub, le déploiement par SSH, les labels Traefik face à un vrai Traefik, l'émission du certificat Let's Encrypt. Le premier déploiement réel est le vrai test : le faire en regardant les journaux.
- Un défaut a été trouvé par le test d'échec : l'image précédente disparaissait avant le retour arrière (voir `docs/ia-journal.md`).
