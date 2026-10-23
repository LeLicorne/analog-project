import type { RouteMeta } from '@analogjs/router';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { ProgressStore } from '@app/core/progress/progress.store';
import { pageTitle } from '@app/core/seo/page-title';
import { ThemeCardsComponent } from '@app/features/themes/theme-cards.component';

export const routeMeta = {
  title: pageTitle('Un quiz gratuit chaque jour'),
} satisfies RouteMeta;

@Component({
  selector: 'app-home-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ThemeCardsComponent],
  template: `
    <h1>Quizz du jour</h1>
    <p class="lead">
      Six thèmes, cinq questions par thème, un nouveau quiz chaque jour. Chaque réponse est
      expliquée et sourcée. Gratuit, sans compte, sans limite de temps.
    </p>
    @if (progress.ready() && progress.streak() > 0) {
      <p class="chip">
        Série en cours : <strong>{{ progress.streak() }}</strong>
        {{ progress.streak() > 1 ? 'jours' : 'jour' }} d’affilée
      </p>
    }
    <h2>Les quiz d’aujourd’hui</h2>
    <app-theme-cards />
  `,
})
export default class HomePage {
  protected readonly progress = inject(ProgressStore);
}
