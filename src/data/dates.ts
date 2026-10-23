import type { IsoDate } from './quiz.types';

const ISO_DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;
const MS_PER_DAY = 86_400_000;

/** Premier jour du service : les archives publiques commencent ici. */
export const LAUNCH_DATE = '2026-10-23' as IsoDate;

/** Le « jour » d'un quiz est celui de Paris, pour que tout le monde joue le même quiz. */
const PARIS_DAY_FORMAT = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Europe/Paris',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

export function isIsoDate(value: string): value is IsoDate {
  const match = ISO_DATE_PATTERN.exec(value);
  if (!match) return false;
  const [, year, month, day] = match;
  const date = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)));
  return date.toISOString().startsWith(value);
}

export function toIsoDate(date: Date): IsoDate {
  const value = PARIS_DAY_FORMAT.format(date);
  if (!isIsoDate(value)) throw new Error(`Date invalide : ${value}`);
  return value;
}

/** Nombre de jours écoulés depuis le 1970-01-01 (UTC) : base du tirage déterministe. */
export function dayIndex(date: IsoDate): number {
  return Math.floor(Date.parse(`${date}T00:00:00Z`) / MS_PER_DAY);
}

export function addDays(date: IsoDate, days: number): IsoDate {
  const shifted = new Date(Date.parse(`${date}T00:00:00Z`) + days * MS_PER_DAY);
  return shifted.toISOString().slice(0, 10) as IsoDate;
}

/** Toutes les dates de `from` à `to` incluses, dans l'ordre croissant. */
export function dateRange(from: IsoDate, to: IsoDate): IsoDate[] {
  const dates: IsoDate[] = [];
  for (let day = from; day <= to; day = addDays(day, 1)) dates.push(day);
  return dates;
}

export function formatLongDate(date: IsoDate): string {
  return new Intl.DateTimeFormat('fr-FR', {
    timeZone: 'UTC',
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(`${date}T00:00:00Z`));
}

/** « 23 octobre 2026 » : forme courte, utilisée dans les titres de page. */
export function formatDate(date: IsoDate): string {
  return new Intl.DateTimeFormat('fr-FR', {
    timeZone: 'UTC',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(`${date}T00:00:00Z`));
}
