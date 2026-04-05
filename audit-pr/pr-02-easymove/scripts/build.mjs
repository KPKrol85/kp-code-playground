import { execSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const distDir = new URL('../dist', import.meta.url);
const distPath = distDir.pathname;
const rootDir = new URL('..', import.meta.url).pathname;
const templatesDir = join(rootDir, 'templates');

const ensureDir = (path) => {
  if (!existsSync(path)) {
    mkdirSync(path, { recursive: true });
  }
};

const applyTemplateVars = (template, vars) =>
  Object.entries(vars).reduce(
    (content, [token, value]) => content.replaceAll(`{{${token}}}`, value),
    template,
  );

const headerTemplate = readFileSync(join(templatesDir, 'header.html'), 'utf8');
const footerTemplate = readFileSync(join(templatesDir, 'footer.html'), 'utf8');

const pageTemplateConfig = {
  'index.html': { activePage: 'HOME' },
  'cennik.html': { activePage: 'CENNIK' },
  'o-nas.html': { activePage: 'O_NAS' },
  'faq.html': { activePage: 'FAQ' },
  'kontakt.html': { activePage: 'KONTAKT' },
  'uslugi.html': {
    activePage: 'USLUGI',
    servicesLinksLocal: true,
    servicesDropdownOpen: true,
  },
};

const buildTemplateVars = (fileName) => {
  const config = pageTemplateConfig[fileName] ?? {};
  const classToken = (page) => (config.activePage === page ? ' nav__link--active' : '');
  const servicesLink = (anchor) =>
    config.servicesLinksLocal ? `#${anchor}` : `uslugi.html#${anchor}`;

  return {
    HOME_CLASS: classToken('HOME'),
    USLUGI_CLASS: classToken('USLUGI'),
    CENNIK_CLASS: classToken('CENNIK'),
    O_NAS_CLASS: classToken('O_NAS'),
    FAQ_CLASS: classToken('FAQ'),
    KONTAKT_CLASS: classToken('KONTAKT'),
    USLUGI_DETAILS_OPEN: config.servicesDropdownOpen ? ' open' : '',
    USLUGI_LINK_MIESZKANIA: servicesLink('mieszkania'),
    USLUGI_LINK_BIURA: servicesLink('biura'),
    USLUGI_LINK_MEBLE: servicesLink('meble'),
    USLUGI_LINK_PAKOWANIE: servicesLink('pakowanie'),
  };
};

const renderPage = (sourceHtml, fileName) => {
  const vars = buildTemplateVars(fileName);
  const header = applyTemplateVars(headerTemplate, vars);

  return sourceHtml
    .replace('{{> header}}', header)
    .replace('{{> footer}}', footerTemplate);
};

ensureDir(distPath);
ensureDir(join(distPath, 'css'));
ensureDir(join(distPath, 'js'));

execSync('npm run css:build', { stdio: 'inherit' });
execSync('npm run js:build', { stdio: 'inherit' });

const htmlFiles = readdirSync(rootDir).filter((file) => file.endsWith('.html'));
htmlFiles.forEach((file) => {
  const sourceHtml = readFileSync(join(rootDir, file), 'utf8');
  const renderedHtml = renderPage(sourceHtml, file);
  writeFileSync(join(distPath, file), renderedHtml);
});

['robots.txt', 'sitemap.xml'].forEach((file) => {
  const sourcePath = join(rootDir, file);
  if (existsSync(sourcePath)) {
    cpSync(sourcePath, join(distPath, file));
  }
});

const assetsPath = join(rootDir, 'assets');
if (existsSync(assetsPath)) {
  cpSync(assetsPath, join(distPath, 'assets'), { recursive: true });
}
