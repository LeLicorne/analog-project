/**
 * Génère les icônes de l'application dans public/icons.
 * Usage : bun scripts/generate-icons.ts
 *
 * Le motif tient dans les 60 % centraux : les systèmes qui découpent l'icône en cercle ou en squircle
 * (icônes « maskable ») n'en coupent aucune partie.
 */
import { chromium } from '@playwright/test';

const INK = '#1a1a2e';
const ACCENT = '#ffd23f';

function page(size: number, glyph: 'quiz' | 'badge'): string {
  if (glyph === 'badge') {
    // Badge de notification : forme blanche sur fond transparent (Android n'en garde que la silhouette).
    return `<body style="margin:0;width:${size}px;height:${size}px;background:transparent;display:flex;align-items:center;justify-content:center">
      <div style="font:800 ${size * 0.8}px system-ui,sans-serif;color:#fff;line-height:1">Q</div></body>`;
  }
  return `<body style="margin:0;width:${size}px;height:${size}px;background:${ACCENT};display:flex;align-items:center;justify-content:center;position:relative">
    <div style="font:800 ${size * 0.55}px system-ui,-apple-system,'Segoe UI',sans-serif;color:${INK};line-height:1;margin-top:-${size * 0.02}px">Q</div>
    <div style="position:absolute;right:${size * 0.2}px;bottom:${size * 0.2}px;width:${size * 0.2}px;height:${size * 0.2}px;border-radius:50%;background:${INK};color:${ACCENT};display:flex;align-items:center;justify-content:center;font:800 ${size * 0.14}px system-ui,sans-serif">?</div>
  </body>`;
}

const ICONS = [
  { file: 'icon-192.png', size: 192, glyph: 'quiz' },
  { file: 'icon-512.png', size: 512, glyph: 'quiz' },
  { file: 'icon-maskable-512.png', size: 512, glyph: 'quiz' },
  { file: 'apple-touch-icon.png', size: 180, glyph: 'quiz' },
  { file: 'badge-96.png', size: 96, glyph: 'badge' },
] as const;

const browser = await chromium.launch();
for (const icon of ICONS) {
  const tab = await browser.newPage({ viewport: { width: icon.size, height: icon.size } });
  await tab.setContent(`<!doctype html><html>${page(icon.size, icon.glyph)}</html>`);
  await tab.screenshot({
    path: `public/icons/${icon.file}`,
    omitBackground: icon.glyph === 'badge',
  });
  await tab.close();
}
await browser.close();
process.stdout.write(`${ICONS.length} icônes générées dans public/icons\n`);
