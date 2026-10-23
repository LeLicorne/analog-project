import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { AuthService } from '@app/core/auth/auth.service';
import { PushService } from '@app/core/pwa/push.service';

/**
 * Notifications : rappel quotidien (si les notifications sont configurées) et bouton de test (dès que le navigateur
 * les gère). N'affiche rien si le navigateur ne prend pas en charge les notifications.
 */
@Component({
  selector: 'app-reminder-toggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    @if (push.supported()) {
      <section class="reminders" aria-labelledby="reminders-title">
        <h2 id="reminders-title">Notifications</h2>

        @if (push.configured) {
          <p>
            Une notification par jour pour ne pas oublier votre quiz, et pour protéger votre série
            de jours. Vous pouvez la désactiver à tout moment.
          </p>
          @if (!auth.isSignedIn()) {
            <p><a routerLink="/connexion">Connectez-vous</a> pour activer le rappel quotidien.</p>
          } @else if (push.permission() === 'denied') {
            <p>
              Les notifications sont bloquées pour ce site : autorisez-les dans les réglages du
              navigateur pour activer le rappel.
            </p>
          } @else if (push.enabled()) {
            <button
              type="button"
              class="btn btn--secondary"
              [attr.disabled]="push.busy() ? '' : null"
              (click)="push.disable()"
            >
              Désactiver le rappel quotidien
            </button>
          } @else {
            <button
              type="button"
              class="btn"
              [attr.disabled]="push.busy() ? '' : null"
              (click)="push.enable()"
            >
              Activer le rappel quotidien
            </button>
          }
        }

        <p>
          Pour voir à quoi ressemble une notification sur cet appareil, envoyez-vous un message de
          test.
        </p>
        <button type="button" class="btn btn--secondary" (click)="push.sendTest()">
          Envoyer une notification de test
        </button>

        <p class="sr-only" role="status">
          {{ statusMessage() }}
        </p>
        @if (statusMessage()) {
          <p class="muted" aria-hidden="true">{{ statusMessage() }}</p>
        }
        @if (push.error()) {
          <p class="error" role="alert">{{ push.error() }}</p>
        }
      </section>
    }
  `,
})
export class ReminderToggleComponent {
  protected readonly push = inject(PushService);
  protected readonly auth = inject(AuthService);

  protected statusMessage(): string {
    if (this.push.testSent())
      return 'Notification de test envoyée : regardez le centre de notifications.';
    if (this.push.enabled()) return 'Rappel quotidien activé sur cet appareil.';
    return '';
  }
}
