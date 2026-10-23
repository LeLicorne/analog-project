import type { RouteMeta } from '@analogjs/router';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

import { pageTitle } from '@app/core/seo/page-title';
import { QuizPageComponent } from '@app/features/quiz/quiz-page.component';
import { NotFoundComponent } from '@app/shared/not-found.component';
import { toIsoDate } from '@data/dates';
import { getTheme, isThemeSlug } from '@data/themes';

export const routeMeta = {
  title: (route) => {
    const slug = route.paramMap.get('theme') ?? '';
    return isThemeSlug(slug)
      ? pageTitle(`Quiz ${getTheme(slug).name} du jour`)
      : pageTitle('Page introuvable');
  },
} satisfies RouteMeta;

@Component({
  selector: 'app-today-quiz-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [QuizPageComponent, NotFoundComponent],
  template: `
    @if (slug(); as slug) {
      <app-quiz-page [slug]="slug" [date]="today" [isToday]="true" />
    } @else {
      <app-not-found />
    }
  `,
})
export default class TodayQuizPage {
  private readonly params = toSignal(inject(ActivatedRoute).paramMap, { requireSync: true });

  protected readonly today = toIsoDate(new Date());
  protected readonly slug = computed(() => {
    const value = this.params().get('theme') ?? '';
    return isThemeSlug(value) ? value : null;
  });
}
