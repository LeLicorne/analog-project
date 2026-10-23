/// <reference types="vitest" />

import analog from '@analogjs/platform';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(() => ({
  build: {
    target: ['es2020'],
  },
  resolve: {
    mainFields: ['module'],
  },
  plugins: [
    analog({
      content: {
        highlighter: 'shiki',
      },
      prerender: {
        routes: ['/blog', '/blog/2022-12-27-my-first-post'],
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
