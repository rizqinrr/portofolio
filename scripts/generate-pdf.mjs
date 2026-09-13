import { chromium } from 'playwright';
import { mkdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

const DEFAULT_URL = 'http://localhost:4173/portofolio/?print=1';
const targetUrl = process.argv[2] ?? DEFAULT_URL;
const outputPath = path.resolve(projectRoot, 'public/portfolio.pdf');

async function main() {
  await mkdir(path.dirname(outputPath), { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage();

  console.log(`→ Opening ${targetUrl}`);
  await page.goto(targetUrl, { waitUntil: 'networkidle', timeout: 60_000 });

  await page.evaluate(() => document.fonts.ready);

  await page.evaluate(async () => {
    const images = Array.from(document.images);
    await Promise.all(
      images.map((img) =>
        img.complete
          ? Promise.resolve()
          : new Promise((resolve) => {
              img.addEventListener('load', resolve, { once: true });
              img.addEventListener('error', resolve, { once: true });
            }),
      ),
    );
  });

  await page.emulateMedia({ media: 'print' });

  await page.pdf({
    path: outputPath,
    format: 'A4',
    landscape: true,
    printBackground: true,
    margin: { top: '0mm', bottom: '0mm', left: '0mm', right: '0mm' },
  });

  await browser.close();

  const { size } = await stat(outputPath);
  const kb = (size / 1024).toFixed(1);
  console.log(`✓ PDF written: ${outputPath} (${kb} KB)`);
}

main().catch((error) => {
  console.error('✗ Failed to generate PDF:', error);
  process.exitCode = 1;
});
