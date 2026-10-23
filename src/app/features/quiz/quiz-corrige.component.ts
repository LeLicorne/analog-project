import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import type { Question } from '@data/quiz.types';
import { correctAnswerLabel } from '@data/scoring';

@Component({
  selector: 'app-quiz-corrige',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="corrige" aria-labelledby="corrige-title">
      <h2 id="corrige-title">Corrigé et explications</h2>
      <ol>
        @for (question of questions(); track question.id) {
          <li>
            <h3>{{ question.prompt }}</h3>
            <p>
              <strong>Réponse : {{ answerLabel(question) }}.</strong> {{ question.explanation }}
            </p>
            <p class="muted">
              Source :
              <a [href]="question.source.url" target="_blank" rel="noopener noreferrer">
                {{ question.source.label }}
                <span class="sr-only">(s’ouvre dans un nouvel onglet)</span>
              </a>
            </p>
          </li>
        }
      </ol>
    </section>
  `,
})
export class QuizCorrigeComponent {
  readonly questions = input.required<readonly Question[]>();

  protected answerLabel(question: Question): string {
    return correctAnswerLabel(question);
  }
}
