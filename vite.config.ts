/// <reference types="vitest" />

import analog from '@analogjs/platform';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, loadEnv } from 'vite';

import { archiveDates } from './src/data/archive';
import { toIsoDate } from './src/data/dates';
import { THEME_SLUGS } from './src/data/quiz.types';
import { buildSecurityHeaders } from './src/data/security/headers';

/** Pages statiques : une fiche par thème et une page de corrigé par quiz passé. */
function prerenderRoutes(): Promise<string[]> {
  const dates = archiveDates(toIsoDate(new Date()));
  return Promise.resolve([
    '/',
    '/a-propos',
    '/accessibilite',
    '/plan-du-site',
    ...THEME_SLUGS.flatMap((theme) => [
      `/themes/${theme}`,
      ...dates.map((date) => `/quiz/${theme}/${date}`),
    ]),
  ]);
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  const setting = (name: string): string | undefined => process.env[name] ?? env[name];
  const securityHeaders = buildSecurityHeaders({
    siteUrl: setting('VITE_SITE_URL') ?? 'http://localhost:4173',
    useEmulators: setting('VITE_USE_FIREBASE_EMULATORS') === 'true',
  });

  return {
    build: {
      target: ['es2020'],
    },
    resolve: {
      mainFields: ['module'],
      tsconfigPaths: true,
    },
    plugins: [
      analog({
        // Sans `fastCompile`, environ 1 build sur 4 émettait des composants non compilés (« JIT compiler unavailable »),
        // aléatoirement, côté client comme côté serveur. Les templates sont vérifiés par `ngc` dans `bun run typecheck`.
        vite: { fastCompile: true },
        nitro: {
          // Fichiers statiques précompressés (gzip + brotli) : le JavaScript passe d'environ 460 ko à moins de 140 ko sur le réseau.
          compressPublicAssets: { gzip: true, brotli: true },
          // Les fichiers de /assets portent un hash dans leur nom : ils ne changent jamais, le navigateur peut les garder un an.
          routeRules: {
            // CSP stricte et en-têtes de sécurité sur TOUTES les réponses : pages statiques, pages rendues et fichiers.
            '/**': { headers: securityHeaders },
            '/assets/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
          },
        },
        prerender: {
          routes: prerenderRoutes,
        },
      }),
      tailwindcss(),
    ],
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['src/test-setup.ts'],
      include: ['src/**/*.spec.ts'],
      reporters: ['default'],
      coverage: {
        provider: 'v8',
        include: ['src/app/**/*.ts', 'src/data/**/*.ts'],
        // Exclus : les pages (assemblage, couvertes par l'e2e), la configuration de démarrage et la colle vers le SDK Firebase
        // (vérifiée contre les émulateurs par l'e2e).
        exclude: [
          'src/**/*.spec.ts',
          'src/app/pages/**',
          'src/app/app.config*.ts',
          'src/app/core/firebase/firebase.service.ts',
        ],
        thresholds: { lines: 80, functions: 80, branches: 70, statements: 80 },
      },
    },
  };
});
