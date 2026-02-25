#!/usr/bin/env node

import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { createRequire } from 'node:module';
import { chromium } from 'playwright';

const require = createRequire(import.meta.url);
const projectRoot = process.cwd();
const axeSourcePath = require.resolve('axe-core/axe.min.js');

const fallbackLegalPages = ['legal.html', 'regulamin.html', 'polityka-prywatnosci.html', 'cookies.html'];

async function resolveLegalPage() {
  for (const file of fallbackLegalPages) {
    try {
      await fs.access(path.join(projectRoot, file));
      return file;
    } catch {
      // try next
    }
  }

  return null;
}

async function startStaticServer(rootDir) {
  const server = http.createServer(async (req, res) => {
    try {
      const requestUrl = new URL(req.url ?? '/', 'http://localhost');
      let pathname = decodeURIComponent(requestUrl.pathname);
      if (pathname === '/') pathname = '/index.html';

      const resolvedPath = path.resolve(rootDir, `.${pathname}`);
      const normalizedRoot = path.resolve(rootDir) + path.sep;
      if (!resolvedPath.startsWith(normalizedRoot)) {
        res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Forbidden');
        return;
      }

      const stat = await fs.stat(resolvedPath).catch(() => null);
      if (!stat || !stat.isFile()) {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Not found');
        return;
      }

      const ext = path.extname(resolvedPath).toLowerCase();
      const contentTypes = {
        '.html': 'text/html; charset=utf-8',
        '.css': 'text/css; charset=utf-8',
        '.js': 'text/javascript; charset=utf-8',
        '.json': 'application/json; charset=utf-8',
        '.svg': 'image/svg+xml',
        '.webp': 'image/webp',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.png': 'image/png',
        '.gif': 'image/gif',
        '.ico': 'image/x-icon',
        '.woff': 'font/woff',
        '.woff2': 'font/woff2',
        '.txt': 'text/plain; charset=utf-8',
        '.xml': 'application/xml; charset=utf-8',
        '.webmanifest': 'application/manifest+json; charset=utf-8',
      };

      const body = await fs.readFile(resolvedPath);
      res.writeHead(200, {
        'Content-Type': contentTypes[ext] ?? 'application/octet-stream',
        'Cache-Control': 'no-cache',
      });
      res.end(body);
    } catch {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Server error');
    }
  });

  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', resolve);
  });

  const address = server.address();
  if (!address || typeof address === 'string') {
    throw new Error('Failed to resolve static server address.');
  }

  return {
    server,
    baseUrl: `http://127.0.0.1:${address.port}`,
    close: () => new Promise((resolve, reject) => server.close((error) => (error ? reject(error) : resolve()))),
  };
}

async function runAxe(page, contextLabel, violationsReport) {
  await page.addScriptTag({ path: axeSourcePath });

  const result = await page.evaluate(async () => {
    return window.axe.run(document, {
      runOnly: {
        type: 'tag',
        values: ['cat.aria', 'cat.name-role-value', 'cat.keyboard'],
      },
      resultTypes: ['violations'],
    });
  });

  if (result.violations.length > 0) {
    violationsReport.push({ label: contextLabel, violations: result.violations });
  }
}

async function runScenario(page, baseUrl, route, scenarioLabel, action, violationsReport) {
  const target = `${baseUrl}/${route}`;
  await page.goto(target, { waitUntil: 'networkidle' });
  await action(page);
  await runAxe(page, `${route} :: ${scenarioLabel}`, violationsReport);
}

function printViolationReport(violationsReport) {
  console.error('\nAxe accessibility violations found:');
  for (const pageResult of violationsReport) {
    const grouped = pageResult.violations
      .map((violation) => `- ${pageResult.label} -> ${violation.id} (${violation.nodes.length} node(s))`)
      .join('\n');
    console.error(grouped);
  }
}

async function main() {
  const legalPage = await resolveLegalPage();
  const requiredPages = ['index.html', 'rooms.html', 'gallery.html', 'contact.html'];
  if (legalPage) requiredPages.push(legalPage);

  const server = await startStaticServer(projectRoot);
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1366, height: 900 } });
  const page = await context.newPage();
  const violationsReport = [];

  try {
    for (const route of requiredPages) {
      await runScenario(page, server.baseUrl, route, 'default', async () => {}, violationsReport);
    }

    await runScenario(
      page,
      server.baseUrl,
      'index.html',
      'mobile nav open',
      async (currentPage) => {
        await currentPage.setViewportSize({ width: 390, height: 844 });
        const navToggle = currentPage.locator('#nav-toggle');
        if ((await navToggle.count()) > 0) {
          await navToggle.click();
          await currentPage.waitForTimeout(100);
        }
      },
      violationsReport,
    );

    await runScenario(
      page,
      server.baseUrl,
      'rooms.html',
      'non-default tab active',
      async (currentPage) => {
        await currentPage.setViewportSize({ width: 1366, height: 900 });
        const tab = currentPage.getByRole('tab', { name: 'Deluxe' });
        if ((await tab.count()) > 0) {
          await tab.click();
          await currentPage.waitForTimeout(100);
        }
      },
      violationsReport,
    );

    await runScenario(
      page,
      server.baseUrl,
      'gallery.html',
      'lightbox open',
      async (currentPage) => {
        await currentPage.setViewportSize({ width: 1366, height: 900 });
        const trigger = currentPage.locator('[data-lightbox-item]').first();
        if ((await trigger.count()) > 0) {
          await trigger.click();
          await currentPage.waitForSelector('.lightbox[aria-hidden="false"]', { timeout: 3000 });
        }
      },
      violationsReport,
    );
  } finally {
    await page.close();
    await context.close();
    await browser.close();
    await server.close();
  }

  if (violationsReport.length > 0) {
    printViolationReport(violationsReport);
    process.exit(1);
  }

  console.log(`Axe accessibility checks passed (${requiredPages.length} page(s) + interactive states).`);
}

await main();
