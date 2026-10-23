import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { PwaService } from '@app/core/pwa/pwa.service';

/** Zone d'annonces de l'application : hors ligne et mise à jour. La région existe toujours pour que les changements soient annoncés. */
@Component({
  selector: 'app-pwa-banner',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="banners" role="status" aria-live="polite">
      @if (!pwa.online()) {
        <p class="banner banner--offline">
          Vous êtes hors ligne. Les quiz déjà ouverts restent jouables et vos résultats seront
          sauvegardés au retour du réseau.
        </p>
      }
      @if (pwa.updateAvailable()) {
        <p class="banner">
          Une nouvelle version est disponible.
          <button type="button" class="btn btn--small" (click)="pwa.applyUpdate()">
            Recharger
          </button>
        </p>
      }
    </div>
  `,
})
export class PwaBannerComponent {
  protected readonly pwa = inject(PwaService);
}
