#!/usr/bin/env node

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);

function getArgValue(flag) {
  const index = args.indexOf(flag);
  if (index === -1) {
    return null;
  }

  return args[index + 1] ?? null;
}

const rootArg = getArgValue('--root');

if (!rootArg) {
  console.error('Usage: node scripts/check-links-local.mjs --root <project-root>');
  process.exit(2);
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');
const targetRoot = path.resolve(repoRoot, rootArg);

async function pathExists(targetPath) {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function readHtmlFiles(dir) {
  const result = [];
  const entries = (await fs.readdir(dir, { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name));

  for (const entry of entries) {
    const absPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (entry.name === 'node_modules') {
        continue;
      }
      result.push(...(await readHtmlFiles(absPath)));
      continue;
    }

    if (entry.isFile() && entry.name.toLowerCase().endsWith('.html')) {
      result.push(absPath);
    }
  }

  return result;
}

function isExternalReference(value) {
  return /^(?:[a-z]+:)?\/\//i.test(value) || /^(?:mailto|tel|javascript|data):/i.test(value);
}

function normalizeReference(value) {
  return value.trim();
}

function hasTemplateToken(value) {
  return /{{[^}]+}}/.test(value);
}

function splitPathAndFragment(value) {
  const hashIndex = value.indexOf('#');
  if (hashIndex === -1) {
    return { pathname: value, fragment: null };
  }

  return {
    pathname: value.slice(0, hashIndex),
    fragment: value.slice(hashIndex + 1),
  };
}

function stripQuery(pathname) {
  const queryIndex = pathname.indexOf('?');
  return queryIndex === -1 ? pathname : pathname.slice(0, queryIndex);
}

function decodeFragment(fragment) {
  if (fragment == null || fragment === '') {
    return fragment;
  }

  try {
    return decodeURIComponent(fragment);
  } catch {
    return fragment;
  }
}

function extractAttributeValues(html, attributeName) {
  const regex = new RegExp(`\\b${attributeName}\\s*=\\s*("([^"]*)"|'([^']*)'|([^\\s>]+))`, 'gi');
  const matches = [];

  let match;
  while ((match = regex.exec(html)) !== null) {
    const value = match[2] ?? match[3] ?? match[4] ?? '';
    matches.push(value);
  }

  return matches;
}

function parseSrcset(srcsetValue) {
  return srcsetValue
    .split(',')
    .map((candidate) => candidate.trim())
    .filter(Boolean)
    .map((candidate) => {
      const firstSpace = candidate.search(/\s/);
      return firstSpace === -1 ? candidate : candidate.slice(0, firstSpace);
    });
}

async function resolveLocalPath(baseDir, refPath, projectRoot) {
  const withoutQuery = stripQuery(refPath);
  const resolved = withoutQuery.startsWith('/')
    ? path.resolve(projectRoot, `.${withoutQuery}`)
    : path.resolve(baseDir, withoutQuery);

  try {
    const stat = await fs.stat(resolved);
    if (stat.isDirectory()) {
      const indexHtml = path.join(resolved, 'index.html');
      if (await pathExists(indexHtml)) {
        return { exists: true, resolved, htmlTarget: indexHtml };
      }

      return { exists: true, resolved, htmlTarget: null };
    }

    return { exists: true, resolved, htmlTarget: resolved };
  } catch {
    const indexHtml = path.join(resolved, 'index.html');
    if (await pathExists(indexHtml)) {
      return { exists: true, resolved: indexHtml, htmlTarget: indexHtml };
    }

    return { exists: false, resolved, htmlTarget: null };
  }
}

async function collectAnchorTargets(htmlPath, htmlCache) {
  if (htmlCache.has(htmlPath)) {
    return htmlCache.get(htmlPath);
  }

  const html = await fs.readFile(htmlPath, 'utf8');
  const ids = new Set(extractAttributeValues(html, 'id'));
  const names = new Set(extractAttributeValues(html, 'name'));
  const targetSet = new Set([...ids, ...names]);
  htmlCache.set(htmlPath, targetSet);
  return targetSet;
}

async function main() {
  if (!(await pathExists(targetRoot))) {
    console.error(`Root path not found: ${targetRoot}`);
    process.exit(2);
  }

  const htmlFiles = await readHtmlFiles(targetRoot);
  const htmlCache = new Map();

  let checkedLocalRefs = 0;
  let checkedFragments = 0;
  const failures = [];

  for (const htmlFile of htmlFiles) {
    const htmlContent = await fs.readFile(htmlFile, 'utf8');
    const baseDir = path.dirname(htmlFile);
    const relHtmlFile = path.relative(repoRoot, htmlFile);

    const hrefs = extractAttributeValues(htmlContent, 'href');
    const srcs = extractAttributeValues(htmlContent, 'src');
    const srcsets = extractAttributeValues(htmlContent, 'srcset').flatMap(parseSrcset);

    for (const hrefRaw of hrefs) {
      const href = normalizeReference(hrefRaw);
      if (!href || isExternalReference(href) || hasTemplateToken(href)) {
        continue;
      }

      const { pathname, fragment } = splitPathAndFragment(href);
      const fragmentValue = decodeFragment(fragment);

      if (pathname && pathname !== '') {
        checkedLocalRefs += 1;
        const resolvedPath = await resolveLocalPath(baseDir, pathname, targetRoot);

        if (!resolvedPath.exists) {
          failures.push(
            `${relHtmlFile}: href="${href}" -> missing local file (${path.relative(repoRoot, resolvedPath.resolved)})`,
          );
          continue;
        }

        if (fragmentValue) {
          checkedFragments += 1;
          if (!resolvedPath.htmlTarget) {
            failures.push(
              `${relHtmlFile}: href="${href}" -> cannot validate fragment target in non-HTML directory (${path.relative(repoRoot, resolvedPath.resolved)})`,
            );
            continue;
          }

          const targetSet = await collectAnchorTargets(resolvedPath.htmlTarget, htmlCache);
          if (!targetSet.has(fragmentValue)) {
            failures.push(
              `${relHtmlFile}: href="${href}" -> missing fragment "#${fragmentValue}" in ${path.relative(repoRoot, resolvedPath.htmlTarget)}`,
            );
          }
        }

        continue;
      }

      if (fragmentValue) {
        checkedFragments += 1;
        const targetSet = await collectAnchorTargets(htmlFile, htmlCache);
        if (!targetSet.has(fragmentValue)) {
          failures.push(`${relHtmlFile}: href="${href}" -> missing fragment "#${fragmentValue}" in same file`);
        }
      }
    }

    for (const srcRaw of srcs) {
      const src = normalizeReference(srcRaw);
      if (!src || isExternalReference(src) || hasTemplateToken(src)) {
        continue;
      }

      const { pathname } = splitPathAndFragment(src);
      if (!pathname) {
        continue;
      }

      checkedLocalRefs += 1;
      const resolvedPath = await resolveLocalPath(baseDir, pathname, targetRoot);
      if (!resolvedPath.exists) {
        failures.push(
          `${relHtmlFile}: src="${src}" -> missing local file (${path.relative(repoRoot, resolvedPath.resolved)})`,
        );
      }
    }

    for (const srcsetRaw of srcsets) {
      const srcsetEntry = normalizeReference(srcsetRaw);
      if (!srcsetEntry || isExternalReference(srcsetEntry) || hasTemplateToken(srcsetEntry)) {
        continue;
      }

      const { pathname } = splitPathAndFragment(srcsetEntry);
      if (!pathname) {
        continue;
      }

      checkedLocalRefs += 1;
      const resolvedPath = await resolveLocalPath(baseDir, pathname, targetRoot);
      if (!resolvedPath.exists) {
        failures.push(
          `${relHtmlFile}: srcset="${srcsetEntry}" -> missing local file (${path.relative(repoRoot, resolvedPath.resolved)})`,
        );
      }
    }
  }

  if (failures.length > 0) {
    failures.sort();
    console.error(`✖ Local link check failed: ${failures.length} issue(s)`);
    for (const failure of failures) {
      console.error(`- ${failure}`);
    }
    console.error(`Checked ${htmlFiles.length} HTML file(s), ${checkedLocalRefs} local file reference(s), ${checkedFragments} fragment reference(s).`);
    process.exit(1);
  }

  console.log(`✔ Local link check passed. Checked ${htmlFiles.length} HTML file(s), ${checkedLocalRefs} local file reference(s), ${checkedFragments} fragment reference(s).`);
}

await main();
