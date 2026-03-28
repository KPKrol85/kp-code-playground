import { CONFIG } from "../config.js";

const DEFAULT_CART = { version: CONFIG.storageVersion, items: [] };

const safeParse = (value, fallback) => {
  if (!value) return fallback;
  try {
    return JSON.parse(value);
  } catch (error) {
    return fallback;
  }
};

const safeStorage = () => {
  try {
    return window.localStorage;
  } catch (error) {
    return null;
  }
};

const normalizeCart = (value) => {
  if (!value || typeof value !== "object") {
    return { ...DEFAULT_CART };
  }

  const rawItems = Array.isArray(value.items) ? value.items : [];
  const items = rawItems
    .map((item) => {
      const id = Number(item?.id);
      const qty = Number(item?.qty);
      if (!Number.isFinite(id) || !Number.isFinite(qty)) return null;
      return {
        id,
        qty: Math.max(1, Math.min(Math.round(qty), 99)),
      };
    })
    .filter(Boolean);

  return {
    version: value.version,
    items,
  };
};

export const loadCart = () => {
  const storage = safeStorage();
  if (!storage) return { ...DEFAULT_CART };

  const data = safeParse(storage.getItem(CONFIG.storageKey), null);
  const cart = normalizeCart(data);
  if (cart.version !== CONFIG.storageVersion) {
    return { ...DEFAULT_CART };
  }
  return cart;
};

export const saveCart = (cart) => {
  const storage = safeStorage();
  if (!storage) return;

  const normalizedCart = normalizeCart(cart);
  normalizedCart.version = CONFIG.storageVersion;
  try {
    storage.setItem(CONFIG.storageKey, JSON.stringify(normalizedCart));
  } catch (error) {
    console.error("Storage error", error);
  }
};

export const clearCart = () => {
  const storage = safeStorage();
  if (!storage) return;

  try {
    storage.removeItem(CONFIG.storageKey);
  } catch (error) {
    console.error("Storage error", error);
  }
};
