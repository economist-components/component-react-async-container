/* global serverCache */
const hydrateCache = typeof serverCache === 'undefined' ? {} : serverCache;
const defaultTtl = 30000;
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

export function configureCache({
  ttl = defaultTtl,
} = {}) {
  return {
    intervalId: null,
    cache,
    start() {
      function resetCacheStorage() {
        cacheStorage = {};
      }

      this.intervalId = setInterval(resetCacheStorage, parseInt(ttl, 10));
      return this;
    },
    stop() {
      clearInterval(this.intervalId);
      this.intervalId = null;
      return this;
    },
  };
}
