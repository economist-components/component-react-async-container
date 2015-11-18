/* global serverCache */
const hydrateCache = typeof serverCache !== 'undefined' ? serverCache : {};
export let cacheStorage = { ...hydrateCache };

export default function cache(key) {
  return {
    get: function get() {
      return cacheStorage[key];
    },
    set: function set(value) {
      cacheStorage[key] = value;
      return this;
    },
  };
}

export function configureCache({ ttl = 30000 }) {
  return {
    intervalId: null,
    cache,
    start() {
      function resetCacheStorage() {
        cacheStorage = {};
      }

      this.intervalId = setInterval(resetCacheStorage, ttl);
      return this;
    },
    stop() {
      clearInterval(this.intervalId);
      this.intervalId = null;
      return this;
    },
  };
}
