import type { Question } from './quiz.types';
import {
  answerOptions,
  correctAnswerLabel,
  countCorrect,
  isCorrect,
  shareSummary,
} from './scoring';

const source = { label: 'Source', url: 'https://fr.wikipedia.org/wiki/Test' } as const;

const single: Question = {
  id: 'web-001',
  type: 'single',
  difficulty: 'facile',
  prompt: 'Q1',
  choices: ['a', 'b', 'c', 'd'],
  answerIndex: 2,
  explanation: 'E',
  source,
};
const trueFalse: Question = {
  id: 'web-002',
  type: 'true-false',
  difficulty: 'facile',
  prompt: 'Q2',
  answer: false,
  explanation: 'E',
  source,
};

describe('scoring', () => {
  it('évalue un QCM par index', () => {
    expect(isCorrect(single, 2)).toBe(true);
    expect(isCorrect(single, 1)).toBe(false);
  });

  it('évalue un vrai/faux par booléen', () => {
    expect(isCorrect(trueFalse, false)).toBe(true);
    expect(isCorrect(trueFalse, true)).toBe(false);
  });

  it('ne confond pas faux (false) et index 0', () => {
    expect(isCorrect(trueFalse, 0)).toBe(false);
  });

  it('compte les bonnes réponses et ignore les questions sans réponse', () => {
    expect(countCorrect([single, trueFalse], [2, undefined])).toBe(1);
    expect(countCorrect([single, trueFalse], [2, false])).toBe(2);
  });

  it('produit un résumé partageable sans spoiler', () => {
    expect(shareSummary([single, trueFalse], [2, true])).toBe('✅❌');
  });
});

describe('answerOptions et correctAnswerLabel', () => {
  it('propose Vrai/Faux pour un vrai/faux', () => {
    expect(answerOptions(trueFalse).map((option) => option.label)).toEqual(['Vrai', 'Faux']);
    expect(correctAnswerLabel(trueFalse)).toBe('Faux');
  });

  it('propose les 4 choix d’un QCM avec leur index', () => {
    expect(answerOptions(single).map((option) => option.value)).toEqual([0, 1, 2, 3]);
    expect(correctAnswerLabel(single)).toBe('c');
  });
});
