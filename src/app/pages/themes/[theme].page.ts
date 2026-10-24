import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { usePageSeo } from '@app/core/seo/seo.service';
import { AUTHOR, SITE_URL } from '@app/core/seo/site';
import { BreadcrumbComponent } from '@app/shared/breadcrumb.component';
import { NotFoundComponent } from '@app/shared/not-found.component';
import { archiveDates } from '@data/archive';
import { formatLongDate, toIsoDate } from '@data/dates';
import { breadcrumbs, collectionPage, graph, organization } from '@data/seo/json-ld';
import { themeMeta } from '@data/seo/page-meta';
import { THEMES, getTheme, isThemeSlug } from '@data/themes';

@Component({
  selector: 'app-theme-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BreadcrumbComponent, NotFoundComponent, RouterLink],
  template: `
    @if (theme(); as theme) {
      <app-breadcrumb [items]="[{ label: 'Accueil', path: '/' }, { label: theme.name }]" />
      <h1 [attr.data-theme]="theme.slug">
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

      <nav aria-label="Autres thèmes" class="other-quizzes">
        <h2>Autres thèmes</h2>
        <ul>
          @for (other of otherThemes(); track other.slug) {
            <li>
              <a [routerLink]="['/themes', other.slug]"
                ><span aria-hidden="true">{{ other.icon }}</span> {{ other.name }}</a
              >
            </li>
          }
        </ul>
      </nav>
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
  protected readonly otherThemes = computed(() =>
    THEMES.filter((candidate) => candidate.slug !== this.theme()?.slug),
  );

  protected longDate = formatLongDate;

  constructor() {
    usePageSeo(() => {
      const theme = this.theme();
      if (!theme) return null;
      const path = `/themes/${theme.slug}`;
      return {
        ...themeMeta(theme),
        path,
        jsonLd: [
          graph(
            organization(SITE_URL, AUTHOR),
            collectionPage({
              siteUrl: SITE_URL,
              path,
              theme,
              archive: this.archive().map((date) => ({
                name: `Quiz ${theme.name} du ${formatLongDate(date)}`,
                path: `/quiz/${theme.slug}/${date}`,
              })),
            }),
            breadcrumbs(SITE_URL, [
              { name: 'Accueil', path: '/' },
              { name: theme.name, path },
            ]),
          ),
        ],
      };
    });
  }
}
