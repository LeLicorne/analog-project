import type { IsoDate } from '../quiz.types';

import { buildSitemap, sitemapEntries } from './sitemap';

const today = '2026-10-25' as IsoDate;

describe('sitemap', () => {
  const paths = sitemapEntries(today).map((entry) => entry.path);

  it('contient les pages éditoriales et les 6 thèmes', () => {
    expect(paths).toContain('/');
    expect(paths).toContain('/a-propos');
    expect(paths.filter((path) => path.startsWith('/themes/'))).toHaveLength(6);
    expect(paths.filter((path) => /^\/quiz\/[a-z-]+$/.test(path))).toHaveLength(6);
  });

  it('contient les corrigés des jours passés, pas ceux d’aujourd’hui ni du futur', () => {
    expect(paths).toContain('/quiz/histoire/2026-10-23');
    expect(paths).toContain('/quiz/histoire/2026-10-24');
    expect(paths).not.toContain('/quiz/histoire/2026-10-25');
    expect(paths).not.toContain('/quiz/histoire/2026-10-26');
  });

  it('exclut les pages de compte', () => {
    expect(paths.some((path) => path.includes('connexion') || path.includes('inscription'))).toBe(
      false,
    );
  });

  it('n’a aucun doublon', () => {
    expect(new Set(paths).size).toBe(paths.length);
  });

  it('produit un XML avec des URL absolues et des dates ISO', () => {
    const xml = buildSitemap('https://quizz.example', today);
    expect(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>')).toBe(true);
    expect(xml).toContain(
      '<loc>https://quizz.example/quiz/histoire/2026-10-23</loc><lastmod>2026-10-23</lastmod>',
    );
    expect(xml).not.toMatch(/<loc>(?!https:\/\/quizz\.example)/);
  });
});
