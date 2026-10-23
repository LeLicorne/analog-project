import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { AuthService } from '@app/core/auth/auth.service';
import { CloudSyncService } from '@app/core/sync/cloud-sync.service';

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
        @if (logoutError()) {
          <p class="account__error" role="alert">{{ logoutError() }}</p>
        }
      } @else {
        <a routerLink="/connexion">Se connecter</a>
        <a routerLink="/inscription">Créer un compte</a>
      }
    </nav>
  `,
})
export class AccountMenuComponent {
  protected readonly auth = inject(AuthService);
  protected readonly logoutError = signal('');
  private readonly sync = inject(CloudSyncService);
  private readonly document = inject(DOCUMENT);

  protected async logout(): Promise<void> {
    this.logoutError.set('');
    // Les résultats non sauvegardés seraient perdus avec la déconnexion : on attend, ou on refuse.
    if (!(await this.sync.flush())) {
      this.logoutError.set(
        'Vos derniers résultats n’ont pas pu être sauvegardés. Vérifiez votre connexion avant de vous déconnecter.',
      );
      return;
    }
    await this.auth.signOut();
    // Le bouton disparaît : sans cela le focus clavier serait perdu.
    this.document.getElementById('main')?.focus();
  }
}
