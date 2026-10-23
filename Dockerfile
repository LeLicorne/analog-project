# syntax=docker/dockerfile:1

# ── Étape 1 : construction ────────────────────────────────────────────────────────────────────────────────────────
FROM oven/bun:1.4 AS build
WORKDIR /app

# Dépendances d'abord : cette couche n'est reconstruite que si package.json ou bun.lock changent.
# --ignore-scripts : aucun script d'installation d'une dépendance ne s'exécute pendant le build.
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --ignore-scripts

COPY . .

# Les variables VITE_* sont injectées dans le JavaScript au build : elles sont PUBLIQUES par nature (config web Firebase,
# adresse du site). Aucun secret ne doit jamais passer par un ARG : il resterait lisible dans l'historique de l'image.
ARG VITE_SITE_URL
ARG VITE_FIREBASE_API_KEY
ARG VITE_FIREBASE_AUTH_DOMAIN
ARG VITE_FIREBASE_PROJECT_ID
ARG VITE_FIREBASE_STORAGE_BUCKET
ARG VITE_FIREBASE_MESSAGING_SENDER_ID
ARG VITE_FIREBASE_APP_ID
ARG VITE_FIREBASE_MEASUREMENT_ID
ARG VITE_FIREBASE_VAPID_KEY
ARG VITE_CONTACT_EMAIL
ARG VITE_AUTHOR_NAME
ARG VITE_AUTHOR_GITHUB
ARG VITE_AUTHOR_LINKEDIN
ENV NODE_ENV=production \
    VITE_SITE_URL=$VITE_SITE_URL \
    VITE_FIREBASE_API_KEY=$VITE_FIREBASE_API_KEY \
    VITE_FIREBASE_AUTH_DOMAIN=$VITE_FIREBASE_AUTH_DOMAIN \
    VITE_FIREBASE_PROJECT_ID=$VITE_FIREBASE_PROJECT_ID \
    VITE_FIREBASE_STORAGE_BUCKET=$VITE_FIREBASE_STORAGE_BUCKET \
    VITE_FIREBASE_MESSAGING_SENDER_ID=$VITE_FIREBASE_MESSAGING_SENDER_ID \
    VITE_FIREBASE_APP_ID=$VITE_FIREBASE_APP_ID \
    VITE_FIREBASE_MEASUREMENT_ID=$VITE_FIREBASE_MEASUREMENT_ID \
    VITE_FIREBASE_VAPID_KEY=$VITE_FIREBASE_VAPID_KEY \
    VITE_CONTACT_EMAIL=$VITE_CONTACT_EMAIL \
    VITE_AUTHOR_NAME=$VITE_AUTHOR_NAME \
    VITE_AUTHOR_GITHUB=$VITE_AUTHOR_GITHUB \
    VITE_AUTHOR_LINKEDIN=$VITE_AUTHOR_LINKEDIN

RUN bun run build

# ── Étape 2 : exécution ───────────────────────────────────────────────────────────────────────────────────────────
# Le serveur Nitro est autonome (dépendances incluses dans la sortie) : l'image finale ne contient ni Bun, ni
# node_modules, ni code source, seulement Node et la sortie du build.
FROM node:22-alpine AS runtime
WORKDIR /app

COPY --from=build --chown=node:node /app/dist/analog ./

ARG GIT_SHA=unknown
ARG BUILD_DATE=unknown
ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=80 \
    GIT_SHA=$GIT_SHA \
    BUILD_DATE=$BUILD_DATE

# Utilisateur non privilégié. Le port 80 reste utilisable : Docker autorise les ports < 1024 dans le conteneur
# (net.ipv4.ip_unprivileged_port_start=0 par défaut depuis Docker 20.10).
USER node
EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:'+process.env.PORT+'/healthz').then((r)=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "server/index.mjs"]
