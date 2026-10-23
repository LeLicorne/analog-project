import { defineEventHandler, setHeader } from 'h3';

import { buildRobotsTxt } from '../../data/seo/robots';

const siteUrl = (process.env['SITE_URL'] ?? 'http://localhost:4173').replace(/\/+$/, '');

export default defineEventHandler((event) => {
  setHeader(event, 'Content-Type', 'text/plain; charset=utf-8');
  setHeader(event, 'Cache-Control', 'public, max-age=3600');
  return buildRobotsTxt(siteUrl);
});
