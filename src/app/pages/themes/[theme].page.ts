import type { RouteMeta } from '@analogjs/router';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { pageTitle } from '@app/core/seo/page-title';
import { NotFoundComponent } from '@app/shared/not-found.component';
import { archiveDates } from '@data/archive';
import { formatLongDate, toIsoDate } from '@data/dates';
import { isThemeSlug, getTheme } from '@data/themes';

export const routeMeta = {
  title: (route) => {
    const slug = route.paramMap.get('theme') ?? '';
    return isThemeSlug(slug)
      ? pageTitle(`Quiz ${getTheme(slug).name} : 5 questions par jour`)
      : pageTitle('Page introuvable');
  },
} satisfies RouteMeta;

@Component({
  selector: 'app-theme-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, NotFoundComponent],
  template: `
    @if (theme(); as theme) {
      <h1>
        <span aria-hidden="true">{{ theme.icon }}</span> Quiz {{ theme.name }}
      </h1>
      <p class="lead">{{ theme.description }}</p>
      <p>
        <a [routerLink]="['/quiz', theme.slug]" class="btn">Jouer le quiz du jour</a>
      </p>

      <h2>Les quiz précédents</h2>
      @if (archive().length > 0) {
        <ul class="archive">
          @for (date of archive(); track date) {
            <li>
              <a [routerLink]="['/quiz', theme.slug, date]">{{ longDate(date) }}</a>
            </li>
          }
        </ul>
      } @else {
        <p>Les quiz des jours précédents apparaîtront ici dès demain, avec leur corrigé.</p>
      }
    } @else {
      <app-not-found />
    }
  `,
})
export default class ThemePage {
  private readonly params = toSignal(inject(ActivatedRoute).paramMap, { requireSync: true });

  protected readonly theme = computed(() => {
    const slug = this.params().get('theme') ?? '';
    return isThemeSlug(slug) ? getTheme(slug) : null;
  });
  protected readonly archive = computed(() => archiveDates(toIsoDate(new Date())).reverse());

  protected longDate = formatLongDate;
}
