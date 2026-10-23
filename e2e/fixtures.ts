import { test as base, expect } from '@playwright/test';

declare global {
  interface Window {
    __cspViolations?: string[];
  }
}

/**
 * Tous les tests échouent sur :
 * - une erreur JavaScript non capturée (sans cela, une application cassée peut passer en retombant sur un affichage dégradé) ;
 * - une violation de la Content-Security-Policy : une ressource bloquée est un bug, jamais un détail.
 */
export const test = base.extend({
  page: async ({ page }, use) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => {
      errors.push(error.message);
    });
    await page.addInitScript(() => {
      window.__cspViolations = [];
      document.addEventListener('securitypolicyviolation', (event) => {
        window.__cspViolations?.push(`${event.violatedDirective} ${event.blockedURI}`);
      });
    });

    await use(page);

    const violations = await page.evaluate(() => window.__cspViolations ?? []).catch(() => []);
    expect(errors, 'erreurs JavaScript non capturées').toEqual([]);
    expect(violations, 'violations de la Content-Security-Policy').toEqual([]);
  },
});

export { expect };
