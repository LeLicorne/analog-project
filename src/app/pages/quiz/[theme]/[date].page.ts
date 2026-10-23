import type { RouteMeta } from '@analogjs/router';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

import { pageTitle } from '@app/core/seo/page-title';
import { QuizPageComponent } from '@app/features/quiz/quiz-page.component';
import { NotFoundComponent } from '@app/shared/not-found.component';
import { LAUNCH_DATE, formatLongDate, isIsoDate, toIsoDate } from '@data/dates';
import { getTheme, isThemeSlug } from '@data/themes';

export const routeMeta = {
  title: (route) => {
    const slug = route.paramMap.get('theme') ?? '';
    const date = route.paramMap.get('date') ?? '';
    return isThemeSlug(slug) && isIsoDate(date)
      ? pageTitle(`Quiz ${getTheme(slug).name} du ${formatLongDate(date)} : réponses`)
      : pageTitle('Page introuvable');
  },
} satisfies RouteMeta;

@Component({
  selector: 'app-archive-quiz-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [QuizPageComponent, NotFoundComponent],
  template: `
    @if (target(); as target) {
      <app-quiz-page
        [slug]="target.slug"
        [date]="target.date"
        [isToday]="target.isToday"
        [withCorrige]="!target.isToday"
      />
    } @else {
      <app-not-found />
    }
  `,
})
export default class ArchiveQuizPage {
  private readonly params = toSignal(inject(ActivatedRoute).paramMap, { requireSync: true });

  /** Seuls les quiz du lancement jusqu'à aujourd'hui existent : pas de quiz dans le futur. */
  protected readonly target = computed(() => {
    const slug = this.params().get('theme') ?? '';
    const date = this.params().get('date') ?? '';
    const today = toIsoDate(new Date());
    if (!isThemeSlug(slug) || !isIsoDate(date) || date < LAUNCH_DATE || date > today) return null;
    return { slug, date, isToday: date === today };
  });
}
