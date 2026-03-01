import { createHash } from 'node:crypto';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const headersPath = path.join(projectRoot, '_headers');

const HASH_BLOCK_START = '# CSP_SCRIPT_HASHES_BEGIN';
const HASH_BLOCK_END = '# CSP_SCRIPT_HASHES_END';

const toHashToken = (scriptContent) => {
  const digest = createHash('sha256').update(scriptContent).digest('base64');
  return `'sha256-${digest}'`;
};

const extractInlineScriptHashes = async () => {
  const entries = await readdir(projectRoot, { withFileTypes: true });
  const htmlFiles = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith('.html'))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b));

  const hashes = [];
  const inlineScriptRegex = /<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi;

  for (const htmlFile of htmlFiles) {
    const html = await readFile(path.join(projectRoot, htmlFile), 'utf8');
    for (const match of html.matchAll(inlineScriptRegex)) {
      hashes.push(toHashToken(match[1]));
    }
  }

  return [...new Set(hashes)].sort((a, b) => a.localeCompare(b));
};

const updateHeadersFile = async (hashes) => {
  const headers = await readFile(headersPath, 'utf8');

  const cspLineRegex = /(script-src-elem 'self')(.*?)(; script-src-attr 'none')/s;
  if (!cspLineRegex.test(headers)) {
    throw new Error('Could not locate script-src-elem directive in _headers.');
  }

  const hashesValue = hashes.length ? ` ${hashes.join(' ')}` : '';
  const headersWithUpdatedCsp = headers.replace(
    cspLineRegex,
    `$1${hashesValue}$3`,
  );

  const hashBlockRegex = new RegExp(
    `${HASH_BLOCK_START}[\\s\\S]*?${HASH_BLOCK_END}`,
    'm',
  );

  const hashBlockLines = [
    HASH_BLOCK_START,
    ...hashes.map((hash) => `# ${hash}`),
    HASH_BLOCK_END,
  ];
  const hashBlock = hashBlockLines.join('\n');

  if (!hashBlockRegex.test(headersWithUpdatedCsp)) {
    throw new Error('Could not locate CSP hash marker block in _headers.');
  }

  const finalHeaders = headersWithUpdatedCsp.replace(hashBlockRegex, hashBlock);
  await writeFile(headersPath, finalHeaders);
};

const hashes = await extractInlineScriptHashes();
await updateHeadersFile(hashes);

console.log(`Updated CSP hashes (${hashes.length}) in _headers.`);
