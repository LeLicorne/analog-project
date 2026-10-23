import { dayIndex } from './dates';
import type { IsoDate, Question, ThemeSlug } from './quiz.types';

export const QUESTIONS_PER_QUIZ = 5;

/** FNV-1a 32 bits : transforme un texte en graine numérique. */
function hashSeed(text: string): number {
  let hash = 0x811c9dc5;
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }
  return hash >>> 0;
}

/** mulberry32 : petit générateur pseudo-aléatoire déterministe. */
function createRandom(seed: number): () => number {
  let state = seed;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let value = Math.imul(state ^ (state >>> 15), 1 | state);
    value = (value + Math.imul(value ^ (value >>> 7), 61 | value)) ^ value;
    return ((value ^ (value >>> 14)) >>> 0) / 4_294_967_296;
  };
}

function shuffle<T>(items: readonly T[], random: () => number): T[] {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    const current = copy[index] as T;
    copy[index] = copy[swapIndex] as T;
    copy[swapIndex] = current;
  }
  return copy;
}

/** Nombre de jours avant que toutes les questions du thème aient été proposées une fois. */
export function cycleLength(poolSize: number): number {
  return Math.floor(poolSize / QUESTIONS_PER_QUIZ);
}

/**
 * Quiz d'un thème pour un jour donné : identique pour tous les joueurs, sans backend.
 * Chaque cycle mélange le thème avec une graine différente et ne répète aucune question dans le cycle.
 */
export function dailyQuestions(
  pool: readonly Question[],
  theme: ThemeSlug,
  date: IsoDate,
): Question[] {
  const length = cycleLength(pool.length);
  if (length === 0) throw new Error(`Pas assez de questions pour le thème ${theme}`);
  const day = dayIndex(date);
  const cycle = Math.floor(day / length);
  const position = day - cycle * length;
  const order = shuffle(pool, createRandom(hashSeed(`${theme}:${cycle}`)));
  return order.slice(position * QUESTIONS_PER_QUIZ, (position + 1) * QUESTIONS_PER_QUIZ);
}
