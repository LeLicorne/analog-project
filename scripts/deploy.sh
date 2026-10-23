#!/usr/bin/env bash
# Déploiement sur le VPS : reconstruit l'image, relance le conteneur, attend qu'il soit sain et, sinon, revient à la
# version précédente. À lancer depuis le dépôt cloné sur le VPS (la CI l'appelle par SSH après `git reset --hard <commit>`).
#
#   bash scripts/deploy.sh            # DEPLOY_TIMEOUT=90 secondes d'attente de santé par défaut
set -euo pipefail
cd "$(dirname "$0")/.."

TIMEOUT_SECONDS="${DEPLOY_TIMEOUT:-90}"
GIT_SHA="$(git rev-parse --short HEAD 2>/dev/null || echo unknown)"
BUILD_DATE="$(date -u +%Y-%m-%dT%H:%M:%SZ)"
export GIT_SHA BUILD_DATE

image="$(docker compose config --images | head -n1)"
rollback_tag="${image}:rollback"
previous="$(docker image inspect --format '{{.Id}}' "$image" 2>/dev/null || true)"

# L'image en service reçoit une étiquette explicite AVANT la construction : une image qui perd son étiquette (`latest`
# passe à la nouvelle) peut être nettoyée par Docker, et le retour arrière échouerait justement quand on en a besoin.
if [[ -n "$previous" ]]; then
  docker tag "$previous" "$rollback_tag"
fi

wait_healthy() {
  local deadline=$((SECONDS + TIMEOUT_SECONDS)) container status
  while ((SECONDS < deadline)); do
    container="$(docker compose ps -q app)"
    status="$(docker inspect --format '{{if .State.Health}}{{.State.Health.Status}}{{else}}none{{end}}' "$container" 2>/dev/null || echo missing)"
    [[ "$status" == "healthy" ]] && return 0
    sleep 2
  done
  return 1
}

echo "==> Construction de ${image} (commit ${GIT_SHA})"
docker compose build --pull

echo "==> Démarrage"
docker compose up -d --remove-orphans

if wait_healthy; then
  echo "==> Déploiement réussi : commit ${GIT_SHA}, construit le ${BUILD_DATE}"
  docker image prune -f >/dev/null
  exit 0
fi

echo "!! Le conteneur n'est pas devenu sain en ${TIMEOUT_SECONDS} s : dernières lignes du journal" >&2
docker compose logs --tail 80 app >&2 || true

if docker image inspect "$rollback_tag" >/dev/null 2>&1; then
  echo "==> Retour à la version précédente (${rollback_tag})" >&2
  docker tag "$rollback_tag" "${image}:latest"
  docker compose up -d --no-build --force-recreate
  if wait_healthy; then
    echo "==> Version précédente rétablie" >&2
  else
    echo "!! La version précédente n'est pas saine non plus : intervention manuelle nécessaire" >&2
  fi
else
  echo "!! Aucune version précédente à rétablir (premier déploiement)" >&2
fi
exit 1
