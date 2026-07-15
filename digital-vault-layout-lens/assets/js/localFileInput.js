export const MAX_ANALYZER_FILE_BYTES = 256 * 1024;
const SUPPORTED_ANALYZER_FILE_TYPES = {
  html: ['.html', '.htm'],
  css: ['.css']
};

export function validateAnalyzerSourceFile(file, { maxBytes = MAX_ANALYZER_FILE_BYTES } = {}) {
  if (!file) return { ok: false, reason: 'missing', message: 'Choose an HTML, HTM, or CSS file to load.' };
  const name = typeof file.name === 'string' ? file.name : '';
  const size = Number(file.size);
  const lowerName = name.toLowerCase();
  const kind = Object.entries(SUPPORTED_ANALYZER_FILE_TYPES).find(([, extensions]) => extensions.some((extension) => lowerName.endsWith(extension)))?.[0];
  if (!kind) return { ok: false, reason: 'unsupported', message: 'Unsupported file type. Choose a .html, .htm, or .css file.' };
  if (!Number.isFinite(size) || size < 0) return { ok: false, reason: 'unreadable', message: 'The selected file could not be read safely.' };
  if (size === 0) return { ok: false, reason: 'empty', message: 'The selected file is empty. Paste content manually or choose another file.' };
  if (size > maxBytes) return { ok: false, reason: 'oversized', message: `The selected file is too large. Choose a file smaller than ${formatBytes(maxBytes)}.` };
  return { ok: true, kind, message: `${kind.toUpperCase()} file is ready to load as plain text.` };
}

export function formatBytes(bytes) {
  if (bytes >= 1024 * 1024) return `${Math.round(bytes / (1024 * 1024))} MB`;
  return `${Math.round(bytes / 1024)} KB`;
}
