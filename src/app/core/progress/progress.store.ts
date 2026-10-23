import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, afterNextRender, computed, inject, signal } from '@angular/core';

import { isIsoDate, toIsoDate } from '@data/dates';
import type { IsoDate, ThemeSlug } from '@data/quiz.types';
import { computeStreak } from '@data/streak';

const STORAGE_KEY = 'quizz-du-jour:progress:v1';

export interface QuizResult {
  readonly score: number;
  readonly answers: readonly (number | boolean)[];
}

export type QuizResults = Readonly<Record<string, QuizResult>>;

interface StoredState {
  readonly version: 1;
  readonly results: QuizResults;
}

function isQuizResult(value: unknown): value is QuizResult {
  if (typeof value !== 'object' || value === null) return false;
  const { score, answers } = value as { score?: unknown; answers?: unknown };
  return (
    typeof score === 'number' &&
    Number.isInteger(score) &&
    score >= 0 &&
    Array.isArray(answers) &&
    answers.every(
      (answer) =>
        typeof answer === 'boolean' || (typeof answer === 'number' && Number.isInteger(answer)),
    )
  );
}

/**
 * Valide les résultats lus dans le stockage local ou dans Firestore (données non fiables).
 * Écrit à la main plutôt qu'avec Zod : Zod pesait ~25 ko compressés dans le chemin critique de chaque page.
 */
export function parseResults(value: unknown): QuizResults | null {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) return null;
  const entries = Object.entries(value);
  return entries.every(([, result]) => isQuizResult(result)) ? (value as QuizResults) : null;
}

const EMPTY_STATE: StoredState = { version: 1, results: {} };

function resultKey(theme: ThemeSlug, date: IsoDate): string {
  return `${theme}:${date}`;
}

function readStorage(): StoredState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY_STATE;
    const stored = JSON.parse(raw) as { version?: unknown; results?: unknown };
    const results = stored.version === 1 ? parseResults(stored.results) : null;
    return results ? { version: 1, results } : EMPTY_STATE;
  } catch {
    return EMPTY_STATE;
  }
}

function writeStorage(state: StoredState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Stockage indisponible (navigation privée, quota) : la progression reste en mémoire.
  }
}

/**
 * Progression du joueur, stockée dans le navigateur uniquement.
 * Le serveur et la première passe du client partent d'un état vide : le contenu hydraté est identique,
 * puis `ready` passe à `true` quand le stockage a été lu.
 */
@Injectable({ providedIn: 'root' })
export class ProgressStore {
  private readonly state = signal<StoredState>(EMPTY_STATE);

  readonly ready = signal(false);

  readonly results = computed<QuizResults>(() => this.state().results);

  readonly playedDates = computed<IsoDate[]>(() => {
    const dates = Object.keys(this.state().results)
      .map((key) => key.split(':')[1] ?? '')
      .filter(isIsoDate);
    return [...new Set(dates)];
  });

  readonly streak = computed(() => computeStreak(this.playedDates(), toIsoDate(new Date())));

  constructor() {
    const isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
    // `afterNextRender` s'exécute aussi pendant le rendu serveur : sans ce test, `ready` serait déjà vrai dans le HTML.
    afterNextRender(() => {
      if (!isBrowser) return;
      this.state.set(readStorage());
      this.ready.set(true);
    });
  }

  resultFor(theme: ThemeSlug, date: IsoDate): QuizResult | undefined {
    return this.state().results[resultKey(theme, date)];
  }

  /** Enregistre le premier résultat d'un quiz ; rejouer ne l'écrase pas. */
  record(theme: ThemeSlug, date: IsoDate, result: QuizResult): void {
    const key = resultKey(theme, date);
    if (this.state().results[key]) return;
    const next: StoredState = {
      version: 1,
      results: {
        ...this.state().results,
        [key]: { score: result.score, answers: [...result.answers] },
      },
    };
    this.state.set(next);
    writeStorage(next);
  }

  /** Remplace tous les résultats (fusion avec le compte à la connexion). */
  replaceAll(results: QuizResults): void {
    const next: StoredState = { version: 1, results: { ...results } };
    this.state.set(next);
    writeStorage(next);
  }

  /** Efface la progression locale (déconnexion : l'appareil peut être partagé). */
  clear(): void {
    this.state.set(EMPTY_STATE);
    writeStorage(EMPTY_STATE);
  }
}
