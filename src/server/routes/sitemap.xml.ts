import { defineEventHandler, setHeader } from 'h3';

import { toIsoDate } from '../../data/dates';
import { buildSitemap } from '../../data/seo/sitemap';

const siteUrl = (process.env['SITE_URL'] ?? 'http://localhost:4173').replace(/\/+$/, '');

/** Généré à chaque requête : les corrigés du jour précédent y figurent sans reconstruire le site. */
export default defineEventHandler((event) => {
  setHeader(event, 'Content-Type', 'application/xml; charset=utf-8');
  setHeader(event, 'Cache-Control', 'public, max-age=3600');
  return buildSitemap(siteUrl, toIsoDate(new Date()));
});
