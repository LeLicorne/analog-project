import { DOCUMENT } from '@angular/common';
import { provideLocationMocks } from '@angular/common/testing';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { QuizPlayerComponent } from './quiz-player.component';

import { ProgressStore } from '@app/core/progress/progress.store';
import { loadQuestions } from '@data/question-loader';
import type { IsoDate, Question } from '@data/quiz.types';

const DATE = '2026-10-23' as IsoDate;

let questions: readonly Question[];

function correctValue(question: Question): number | boolean {
  return question.type === 'single' ? question.answerIndex : question.answer;
}

function wrongValue(question: Question): number | boolean {
  return question.type === 'single' ? (question.answerIndex + 1) % 4 : !question.answer;
}

async function render(): Promise<{
  fixture: ComponentFixture<QuizPlayerComponent>;
  root: HTMLElement;
}> {
  const fixture = TestBed.createComponent(QuizPlayerComponent);
  fixture.componentRef.setInput('theme', 'histoire');
  fixture.componentRef.setInput('date', DATE);
  fixture.componentRef.setInput('questions', questions);
  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();
  return { fixture, root: fixture.nativeElement as HTMLElement };
}

/** Répond à la question affichée (par la valeur voulue) puis valide. */
async function answer(
  fixture: ComponentFixture<QuizPlayerComponent>,
  root: HTMLElement,
  question: Question,
  pick: (question: Question) => number | boolean,
): Promise<void> {
  const radios = [...root.querySelectorAll<HTMLInputElement>('input[type="radio"]')];
  const target = pick(question);
  const index = question.type === 'single' ? (target as number) : target ? 0 : 1;
  radios[index]?.click();
  fixture.detectChanges();
  root.querySelector('form')?.dispatchEvent(new Event('submit', { cancelable: true }));
  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();
}

function clickButton(
  fixture: ComponentFixture<QuizPlayerComponent>,
  root: HTMLElement,
  label: RegExp,
): void {
  const button = [...root.querySelectorAll('button')].find((candidate) =>
    label.test(candidate.textContent),
  );
  if (!button) throw new Error(`Bouton introuvable : ${String(label)}`);
  button.click();
  fixture.detectChanges();
}

async function playAll(
  fixture: ComponentFixture<QuizPlayerComponent>,
  root: HTMLElement,
  pick: (question: Question, index: number) => number | boolean,
): Promise<void> {
  const quizQuestions = questions.slice(0, 5);
  for (const [index, question] of quizQuestions.entries()) {
    await answer(fixture, root, question, (current) => pick(current, index));
    clickButton(fixture, root, index === 4 ? /Voir mon score/ : /Question suivante/);
    await fixture.whenStable();
    fixture.detectChanges();
  }
}

