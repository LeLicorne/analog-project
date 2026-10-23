import type { Answer, Question } from './quiz.types';

export function isCorrect(question: Question, answer: Answer): boolean {
  return question.type === 'single' ? answer === question.answerIndex : answer === question.answer;
}

export function countCorrect(
  questions: readonly Question[],
  answers: readonly (Answer | undefined)[],
): number {
  return questions.filter((question, index) => {
    const answer = answers[index];
    return answer !== undefined && isCorrect(question, answer);
  }).length;
}

/** Résumé partageable sans spoiler : ✅/❌ par question. */
export function shareSummary(
  questions: readonly Question[],
  answers: readonly (Answer | undefined)[],
): string {
  return questions
    .map((question, index) => {
      const answer = answers[index];
      return answer !== undefined && isCorrect(question, answer) ? '✅' : '❌';
    })
    .join('');
}

export interface AnswerOption {
  readonly value: Answer;
  readonly label: string;
}

/** Choix proposés au joueur : les 4 réponses d'un QCM, ou Vrai/Faux. */
export function answerOptions(question: Question): readonly AnswerOption[] {
  if (question.type === 'true-false') {
    return [
      { value: true, label: 'Vrai' },
      { value: false, label: 'Faux' },
    ];
  }
  return question.choices.map((label, index) => ({ value: index, label }));
}

/** Libellé de la bonne réponse, pour les corrigés. */
export function correctAnswerLabel(question: Question): string {
  if (question.type === 'true-false') return question.answer ? 'Vrai' : 'Faux';
  return question.choices[question.answerIndex];
}
