import { defineEventHandler, setHeader } from 'h3';

import { buildLlmsTxt } from '../../data/seo/llms';

const siteUrl = (process.env['SITE_URL'] ?? 'http://localhost:4173').replace(/\/+$/, '');

export default defineEventHandler((event) => {
  setHeader(event, 'Content-Type', 'text/plain; charset=utf-8');
  setHeader(event, 'Cache-Control', 'public, max-age=3600');
  return buildLlmsTxt(siteUrl);
});
