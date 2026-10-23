import { type Page } from '@playwright/test';

import { expect, test } from './fixtures';

interface JsonLdGraph {
  '@context': string;
  '@graph': { '@type': string }[];
}

async function readJsonLd(page: Page): Promise<JsonLdGraph[]> {
  const contents = await page.locator('script[type="application/ld+json"]').allTextContents();
  return contents.map((content) => JSON.parse(content) as JsonLdGraph);
}

test.describe('référencement', () => {
  const PAGES = [
    { path: '/', h1: 'Quizz du jour' },
    { path: '/a-propos', h1: 'À propos de Quizz du jour' },
    { path: '/accessibilite', h1: 'Accessibilité' },
    { path: '/plan-du-site', h1: 'Plan du site' },
    { path: '/themes/histoire', h1: 'Quiz Histoire' },
    { path: '/quiz/histoire', h1: 'Quiz Histoire du jour' },
  ];

  for (const { path, h1 } of PAGES) {
    test(`${path} a un head complet`, async ({ page }) => {
      await page.goto(path);
      const title = await page.title();
      expect(title.length).toBeGreaterThan(10);
      expect(title.length).toBeLessThanOrEqual(60);

      const description = await page.locator('meta[name="description"]').getAttribute('content');
      expect(description?.length).toBeGreaterThanOrEqual(70);
      expect(description?.length).toBeLessThanOrEqual(160);

      await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
      await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', title);
      await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
        'content',
        /og-image\.png$/,
      );
      await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page.locator('h1')).toContainText(h1);
      await expect(page.locator('html')).toHaveAttribute('lang', 'fr');

      const graphs = await readJsonLd(page);
      expect(graphs.length).toBeGreaterThan(0);
      for (const graph of graphs) expect(graph['@context']).toBe('https://schema.org');
    });
  }

  test('le contenu est dans le HTML reçu, sans exécuter de JavaScript', async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    for (const { path, h1 } of PAGES) {
      await page.goto(path);
      await expect(page.locator('h1')).toContainText(h1);
    }
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Questions fréquentes' })).toBeVisible();
    await expect(page.getByText('Combien de questions y a-t-il par jour ?')).toBeVisible();
    await context.close();
  });

  // Équivalent automatisé de `curl -A "GPTBot" https://site` : ce que reçoit réellement un robot IA, sans JavaScript.
  const AI_CRAWLERS: Record<string, string> = {
    GPTBot:
      'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; GPTBot/1.2; +https://openai.com/gptbot',
    'OAI-SearchBot':
      'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; OAI-SearchBot/1.0',
    ClaudeBot:
      'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; ClaudeBot/1.0; +claudebot@anthropic.com)',
    'Claude-SearchBot':
      'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; Claude-SearchBot/1.0)',
    PerplexityBot:
      'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; PerplexityBot/1.0)',
    Googlebot: 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
  };

  for (const [bot, userAgent] of Object.entries(AI_CRAWLERS)) {
    test(`${bot} reçoit du HTML complet : titre, h1 et contenu, sans exécuter de JavaScript`, async ({
      request,
    }) => {
      for (const path of ['/', '/themes/histoire', '/quiz/histoire']) {
        const response = await request.get(path, { headers: { 'User-Agent': userAgent } });
        expect(response.status(), `${bot} ${path}`).toBe(200);
        const html = await response.text();
        expect(html).toMatch(/<title>[^<]{10,}<\/title>/);
        expect(html).toMatch(/<h1[^>]*>[\s\S]*?<\/h1>/);
        expect(html).toContain('rel="canonical"');
        expect(html).toContain('application/ld+json');
        expect(html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').length).toBeGreaterThan(500);
      }
    });
  }

  test('la FAQ affichée est celle des données structurées', async ({ page }) => {
    await page.goto('/');
    const graphs = await readJsonLd(page);
    const faq = graphs
      .flatMap((graph) => graph['@graph'])
      .find((node) => node['@type'] === 'FAQPage') as unknown as {
      mainEntity: { name: string }[];
    };
    for (const entry of faq.mainEntity) {
      await expect(page.getByRole('heading', { level: 3, name: entry.name })).toBeVisible();
    }
  });

  test('les pages inexistantes renvoient un vrai 404 non indexable', async ({ request, page }) => {
    for (const path of [
      '/quiz/inconnu',
      '/themes/inconnu',
      '/quiz/histoire/2099-01-01',
      '/nimporte/quoi',
    ]) {
      const response = await request.get(path);
      expect(response.status(), path).toBe(404);
    }
    await page.goto('/nimporte/quoi');
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
  });

  test('robots.txt est un vrai fichier texte avec le sitemap', async ({ request }) => {
    const response = await request.get('/robots.txt');
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('text/plain');
    const body = await response.text();
    expect(body).toContain('Sitemap: http');
    expect(body).toContain('User-agent: OAI-SearchBot');
    expect(body).not.toContain('<html');
  });

  test('sitemap.xml liste les pages publiques et exclut les comptes', async ({ request }) => {
    const response = await request.get('/sitemap.xml');
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('xml');
    const body = await response.text();
    expect(body).toContain('/themes/histoire</loc>');
    expect(body).toContain('/quiz/histoire</loc>');
    expect(body).not.toContain('connexion');
    expect(body).not.toContain('inscription');
  });

  test('les pages de compte sont en noindex et absentes du sitemap', async ({ page }) => {
    for (const path of ['/connexion', '/inscription']) {
      await page.goto(path);
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
    }
  });

  test('chaque page indexable est atteignable par un lien interne depuis l’accueil', async ({
    page,
  }) => {
    await page.goto('/');
    const hrefs = await page
      .locator('a[href^="/"]')
      .evaluateAll((links) => links.map((link) => link.getAttribute('href')));
    expect(hrefs).toContain('/a-propos');
    expect(hrefs).toContain('/themes/histoire');
    expect(hrefs).toContain('/quiz/histoire');
  });
});
