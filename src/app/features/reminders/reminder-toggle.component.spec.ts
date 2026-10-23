import { provideLocationMocks } from '@angular/common/testing';
import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { ReminderToggleComponent } from './reminder-toggle.component';

import { AuthService } from '@app/core/auth/auth.service';
import { PushService } from '@app/core/pwa/push.service';

const push = {
  configured: true,
  supported: signal(true),
  permission: signal<NotificationPermission>('default'),
  enabled: signal(false),
  busy: signal(false),
  error: signal(''),
  testSent: signal(false),
  sendTest: vi.fn<() => Promise<void>>(),
  enable: vi.fn<() => Promise<void>>(),
  disable: vi.fn<() => Promise<void>>(),
};
const auth = { isSignedIn: signal(true) };

function render(): HTMLElement {
  const fixture = TestBed.createComponent(ReminderToggleComponent);
  fixture.detectChanges();
  return fixture.nativeElement as HTMLElement;
}

describe('ReminderToggleComponent', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    push.configured = true;
    push.supported.set(true);
    push.testSent.set(false);
    push.permission.set('default');
    push.enabled.set(false);
    push.busy.set(false);
    push.error.set('');
    auth.isSignedIn.set(true);
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        provideLocationMocks(),
        { provide: PushService, useValue: push },
        { provide: AuthService, useValue: auth },
      ],
    });
  });

  it('n’affiche rien quand le navigateur ne gère pas les notifications', () => {
    push.supported.set(false);
    expect(render().querySelector('section')).toBeNull();
  });

  it('sans configuration du rappel : seul le bouton de test est proposé', () => {
    push.configured = false;
    const root = render();
    const labels = [...root.querySelectorAll('button')].map((button) => button.textContent.trim());
    expect(labels).toEqual(['Envoyer une notification de test']);
    expect(root.textContent).not.toContain('rappel quotidien');
  });

  it('envoie une notification de test au clic et l’annonce', () => {
    const root = render();
    const test = [...root.querySelectorAll('button')].find((button) =>
      button.textContent.includes('test'),
    );
    test?.click();
    expect(push.sendTest).toHaveBeenCalledOnce();
  });

  it('annonce que la notification de test est partie', () => {
    push.testSent.set(true);
    const root = render();
    expect(root.querySelector('[role="status"]')?.textContent).toContain(
      'Notification de test envoyée',
    );
  });

  it('invite à se connecter quand on est anonyme', () => {
    auth.isSignedIn.set(false);
    const root = render();
    expect(root.querySelector('a')?.getAttribute('href')).toBe('/connexion');
    expect(root.textContent).not.toContain('Activer le rappel');
  });

  it('active le rappel au clic', () => {
    const root = render();
    const button = [...root.querySelectorAll('button')].find((candidate) =>
      candidate.textContent.includes('Activer'),
    );
    expect(button?.textContent).toContain('Activer le rappel quotidien');
    button?.click();
    expect(push.enable).toHaveBeenCalledOnce();
  });

  it('permet de désactiver un rappel actif et l’annonce', () => {
    push.enabled.set(true);
    const root = render();
    const button = [...root.querySelectorAll('button')].find((candidate) =>
      candidate.textContent.includes('Désactiver'),
    );
    expect(button?.textContent).toContain('Désactiver');
    expect(root.querySelector('[role="status"]')?.textContent).toContain('activé');
    button?.click();
    expect(push.disable).toHaveBeenCalledOnce();
  });

  it('explique comment débloquer des notifications refusées, sans bouton inutile', () => {
    push.permission.set('denied');
    const root = render();
    expect(root.textContent).toContain('bloquées');
    expect(root.textContent).not.toContain('Activer le rappel');
  });

  it('désactive le bouton pendant l’opération et annonce les erreurs', () => {
    push.busy.set(true);
    push.error.set('Le rappel n’a pas pu être activé.');
    const root = render();
    const primary = [...root.querySelectorAll('button')].find((candidate) =>
      candidate.textContent.includes('Activer'),
    );
    expect(primary?.hasAttribute('disabled')).toBe(true);
    expect(root.querySelector('[role="alert"]')?.textContent).toContain('pas pu être activé');
  });
});
