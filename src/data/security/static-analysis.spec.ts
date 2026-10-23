import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

/** Contrôles statiques sur le code source : ce que l'ESLint ne voit pas (gabarits, documents, fichiers de config). */

const ROOT = process.cwd();
const SCANNED_DIRS = ['src', 'e2e', 'scripts', 'docs', 'rules-tests', 'public'];
const SCANNED_FILES = [
  '.env.example',
  'AGENTS.md',
  'README.md',
  'firebase.json',
  'firestore.rules',
  'package.json',
];
const TEXT_EXTENSIONS = /\.(ts|html|css|md|json|txt|rules|example|js|mjs|svg)$/;

function listFiles(directory: string): string[] {
  return readdirSync(directory).flatMap((name) => {
    const path = join(directory, name);
    if (statSync(path).isDirectory()) return listFiles(path);
    return TEXT_EXTENSIONS.test(name) || name === '.env.example' ? [path] : [];
  });
}

const files = [
  ...SCANNED_DIRS.flatMap((directory) => {
    try {
      return listFiles(join(ROOT, directory));
    } catch {
      return [];
    }
  }),
  ...SCANNED_FILES.map((file) => join(ROOT, file)),
].filter((path) => !path.endsWith('static-analysis.spec.ts'));

function filesMatching(pattern: RegExp, onlyApp = false): string[] {
  return files
    .filter((path) => !onlyApp || /[\\/]src[\\/]/.test(path))
    .filter((path) => {
      try {
        return pattern.test(readFileSync(path, 'utf8'));
      } catch {
        return false;
      }
    })
    .map((path) => relative(ROOT, path));
}

describe('secrets', () => {
  const PATTERNS: Record<string, RegExp> = {
    'clé API Google': /AIza[0-9A-Za-z_-]{35}/,
    'clé privée': /-----BEGIN [A-Z ]*PRIVATE KEY-----/,
    'clé Stripe': /\b[sr]k_(live|test)_[0-9a-zA-Z]{16,}/,
    'jeton GitHub': /\bgh[pousr]_[0-9A-Za-z]{36,}/,
    'jeton Slack': /\bxox[baprs]-[0-9A-Za-z-]{10,}/,
    'clé AWS': /\bAKIA[0-9A-Z]{16}\b/,
  };

  it.each(Object.entries(PATTERNS))('aucun(e) %s dans le dépôt', (_name, pattern) => {
    expect(filesMatching(pattern)).toEqual([]);
  });

  it('.env.example ne contient aucune valeur secrète', () => {
    const lines = readFileSync(join(ROOT, '.env.example'), 'utf8')
      .split('\n')
      .filter((line) => line.includes('=') && !line.startsWith('#'));
    const secretLike = lines.filter((line) =>
      /KEY|SECRET|TOKEN|PASSWORD/i.test(line.split('=')[0] ?? ''),
    );
    expect(secretLike.length).toBeGreaterThan(0);
    expect(secretLike.every((line) => (line.split('=')[1] ?? '').trim() === '')).toBe(true);
  });

  it('les fichiers .env réels sont ignorés par git, sauf .env.example', () => {
    const gitignore = readFileSync(join(ROOT, '.gitignore'), 'utf8').split('\n');
    expect(gitignore).toContain('.env*');
    expect(gitignore).toContain('!.env.example');
  });
});

describe('contournements de la sanitisation (XSS)', () => {
  it.each([
    ['innerHTML', /innerHTML|outerHTML/],
    ['bypassSecurityTrust', /bypassSecurityTrust/],
    ['insertAdjacentHTML', /insertAdjacentHTML/],
    ['document.write', /document\.write/],
    ['eval ou new Function', /\beval\s*\(|new Function\s*\(/],
  ])('aucun %s dans le code applicatif', (_name, pattern) => {
    expect(filesMatching(pattern, true)).toEqual([]);
  });

  it('aucun gestionnaire d’événement ni style inline dans les gabarits', () => {
    expect(filesMatching(/<[a-z][^>]*\s(on[a-z]+|style)=["']/i, true)).toEqual([]);
  });

  it('tout lien qui ouvre un nouvel onglet porte rel="noopener noreferrer"', () => {
    const offenders = files
      .filter((path) => /[\\/]src[\\/].*\.ts$/.test(path))
      .flatMap((path) => {
        const source = readFileSync(path, 'utf8');
        return [...source.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g)]
          .filter((match) => !match[0].includes('noopener'))
          .map(() => relative(ROOT, path));
      });
    expect(offenders).toEqual([]);
  });
});
