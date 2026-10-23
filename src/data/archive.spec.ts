import { archiveDates } from './archive';
import type { IsoDate } from './quiz.types';

describe('archiveDates', () => {
  it('est vide le jour du lancement', () => {
    expect(archiveDates('2026-10-23' as IsoDate)).toEqual([]);
  });

  it('contient les jours passés mais pas aujourd’hui', () => {
    expect(archiveDates('2026-10-25' as IsoDate)).toEqual(['2026-10-23', '2026-10-24']);
  });
});
