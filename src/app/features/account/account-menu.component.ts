import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { AuthService } from '@app/core/auth/auth.service';

@Component({
  selector: 'app-account-menu',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <nav aria-label="Compte" class="account">
      @if (auth.isSignedIn()) {
        <span class="account__email">{{ auth.user()?.email }}</span>
        <button type="button" class="btn btn--small btn--secondary" (click)="logout()">
          Se déconnecter
        </button>
      } @else {
        <a routerLink="/connexion">Se connecter</a>
        <a routerLink="/inscription">Créer un compte</a>
      }
    </nav>
  `,
})
export class AccountMenuComponent {
  protected readonly auth = inject(AuthService);
  private readonly document = inject(DOCUMENT);

  protected async logout(): Promise<void> {
    await this.auth.signOut();
    // Le bouton disparaît : sans cela le focus clavier serait perdu.
    this.document.getElementById('main')?.focus();
  }
}
