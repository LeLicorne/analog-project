import { QUESTIONS_PER_QUIZ } from '../daily-quiz';
import { loadQuestions } from '../question-loader';
import { THEME_SLUGS } from '../quiz.types';

const MIN_QUESTIONS = 60;

describe.each(THEME_SLUGS)('questions du thème %s', (theme) => {
  it('respecte le contrat éditorial', async () => {
    const questions = await loadQuestions(theme);

    expect(questions.length).toBeGreaterThanOrEqual(MIN_QUESTIONS);
    expect(questions.length % QUESTIONS_PER_QUIZ).toBe(0);

    const ids = new Set<string>();
    const prompts = new Set<string>();
    questions.forEach((question, index) => {
      const expectedId = `${theme}-${String(index + 1).padStart(3, '0')}`;
      expect(question.id).toBe(expectedId);
      ids.add(question.id);
      prompts.add(question.prompt.trim().toLowerCase());

      expect(question.prompt.trim().length).toBeGreaterThan(10);
      expect(question.explanation.trim().length).toBeGreaterThan(20);
      expect(question.source.label.trim()).not.toBe('');
      expect(() => new URL(question.source.url)).not.toThrow();

      if (question.type === 'single') {
        expect(new Set(question.choices).size).toBe(4);
        expect(question.choices.every((choice) => choice.trim() !== '')).toBe(true);
        expect([0, 1, 2, 3]).toContain(question.answerIndex);
      } else {
        expect(question.prompt.startsWith('Vrai ou faux')).toBe(true);
      }
    });

    expect(ids.size).toBe(questions.length);
    expect(prompts.size).toBe(questions.length);
  });

  it('mélange les types et répartit les bonnes réponses', async () => {
    const questions = await loadQuestions(theme);
    const singles = questions.filter((question) => question.type === 'single');
    const positions = [0, 1, 2, 3].map(
      (position) => singles.filter((question) => question.answerIndex === position).length,
    );
    expect(singles.length).toBeLessThan(questions.length);
    positions.forEach((count) => {
      expect(count).toBeGreaterThanOrEqual(Math.floor(singles.length / 8));
    });
  });
});
