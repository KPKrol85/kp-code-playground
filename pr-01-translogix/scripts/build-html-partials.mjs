import { mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const distDir = path.join(projectRoot, 'dist');

const headerPath = path.join(projectRoot, 'templates', 'partials', 'header.html');
const footerPath = path.join(projectRoot, 'templates', 'partials', 'footer.html');

const [headerPartial, footerPartial] = await Promise.all([
  readFile(headerPath, 'utf8'),
  readFile(footerPath, 'utf8'),
]);

await rm(distDir, { recursive: true, force: true });
await mkdir(distDir, { recursive: true });

const rootEntries = await readdir(projectRoot, { withFileTypes: true });
const htmlFiles = rootEntries
  .filter((entry) => entry.isFile() && entry.name.endsWith('.html'))
  .map((entry) => entry.name)
  .sort();

for (const fileName of htmlFiles) {
  const sourcePath = path.join(projectRoot, fileName);
  const outputPath = path.join(distDir, fileName);

  const source = await readFile(sourcePath, 'utf8');
  const output = source
    .replace('<!-- PARTIAL:HEADER -->', headerPartial.trimEnd())
    .replace('<!-- PARTIAL:FOOTER -->', footerPartial.trimEnd());

  await writeFile(outputPath, `${output}\n`, 'utf8');
}

console.log(`Built ${htmlFiles.length} HTML file(s) into dist/.`);
