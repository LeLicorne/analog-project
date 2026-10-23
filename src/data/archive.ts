import { LAUNCH_DATE, addDays, dateRange } from './dates';
import type { IsoDate } from './quiz.types';

/** Dates des quiz passés, du plus ancien au plus récent : chaque jour a sa page publique. */
export function archiveDates(today: IsoDate): IsoDate[] {
  return dateRange(LAUNCH_DATE, addDays(today, -1));
}
