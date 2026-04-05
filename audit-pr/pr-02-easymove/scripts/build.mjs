import { execSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = resolve(__dirname, '..');
const distDir = join(rootDir, 'dist');

const includePattern = /<!--\s*@include\s+([^\s]+)\s*-->/g;

const ensureDir = (path) => {
  if (!existsSync(path)) {
    mkdirSync(path, { recursive: true });
  }
};

const resolveIncludes = (content, baseDir) =>
  content.replace(includePattern, (_, includePath) => {
    const resolvedPath = resolve(baseDir, includePath);
    if (!existsSync(resolvedPath)) {
      throw new Error(`Missing include file: ${resolvedPath}`);
    }

    const includeContent = readFileSync(resolvedPath, 'utf8');
    return resolveIncludes(includeContent, dirname(resolvedPath));
  });

rmSync(distDir, { recursive: true, force: true });
ensureDir(distDir);
ensureDir(join(distDir, 'css'));
ensureDir(join(distDir, 'js'));

execSync('npm run build:css', { stdio: 'inherit' });
execSync('npm run build:js', { stdio: 'inherit' });

const htmlFiles = readdirSync(rootDir).filter((file) => file.endsWith('.html'));

for (const file of htmlFiles) {
  const sourcePath = join(rootDir, file);
  const sourceHtml = readFileSync(sourcePath, 'utf8');
  const assembledHtml = resolveIncludes(sourceHtml, rootDir)
    .replace(/href="css\/main\.css"/g, 'href="css/main.min.css"')
    .replace(/src="js\/main\.js"/g, 'src="js/main.min.js"');

  writeFileSync(join(distDir, file), assembledHtml);
}

for (const staticFile of ['robots.txt', 'sitemap.xml']) {
  const sourcePath = join(rootDir, staticFile);
  if (existsSync(sourcePath)) {
    cpSync(sourcePath, join(distDir, staticFile));
  }
}

for (const assetDir of ['assets']) {
  const sourcePath = join(rootDir, assetDir);
  if (existsSync(sourcePath)) {
    cpSync(sourcePath, join(distDir, assetDir), { recursive: true });
  }
}
