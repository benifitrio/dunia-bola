import { openDB } from 'idb';

const dbPromise = openDB('teams-football', 1, {
  upgrade(upgradeDb) {
    upgradeDb.createObjectStore('teams', { keyPath: 'id' });
  },
});

export default dbPromise;
