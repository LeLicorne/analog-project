import { AI_TRAINING_CRAWLERS, SEARCH_AND_ANSWER_CRAWLERS } from './crawlers';
import { buildRobotsTxt } from './robots';

const robots = buildRobotsTxt('https://quizz.example');

function groupOf(userAgent: string): string {
  const block = robots
    .split('\n\n')
    .find((entry) => entry.startsWith(`User-agent: ${userAgent}\n`));
  return block ?? '';
}

describe('robots.txt', () => {
  it('déclare le sitemap en URL absolue', () => {
    expect(robots).toContain('Sitemap: https://quizz.example/sitemap.xml');
  });

  it('autorise le site à tous les robots et protège /api/', () => {
    expect(groupOf('*')).toContain('Allow: /');
    expect(groupOf('*')).toContain('Disallow: /api/');
  });

  it('autorise explicitement les robots de recherche et de réponse IA', () => {
    for (const bot of SEARCH_AND_ANSWER_CRAWLERS) {
      expect(groupOf(bot), bot).toContain('Allow: /');
    }
    expect(groupOf('OAI-SearchBot')).not.toContain('Disallow: /\n');
  });

  it('répète les interdictions dans chaque groupe nommé', () => {
    for (const bot of [...SEARCH_AND_ANSWER_CRAWLERS, ...AI_TRAINING_CRAWLERS]) {
      expect(groupOf(bot), bot).toContain('Disallow: /api/');
    }
  });

  it('ne bloque pas les pages de compte : leur noindex doit pouvoir être lu', () => {
    expect(robots).not.toContain('/connexion');
    expect(robots).not.toContain('/inscription');
  });
});
