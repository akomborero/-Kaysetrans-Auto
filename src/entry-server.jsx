import { renderToString } from 'react-dom/server';
// React Router v7 exports StaticRouter from the main `react-router` entry.
import { StaticRouter } from 'react-router';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.jsx';
import { ToastProvider } from './context/ToastContext.jsx';

// react-helmet-async v3 renders tags into the component tree under React 19
// instead of populating the provider context. Collect whichever form is used so
// the generated HTML always contains valid <head> tags.
function collectHead(html, helmet) {
  if (helmet) {
    return {
      body: html,
      title: helmet.title.toString(),
      meta: helmet.meta.toString(),
      link: helmet.link.toString(),
      script: helmet.script.toString(),
    };
  }

  const matchAll = (pattern) => [...html.matchAll(pattern)].map((match) => match[0]).join('\n');

  return {
    body: html
      .replace(/<title\b[^>]*>[\s\S]*?<\/title>/gi, '')
      .replace(/<meta\b[^>]*\/?>/gi, '')
      .replace(/<link\b[^>]*\/?>/gi, '')
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ''),
    title: html.match(/<title\b[^>]*>[\s\S]*?<\/title>/i)?.[0] || '',
    meta: matchAll(/<meta\b[^>]*\/?>/gi),
    link: matchAll(/<link\b[^>]*\/?>/gi),
    script: matchAll(/<script\b[^>]*>[\s\S]*?<\/script>/gi),
  };
}

// Render one public route to HTML with genuine data supplied by
// scripts/prerender.mjs.
export function renderRoute(url, data = {}) {
  globalThis.__PRERENDER_DATA__ = data;

  const helmetContext = {};
  let html;
  try {
    html = renderToString(
      <HelmetProvider context={helmetContext}>
        <StaticRouter location={url}>
          <ToastProvider>
            <App />
          </ToastProvider>
        </StaticRouter>
      </HelmetProvider>,
    );
  } finally {
    globalThis.__PRERENDER_DATA__ = null;
  }

  const head = collectHead(html, helmetContext.helmet);
  return { html: head.body, head: { title: head.title, meta: head.meta, link: head.link, script: head.script } };
}
