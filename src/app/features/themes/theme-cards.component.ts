import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ProgressStore } from '@app/core/progress/progress.store';
import { toIsoDate } from '@data/dates';
import type { ThemeSlug } from '@data/quiz.types';
import { THEMES } from '@data/themes';

@Component({
  selector: 'app-theme-cards',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <ul class="cards">
      @for (theme of themes; track theme.slug) {
        <li class="card" [attr.data-theme]="theme.slug">
          <h3 class="card__title">
            <a [routerLink]="['/quiz', theme.slug]">
              <span aria-hidden="true">{{ theme.icon }}</span> {{ theme.name }}
              <span class="sr-only">: jouer le quiz du jour</span>
            </a>
          </h3>
          <p>{{ theme.tagline }}</p>
          <p class="card__status">{{ statusFor(theme.slug) }}</p>
        </li>
      }
    </ul>
  `,
})
export class ThemeCardsComponent {
  protected readonly themes = THEMES;
  private readonly progress = inject(ProgressStore);

  protected statusFor(slug: ThemeSlug): string {
    if (!this.progress.ready()) return '5 questions';
    const result = this.progress.resultFor(slug, toIsoDate(new Date()));
    return result
      ? `Terminé : ${result.score} sur ${result.answers.length}`
      : 'À jouer aujourd’hui';
  }
}
