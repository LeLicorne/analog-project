import { archiveDates } from '../archive';
import type { IsoDate } from '../quiz.types';
import { THEMES } from '../themes';

interface SitemapEntry {
  readonly path: string;
  readonly lastmod: IsoDate;
}

function escapeXml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

/** Pages publiques et indexables : accueil, à propos, thèmes, quiz du jour et corrigés des jours passés. */
export function sitemapEntries(today: IsoDate): SitemapEntry[] {
  const past = archiveDates(today);
  return [
    { path: '/', lastmod: today },
    { path: '/a-propos', lastmod: today },
    { path: '/accessibilite', lastmod: today },
    { path: '/plan-du-site', lastmod: today },
    ...THEMES.flatMap((theme) => [
      { path: `/themes/${theme.slug}`, lastmod: today },
      { path: `/quiz/${theme.slug}`, lastmod: today },
      ...past.map((date) => ({ path: `/quiz/${theme.slug}/${date}`, lastmod: date })),
    ]),
  ];
}

export function buildSitemap(siteUrl: string, today: IsoDate): string {
  const urls = sitemapEntries(today).map(
    (entry) =>
      `  <url><loc>${escapeXml(siteUrl + entry.path)}</loc><lastmod>${entry.lastmod}</lastmod></url>`,
  );
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    '</urlset>',
    '',
  ].join('\n');
}
