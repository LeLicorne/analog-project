import { Injectable, afterNextRender, computed, signal } from '@angular/core';
import { z } from 'zod';

import { isIsoDate, toIsoDate } from '@data/dates';
import type { Answer, IsoDate, ThemeSlug } from '@data/quiz.types';
import { computeStreak } from '@data/streak';

const STORAGE_KEY = 'quizz-du-jour:progress:v1';

const storedSchema = z.object({
  version: z.literal(1),
  results: z.record(
    z.string(),
    z.object({
      score: z.number().int().min(0),
      answers: z.array(z.union([z.number().int(), z.boolean()])),
    }),
  ),
});

type StoredState = z.infer<typeof storedSchema>;

export interface QuizResult {
  readonly score: number;
  readonly answers: readonly Answer[];
}

const EMPTY_STATE: StoredState = { version: 1, results: {} };

function resultKey(theme: ThemeSlug, date: IsoDate): string {
  return `${theme}:${date}`;
}

function readStorage(): StoredState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY_STATE;
    const parsed = storedSchema.safeParse(JSON.parse(raw));
    return parsed.success ? parsed.data : EMPTY_STATE;
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

  readonly playedDates = computed<IsoDate[]>(() => {
    const dates = Object.keys(this.state().results)
      .map((key) => key.split(':')[1] ?? '')
      .filter(isIsoDate);
    return [...new Set(dates)];
  });

  readonly streak = computed(() => computeStreak(this.playedDates(), toIsoDate(new Date())));

  constructor() {
    afterNextRender(() => {
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
}
