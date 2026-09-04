export const CACHE_KEY = 'kaysetrans_cars_cache';
export const CACHE_TTL = 1000 * 60 * 60; // 1 hour

export function getCachedCars() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || !parsed.timestamp || !Array.isArray(parsed.cars)) return null;
    if (Date.now() - parsed.timestamp > CACHE_TTL) return null;
    return parsed.cars;
  } catch (e) {
    console.warn('Error reading cars cache', e);
    return null;
  }
}

export function setCachedCars(cars) {
  try {
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
