import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { QuizCorrigeComponent } from './quiz-corrige.component';
import { QuizPlayerComponent } from './quiz-player.component';

import { usePageSeo } from '@app/core/seo/seo.service';
import { AUTHOR, SITE_URL } from '@app/core/seo/site';
import { BreadcrumbComponent, type BreadcrumbItem } from '@app/shared/breadcrumb.component';
import { dailyQuestions, QUESTIONS_PER_QUIZ } from '@data/daily-quiz';
import { LAUNCH_DATE, addDays, formatDate, formatLongDate, toIsoDate } from '@data/dates';
import type { IsoDate, Question, ThemeSlug } from '@data/quiz.types';
import { breadcrumbs, graph, organization, quizNode } from '@data/seo/json-ld';
import { archiveMeta, todayMeta } from '@data/seo/page-meta';
import { getTheme } from '@data/themes';

/**
 * Charge les questions du thème (chunk dédié), tire le quiz du jour et affiche le jeu.
 * Pour un quiz passé, la page est d'abord un corrigé lisible (c'est elle qui est indexée), le jeu vient après.
 */
@Component({
  selector: 'app-quiz-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BreadcrumbComponent, QuizCorrigeComponent, QuizPlayerComponent, RouterLink],
  template: `
    <app-breadcrumb [items]="crumbs()" />
    <h1 [attr.data-theme]="slug()">
      <span aria-hidden="true">{{ theme().icon }}</span>
      @if (isToday()) {
        Quiz {{ theme().name }} du jour
      } @else {
        Quiz {{ theme().name }} du {{ longDate() }}
      }
    </h1>

    @if (isToday()) {
      <p class="muted">{{ longDate() }} · {{ questionCount }} questions · sans limite de temps</p>
    } @else {
      <p class="lead">
        Le quiz {{ theme().name }} du {{ shortDate() }} comptait {{ questionCount }} questions.
        Voici le corrigé complet : la réponse, une explication et la source de chaque question.
      </p>
    }

    @if (withCorrige()) {
      <app-quiz-corrige [questions]="quiz()" />
      <details class="replay">
        <summary>Rejouer ce quiz</summary>
        <app-quiz-player [theme]="slug()" [date]="date()" [questions]="quiz()" />
      </details>
      <nav aria-label="Autres quiz {{ theme().name }}" class="day-nav">
        <ul>
          @if (previousDate(); as previous) {
            <li>
              <a [routerLink]="['/quiz', slug(), previous]"
                >← Quiz du {{ formatShort(previous) }}</a
              >
            </li>
          }
          @if (nextDate(); as next) {
            <li>
              <a [routerLink]="['/quiz', slug(), next]">Quiz du {{ formatShort(next) }} →</a>
            </li>
          } @else {
            <li>
              <a [routerLink]="['/quiz', slug()]">Quiz du jour →</a>
            </li>
          }
        </ul>
      </nav>
    } @else {
      <app-quiz-player [theme]="slug()" [date]="date()" [questions]="quiz()" />
    }
  `,
})
export class QuizPageComponent {
  readonly slug = input.required<ThemeSlug>();
  /** Toutes les questions du thème, chargées par la route (`resolveQuizPool`). */
  readonly pool = input.required<readonly Question[]>();
  readonly date = input.required<IsoDate>();
  readonly isToday = input(true);
  readonly withCorrige = input(false);

  protected readonly questionCount = QUESTIONS_PER_QUIZ;
  protected readonly formatShort = formatDate;

  protected readonly theme = computed(() => getTheme(this.slug()));
  protected readonly longDate = computed(() => formatLongDate(this.date()));
  protected readonly shortDate = computed(() => formatDate(this.date()));

  /** Le quiz du jour a une seule adresse stable ; l'adresse datée d'aujourd'hui y renvoie via la canonique. */
  private readonly path = computed(() =>
    this.isToday() ? `/quiz/${this.slug()}` : `/quiz/${this.slug()}/${this.date()}`,
  );

  protected readonly crumbs = computed<BreadcrumbItem[]>(() => [
    { label: 'Accueil', path: '/' },
    { label: this.theme().name, path: `/themes/${this.slug()}` },
    { label: this.isToday() ? 'Quiz du jour' : this.shortDate() },
  ]);

  protected readonly previousDate = computed<IsoDate | null>(() =>
    this.date() > LAUNCH_DATE ? addDays(this.date(), -1) : null,
  );

  /** Dernier jour passé : le suivant est le quiz du jour, représenté par le lien « Quiz du jour ». */
  protected readonly nextDate = computed<IsoDate | null>(() => {
    const next = addDays(this.date(), 1);
    return next < toIsoDate(new Date()) ? next : null;
  });

  protected readonly quiz = computed(() => dailyQuestions(this.pool(), this.slug(), this.date()));

  constructor() {
    usePageSeo(() => {
      const theme = this.theme();
      const date = this.date();
      const questions = this.quiz();
      const isToday = this.isToday();
      return {
        ...(isToday ? todayMeta(theme, date) : archiveMeta(theme, date, this.questionCount)),
        path: this.path(),
        jsonLd: [
          graph(
            organization(SITE_URL, AUTHOR),
            quizNode({
              siteUrl: SITE_URL,
              path: this.path(),
              theme,
              date,
              questions,
              withAnswers: !isToday,
            }),
            breadcrumbs(SITE_URL, [
              { name: 'Accueil', path: '/' },
              { name: theme.name, path: `/themes/${theme.slug}` },
              { name: isToday ? 'Quiz du jour' : formatDate(date), path: this.path() },
            ]),
          ),
        ],
      };
    });
  }
}
