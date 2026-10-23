import { QUESTIONS_PER_QUIZ, cycleLength, dailyQuestions } from './daily-quiz';
import { addDays, isIsoDate } from './dates';
import type { IsoDate, Question } from './quiz.types';

const pool: Question[] = Array.from({ length: 23 }, (_, index) => ({
  id: `histoire-${String(index + 1).padStart(3, '0')}` as Question['id'],
  type: 'true-false',
  difficulty: 'facile',
  prompt: `Question ${index}`,
  answer: true,
  explanation: 'Explication.',
  source: { label: 'Source', url: 'https://fr.wikipedia.org/wiki/Test' },
}));

const start = '2026-10-23';
if (!isIsoDate(start)) throw new Error(start);
const startDate: IsoDate = start;

describe('dailyQuestions', () => {
  it('renvoie toujours le même quiz pour un même jour et un même thème', () => {
    expect(dailyQuestions(pool, 'histoire', startDate)).toEqual(
      dailyQuestions(pool, 'histoire', startDate),
    );
  });

  it('renvoie 5 questions', () => {
    expect(dailyQuestions(pool, 'histoire', startDate)).toHaveLength(QUESTIONS_PER_QUIZ);
  });

  it('ne répète aucune question durant un cycle complet', () => {
    const length = cycleLength(pool.length);
    expect(length).toBe(4);
    const cycleStart = Math.floor(Date.parse(`${startDate}T00:00:00Z`) / 86_400_000);
    const first = addDays(startDate, -(cycleStart % length));
    const ids = Array.from({ length }, (_, offset) =>
      dailyQuestions(pool, 'histoire', addDays(first, offset)).map((question) => question.id),
    ).flat();
    expect(new Set(ids).size).toBe(length * QUESTIONS_PER_QUIZ);
  });

  it('propose un quiz différent selon le thème', () => {
    expect(dailyQuestions(pool, 'histoire', startDate)).not.toEqual(
      dailyQuestions(pool, 'sciences', startDate),
    );
  });

  it('refuse un pool trop petit', () => {
    expect(() => dailyQuestions(pool.slice(0, 4), 'histoire', startDate)).toThrow();
  });
});
