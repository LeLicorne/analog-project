import { expect, test } from './fixtures';

const ROUTES = ['/', '/quiz/histoire', '/themes/histoire', '/connexion', '/nimporte/quoi'];

test.describe('en-têtes de sécurité', () => {
  for (const route of ROUTES) {
    test(`${route} : CSP stricte et en-têtes de protection`, async ({ request }) => {
      const response = await request.get(route);
      const headers = response.headers();
      const csp = headers['content-security-policy'] ?? '';

      expect(csp).toContain("script-src 'self'");
      expect(csp).toContain("object-src 'none'");
      expect(csp).toContain("frame-ancestors 'none'");
      expect(csp).toContain("base-uri 'self'");
      expect(csp).toContain("form-action 'self'");
      expect(csp).not.toContain("'unsafe-inline'");
      expect(csp).not.toContain("'unsafe-eval'");

      expect(headers['x-content-type-options']).toBe('nosniff');
      expect(headers['x-frame-options']).toBe('DENY');
      expect(headers['referrer-policy']).toBe('strict-origin-when-cross-origin');
      expect(headers['permissions-policy']).toContain('camera=()');
      expect(headers['cross-origin-opener-policy']).toBe('same-origin');
    });
  }

  test('les fichiers statiques portent aussi la CSP et un cache immuable', async ({
    request,
    page,
  }) => {
    await page.goto('/');
    const asset = await page.locator('link[rel="stylesheet"]').first().getAttribute('href');
    const response = await request.get(asset ?? '/');
    expect(response.headers()['content-security-policy']).toContain("script-src 'self'");
    expect(response.headers()['cache-control']).toContain('immutable');
  });

  test('aucun cookie n’est posé : pas de session côté serveur, donc pas de CSRF', async ({
    request,
  }) => {
    for (const route of ROUTES) {
      const response = await request.get(route);
      expect(response.headers()['set-cookie'], route).toBeUndefined();
    }
  });

  test('le HSTS n’est pas envoyé en http (il bloquerait localhost)', async ({ request }) => {
    const response = await request.get('/');
    expect(response.headers()['strict-transport-security']).toBeUndefined();
  });
});

test.describe('méthodes HTTP', () => {
  for (const method of ['POST', 'PUT', 'PATCH', 'DELETE'] as const) {
    test(`${method} est refusé avec 405`, async ({ request }) => {
      const response = await request.fetch('/', { method });
      expect(response.status()).toBe(405);
      expect(response.headers()['allow']).toContain('GET');
    });
  }

  test('GET et HEAD restent autorisés', async ({ request }) => {
    expect((await request.get('/')).status()).toBe(200);
    expect((await request.head('/')).status()).toBe(200);
  });
});

test.describe('XSS', () => {
  const PAYLOADS = [
    '<script>alert(1)</script>',
    '"><img src=x onerror=alert(1)>',
    "'-alert(1)-'",
    '{{constructor.constructor("alert(1)")()}}',
  ];

  for (const payload of PAYLOADS) {
    test(`une adresse piégée n’est jamais recopiée dans la page : ${payload.slice(0, 24)}`, async ({
      request,
    }) => {
      for (const prefix of ['/quiz/', '/themes/', '/quiz/histoire/']) {
        const response = await request.get(prefix + encodeURIComponent(payload));
        expect([400, 404]).toContain(response.status());
        const body = await response.text();
        expect(body).not.toContain(payload);
        expect(body).not.toContain('<img src=x');
      }
    });
  }

  test('une adresse piégée n’exécute rien dans le navigateur', async ({ page }) => {
    let dialog = false;
    page.on('dialog', async (event) => {
      dialog = true;
      await event.dismiss();
    });
    await page.goto('/quiz/' + encodeURIComponent('<img src=x onerror=alert(1)>'));
    await page.goto('/themes/' + encodeURIComponent('"><script>alert(1)</script>'));
    expect(dialog).toBe(false);
  });
});

test.describe('connexions sortantes', () => {
  test('un parcours complet avec compte ne contacte que le site et les services Firebase prévus', async ({
    page,
  }) => {
    const hosts = new Set<string>();
    page.on('request', (request) => {
      const url = new URL(request.url());
      if (url.protocol === 'http:' || url.protocol === 'https:') hosts.add(url.host);
    });

    await page.goto('/inscription');
    await page.getByLabel('Adresse e-mail').fill(`secu-${Date.now()}@example.test`);
    await page.getByLabel('Mot de passe', { exact: true }).fill('mot-de-passe-solide-42');
    await page.getByRole('button', { name: 'Créer mon compte' }).click();
    await expect(page.getByRole('button', { name: 'Se déconnecter' })).toBeVisible({
      timeout: 25_000,
    });

    await page.goto('/quiz/web');
    for (let question = 1; question <= 5; question += 1) {
      await expect(page.getByText(`Question ${question} sur 5`)).toBeVisible();
      await page.getByRole('radio').first().check();
      await page.getByRole('button', { name: 'Valider ma réponse' }).click();
      await page
        .getByRole('button', { name: question === 5 ? 'Voir mon score' : 'Question suivante' })
        .click();
    }
    await expect(page.getByRole('heading', { level: 2, name: /Votre score/ })).toBeVisible();

    // Build de test : le site (4173) et les émulateurs Firebase locaux (Auth 9099, Firestore 8080), rien d'autre.
    const allowed = new Set([
      'localhost:4173',
      'localhost:9099',
      'localhost:8080',
      '127.0.0.1:9099',
      '127.0.0.1:8080',
    ]);
    expect([...hosts].filter((host) => !allowed.has(host))).toEqual([]);
  });
});
