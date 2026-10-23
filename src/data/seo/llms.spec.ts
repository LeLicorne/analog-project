import { THEMES } from '../themes';

import { buildLlmsTxt } from './llms';

const text = buildLlmsTxt('https://quizz.example');

describe('llms.txt', () => {
  it('suit le format llmstxt.org : titre, résumé en citation, sections de liens', () => {
    const lines = text.split('\n');
    expect(lines[0]).toBe('# Quizz du jour');
    expect(lines[2]?.startsWith('> ')).toBe(true);
    expect(lines.filter((line) => line.startsWith('## '))).toHaveLength(3);
  });

  it('liste les 6 thèmes avec des liens absolus', () => {
    for (const theme of THEMES) {
      expect(text).toContain(`(https://quizz.example/themes/${theme.slug})`);
    }
  });

  it('pointe vers le sitemap et la page À propos', () => {
    expect(text).toContain('(https://quizz.example/sitemap.xml)');
    expect(text).toContain('(https://quizz.example/a-propos)');
  });

  it('ne contient aucun lien relatif', () => {
    const links = [...text.matchAll(/\]\(([^)]+)\)/g)].map((match) => match[1]);
    expect(links.every((link) => link?.startsWith('https://quizz.example'))).toBe(true);
  });
});
