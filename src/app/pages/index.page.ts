import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { ProgressStore } from '@app/core/progress/progress.store';
import { usePageSeo } from '@app/core/seo/seo.service';
import { SITE_URL } from '@app/core/seo/site';
import { ReminderToggleComponent } from '@app/features/reminders/reminder-toggle.component';
import { ThemeCardsComponent } from '@app/features/themes/theme-cards.component';
import { FAQ } from '@data/faq';
import { faqPage, graph, organization, webSite } from '@data/seo/json-ld';
import { homeMeta } from '@data/seo/page-meta';

@Component({
  selector: 'app-home-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReminderToggleComponent, ThemeCardsComponent],
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

    <app-reminder-toggle />

    <section class="faq" aria-labelledby="faq-title">
      <h2 id="faq-title">Questions fréquentes</h2>
      @for (entry of faq; track entry.question) {
        <h3>{{ entry.question }}</h3>
        <p>{{ entry.answer }}</p>
      }
    </section>
  `,
})
export default class HomePage {
  protected readonly progress = inject(ProgressStore);
  protected readonly faq = FAQ;

  constructor() {
    usePageSeo(() => ({
      ...homeMeta(),
      path: '/',
      jsonLd: [graph(organization(SITE_URL), webSite(SITE_URL), faqPage(FAQ))],
    }));
  }
}
