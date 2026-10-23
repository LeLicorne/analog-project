import type { RouteMeta } from '@analogjs/router';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

import { QuizPageComponent } from '@app/features/quiz/quiz-page.component';
import { resolveQuizPool } from '@app/features/quiz/quiz-pool';
import { NotFoundComponent } from '@app/shared/not-found.component';
import { toIsoDate } from '@data/dates';
import type { Question } from '@data/quiz.types';
import { isThemeSlug } from '@data/themes';

export const routeMeta = {
  resolve: { pool: resolveQuizPool },
} satisfies RouteMeta;

@Component({
  selector: 'app-today-quiz-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [QuizPageComponent, NotFoundComponent],
  template: `
    @if (slug(); as slug) {
      <app-quiz-page [slug]="slug" [pool]="pool()" [date]="today" [isToday]="true" />
    } @else {
      <app-not-found />
    }
  `,
})
export default class TodayQuizPage {
  private readonly route = inject(ActivatedRoute);
  private readonly params = toSignal(this.route.paramMap, { requireSync: true });
  private readonly data = toSignal(this.route.data, { requireSync: true });

  protected readonly pool = computed(() => (this.data()['pool'] ?? []) as readonly Question[]);

  protected readonly today = toIsoDate(new Date());
  protected readonly slug = computed(() => {
    const value = this.params().get('theme') ?? '';
    return isThemeSlug(value) ? value : null;
  });
}
