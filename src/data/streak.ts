import { addDays } from './dates';
import type { IsoDate } from './quiz.types';

/**
 * Série de jours consécutifs avec au moins un quiz terminé.
 * La série reste vivante tant qu'on a joué hier : elle ne retombe à 0 qu'après un jour entier manqué.
 */
export function computeStreak(playedDates: readonly IsoDate[], today: IsoDate): number {
  const played = new Set(playedDates);
  let cursor = played.has(today) ? today : addDays(today, -1);
  let streak = 0;
  while (played.has(cursor)) {
    streak += 1;
    cursor = addDays(cursor, -1);
  }
  return streak;
}
