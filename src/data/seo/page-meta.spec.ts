import { dateRange, LAUNCH_DATE } from '../dates';
import type { IsoDate } from '../quiz.types';
import { THEMES } from '../themes';

import {
  aboutMeta,
  accountMeta,
  archiveMeta,
  fitTitle,
  homeMeta,
  notFoundMeta,
  themeMeta,
  todayMeta,
  type PageMeta,
} from './page-meta';

const MAX_TITLE = 60;
const MIN_DESCRIPTION = 70;
const MAX_DESCRIPTION = 160;

const date = '2026-10-23' as IsoDate;
const lastDay = '2027-12-31' as IsoDate;

function allMeta(): { label: string; meta: PageMeta }[] {
  return [
    { label: 'home', meta: homeMeta() },
    { label: 'about', meta: aboutMeta() },
    { label: 'login', meta: accountMeta('login') },
    { label: 'signup', meta: accountMeta('signup') },
    { label: 'not-found', meta: notFoundMeta() },
    ...THEMES.flatMap((theme) => [
      { label: `theme ${theme.slug}`, meta: themeMeta(theme) },
      { label: `today ${theme.slug}`, meta: todayMeta(theme, date) },
      ...dateRange(LAUNCH_DATE, lastDay)
        .filter((_, index) => index % 17 === 0)
        .map((day) => ({
          label: `archive ${theme.slug} ${day}`,
          meta: archiveMeta(theme, day, 5),
        })),
    ]),
  ];
}

describe('métadonnées de page', () => {
  it.each(allMeta().map(({ label, meta }) => [label, meta] as const))(
    '%s : titre et description tiennent dans les résultats de recherche',
    (_label, meta) => {
      expect(meta.title.length).toBeLessThanOrEqual(MAX_TITLE);
      expect(meta.description.length).toBeGreaterThanOrEqual(MIN_DESCRIPTION);
      expect(meta.description.length).toBeLessThanOrEqual(MAX_DESCRIPTION);
    },
  );

  it('chaque page a un titre unique', () => {
    const titles = allMeta().map(({ meta }) => meta.title);
    const duplicates = titles.filter((title, index) => titles.indexOf(title) !== index);
    expect(duplicates).toEqual([]);
  });

  it('chaque page a une description unique', () => {
    const descriptions = allMeta()
      .filter(({ label }) => !label.startsWith('login') && !label.startsWith('signup'))
      .map(({ meta }) => meta.description);
    const duplicates = descriptions.filter((text, index) => descriptions.indexOf(text) !== index);
    expect(duplicates).toEqual([]);
  });

  it('place le mot-clé du thème au début du titre', () => {
    const histoire = THEMES.find((theme) => theme.slug === 'histoire');
    expect(histoire && themeMeta(histoire).title.startsWith('Quiz Histoire')).toBe(true);
  });

  it('retire le nom du site quand le titre devient trop long', () => {
    expect(fitTitle('Court')).toBe('Court | Quizz du jour');
    const long = 'x'.repeat(55);
    expect(fitTitle(long)).toBe(long);
  });
});
