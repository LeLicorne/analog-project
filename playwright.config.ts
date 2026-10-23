import { defineConfig, devices } from '@playwright/test';

const PORT = 4173;
const isCI = !!process.env['CI'];

export default defineConfig({
  testDir: 'e2e',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: { baseURL: `http://localhost:${PORT}`, trace: 'on-first-retry' },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
  ],
  webServer: [
    {
      // Les tests de compte tournent sur les émulateurs : aucun compte n'est créé dans le vrai projet Firebase.
      command: 'bunx firebase emulators:start --only auth,firestore --project demo-quizz-du-jour',
      url: 'http://127.0.0.1:4000',
      reuseExistingServer: !isCI,
      timeout: 120_000,
      gracefulShutdown: { signal: 'SIGTERM', timeout: 15_000 },
    },
    {
      command: `VITE_USE_FIREBASE_EMULATORS=true bun run build && PORT=${PORT} bun run preview`,
      url: `http://localhost:${PORT}`,
      reuseExistingServer: !isCI,
      timeout: 180_000,
    },
  ],
});
