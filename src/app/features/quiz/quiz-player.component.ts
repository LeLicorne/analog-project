import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Injector,
  afterNextRender,
  computed,
  effect,
  inject,
  input,
  signal,
  untracked,
} from '@angular/core';
import { RouterLink } from '@angular/router';

import { ProgressStore } from '@app/core/progress/progress.store';
import { formatLongDate } from '@data/dates';
import type { Answer, IsoDate, Question, ThemeSlug } from '@data/quiz.types';
import { answerOptions, countCorrect, isCorrect, shareSummary } from '@data/scoring';
import { THEMES, getTheme } from '@data/themes';

type OptionState = 'correct' | 'wrong' | 'idle';

/** `navigator.share` n'existe pas partout (Firefox bureau) : on le traite comme optionnel. */
interface ShareCapableNavigator {
  readonly share?: (data: ShareData) => Promise<void>;
  readonly clipboard: Clipboard;
}

@Component({
  selector: 'app-quiz-player',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    @if (!finished()) {
      <p class="progress-text">Question {{ currentIndex() + 1 }} sur {{ total() }}</p>
      <progress
        class="progress"
        [value]="currentIndex()"
        [max]="total()"
        aria-label="Progression du quiz"
      ></progress>

      <form (submit)="onSubmit($event)" novalidate>
        <fieldset class="question" tabindex="-1" data-focus="question">
          <legend>{{ question().prompt }}</legend>
          @for (option of options(); track option.value) {
            <label class="choice" [attr.data-state]="optionState(option.value)">
              <input
                type="radio"
                name="answer"
                [checked]="selected() === option.value"
                [disabled]="validated()"
                (change)="choose(option.value)"
              />
              <span class="choice__text">{{ option.label }}</span>
              @if (validated()) {
                @switch (optionState(option.value)) {
                  @case ('correct') {
                    <span class="choice__badge"
                      ><span aria-hidden="true">✓</span> Bonne réponse</span
                    >
                  }
                  @case ('wrong') {
                    <span class="choice__badge"
                      ><span aria-hidden="true">✗</span> Votre réponse</span
                    >
                  }
                }
              }
            </label>
          }
        </fieldset>

        @if (error()) {
          <p class="error" role="alert">{{ error() }}</p>
        }

        @if (validated()) {
          <div class="feedback" tabindex="-1" data-focus="feedback" [attr.data-right]="isRight()">
            <h2 class="feedback__title">
              <span aria-hidden="true">{{ isRight() ? '✓' : '✗' }}</span>
              {{ isRight() ? 'Bonne réponse !' : 'Mauvaise réponse' }}
            </h2>
            <p>{{ question().explanation }}</p>
            <p>
              <a [href]="question().source.url" target="_blank" rel="noopener noreferrer">
                Source : {{ question().source.label }}
                <span class="sr-only">(s’ouvre dans un nouvel onglet)</span>
              </a>
            </p>
          </div>
          <button type="button" class="btn" (click)="next()">
            {{ isLast() ? 'Voir mon score' : 'Question suivante' }}
          </button>
        } @else {
          <button type="submit" class="btn">Valider ma réponse</button>
        }
      </form>
    } @else {
      <section class="result" tabindex="-1" data-focus="result" aria-labelledby="result-title">
        <h2 id="result-title">Votre score : {{ score() }} sur {{ total() }}</h2>
        <p class="result__summary">
          <span role="img" [attr.aria-label]="summaryLabel()">{{ summary() }}</span>
        </p>
        <p>{{ message() }}</p>
        @if (progress.ready() && progress.streak() > 0) {
          <p class="result__streak">
            Série en cours : <strong>{{ progress.streak() }}</strong>
            {{ progress.streak() > 1 ? 'jours' : 'jour' }} d’affilée.
          </p>
        }
        <div class="actions">
          <button type="button" class="btn" (click)="share()">Partager mon résultat</button>
          <button type="button" class="btn btn--secondary" (click)="replay()">Rejouer</button>
        </div>
        <p class="sr-only" role="status">{{ shareStatus() }}</p>
        @if (shareStatus()) {
          <p class="muted" aria-hidden="true">{{ shareStatus() }}</p>
        }
      </section>

      <nav aria-label="Autres quiz du jour" class="other-quizzes">
        <h2>Continuer avec un autre quiz</h2>
        <ul>
          @for (other of otherThemes(); track other.slug) {
            <li>
              <a [routerLink]="['/quiz', other.slug]"
                ><span aria-hidden="true">{{ other.icon }}</span> {{ other.name }}</a
              >
            </li>
          }
        </ul>
      </nav>
    }
  `,
})
export class QuizPlayerComponent {
  readonly theme = input.required<ThemeSlug>();
  readonly date = input.required<IsoDate>();
  readonly questions = input.required<readonly Question[]>();

  protected readonly progress = inject(ProgressStore);
  private readonly document = inject(DOCUMENT);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly injector = inject(Injector);

  protected readonly currentIndex = signal(0);
  protected readonly selected = signal<Answer | null>(null);
  protected readonly validated = signal(false);
  protected readonly answers = signal<readonly (Answer | undefined)[]>([]);
  protected readonly finished = signal(false);
  protected readonly error = signal('');
  protected readonly shareStatus = signal('');

  protected readonly total = computed(() => this.questions().length);
  protected readonly question = computed(() => {
    const question = this.questions()[this.currentIndex()];
    if (!question) throw new Error('Aucune question à afficher');
    return question;
  });
  protected readonly options = computed(() => answerOptions(this.question()));
  protected readonly isLast = computed(() => this.currentIndex() === this.total() - 1);
  protected readonly isRight = computed(() => {
    const answer = this.selected();
    return answer !== null && isCorrect(this.question(), answer);
  });
  protected readonly score = computed(() => countCorrect(this.questions(), this.answers()));
  protected readonly summary = computed(() => shareSummary(this.questions(), this.answers()));
  protected readonly summaryLabel = computed(() =>
    this.questions()
      .map((question, index) => {
        const answer = this.answers()[index];
        return answer !== undefined && isCorrect(question, answer) ? 'bonne' : 'mauvaise';
      })
      .map((verdict, index) => `question ${index + 1} : ${verdict}`)
      .join(', '),
  );
  protected readonly message = computed(() => {
    const ratio = this.score() / this.total();
    if (ratio === 1) return 'Sans faute, bravo !';
    if (ratio >= 0.6) return 'Joli score, revenez demain pour un nouveau quiz.';
    return 'Pas grave : chaque réponse est expliquée, et un nouveau quiz arrive demain.';
  });
  protected readonly otherThemes = computed(() =>
    THEMES.filter((candidate) => candidate.slug !== this.theme()),
  );

  private loadedKey = '';

  constructor() {
    effect(() => {
      const theme = this.theme();
      const date = this.date();
      const ready = this.progress.ready();
      untracked(() => {
        const key = `${theme}:${date}`;
        if (key !== this.loadedKey) {
          this.loadedKey = key;
          this.resetRun();
        }
        const saved = ready ? this.progress.resultFor(theme, date) : undefined;
        if (saved && !this.finished() && this.currentIndex() === 0 && this.selected() === null) {
          this.answers.set(saved.answers);
          this.finished.set(true);
        }
      });
    });
  }

  protected optionState(value: Answer): OptionState {
    if (!this.validated()) return 'idle';
    const question = this.question();
    const isAnswer =
      question.type === 'single' ? value === question.answerIndex : value === question.answer;
    if (isAnswer) return 'correct';
    return this.selected() === value ? 'wrong' : 'idle';
  }

  protected choose(value: Answer): void {
    this.selected.set(value);
    this.error.set('');
  }

  protected onSubmit(event: Event): void {
    event.preventDefault();
    const answer = this.selected();
    if (this.validated()) return;
    if (answer === null) {
      this.error.set('Choisissez une réponse avant de valider.');
      return;
    }
    this.answers.update((current) => {
      const next = [...current];
      next[this.currentIndex()] = answer;
      return next;
    });
    this.validated.set(true);
    this.focusAfterRender('feedback');
  }

  protected next(): void {
    if (this.isLast()) {
      this.finish();
      return;
    }
    this.currentIndex.update((index) => index + 1);
    this.selected.set(null);
    this.validated.set(false);
    this.focusAfterRender('question');
  }

  protected replay(): void {
    this.resetRun();
    this.focusAfterRender('question');
  }

  protected async share(): Promise<void> {
    const view = this.document.defaultView;
    if (!view) return;
    const theme = getTheme(this.theme());
    const text = `Quizz du jour · ${theme.name} · ${formatLongDate(this.date())}\n${this.score()}/${this.total()} ${this.summary()}`;
    const url = view.location.href;
    try {
      const navigator = view.navigator as ShareCapableNavigator;
      if (navigator.share) {
        await navigator.share({ title: 'Quizz du jour', text, url });
        return;
      }
      await navigator.clipboard.writeText(`${text}\n${url}`);
      this.shareStatus.set('Résultat copié dans le presse-papiers.');
    } catch {
      this.shareStatus.set('Le partage n’a pas abouti. Vous pouvez copier l’adresse de la page.');
    }
  }

  private finish(): void {
    this.finished.set(true);
    this.progress.record(this.theme(), this.date(), {
      score: this.score(),
      answers: this.answers().filter((answer): answer is Answer => answer !== undefined),
    });
    this.focusAfterRender('result');
  }

  private resetRun(): void {
    this.currentIndex.set(0);
    this.selected.set(null);
    this.validated.set(false);
    this.answers.set([]);
    this.finished.set(false);
    this.error.set('');
    this.shareStatus.set('');
  }

  /** Déplace le focus vers la zone qui vient d'apparaître : indispensable au clavier et aux lecteurs d'écran. */
  private focusAfterRender(target: 'question' | 'feedback' | 'result'): void {
    afterNextRender(
      () => {
        this.host.nativeElement.querySelector<HTMLElement>(`[data-focus="${target}"]`)?.focus();
      },
      { injector: this.injector },
    );
  }
}
