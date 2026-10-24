/**
 * Génère public/og-image.png (1200x630), l'image affichée quand une page est partagée, au style « BD » du site.
 * Usage : bun scripts/generate-og-image.ts
 */
import { chromium } from '@playwright/test';

import type { ThemeSlug } from '../src/data/quiz.types';
import { THEMES } from '../src/data/themes';

const INK = '#1a1a2e';
const THEME_COLORS: Record<ThemeSlug, string> = {
  'culture-generale': '#ff8fb1',
  histoire: '#ffa94d',
  geographie: '#6fd08c',
  sciences: '#6ec6ff',
  web: '#b49cff',
  gaming: '#ff6b6b',
};

const chips = THEMES.map(
  (theme) =>
    `<li style="display:flex;align-items:center;gap:10px;background:${THEME_COLORS[theme.slug]};border:4px solid ${INK};border-radius:16px;padding:8px 18px;box-shadow:5px 5px 0 ${INK}"><span>${theme.icon}</span>${theme.name}</li>`,
).join('');

const html = `<!doctype html>
<html lang="fr"><body style="margin:0;width:1200px;height:630px;box-sizing:border-box;padding:64px 72px;
background-color:#fff4c2;background-image:radial-gradient(#f1de98 3px,transparent 3.4px);background-size:36px 36px;color:${INK};
font-family:system-ui,-apple-system,'Segoe UI',Arial,sans-serif;display:flex;flex-direction:column;justify-content:space-between">
  <div>
    <h1 style="display:inline-block;margin:0;padding:12px 36px;background:#ffd23f;border:6px solid ${INK};border-radius:28px;box-shadow:10px 10px 0 ${INK};font-size:112px;line-height:1.1;font-weight:900">Quizz du jour</h1>
    <div style="position:relative;margin-top:44px;padding:20px 30px;background:#fff;border:5px solid ${INK};border-radius:24px;box-shadow:8px 8px 0 ${INK};font-size:38px;font-weight:700;max-width:900px">
      Un nouveau quiz chaque jour : 5 questions, réponses expliquées et sourcées.
      <div style="position:absolute;top:-17px;left:60px;width:28px;height:28px;background:#fff;border-top:5px solid ${INK};border-left:5px solid ${INK};transform:rotate(45deg)"></div>
    </div>
  </div>
  <ul style="display:flex;flex-wrap:wrap;gap:18px;list-style:none;margin:0;padding:0;font-size:30px;font-weight:800">${chips}</ul>
</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html);
await page.screenshot({ path: 'public/og-image.png', type: 'png' });
await browser.close();
process.stdout.write('public/og-image.png généré\n');
