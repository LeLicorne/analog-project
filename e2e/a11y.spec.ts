import { AxeBuilder } from '@axe-core/playwright';

import { expect, test } from './fixtures';

const ROUTES = [
  '/',
  '/themes/histoire',
  '/quiz/histoire',
  '/a-propos',
  '/accessibilite',
  '/plan-du-site',
];

for (const route of ROUTES) {
  test(`${route} n'a aucune violation axe (WCAG 2.2 AA)`, async ({ page }) => {
    await page.goto(route);
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze();
    expect(results.violations).toEqual([]);
  });
}
