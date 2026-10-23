import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  afterNextRender,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { authErrorMessage } from '@app/core/auth/auth-errors';
import { AuthService } from '@app/core/auth/auth.service';
import { Interactive } from '@app/core/runtime/interactive.service';

export type AuthMode = 'login' | 'signup';

const MIN_PASSWORD_LENGTH = 8;
const EMAIL_PATTERN = /^\S+@\S+\.\S+$/;

@Component({
  selector: 'app-auth-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <h1>{{ isSignup() ? 'Créer un compte' : 'Se connecter' }}</h1>

    @if (auth.isSignedIn()) {
      <p>
        Vous êtes connecté avec <strong>{{ auth.user()?.email }}</strong
        >. Vos résultats sont sauvegardés sur votre compte.
      </p>
      <p><a routerLink="/" class="btn">Retour à l’accueil</a></p>
    } @else {
      <p class="lead">
        {{
          isSignup()
            ? 'Un compte sauvegarde vos résultats et votre série de jours, sur tous vos appareils. Il reste facultatif.'
            : 'Retrouvez vos résultats et votre série de jours sur cet appareil.'
        }}
      </p>

      <form (submit)="submit($event)" novalidate [attr.aria-busy]="busy()">
        @if (formError()) {
          <p class="error" role="alert" tabindex="-1" data-focus="form-error">
            <span aria-hidden="true">✗</span> {{ formError() }}
          </p>
        }

        <div class="field">
          <label for="email">Adresse e-mail</label>
          <input
            id="email"
            name="email"
            type="email"
            autocomplete="email"
            inputmode="email"
            required
            [value]="email()"
            (input)="email.set(valueOf($event))"
            [attr.aria-invalid]="emailError() ? 'true' : null"
            [attr.aria-describedby]="emailError() ? 'email-error' : null"
          />
          @if (emailError()) {
            <p id="email-error" class="field__error">
              <span aria-hidden="true">✗</span> {{ emailError() }}
            </p>
          }
        </div>

        <div class="field">
          <label for="password">Mot de passe</label>
          @if (isSignup()) {
            <p id="password-hint" class="field__hint">
              Au moins {{ minPasswordLength }} caractères.
            </p>
          }
          <input
            id="password"
            name="password"
            [type]="showPassword() ? 'text' : 'password'"
            [attr.autocomplete]="isSignup() ? 'new-password' : 'current-password'"
            required
            [value]="password()"
            (input)="password.set(valueOf($event))"
            [attr.aria-invalid]="passwordError() ? 'true' : null"
            [attr.aria-describedby]="passwordDescribedBy()"
          />
          @if (passwordError()) {
            <p id="password-error" class="field__error">
              <span aria-hidden="true">✗</span> {{ passwordError() }}
            </p>
          }
          <label class="checkbox">
            <input
              type="checkbox"
              [attr.disabled]="interactive.ready() ? null : ''"
              [checked]="showPassword()"
              (change)="showPassword.set(!showPassword())"
            />
            Afficher le mot de passe
          </label>
        </div>

        <button
          type="submit"
          class="btn"
          [attr.disabled]="busy() || !interactive.ready() ? '' : null"
        >
          {{ busy() ? 'Veuillez patienter…' : isSignup() ? 'Créer mon compte' : 'Me connecter' }}
        </button>

        @if (!isSignup()) {
          <p class="form-extra">
            <button type="button" class="link-button" (click)="forgotPassword()">
              Mot de passe oublié ?
            </button>
          </p>
        }
        <p role="status" class="form-info">{{ info() }}</p>
      </form>

      <p>
        @if (isSignup()) {
          Déjà un compte ? <a routerLink="/connexion">Se connecter</a>
        } @else {
          Pas encore de compte ? <a routerLink="/inscription">Créer un compte</a>
        }
      </p>
    }
  `,
})
export class AuthFormComponent {
  readonly mode = input.required<AuthMode>();

  protected readonly auth = inject(AuthService);
  protected readonly interactive = inject(Interactive);
  private readonly router = inject(Router);
  private readonly document = inject(DOCUMENT);
  private readonly injector = inject(Injector);

  protected readonly minPasswordLength = MIN_PASSWORD_LENGTH;
  protected readonly isSignup = computed(() => this.mode() === 'signup');

  protected readonly email = signal('');
  protected readonly password = signal('');
  protected readonly showPassword = signal(false);
  protected readonly busy = signal(false);
  protected readonly emailError = signal('');
  protected readonly passwordError = signal('');
  protected readonly formError = signal('');
  protected readonly info = signal('');

  protected readonly passwordDescribedBy = computed(() => {
    const ids = [
      this.isSignup() ? 'password-hint' : '',
      this.passwordError() ? 'password-error' : '',
    ];
    return ids.filter(Boolean).join(' ') || null;
  });

  protected valueOf(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  protected async submit(event: Event): Promise<void> {
    event.preventDefault();
    this.info.set('');
    this.formError.set('');
    if (!this.validate(true)) return;

    this.busy.set(true);
    try {
      const email = this.email().trim();
      if (this.isSignup()) await this.auth.signUp(email, this.password());
      else await this.auth.signIn(email, this.password());
      await this.router.navigateByUrl('/');
    } catch (error) {
      this.formError.set(authErrorMessage(error));
      this.focus('[data-focus="form-error"]');
    } finally {
      this.busy.set(false);
    }
  }

  protected async forgotPassword(): Promise<void> {
    this.formError.set('');
    this.info.set('');
    if (!EMAIL_PATTERN.test(this.email().trim())) {
      this.emailError.set(
        'Saisissez votre adresse e-mail pour recevoir le lien de réinitialisation.',
      );
      this.focus('#email');
      return;
    }
    this.emailError.set('');
    try {
      await this.auth.resetPassword(this.email().trim());
    } catch {
      // Même message dans tous les cas : on ne révèle pas si l'adresse est inscrite.
    }
    this.info.set(
      'Si un compte existe pour cette adresse, un e-mail de réinitialisation vient d’être envoyé.',
    );
  }

  private validate(moveFocus: boolean): boolean {
    const emailError = EMAIL_PATTERN.test(this.email().trim())
      ? ''
      : 'Saisissez une adresse e-mail valide, par exemple nom@exemple.fr.';
    const passwordError = this.passwordProblem();
    this.emailError.set(emailError);
    this.passwordError.set(passwordError);
    if (moveFocus && emailError) this.focus('#email');
    else if (moveFocus && passwordError) this.focus('#password');
    return !emailError && !passwordError;
  }

  private passwordProblem(): string {
    if (this.password() === '') return 'Saisissez votre mot de passe.';
    if (this.isSignup() && this.password().length < MIN_PASSWORD_LENGTH) {
      return `Le mot de passe doit contenir au moins ${MIN_PASSWORD_LENGTH} caractères.`;
    }
    return '';
  }

  private focus(selector: string): void {
    afterNextRender(
      () => {
        this.document.querySelector<HTMLElement>(selector)?.focus();
      },
      { injector: this.injector },
    );
  }
}
