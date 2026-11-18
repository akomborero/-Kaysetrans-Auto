// Bridges genuine backend data into server-rendered public pages.
//
// During prerendering, scripts/prerender.mjs passes real API data to
// src/entry-server.jsx, which sets globalThis.__PRERENDER_DATA__ before
// rendering. The generated HTML embeds the same object as
// window.__PRERENDER_DATA__, so the client's first render matches the HTML.
//
// In a normal browser session without prerendered data this returns null and
// all components continue to fetch live inventory exactly as before.
export function getPrerenderData() {
  if (typeof globalThis === 'undefined') return null;
  const data = globalThis.__PRERENDER_DATA__;
  return data && typeof data === 'object' ? data : null;
}