describe('QuizPlayerComponent', () => {
  beforeAll(async () => {
    questions = (await loadQuestions('histoire')).slice(0, 5);
  });

  beforeEach(() => {
    localStorage.clear();
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({ providers: [provideRouter([]), provideLocationMocks()] });
  });

  it('affiche la première question avec ses choix et sa progression', async () => {
    const { root } = await render();
    expect(root.textContent).toContain('Question 1 sur 5');
    expect(root.querySelector('legend')?.textContent).toContain(questions[0]?.prompt);
    expect(root.querySelectorAll('input[type="radio"]').length).toBeGreaterThanOrEqual(2);
    expect(root.querySelector('progress')?.getAttribute('aria-label')).toBe('Progression du quiz');
  });

  it('refuse de valider sans réponse et l’annonce', async () => {
    const { fixture, root } = await render();
    root.querySelector('form')?.dispatchEvent(new Event('submit', { cancelable: true }));
    fixture.detectChanges();
    expect(root.querySelector('[role="alert"]')?.textContent).toContain('Choisissez une réponse');
    expect(root.querySelector('.feedback')).toBeNull();
  });

  it('indique une bonne réponse, avec explication, source et focus sur le retour', async () => {
    const { fixture, root } = await render();
    const first = questions[0]!;
    await answer(fixture, root, first, correctValue);

    const feedback = root.querySelector('.feedback');
    expect(feedback?.textContent).toContain('Bonne réponse !');
    expect(feedback?.textContent).toContain(first.explanation);
    expect(feedback?.querySelector('a')?.getAttribute('rel')).toBe('noopener noreferrer');
    expect(root.querySelector('[data-state="correct"]')?.textContent).toContain('Bonne réponse');
    expect(TestBed.inject(DOCUMENT).activeElement?.getAttribute('data-focus')).toBe('feedback');
  });

  it('indique une mauvaise réponse sans la couleur seule : texte et icône', async () => {
    const { fixture, root } = await render();
    await answer(fixture, root, questions[0]!, wrongValue);
    expect(root.querySelector('.feedback h2')?.textContent).toContain('Mauvaise réponse');
    expect(root.querySelector('[data-state="wrong"]')?.textContent).toContain('Votre réponse');
    expect(root.querySelector('[data-state="correct"]')).not.toBeNull();
  });

  it('verrouille les choix après validation', async () => {
    const { fixture, root } = await render();
    await answer(fixture, root, questions[0]!, correctValue);
    const radios = [...root.querySelectorAll<HTMLInputElement>('input[type="radio"]')];
    expect(radios.every((radio) => radio.hasAttribute('disabled'))).toBe(true);
  });

  it('passe à la question suivante et déplace le focus dessus', async () => {
    const { fixture, root } = await render();
    await answer(fixture, root, questions[0]!, correctValue);
    clickButton(fixture, root, /Question suivante/);
    await fixture.whenStable();
    fixture.detectChanges();
    expect(root.textContent).toContain('Question 2 sur 5');
    expect(root.querySelector('.feedback')).toBeNull();
    expect(TestBed.inject(DOCUMENT).activeElement?.getAttribute('data-focus')).toBe('question');
  });

  it('affiche 5 sur 5, le résumé et enregistre le résultat', async () => {
    const { fixture, root } = await render();
    await playAll(fixture, root, correctValue);

    expect(root.querySelector('h2')?.textContent).toContain('Votre score : 5 sur 5');
    expect(root.querySelector('[role="img"]')?.textContent.trim()).toBe('✅✅✅✅✅');
    expect(root.querySelector('[role="img"]')?.getAttribute('aria-label')).toContain(
      'question 1 : bonne',
    );
    expect(root.textContent).toContain('Sans faute');
    const saved = TestBed.inject(ProgressStore).resultFor('histoire', DATE);
    expect(saved?.score).toBe(5);
    expect(saved?.answers).toHaveLength(5);
  });

  it('compte les erreurs : 0 sur 5 reste encourageant', async () => {
    const { fixture, root } = await render();
    await playAll(fixture, root, wrongValue);
    expect(root.querySelector('h2')?.textContent).toContain('Votre score : 0 sur 5');
    expect(root.querySelector('[role="img"]')?.textContent.trim()).toBe('❌❌❌❌❌');
    expect(root.textContent).toContain('Pas grave');
  });

  it('rejouer repart de zéro sans écraser le premier résultat', async () => {
    const { fixture, root } = await render();
    await playAll(fixture, root, correctValue);
    clickButton(fixture, root, /Rejouer/);
    await fixture.whenStable();
    fixture.detectChanges();
    expect(root.textContent).toContain('Question 1 sur 5');

    await playAll(fixture, root, wrongValue);
    expect(TestBed.inject(ProgressStore).resultFor('histoire', DATE)?.score).toBe(5);
  });

  it('retrouve directement le score d’un quiz déjà joué', async () => {
    TestBed.inject(ProgressStore).record('histoire', DATE, {
      score: 3,
      answers: questions.map(correctValue),
    });
    const { root } = await render();
    await new Promise((resolve) => setTimeout(resolve));
    expect(root.querySelector('h2')?.textContent).toContain('Votre score');
  });

  it('copie le résultat quand le partage natif n’existe pas', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true });
    Object.defineProperty(navigator, 'share', { value: undefined, configurable: true });
    const { fixture, root } = await render();
    await playAll(fixture, root, correctValue);

    clickButton(fixture, root, /Partager/);
    await fixture.whenStable();
    fixture.detectChanges();
    expect(writeText).toHaveBeenCalledOnce();
    const text = String(writeText.mock.calls[0]?.[0]);
    expect(text).toContain('Quizz du jour');
    expect(text).toContain('5/5 ✅✅✅✅✅');
    expect(root.textContent).toContain('presse-papiers');
  });

  it('utilise le partage natif quand il existe', async () => {
    const share = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'share', { value: share, configurable: true });
    const { fixture, root } = await render();
    await playAll(fixture, root, correctValue);
    clickButton(fixture, root, /Partager/);
    await fixture.whenStable();
    expect(share).toHaveBeenCalledOnce();
  });

  it('propose les autres thèmes à la fin, sans le thème courant', async () => {
    const { fixture, root } = await render();
    await playAll(fixture, root, correctValue);
    const links = [...root.querySelectorAll('.other-quizzes a')].map((link) =>
      link.getAttribute('href'),
    );
    expect(links).toHaveLength(5);
    expect(links).not.toContain('/quiz/histoire');
  });
});
