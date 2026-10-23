import { AxeBuilder } from '@axe-core/playwright';

import { expect, test } from './fixtures';

const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];
const ROUTES = [
  '/',
  '/themes/histoire',
  '/quiz/histoire',
  '/connexion',
  '/accessibilite',
  '/plan-du-site',
];

test.describe('accessibilité : modes et préférences', () => {
  for (const route of ROUTES) {
    test(`${route} : aucune violation axe en thème sombre`, async ({ page }) => {
      await page.emulateMedia({ colorScheme: 'dark' });
      await page.goto(route);
      const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();
      expect(results.violations).toEqual([]);
    });

    test(`${route} : pas de défilement horizontal à 320 px (WCAG 1.4.10)`, async ({ page }) => {
      await page.setViewportSize({ width: 320, height: 640 });
      await page.goto(route);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow).toBeLessThanOrEqual(0);
    });

    test(`${route} : le texte reste lisible avec l’espacement WCAG 1.4.12`, async ({ page }) => {
      await page.goto(route);
      await page.addStyleTag({
        content:
          '* { line-height: 1.5 !important; letter-spacing: 0.12em !important; word-spacing: 0.16em !important; } p { margin-bottom: 2em !important; }',
      });
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow).toBeLessThanOrEqual(0);
      const clipped = await page.evaluate(
        () =>
          [...document.querySelectorAll('button, a, label, legend, h1, h2')].filter(
            (element) =>
              element.scrollWidth > element.clientWidth + 1 &&
              getComputedStyle(element).overflow !== 'visible',
          ).length,
      );
      expect(clipped).toBe(0);
    });
  }

  test('le focus clavier est toujours visible sur l’accueil', async ({ page }) => {
    await page.goto('/');
    for (let step = 0; step < 12; step += 1) {
      await page.keyboard.press('Tab');
      const visible = await page.evaluate(() => {
        const element = document.activeElement;
        if (!element || element === document.body) return true;
        const style = getComputedStyle(element);
        const parentStyle = element.closest('.card')
          ? getComputedStyle(element.closest('.card')!)
          : null;
        const own = style.outlineStyle !== 'none' && parseFloat(style.outlineWidth) >= 2;
        const viaCard =
          parentStyle !== null &&
          parentStyle.outlineStyle !== 'none' &&
          parseFloat(parentStyle.outlineWidth) >= 2;
        return own || viaCard;
      });
      expect(visible, `focus invisible à l'étape ${step + 1}`).toBe(true);
    }
  });

  test('les mouvements sont supprimés quand le système le demande', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    const transitions = await page.evaluate(
      () =>
        [...document.querySelectorAll('*')].filter((element) => {
          const duration = getComputedStyle(element).transitionDuration;
          return duration.split(',').some((value) => parseFloat(value) > 0);
        }).length,
    );
    expect(transitions).toBe(0);
  });
});
