import { AI_TRAINING_CRAWLERS, ALLOW_AI_TRAINING, SEARCH_AND_ANSWER_CRAWLERS } from './crawlers';

/**
 * Chemins interdits aux robots. Les pages de compte n'y figurent PAS volontairement : elles sont en `noindex`,
 * et un robot ne peut lire ce `noindex` que s'il a le droit de charger la page.
 */
const DISALLOWED_PATHS = ['/api/'] as const;

function group(userAgent: string, blocked: boolean): string[] {
  if (blocked) return [`User-agent: ${userAgent}`, 'Disallow: /', ''];
  // Un robot qui a son propre groupe ignore le groupe `*` : les interdictions doivent être répétées.
  return [
    `User-agent: ${userAgent}`,
    'Allow: /',
    ...DISALLOWED_PATHS.map((path) => `Disallow: ${path}`),
    '',
  ];
}

export function buildRobotsTxt(siteUrl: string): string {
  const lines = [
    ...group('*', false),
    ...SEARCH_AND_ANSWER_CRAWLERS.flatMap((bot) => group(bot, false)),
    ...AI_TRAINING_CRAWLERS.flatMap((bot) => group(bot, !ALLOW_AI_TRAINING)),
    `Sitemap: ${siteUrl}/sitemap.xml`,
    '',
  ];
  return lines.join('\n');
}
