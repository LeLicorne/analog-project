import { provideLocationMocks } from '@angular/common/testing';
import { signal } from '@angular/core';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import type { Mock } from 'vitest';

import { AuthFormComponent, type AuthMode } from './auth-form.component';

import { AuthService } from '@app/core/auth/auth.service';

const authFake = {
  isSignedIn: signal(false),
  user: signal<{ uid: string; email: string | null } | null>(null),
  signIn: vi.fn<(email: string, password: string) => Promise<void>>(),
  signUp: vi.fn<(email: string, password: string) => Promise<void>>(),
  resetPassword: vi.fn<(email: string) => Promise<void>>(),
};

async function render(
  mode: AuthMode,
): Promise<{ fixture: ComponentFixture<AuthFormComponent>; root: HTMLElement; navigate: Mock }> {
  const fixture = TestBed.createComponent(AuthFormComponent);
  fixture.componentRef.setInput('mode', mode);
  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();
  const navigate = vi.spyOn(TestBed.inject(Router), 'navigateByUrl').mockResolvedValue(true);
  return { fixture, root: fixture.nativeElement as HTMLElement, navigate };
}

function type(fixture: ComponentFixture<AuthFormComponent>, selector: string, value: string): void {
  const input = (fixture.nativeElement as HTMLElement).querySelector<HTMLInputElement>(selector);
  if (!input) throw new Error(selector);
  input.value = value;
  input.dispatchEvent(new Event('input'));
  fixture.detectChanges();
}

async function submit(fixture: ComponentFixture<AuthFormComponent>): Promise<void> {
  (fixture.nativeElement as HTMLElement)
    .querySelector('form')
    ?.dispatchEvent(new Event('submit', { cancelable: true }));
  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();
}

describe('AuthFormComponent', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    authFake.isSignedIn.set(false);
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        provideLocationMocks(),
        { provide: AuthService, useValue: authFake },
      ],
    });
  });

  it('adapte le titre, l’autocomplétion et l’aide au mode', async () => {
    const login = await render('login');
    expect(login.root.querySelector('h1')?.textContent).toBe('Se connecter');
    expect(login.root.querySelector('#password')?.getAttribute('autocomplete')).toBe(
      'current-password',
    );
    expect(login.root.querySelector('#password-hint')).toBeNull();

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        provideLocationMocks(),
        { provide: AuthService, useValue: authFake },
      ],
    });
    const signup = await render('signup');
    expect(signup.root.querySelector('h1')?.textContent).toBe('Créer un compte');
    expect(signup.root.querySelector('#password')?.getAttribute('autocomplete')).toBe(
      'new-password',
    );
    expect(signup.root.querySelector('#password-hint')?.textContent).toContain('8 caractères');
    expect(signup.root.querySelector('#password')?.getAttribute('aria-describedby')).toBe(
      'password-hint',
    );
  });

  it('signale un e-mail invalide, relie l’erreur au champ et n’appelle pas le service', async () => {
    const { fixture, root } = await render('login');
    type(fixture, '#email', 'pas-un-email');
    type(fixture, '#password', 'secret');
    await submit(fixture);

    expect(root.querySelector('#email')?.getAttribute('aria-invalid')).toBe('true');
    expect(root.querySelector('#email')?.getAttribute('aria-describedby')).toBe('email-error');
    expect(root.querySelector('#email-error')?.textContent).toContain('adresse e-mail valide');
    expect(authFake.signIn).not.toHaveBeenCalled();
  });

  it('exige un mot de passe, et 8 caractères à l’inscription seulement', async () => {
    const login = await render('login');
    type(login.fixture, '#email', 'a@b.fr');
    await submit(login.fixture);
    expect(login.root.querySelector('#password-error')?.textContent).toContain(
      'Saisissez votre mot de passe',
    );

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        provideLocationMocks(),
        { provide: AuthService, useValue: authFake },
      ],
    });
    const signup = await render('signup');
    type(signup.fixture, '#email', 'a@b.fr');
    type(signup.fixture, '#password', 'court');
    await submit(signup.fixture);
    expect(signup.root.querySelector('#password-error')?.textContent).toContain(
      'au moins 8 caractères',
    );
    expect(authFake.signUp).not.toHaveBeenCalled();
  });

  it('connecte avec l’e-mail nettoyé puis revient à l’accueil', async () => {
    authFake.signIn.mockResolvedValue(undefined);
    const { fixture, navigate } = await render('login');
    type(fixture, '#email', '  joueur@exemple.fr  ');
    type(fixture, '#password', 'mot-de-passe');
    await submit(fixture);
    expect(authFake.signIn).toHaveBeenCalledWith('joueur@exemple.fr', 'mot-de-passe');
    expect(navigate).toHaveBeenCalledWith('/');
  });

  it('crée un compte avec un mot de passe valide', async () => {
    authFake.signUp.mockResolvedValue(undefined);
    const { fixture } = await render('signup');
    type(fixture, '#email', 'nouveau@exemple.fr');
    type(fixture, '#password', 'assez-long-1');
    await submit(fixture);
    expect(authFake.signUp).toHaveBeenCalledWith('nouveau@exemple.fr', 'assez-long-1');
  });

  it('annonce l’échec avec un message qui ne révèle rien et reste sur la page', async () => {
    authFake.signIn.mockRejectedValue({ code: 'auth/user-not-found' });
    const { fixture, root, navigate } = await render('login');
    type(fixture, '#email', 'inconnu@exemple.fr');
    type(fixture, '#password', 'mot-de-passe');
    await submit(fixture);
    const alert = root.querySelector('[role="alert"]');
    expect(alert?.textContent).toContain('E-mail ou mot de passe incorrect.');
    expect(navigate).not.toHaveBeenCalled();
  });

  it('affiche ou masque le mot de passe', async () => {
    const { fixture, root } = await render('login');
    expect(root.querySelector('#password')?.getAttribute('type')).toBe('password');
    const toggle = root.querySelector<HTMLInputElement>('input[type="checkbox"]');
    toggle?.click();
    fixture.detectChanges();
    expect(root.querySelector('#password')?.getAttribute('type')).toBe('text');
  });

  it('mot de passe oublié : exige un e-mail, puis répond toujours la même chose', async () => {
    authFake.resetPassword.mockRejectedValue({ code: 'auth/user-not-found' });
    const { fixture, root } = await render('login');
    const forgot = (): void => {
      [...root.querySelectorAll('button')].find((b) => b.textContent.includes('oublié'))?.click();
    };

    forgot();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(root.querySelector('#email-error')?.textContent).toContain(
      'Saisissez votre adresse e-mail',
    );
    expect(authFake.resetPassword).not.toHaveBeenCalled();

    type(fixture, '#email', 'a@b.fr');
    forgot();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(authFake.resetPassword).toHaveBeenCalledWith('a@b.fr');
    expect(root.querySelector('.form-info')?.textContent).toContain('Si un compte existe');
  });

  it('propose le retour à l’accueil quand on est déjà connecté', async () => {
    authFake.isSignedIn.set(true);
    authFake.user.set({ uid: 'u', email: 'moi@exemple.fr' });
    const { root } = await render('login');
    expect(root.querySelector('form')).toBeNull();
    expect(root.textContent).toContain('moi@exemple.fr');
  });
});
