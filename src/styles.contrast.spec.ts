import { readFileSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Les contrastes de `src/styles.css` sont une promesse d'accessibilité (WCAG 1.4.3 et 1.4.11) : ce test la tient.
 * Il lit les jetons de couleur dans le CSS lui-même, clair et sombre, et échoue si un jeton passe sous le seuil.
 */

const css = readFileSync(join(process.cwd(), 'src/styles.css'), 'utf8');

function readTokens(block: string): Record<string, string> {
  const tokens: Record<string, string> = {};
  for (const match of block.matchAll(/--([a-z0-9-]+):\s*(#[0-9a-fA-F]{6})\s*;/g)) {
    tokens[match[1] ?? ''] = (match[2] ?? '').toLowerCase();
  }
  return tokens;
}

const lightBlock = /:root\s*\{([^}]*)\}/.exec(css)?.[1] ?? '';
const darkBlock =
  /@media \(prefers-color-scheme: dark\)\s*\{\s*:root\s*\{([^}]*)\}/.exec(css)?.[1] ?? '';

const LIGHT = readTokens(lightBlock);
const DARK = { ...LIGHT, ...readTokens(darkBlock) };

function luminance(hex: string): number {
  const [red = 0, green = 0, blue = 0] = [1, 3, 5].map((start) => {
    const channel = parseInt(hex.slice(start, start + 2), 16) / 255;
    return channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

function ratio(foreground: string, background: string): number {
  const [light, dark] = [luminance(foreground), luminance(background)].sort((a, b) => b - a);
  return ((light ?? 0) + 0.05) / ((dark ?? 0) + 0.05);
}

const TEXT = 4.5;
const COMPONENT = 3;

const THEMES = ['culture-generale', 'histoire', 'geographie', 'sciences', 'web', 'gaming'] as const;

interface Pair {
  readonly label: string;
  readonly foreground: string;
  readonly background: string;
  readonly minimum: number;
}

const PAIRS: readonly Pair[] = [
  // Texte (WCAG 1.4.3 : 4,5:1)
  { label: 'texte sur le fond', foreground: 'ink', background: 'bg', minimum: TEXT },
  { label: 'texte sur une surface', foreground: 'ink', background: 'surface', minimum: TEXT },
  { label: 'texte atténué sur le fond', foreground: 'muted', background: 'bg', minimum: TEXT },
  {
    label: 'texte atténué sur une surface',
    foreground: 'muted',
    background: 'surface',
    minimum: TEXT,
  },
  { label: 'lien sur le fond', foreground: 'link', background: 'bg', minimum: TEXT },
  { label: 'lien sur une surface', foreground: 'link', background: 'surface', minimum: TEXT },
  {
    label: 'texte du bouton principal',
    foreground: 'on-primary',
    background: 'primary',
    minimum: TEXT,
  },
  { label: 'texte sur l’accent', foreground: 'on-accent', background: 'accent', minimum: TEXT },
  { label: 'texte d’une bonne réponse', foreground: 'ink', background: 'ok-bg', minimum: TEXT },
  { label: 'texte d’une mauvaise réponse', foreground: 'ink', background: 'ko-bg', minimum: TEXT },
  ...THEMES.map((theme) => ({
    label: `texte sur le bandeau du thème ${theme}`,
    foreground: 'on-theme',
    background: `theme-${theme}`,
    minimum: TEXT,
  })),
  // Composants et indicateurs (WCAG 1.4.11 : 3:1)
  { label: 'contour sur le fond', foreground: 'border', background: 'bg', minimum: COMPONENT },
  {
    label: 'contour sur une surface',
    foreground: 'border',
    background: 'surface',
    minimum: COMPONENT,
  },
  {
    label: 'anneau de focus sur le fond',
    foreground: 'focus',
    background: 'bg',
    minimum: COMPONENT,
  },
  {
    label: 'anneau de focus sur une surface',
    foreground: 'focus',
    background: 'surface',
    minimum: COMPONENT,
  },
  {
    label: 'bordure « bonne réponse » sur le fond',
    foreground: 'ok-border',
    background: 'bg',
    minimum: COMPONENT,
  },
  {
    label: 'bordure « mauvaise réponse » sur le fond',
    foreground: 'ko-border',
    background: 'bg',
    minimum: COMPONENT,
  },
  {
    label: 'bordure « bonne réponse » sur son fond',
    foreground: 'ok-border',
    background: 'ok-bg',
    minimum: COMPONENT,
  },
  {
    label: 'bordure « mauvaise réponse » sur son fond',
    foreground: 'ko-border',
    background: 'ko-bg',
    minimum: COMPONENT,
  },
];

const SCHEMES = [
  ['clair', LIGHT],
  ['sombre', DARK],
] as const;

describe('jetons de couleur de styles.css', () => {
  it('définit tous les jetons nécessaires aux deux thèmes', () => {
    const required = new Set(PAIRS.flatMap((pair) => [pair.foreground, pair.background]));
    for (const [name, tokens] of SCHEMES) {
      const missing = [...required].filter((token) => !(token in tokens));
      expect(missing, `jetons absents en thème ${name}`).toEqual([]);
    }
  });

  describe.each(SCHEMES)('thème %s', (_name, tokens) => {
    it.each(PAIRS.map((pair) => [pair.label, pair] as const))('%s', (_label, pair) => {
      const foreground = tokens[pair.foreground] ?? '#000000';
      const background = tokens[pair.background] ?? '#000000';
      const value = ratio(foreground, background);
      expect(
        value,
        `${pair.foreground} (${foreground}) sur ${pair.background} (${background}) : ${value.toFixed(2)}:1, minimum ${String(pair.minimum)}:1`,
      ).toBeGreaterThanOrEqual(pair.minimum);
    });
  });
});
