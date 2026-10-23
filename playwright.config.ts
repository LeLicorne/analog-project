import { defineConfig, devices } from '@playwright/test';

const PORT = 4173;
const isCI = !!process.env['CI'];

export default defineConfig({
  testDir: 'e2e',
  globalSetup: './e2e/global-setup.ts',
  fullyParallel: true,
  // Le premier appel à l'émulateur Auth (chargement du SDK puis réseau) peut dépasser les 5 s par défaut.
  expect: { timeout: 10_000 },
  forbidOnly: isCI,
  retries: isCI ? 2 : 1,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    // Service workers bloqués par défaut : seul `e2e/pwa.spec.ts` les active, les autres tests restent indépendants du cache.
    serviceWorkers: 'block',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
  ],
  webServer: [
    {
      // Les tests de compte tournent sur les émulateurs : aucun compte n'est créé dans le vrai projet Firebase.
      command: 'bunx firebase emulators:start --only auth,firestore --project demo-quizz-du-jour',
      url: 'http://127.0.0.1:8080',
      reuseExistingServer: !isCI,
      timeout: 120_000,
      gracefulShutdown: { signal: 'SIGTERM', timeout: 15_000 },
    },
    {
      // Le build est fait AVANT (`bun run build:e2e`) : le lancer en même temps que les émulateurs le rend instable.
      // NODE_ENV=production est indispensable : Playwright force `test`, et Analog désactive alors le SSR.
      command: `NODE_ENV=production PORT=${PORT} bun run preview`,
      url: `http://localhost:${PORT}`,
      reuseExistingServer: !isCI,
      timeout: 180_000,
    },
  ],
});
