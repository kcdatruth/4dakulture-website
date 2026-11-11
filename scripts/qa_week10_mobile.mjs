import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';

const pagePath = resolve('nfl-week10-2026-integrated-edition-review.html');
const browser = await chromium.launch({ headless: true });
const widths = [360, 390, 768, 1280];
let failed = false;
await mkdir('qa-artifacts/week10', { recursive: true });
try {
  for (const width of widths) {
    const page = await browser.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: 1 });
    await page.goto('file://' + pagePath, { waitUntil: 'load' });
    await page.screenshot({ path: `qa-artifacts/week10/week10-${width}.png`, fullPage: true });
    const result = await page.evaluate(() => {
      const viewport = document.documentElement.clientWidth;
      const overflow = [...document.querySelectorAll('body *')].filter(el => {
        if (el.closest('.rankings-board')) return false;
        const r = el.getBoundingClientRect();
        return r.width > 0 && (r.right > viewport + 2 || r.left < -2);
      }).slice(0, 12).map(el => ({ tag: el.tagName, className: String(el.className).slice(0, 70), text: (el.textContent || '').slice(0, 50) }));
      const boards = [...document.querySelectorAll('.rankings-board')].map(el => ({ scrollWidth: el.scrollWidth, clientWidth: el.clientWidth, keyboardFocusable: el.tabIndex === 0 }));
      return { title: document.title, viewport, documentWidth: document.documentElement.scrollWidth, overflow, boards };
    });
    const ok = result.documentWidth <= width + 2 && result.overflow.length === 0 && result.boards.every(b => b.keyboardFocusable);
    console.log(JSON.stringify({ width, pass: ok, ...result }));
    if (!ok) failed = true;
    await page.close();
  }
} finally { await browser.close(); }
if (failed) process.exitCode = 1;
