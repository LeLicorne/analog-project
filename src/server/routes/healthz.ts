import { defineEventHandler, setHeader } from 'h3';

import { buildHealth } from '../../data/ops/health';

/** Santé du service : sert au healthcheck Docker, à la supervision externe et à la vérification d'un déploiement. */
export default defineEventHandler((event) => {
  setHeader(event, 'Cache-Control', 'no-store');
  setHeader(event, 'X-Robots-Tag', 'noindex');
  return buildHealth(process.env, process.uptime());
});
