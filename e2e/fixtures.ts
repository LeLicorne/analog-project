import { test as base, expect } from '@playwright/test';

/**
 * Tous les tests échouent sur une erreur JavaScript non capturée dans la page :
 * sans cela, une application cassée peut passer les tests en retombant silencieusement sur un affichage dégradé.
 */
export const test = base.extend({
  page: async ({ page }, use) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => {
      errors.push(error.message);
    });
    await use(page);
    expect(errors, 'erreurs JavaScript non capturées').toEqual([]);
  },
});

export { expect };
