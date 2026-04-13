import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { minify } from 'terser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = resolve(__dirname, '..');
const jsDir = join(rootDir, 'js');
const modulesDir = join(jsDir, 'modules');
const distDir = join(rootDir, 'dist', 'js');
const distModulesDir = join(distDir, 'modules');

const terserOptions = {
  compress: true,
  mangle: true,
  module: true,
};

const minifyFile = async (sourcePath, targetPath) => {
  const code = await readFile(sourcePath, 'utf8');
  const result = await minify(code, terserOptions);

  if (!result.code) {
    throw new Error(`Minification returned empty output for ${sourcePath}`);
  }

  await writeFile(targetPath, result.code);
};

await mkdir(distModulesDir, { recursive: true });

await minifyFile(join(jsDir, 'main.js'), join(distDir, 'main.min.js'));

const moduleFiles = (await readdir(modulesDir)).filter((file) => file.endsWith('.js'));

await Promise.all(
  moduleFiles.map((file) => minifyFile(join(modulesDir, file), join(distModulesDir, file)))
);
