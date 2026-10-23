import { AxeBuilder } from '@axe-core/playwright';
import { type Page } from '@playwright/test';

import { expect, test } from './fixtures';

const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];
const PASSWORD = 'mot-de-passe-solide-42';

function uniqueEmail(): string {
  return `joueur-${Date.now()}-${Math.floor(Math.random() * 1e6)}@example.test`;
}

async function expectNoAxeViolations(page: Page): Promise<void> {
  const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();
  expect(results.violations).toEqual([]);
}

async function playOneQuiz(page: Page, theme: string): Promise<void> {
  await page.goto(`/quiz/${theme}`);
  for (let question = 1; question <= 5; question += 1) {
    // Attendre le rendu de la question : `check()` ne fait rien si l'ancienne radio est encore cochée.
    await expect(page.getByText(`Question ${question} sur 5`)).toBeVisible();
    await page.getByRole('radio').first().check();
    await page.getByRole('button', { name: 'Valider ma réponse' }).click();
    await page
      .getByRole('button', { name: question === 5 ? 'Voir mon score' : 'Question suivante' })
      .click();
  }
  await expect(page.getByRole('heading', { level: 2, name: /Votre score/ })).toBeVisible();
}

async function signUp(page: Page, email: string): Promise<void> {
  await page.goto('/inscription');
  await page.getByLabel('Adresse e-mail').fill(email);
  await page.getByLabel('Mot de passe', { exact: true }).fill(PASSWORD);
  await page.getByRole('button', { name: 'Créer mon compte' }).click();
  // La toute première création de compte auprès d'un émulateur froid peut être lente.
  await expect(page.getByRole('button', { name: 'Se déconnecter' })).toBeVisible({
    timeout: 25_000,
  });
}

test.describe('compte', () => {
  test('les formulaires n’ont aucune violation axe', async ({ page }) => {
    for (const route of ['/connexion', '/inscription']) {
      await page.goto(route);
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      await expectNoAxeViolations(page);
    }
  });

  test('les erreurs de saisie sont annoncées et le focus va au premier champ en erreur', async ({
    page,
  }) => {
    await page.goto('/inscription');
    await page.getByRole('button', { name: 'Créer mon compte' }).click();

    const email = page.getByLabel('Adresse e-mail');
    await expect(email).toBeFocused();
    await expect(email).toHaveAttribute('aria-invalid', 'true');
    await expect(page.locator('#email-error')).toContainText('adresse e-mail valide');
    await expectNoAxeViolations(page);

    await email.fill('a@b.fr');
    await page.getByLabel('Mot de passe', { exact: true }).fill('court');
    await page.getByRole('button', { name: 'Créer mon compte' }).click();
    await expect(page.locator('#password-error')).toContainText('au moins 8 caractères');
    await expect(page.getByLabel('Mot de passe', { exact: true })).toBeFocused();
  });

  test('on peut afficher le mot de passe', async ({ page }) => {
    await page.goto('/connexion');
    const password = page.getByLabel('Mot de passe', { exact: true });
    await expect(password).toHaveAttribute('type', 'password');
    await page.getByLabel('Afficher le mot de passe').check();
    await expect(password).toHaveAttribute('type', 'text');
  });

  test('un mauvais mot de passe donne un message qui ne révèle rien', async ({ page }) => {
    await page.goto('/connexion');
    await page.getByLabel('Adresse e-mail').fill(uniqueEmail());
    await page.getByLabel('Mot de passe', { exact: true }).fill(PASSWORD);
    await page.getByRole('button', { name: 'Me connecter' }).click();
    const alert = page.getByRole('alert');
    await expect(alert).toContainText('E-mail ou mot de passe incorrect.');
    await expect(alert).toBeFocused();
  });

  test('la progression suit le compte : inscription, partie, déconnexion, reconnexion', async ({
    page,
  }) => {
    const email = uniqueEmail();
    await signUp(page, email);
    await expect(page.locator('.account__email')).toHaveText(email);

    await playOneQuiz(page, 'web');

    await page.getByRole('button', { name: 'Se déconnecter' }).click();
    await expect(page.getByRole('link', { name: 'Se connecter' })).toBeVisible();
    await expect(page.locator('main')).toBeFocused();

    // Déconnecté : l'appareil est vidé de la progression.
    await page.goto('/');
    await expect(page.getByText(/Terminé : \d sur 5/)).toHaveCount(0);

    await page.goto('/connexion');
    await page.getByLabel('Adresse e-mail').fill(email);
    await page.getByLabel('Mot de passe', { exact: true }).fill(PASSWORD);
    await page.getByRole('button', { name: 'Me connecter' }).click();
    await expect(page.getByRole('button', { name: 'Se déconnecter' })).toBeVisible();

    await expect(page.getByText(/Terminé : \d sur 5/)).toBeVisible();
    await expect(page.getByText('Série en cours')).toBeVisible();
  });

  test('les pages de compte ne sont pas indexables', async ({ page }) => {
    await page.goto('/connexion');
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
  });
});

test.describe('avant l’hydratation (sans JavaScript)', () => {
  test.use({ javaScriptEnabled: false });

  test('le bouton d’envoi est désactivé : aucun mot de passe ne peut partir dans l’adresse', async ({
    page,
  }) => {
    await page.goto('/connexion');
    const submit = page.getByRole('button', { name: 'Me connecter' });
    await expect(submit).toBeDisabled();

    await page.getByLabel('Adresse e-mail').fill('joueur@example.test');
    await page.getByLabel('Mot de passe', { exact: true }).fill(PASSWORD);
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/\/connexion$/);
  });
});
