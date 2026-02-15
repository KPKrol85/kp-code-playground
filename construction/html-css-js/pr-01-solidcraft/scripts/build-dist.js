#!/usr/bin/env node

const fs = require('fs/promises');
const path = require('path');
const postcss = require('postcss');
const cssnano = require('cssnano');
const { minify } = require('terser');

const rootDir = process.cwd();
const distDir = path.join(rootDir, 'dist');

const EXCLUDED_PATHS = new Set(['.git', 'node_modules', 'dist']);

async function copyProjectToDist() {
  await fs.rm(distDir, { recursive: true, force: true });

  await fs.cp(rootDir, distDir, {
    recursive: true,
    filter: (src) => {
      const relPath = path.relative(rootDir, src);

      if (!relPath) return true;

      const topLevel = relPath.split(path.sep)[0];
      return !EXCLUDED_PATHS.has(topLevel);
    },
  });
}

async function minifyAssets() {
  const cssInputPath = path.join(rootDir, 'css', 'style.css');
  const cssOutputPath = path.join(distDir, 'css', 'style.min.css');
  const cssInput = await fs.readFile(cssInputPath, 'utf8');
  const cssResult = await postcss([cssnano({ preset: 'default' })]).process(cssInput, {
    from: cssInputPath,
    to: cssOutputPath,
    map: false,
  });
  await fs.mkdir(path.dirname(cssOutputPath), { recursive: true });
  await fs.writeFile(cssOutputPath, cssResult.css, 'utf8');

  const jsFiles = [
    { input: path.join(rootDir, 'js', 'script.js'), output: path.join(distDir, 'js', 'script.min.js') },
    {
      input: path.join(rootDir, 'js', 'theme-init.js'),
      output: path.join(distDir, 'js', 'theme-init.min.js'),
    },
  ];

  for (const file of jsFiles) {
    const inputCode = await fs.readFile(file.input, 'utf8');
    const minified = await minify(inputCode, { compress: true, mangle: true });

    if (!minified.code) {
      throw new Error(`Minification failed for ${file.input}`);
    }

    await fs.mkdir(path.dirname(file.output), { recursive: true });
    await fs.writeFile(file.output, minified.code, 'utf8');
  }
}

async function rewriteHtmlReferencesInDist(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      await rewriteHtmlReferencesInDist(fullPath);
      continue;
    }

    if (!entry.isFile() || path.extname(entry.name) !== '.html') {
      continue;
    }

    const html = await fs.readFile(fullPath, 'utf8');
    const updatedHtml = html
      .replaceAll('css/style.css', 'css/style.min.css')
      .replaceAll('js/script.js', 'js/script.min.js')
      .replaceAll('js/theme-init.js', 'js/theme-init.min.js');

    if (updatedHtml !== html) {
      await fs.writeFile(fullPath, updatedHtml, 'utf8');
    }
  }
}

async function build() {
  await copyProjectToDist();
  await minifyAssets();
  await rewriteHtmlReferencesInDist(distDir);
}

build().catch((error) => {
  console.error(error);
  process.exit(1);
});
