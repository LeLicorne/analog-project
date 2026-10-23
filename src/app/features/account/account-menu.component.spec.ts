import { provideLocationMocks } from '@angular/common/testing';
import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { AccountMenuComponent } from './account-menu.component';

import { AuthService } from '@app/core/auth/auth.service';
import { CloudSyncService } from '@app/core/sync/cloud-sync.service';

const auth = {
  isSignedIn: signal(false),
  user: signal<{ uid: string; email: string | null } | null>(null),
  signOut: vi.fn<() => Promise<void>>(),
};
const sync = { flush: vi.fn<() => Promise<boolean>>() };

function render(): {
  fixture: ReturnType<typeof TestBed.createComponent<AccountMenuComponent>>;
  root: HTMLElement;
} {
  const fixture = TestBed.createComponent(AccountMenuComponent);
  fixture.detectChanges();
  return { fixture, root: fixture.nativeElement as HTMLElement };
}

describe('AccountMenuComponent', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    auth.isSignedIn.set(false);
    auth.user.set(null);
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        provideLocationMocks(),
        { provide: AuthService, useValue: auth },
        { provide: CloudSyncService, useValue: sync },
      ],
    });
  });

  it('propose de se connecter ou de créer un compte quand on est anonyme', () => {
    const { root } = render();
    const hrefs = [...root.querySelectorAll('a')].map((link) => link.getAttribute('href'));
    expect(hrefs).toEqual(['/connexion', '/inscription']);
    expect(root.querySelector('nav')?.getAttribute('aria-label')).toBe('Compte');
  });

  it('affiche l’e-mail et le bouton de déconnexion quand on est connecté', () => {
    auth.isSignedIn.set(true);
    auth.user.set({ uid: 'u', email: 'moi@exemple.fr' });
    const { root } = render();
    expect(root.querySelector('.account__email')?.textContent).toBe('moi@exemple.fr');
    expect(root.querySelector('button')?.textContent).toContain('Se déconnecter');
  });

  it('sauvegarde avant de déconnecter, puis déconnecte', async () => {
    auth.isSignedIn.set(true);
    sync.flush.mockResolvedValue(true);
    auth.signOut.mockResolvedValue(undefined);
    const { fixture, root } = render();
    root.querySelector('button')?.click();
    await fixture.whenStable();
    expect(sync.flush).toHaveBeenCalledOnce();
    expect(auth.signOut).toHaveBeenCalledOnce();
    expect(sync.flush.mock.invocationCallOrder[0]).toBeLessThan(
      auth.signOut.mock.invocationCallOrder[0] ?? 0,
    );
  });

  it('refuse de déconnecter si la sauvegarde échoue, et l’annonce', async () => {
    auth.isSignedIn.set(true);
    sync.flush.mockResolvedValue(false);
    const { fixture, root } = render();
    root.querySelector('button')?.click();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(auth.signOut).not.toHaveBeenCalled();
    expect(root.querySelector('[role="alert"]')?.textContent).toContain(
      'n’ont pas pu être sauvegardés',
    );
  });
});
