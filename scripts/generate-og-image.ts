/**
 * Génère public/og-image.png (1200x630), l'image affichée quand une page est partagée.
 * Usage : bun scripts/generate-og-image.ts
 */
import { chromium } from '@playwright/test';

import { THEMES } from '../src/data/themes';

const chips = THEMES.map((theme) => `<li><span>${theme.icon}</span>${theme.name}</li>`).join('');

const html = `<!doctype html>
<html lang="fr"><body style="margin:0;width:1200px;height:630px;box-sizing:border-box;padding:72px;
background:#fffdf7;color:#1a1a2e;font-family:system-ui,-apple-system,'Segoe UI',Arial,sans-serif;
display:flex;flex-direction:column;justify-content:space-between;border:14px solid #1a1a2e">
  <div>
    <div style="display:inline-block;background:#ffd23f;padding:8px 22px;border-radius:999px;font-size:30px;font-weight:700">5 questions · 6 thèmes · gratuit</div>
    <h1 style="font-size:112px;line-height:1.05;margin:24px 0 10px">Quizz du jour</h1>
    <p style="font-size:38px;margin:0;color:#4a4a63">Un nouveau quiz chaque jour, réponses expliquées et sourcées.</p>
  </div>
  <ul style="display:flex;flex-wrap:wrap;gap:14px;list-style:none;margin:0;padding:0;font-size:30px;font-weight:700">${chips.replaceAll('<li>', '<li style="border:3px solid #1a1a2e;border-radius:14px;padding:8px 18px;background:#fff">').replaceAll('<span>', '<span style="margin-right:10px">')}</ul>
</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html);
await page.screenshot({ path: 'public/og-image.png', type: 'png' });
await browser.close();
process.stdout.write('public/og-image.png généré\n');
