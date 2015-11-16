
/* global serverCache */
const hydrateCache = typeof serverCache !== 'undefined' ? serverCache : {};
export const cacheStorage = { ...hydrateCache };

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
