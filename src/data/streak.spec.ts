import type { IsoDate } from './quiz.types';
import { computeStreak } from './streak';

const days = (...values: string[]): IsoDate[] => values as IsoDate[];
const today = '2026-10-25' as IsoDate;

describe('computeStreak', () => {
  it('vaut 0 sans historique', () => {
    expect(computeStreak([], today)).toBe(0);
  });

  it('compte les jours consécutifs jusqu’à aujourd’hui', () => {
    expect(computeStreak(days('2026-10-23', '2026-10-24', '2026-10-25'), today)).toBe(3);
  });

  it('reste vivante si on a joué hier mais pas encore aujourd’hui', () => {
    expect(computeStreak(days('2026-10-23', '2026-10-24'), today)).toBe(2);
  });

  it('retombe à 0 après un jour entier manqué', () => {
    expect(computeStreak(days('2026-10-22', '2026-10-23'), today)).toBe(0);
  });

  it('s’arrête au premier trou', () => {
    expect(computeStreak(days('2026-10-20', '2026-10-24', '2026-10-25'), today)).toBe(2);
  });
});
