/// <reference types="vitest" />

import analog from '@analogjs/platform';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

import { archiveDates } from './src/data/archive';
import { toIsoDate } from './src/data/dates';
import { THEME_SLUGS } from './src/data/quiz.types';

/** Pages statiques : une fiche par thème et une page de corrigé par quiz passé. */
function prerenderRoutes(): Promise<string[]> {
  const dates = archiveDates(toIsoDate(new Date()));
  return Promise.resolve([
    '/',
    '/a-propos',
    ...THEME_SLUGS.flatMap((theme) => [
      `/themes/${theme}`,
      ...dates.map((date) => `/quiz/${theme}/${date}`),
    ]),
  ]);
}

// https://vitejs.dev/config/
export default defineConfig(() => ({
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
      exclude: ['src/**/*.spec.ts', 'src/app/pages/**'],
      thresholds: { lines: 80, functions: 80, branches: 70, statements: 80 },
    },
  },
}));
