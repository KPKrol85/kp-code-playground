import { seedData } from '../data/seed.js';
import { migrateState } from '../domain/migrations.js';
import { storage } from '../utils/storage.js';

export const STATE_STORAGE_KEY = 'flowdesk_state_v1';

export const createStatePersistence = ({ key = STATE_STORAGE_KEY, seedState = seedData, storageAdapter = storage } = {}) => {
  const normalize = (rawState) => migrateState(rawState, seedState);

  return {
    load() {
      return normalize(storageAdapter.get(key));
    },
    save(nextState) {
      const normalizedState = normalize(nextState);
      storageAdapter.set(key, normalizedState);
      return normalizedState;
    },
    restore(rawState) {
      const normalizedState = normalize(rawState);
      storageAdapter.set(key, normalizedState);
      return normalizedState;
    },
    reset() {
      const normalizedState = normalize(seedState);
      storageAdapter.set(key, normalizedState);
      return normalizedState;
    },
    remove() {
      storageAdapter.remove(key);
    }
  };
};

export const statePersistence = createStatePersistence();
