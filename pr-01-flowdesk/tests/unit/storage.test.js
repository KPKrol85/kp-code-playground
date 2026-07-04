import { beforeEach, describe, expect, it, vi } from 'vitest';
import { storage } from '../../js/utils/storage.js';

describe('storage helper', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('returns fallback when a key is missing', () => {
    expect(storage.get('missing', { ok: true })).toEqual({ ok: true });
  });

  it('stores, reads, and removes JSON values', () => {
    storage.set('flowdesk:test', { name: 'Nova Studio' });

    expect(storage.get('flowdesk:test')).toEqual({ name: 'Nova Studio' });

    storage.remove('flowdesk:test');
    expect(storage.get('flowdesk:test')).toBeNull();
  });

  it('returns fallback when stored JSON is invalid', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    window.localStorage.setItem('broken', '{');

    expect(storage.get('broken', 'fallback')).toBe('fallback');
    expect(warn).toHaveBeenCalledWith('Storage read failed', expect.any(SyntaxError));
  });
});
