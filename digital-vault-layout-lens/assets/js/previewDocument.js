import { getPreviewInspectionScript } from './previewInspection.js';

export const PREVIEW_CSP = "default-src 'none'; style-src 'unsafe-inline'; img-src data: blob:; script-src 'unsafe-inline'; connect-src 'none'; font-src 'none'; frame-src 'none'; media-src 'none'; object-src 'none'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'";

const EMPTY_PREVIEW_BODY = '<main class="preview-empty" aria-labelledby="preview-empty-title"><h1 id="preview-empty-title">Preview is empty</h1><p>Paste HTML or CSS, then use Refresh preview to render a browser-local isolated preview.</p></main>';
const NAVIGATION_ATTRIBUTES = new Set(['action', 'formaction', 'ping', 'srcdoc']);
const RESOURCE_ATTRIBUTES = new Set(['src', 'href', 'poster', 'data', 'xlink:href']);
const LOCAL_IMAGE_DATA = /^(?:data:image\/(?:png|gif|jpe?g|webp|svg\+xml);|blob:)/i;
const BLOCKED_ELEMENTS_SELECTOR = 'script,base,iframe,frame,frameset,object,embed,applet,link,meta[http-equiv],template';

export function sanitizePreviewHtml(html = '', options = {}) {
  const source = String(html || '');
  const Parser = options.DOMParser || globalThis.DOMParser;
  if (!Parser) return sanitizeHtmlFallback(source);
  const document = new Parser().parseFromString(source, 'text/html');
  document.querySelectorAll(BLOCKED_ELEMENTS_SELECTOR).forEach((node) => node.remove());
  document.querySelectorAll('*').forEach((element) => sanitizeElement(element));
  return document.body?.innerHTML || '';
}

export function sanitizePreviewCss(css = '') {
  return String(css || '')
    .replace(/@import\s+(?:url\()?['"]?[^;'"\)]+['"]?\)?\s*;/gi, '/* blocked remote @import */')
    .replace(/url\(\s*(['"]?)(?!data:image\/|blob:)[^\)]*\1\s*\)/gi, 'url("about:blank#blocked")')
    .replace(/expression\s*\(/gi, 'blocked-expression(')
    .replace(/behavior\s*:/gi, 'blocked-behavior:');
}

export function buildPreviewDocument({ html = '', css = '' } = {}, options = {}) {
  const sanitizedHtml = sanitizePreviewHtml(html, options);
  const sanitizedCss = sanitizePreviewCss(css);
  const hasInput = Boolean(String(html || '').trim() || String(css || '').trim());
  const body = hasInput ? sanitizedHtml || '<main><p>No renderable HTML remained after preview safety filtering.</p></main>' : EMPTY_PREVIEW_BODY;
  return `<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<meta http-equiv="Content-Security-Policy" content="${escapeAttribute(PREVIEW_CSP)}">\n<title>Local snippet preview</title>\n<style>html{box-sizing:border-box;}*,*::before,*::after{box-sizing:inherit;}body{margin:0;min-height:100vh;font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;line-height:1.5;color:#111827;background:#fff;}.preview-empty{display:grid;min-height:100vh;place-content:center;gap:.5rem;padding:2rem;text-align:center;color:#475569;}.preview-empty h1{margin:0;color:#0f172a;font-size:1.25rem;}img{max-width:100%;height:auto;}</style>\n<style>${escapeStyleEndTags(sanitizedCss)}</style>\n</head>\n<body>\n${body}\n<script>${escapeScriptEndTags(getPreviewInspectionScript())}</script>\n</body>\n</html>`;
}

function sanitizeElement(element) {
  [...element.attributes].forEach((attribute) => {
    const name = attribute.name.toLowerCase();
    const value = attribute.value.trim();
    if (name.startsWith('on') || NAVIGATION_ATTRIBUTES.has(name)) element.removeAttribute(attribute.name);
    if (RESOURCE_ATTRIBUTES.has(name) && !isSafeResourceAttribute(element.tagName.toLowerCase(), name, value)) element.removeAttribute(attribute.name);
    if ((name === 'style' || name === 'srcset') && /(?:url\(|@import|javascript:|data:text\/html)/i.test(value)) element.removeAttribute(attribute.name);
    if (name === 'target') element.removeAttribute(attribute.name);
  });
}

function isSafeResourceAttribute(tagName, name, value) {
  if (!value || /^javascript:/i.test(value) || /^data:text\/html/i.test(value)) return false;
  if (tagName === 'img' && name === 'src') return LOCAL_IMAGE_DATA.test(value) || value.startsWith('#') || value.startsWith('about:blank');
  if (name === 'href') return /^(?:#|mailto:|tel:)/i.test(value);
  return false;
}

function sanitizeHtmlFallback(source) {
  return source
    .replace(/<\/?(?:script|base|iframe|frame|frameset|object|embed|applet|link|meta|template)\b[^>]*>/gi, '')
    .replace(/\s+on[a-z]+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
    .replace(/\s(?:action|formaction|ping|srcdoc|target)\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
    .replace(/\s(?:href|src|poster|data|xlink:href)\s*=\s*(["'])\s*(?:javascript:|https?:|\/\/|data:text\/html)[^"']*\1/gi, '')
    .replace(/\sstyle\s*=\s*(["'])[^"']*(?:url\(|@import|javascript:)[^"']*\1/gi, '');
}

function escapeScriptEndTags(value) {
  return String(value).replace(/<\/script/gi, '<\\/script');
}

function escapeStyleEndTags(value) {
  return String(value).replace(/<\/style/gi, '<\\/style');
}

function escapeAttribute(value) {
  return String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
}
