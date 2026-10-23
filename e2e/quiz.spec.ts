import { AxeBuilder } from '@axe-core/playwright';
import { type Page } from '@playwright/test';

import { expect, test } from './fixtures';

const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

async function expectNoAxeViolations(page: Page): Promise<void> {
  const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();
  expect(results.violations).toEqual([]);
}

async function answerCurrentQuestion(page: Page): Promise<void> {
  await page.getByRole('radio').first().check();
  await page.getByRole('button', { name: 'Valider ma réponse' }).click();
}

test.describe('parcours du quiz du jour', () => {
  test('on joue 5 questions jusqu’au score, et le résultat persiste', async ({ page }) => {
    await page.goto('/quiz/histoire');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Quiz Histoire du jour');
    await expect(page.getByText('Question 1 sur 5')).toBeVisible();

    // Valider sans choisir : message d'erreur annoncé, pas de passage à la suite.
    await page.getByRole('button', { name: 'Valider ma réponse' }).click();
    await expect(page.getByRole('alert')).toHaveText('Choisissez une réponse avant de valider.');

    for (let question = 1; question <= 5; question += 1) {
      await expect(page.getByText(`Question ${question} sur 5`)).toBeVisible();
      await answerCurrentQuestion(page);

      // Le focus est déplacé sur le retour : indispensable pour le clavier et les lecteurs d'écran.
      const feedback = page.locator('[data-focus="feedback"]');
      await expect(feedback).toBeFocused();
      await expect(feedback.getByRole('heading', { level: 2 })).toHaveText(
        /Bonne réponse !|Mauvaise réponse/,
      );
      if (question === 1) await expectNoAxeViolations(page);

      await page
        .getByRole('button', { name: question === 5 ? 'Voir mon score' : 'Question suivante' })
        .click();
    }

    const result = page.getByRole('heading', { level: 2, name: /Votre score : \d sur 5/ });
    await expect(result).toBeVisible();
    await expect(page.locator('[data-focus="result"]')).toBeFocused();
    await expectNoAxeViolations(page);

    await page.reload();
    await expect(
      page.getByRole('heading', { level: 2, name: /Votre score : \d sur 5/ }),
    ).toBeVisible();
    await expect(page.getByText('Série en cours')).toBeVisible();

    await page.goto('/');
    await expect(page.getByText(/Terminé : \d sur 5/)).toBeVisible();
  });

  test('une adresse inconnue affiche une page introuvable accessible', async ({ page }) => {
    await page.goto('/quiz/inconnu');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Page introuvable');
    await expectNoAxeViolations(page);
  });

  test('un quiz dans le futur n’existe pas', async ({ page }) => {
    await page.goto('/quiz/histoire/2099-01-01');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Page introuvable');
  });

  test('le lien d’évitement mène au contenu principal', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');
    const skipLink = page.getByRole('link', { name: 'Aller au contenu principal' });
    await expect(skipLink).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.locator('main')).toBeFocused();
  });
});
