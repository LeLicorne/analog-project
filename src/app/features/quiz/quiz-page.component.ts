import { ChangeDetectionStrategy, Component, computed, input, resource } from '@angular/core';

import { QuizCorrigeComponent } from './quiz-corrige.component';
import { QuizPlayerComponent } from './quiz-player.component';

import { dailyQuestions } from '@data/daily-quiz';
import { formatLongDate } from '@data/dates';
import { loadQuestions } from '@data/question-loader';
import type { IsoDate, ThemeSlug } from '@data/quiz.types';
import { getTheme } from '@data/themes';

/** Charge les questions du thème (chunk dédié), tire le quiz du jour et affiche le jeu. */
@Component({
  selector: 'app-quiz-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [QuizPlayerComponent, QuizCorrigeComponent],
  template: `
    <h1>
      <span aria-hidden="true">{{ theme().icon }}</span>
      @if (isToday()) {
        Quiz {{ theme().name }} du jour
      } @else {
        Quiz {{ theme().name }} du {{ longDate() }}
      }
    </h1>
    @if (isToday()) {
      <p class="muted">{{ longDate() }} · 5 questions · sans limite de temps</p>
    }

    @if (quiz.hasValue()) {
      <app-quiz-player [theme]="slug()" [date]="date()" [questions]="quiz.value()" />
      @if (withCorrige()) {
        <details class="corrige-toggle">
          <summary>Voir le corrigé complet de ce quiz</summary>
          <app-quiz-corrige [questions]="quiz.value()" />
        </details>
      }
    } @else if (quiz.error()) {
      <p role="alert">Le quiz n’a pas pu être chargé. Rechargez la page pour réessayer.</p>
    } @else {
      <p role="status">Chargement du quiz…</p>
    }
  `,
})
export class QuizPageComponent {
  readonly slug = input.required<ThemeSlug>();
  readonly date = input.required<IsoDate>();
  readonly isToday = input(true);
  readonly withCorrige = input(false);

  protected readonly theme = computed(() => getTheme(this.slug()));
  protected readonly longDate = computed(() => formatLongDate(this.date()));

  protected readonly quiz = resource({
    params: () => ({ slug: this.slug(), date: this.date() }),
    loader: async ({ params }) =>
      dailyQuestions(await loadQuestions(params.slug), params.slug, params.date),
  });
}
