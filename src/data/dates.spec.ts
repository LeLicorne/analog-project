import { addDays, dateRange, dayIndex, isIsoDate, toIsoDate } from './dates';
import type { IsoDate } from './quiz.types';

const d = (value: string): IsoDate => {
  if (!isIsoDate(value)) throw new Error(value);
  return value;
};

describe('dates', () => {
  it('valide les dates calendaires', () => {
    expect(isIsoDate('2026-10-23')).toBe(true);
    expect(isIsoDate('2024-02-29')).toBe(true);
    expect(isIsoDate('2026-02-29')).toBe(false);
    expect(isIsoDate('2026-13-01')).toBe(false);
    expect(isIsoDate('23/10/2026')).toBe(false);
    expect(isIsoDate('2026-1-5')).toBe(false);
  });

  it('calcule le jour de Paris, pas celui de UTC', () => {
    expect(toIsoDate(new Date('2026-10-23T22:30:00Z'))).toBe('2026-10-24');
    expect(toIsoDate(new Date('2026-10-23T10:00:00Z'))).toBe('2026-10-23');
  });

  it('avance et recule en passant les fins de mois et d’année', () => {
    expect(addDays(d('2026-12-31'), 1)).toBe('2027-01-01');
    expect(addDays(d('2026-03-01'), -1)).toBe('2026-02-28');
  });

  it('donne des index de jour consécutifs', () => {
    expect(dayIndex(d('2026-10-24')) - dayIndex(d('2026-10-23'))).toBe(1);
  });

  it('liste les dates de from à to incluses', () => {
    expect(dateRange(d('2026-10-30'), d('2026-11-02'))).toEqual([
      '2026-10-30',
      '2026-10-31',
      '2026-11-01',
      '2026-11-02',
    ]);
    expect(dateRange(d('2026-10-02'), d('2026-10-01'))).toEqual([]);
  });
});
