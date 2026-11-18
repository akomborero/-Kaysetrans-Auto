export const CACHE_KEY = 'kaysetrans_cars_cache';
export const CACHE_TTL = 1000 * 60 * 60; // 1 hour

export function getCachedCars() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || !parsed.timestamp || !Array.isArray(parsed.cars)) return null;
    if (Date.now() - parsed.timestamp > CACHE_TTL) return null;
    // An empty array is not a usable cache hit. It is usually the result of a
    // temporary empty/unavailable API response and would hide live inventory.
    if (parsed.cars.length === 0) return null;
    return parsed.cars;
  } catch (e) {
    console.warn('Error reading cars cache', e);
    return null;
  }
}

export function setCachedCars(cars) {
  try {
    // Never persist an empty inventory. A cached empty result would be treated
    // as a valid response by other components and block live data for the TTL.
    if (!Array.isArray(cars) || cars.length === 0) {
      localStorage.removeItem(CACHE_KEY);
      return;
    }
    localStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: Date.now(), cars }));
  } catch (e) {
    console.warn('Error writing cars cache', e);
  }
}

export function clearCachedCars() {
  try {
    localStorage.removeItem(CACHE_KEY);
  } catch (e) {
    console.warn('Error clearing cars cache', e);
  }
}
