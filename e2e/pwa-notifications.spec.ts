import { expect, test } from './fixtures';

// Le « headless shell » par défaut de Playwright refuse toujours la permission de notifier : le nouveau mode headless
// de Chromium (channel 'chromium') se comporte comme un vrai navigateur.
test.use({ serviceWorkers: 'allow', channel: 'chromium' });

test.describe('notifications', () => {
  test.skip(
    ({ isMobile }) => isMobile,
    'Même navigateur que le profil bureau : un seul passage suffit.',
  );

  test('une notification poussée s’affiche avec le texte, l’icône et l’adresse prévus', async ({
    page,
    context,
  }) => {
    await context.grantPermissions(['notifications']);
    await page.goto('/');
    await page.evaluate(() => navigator.serviceWorker.ready.then(() => true));

    const cdp = await context.newCDPSession(page);
    const registrationIds = new Set<string>();
    cdp.on('ServiceWorker.workerRegistrationUpdated', (event) => {
      event.registrations.forEach((registration) =>
        registrationIds.add(registration.registrationId),
      );
    });
    await cdp.send('ServiceWorker.enable');
    await expect.poll(() => registrationIds.size).toBeGreaterThan(0);

    await cdp.send('ServiceWorker.deliverPushMessage', {
      origin: new URL(page.url()).origin,
      registrationId: [...registrationIds][0] ?? '',
      data: JSON.stringify({
        data: {
          title: 'Quizz du jour',
          body: 'Ne perds pas ta série de 3 jours.',
          url: '/quiz/web',
        },
      }),
    });

    await expect
      .poll(() =>
        page.evaluate(async () => {
          const registration = await navigator.serviceWorker.ready;
          return (await registration.getNotifications()).map((notification) => ({
            title: notification.title,
            body: notification.body,
            icon: new URL(notification.icon).pathname,
            tag: notification.tag,
            lang: notification.lang,
            url: (notification.data as { url: string }).url,
          }));
        }),
      )
      .toEqual([
        {
          title: 'Quizz du jour',
          body: 'Ne perds pas ta série de 3 jours.',
          icon: '/icons/icon-192.png',
          tag: 'daily-quiz',
          lang: 'fr',
          url: '/quiz/web',
        },
      ]);
  });

  test('le bouton de test affiche une vraie notification, sans compte ni clé de notification', async ({
    page,
    context,
  }) => {
    await context.grantPermissions(['notifications']);
    await page.goto('/');
    await page.evaluate(() => navigator.serviceWorker.ready.then(() => true));
    await expect(page.getByRole('heading', { level: 2, name: 'Notifications' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Activer le rappel quotidien' })).toHaveCount(0);

    await page.getByRole('button', { name: 'Envoyer une notification de test' }).click();
    await expect(
      page.getByRole('status').filter({ hasText: 'Notification de test envoyée' }),
    ).toBeAttached();

    await expect
      .poll(() =>
        page.evaluate(async () => {
          const registration = await navigator.serviceWorker.ready;
          return (await registration.getNotifications()).map((notification) => ({
            title: notification.title,
            body: notification.body,
            tag: notification.tag,
          }));
        }),
      )
      .toEqual([
        {
          title: 'Quizz du jour',
          body: 'Notification de test : voilà à quoi ressemblera votre rappel quotidien.',
          tag: 'test-notification',
        },
      ]);
  });

  test('le rappel quotidien reste masqué tant que la clé de notification n’est pas configurée', async ({
    page,
  }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 2, name: 'Notifications' })).toBeVisible();
    await expect(page.getByText('Une notification par jour')).toHaveCount(0);
  });
});
