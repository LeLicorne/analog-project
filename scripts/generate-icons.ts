/**
 * Génère les icônes de l'application dans public/icons, au style « BD » du site : une bulle de dialogue blanche à gros
 * contour et ombre dure, posée sur fond jaune, avec la lettre Q.
 * Usage : bun scripts/generate-icons.ts
 *
 * Le motif tient dans les 60 % centraux : les systèmes qui découpent l'icône en cercle ou en squircle
 * (icônes « maskable ») n'en coupent aucune partie.
 */
import { chromium } from '@playwright/test';

const INK = '#1a1a2e';
const ACCENT = '#ffd23f';
const FONT = "system-ui,-apple-system,'Segoe UI',Arial,sans-serif";

function quizIcon(size: number): string {
  const stroke = Math.max(2, Math.round(size * 0.035));
  const tail = size * 0.11;
  return `<body style="margin:0;width:${size}px;height:${size}px;background:${ACCENT};position:relative;overflow:hidden">
    <div style="position:absolute;left:22%;top:19%;width:56%;height:44%;box-sizing:border-box;background:#fff;border:${stroke}px solid ${INK};border-radius:${size * 0.12}px;box-shadow:${stroke * 1.4}px ${stroke * 1.4}px 0 ${INK};display:flex;align-items:center;justify-content:center;font:900 ${size * 0.34}px ${FONT};color:${INK};line-height:1">Q</div>
    <div style="position:absolute;left:32%;top:calc(63% - ${tail / 2}px);width:${tail}px;height:${tail}px;box-sizing:border-box;background:#fff;border-right:${stroke}px solid ${INK};border-bottom:${stroke}px solid ${INK};transform:rotate(45deg)"></div>
  </body>`;
}

/** Badge de notification : forme blanche sur fond transparent (Android n'en garde que la silhouette). */
function badge(size: number): string {
  return `<body style="margin:0;width:${size}px;height:${size}px;background:transparent;display:flex;align-items:center;justify-content:center">
    <div style="font:900 ${size * 0.8}px ${FONT};color:#fff;line-height:1">Q</div></body>`;
}

const ICONS = [
  { file: 'icon-192.png', size: 192, html: quizIcon(192), transparent: false },
  { file: 'icon-512.png', size: 512, html: quizIcon(512), transparent: false },
  { file: 'icon-maskable-512.png', size: 512, html: quizIcon(512), transparent: false },
  { file: 'apple-touch-icon.png', size: 180, html: quizIcon(180), transparent: false },
  { file: 'badge-96.png', size: 96, html: badge(96), transparent: true },
] as const;

const browser = await chromium.launch();
for (const icon of ICONS) {
  const tab = await browser.newPage({ viewport: { width: icon.size, height: icon.size } });
  await tab.setContent(`<!doctype html><html>${icon.html}</html>`);
  await tab.screenshot({ path: `public/icons/${icon.file}`, omitBackground: icon.transparent });
  await tab.close();
}
await browser.close();
process.stdout.write(`${ICONS.length} icônes générées dans public/icons\n`);
