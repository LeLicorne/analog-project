import { AxeBuilder } from '@axe-core/playwright';
import { type Page } from '@playwright/test';

import { expect, test } from './fixtures';

const THEMES = ['culture-generale', 'histoire', 'geographie', 'sciences', 'web', 'gaming'];

interface Manifest {
  name: string;
  short_name: string;
  start_url: string;
  scope: string;
  display: string;
  lang: string;
  theme_color: string;
  background_color: string;
  icons: { src: string; sizes: string; type: string; purpose?: string }[];
  shortcuts: { name: string; url: string }[];
}

async function waitForPrefetch(page: Page): Promise<void> {
  await expect
    .poll(
      () =>
        page.evaluate(() =>
          Object.keys(localStorage).some((key) => key.startsWith('quizz-du-jour:prefetch:')),
        ),
      { timeout: 30_000, message: 'les quiz du jour doivent être préchargés' },
    )
    .toBe(true);
}

test.describe('application installable', () => {
  test('le manifeste est complet et ses icônes existent', async ({ request, page }) => {
    await page.goto('/');
    await expect(page.locator('link[rel="manifest"]')).toHaveAttribute(
      'href',
      '/manifest.webmanifest',
    );
    await expect(page.locator('link[rel="apple-touch-icon"]')).toHaveCount(1);

    const response = await request.get('/manifest.webmanifest');
    expect(response.status()).toBe(200);
    const manifest = (await response.json()) as Manifest;

    expect(manifest.name).toBe('Quizz du jour');
    expect(manifest.display).toBe('standalone');
    expect(manifest.lang).toBe('fr');
    expect(manifest.start_url.startsWith('/')).toBe(true);
    expect(manifest.scope).toBe('/');
    expect(manifest.theme_color).toMatch(/^#[0-9a-f]{6}$/i);
    expect(manifest.background_color).toMatch(/^#[0-9a-f]{6}$/i);

    const sizes = manifest.icons.map((icon) => icon.sizes);
    expect(sizes).toContain('192x192');
    expect(sizes).toContain('512x512');
    expect(manifest.icons.some((icon) => icon.purpose === 'maskable')).toBe(true);
    for (const icon of manifest.icons) {
      const iconResponse = await request.get(icon.src);
      expect(iconResponse.status(), icon.src).toBe(200);
      expect(iconResponse.headers()['content-type']).toContain('image/png');
    }
  });

  test('un raccourci par thème, vers un quiz qui existe', async ({ request }) => {
    const manifest = (await (await request.get('/manifest.webmanifest')).json()) as Manifest;
    expect(manifest.shortcuts.map((shortcut) => shortcut.url)).toEqual(
      THEMES.map((theme) => `/quiz/${theme}`),
    );
    for (const shortcut of manifest.shortcuts) {
      expect((await request.get(shortcut.url)).status(), shortcut.url).toBe(200);
    }
  });

  test('le service worker est revalidé à chaque visite et protégé par la CSP', async ({
    request,
  }) => {
    const response = await request.get('/sw.js');
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('javascript');
    expect(response.headers()['cache-control']).toBe('no-cache');
    expect(response.headers()['content-security-policy']).toContain("script-src 'self'");
  });

  test('la page hors ligne est accessible', async ({ page }) => {
    await page.goto('/offline.html');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Vous êtes hors ligne');
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex');
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze();
    expect(results.violations).toEqual([]);
  });
});

test.describe('hors ligne', () => {
  test.use({ serviceWorkers: 'allow' });

  test('le quiz du jour se joue sans réseau et les autres pages affichent la page hors ligne', async ({
    page,
    context,
  }) => {
    await page.goto('/');
    await page.evaluate(() => navigator.serviceWorker.ready.then(() => true));
    await waitForPrefetch(page);

    const cachedPages = await page.evaluate(async () => {
      const cache = await caches.open('quizz-pages-v1');
      return (await cache.keys()).map((request) => new URL(request.url).pathname);
    });
    expect(cachedPages).toEqual(
      expect.arrayContaining(['/', ...THEMES.map((theme) => `/quiz/${theme}`)]),
    );

    await context.setOffline(true);
    await page.goto('/quiz/web');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Quiz Web & code du jour');
    await expect(page.getByRole('status').filter({ hasText: 'hors ligne' })).toBeVisible();

    for (let question = 1; question <= 5; question += 1) {
      await expect(page.getByText(`Question ${question} sur 5`)).toBeVisible();
      await page.getByRole('radio').first().check();
      await page.getByRole('button', { name: 'Valider ma réponse' }).click();
      await page
        .getByRole('button', { name: question === 5 ? 'Voir mon score' : 'Question suivante' })
        .click();
    }
    await expect(
      page.getByRole('heading', { level: 2, name: /Votre score : \d sur 5/ }),
    ).toBeVisible();

    await page.goto('/une-page-jamais-visitee');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Vous êtes hors ligne');

    await context.setOffline(false);
    await page.goto('/');
    await expect(page.getByText(/Terminé : \d sur 5/)).toBeVisible();
    await expect(page.getByRole('status').filter({ hasText: 'hors ligne' })).toHaveCount(0);
  });
});
