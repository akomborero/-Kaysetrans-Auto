# News feed configuration

## Security action required

A NewsAPI key was previously hard-coded in the client bundle by:

- `src/components/NewsSection.jsx`
- `src/components/pages/NewsAndVideos.jsx`

The key has been **removed from the frontend source**. It must be treated as compromised:

1. Revoke/rotate the exposed key in the NewsAPI dashboard.
2. Issue a replacement key for server-side use only.
3. Do not commit a `VITE_` prefixed variable containing this or any other secret.
   Any `VITE_` value is embedded in the production JavaScript bundle and is public.

## Current implementation

Both news views now load automotive articles from the keyless RSS-to-JSON endpoint:

```
https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.autocar.co.uk%2Frss
```

This requires no credentials and works from the existing static Vercel deployment.
The previous NewsAPI request path has been removed entirely rather than hidden in an
environment variable.

## Required server-side implementation (if NewsAPI is needed again)

NewsAPI does not allow browser requests with a secret key. To use it safely, add a
server-side endpoint in the backend repository (separate approval required):

1. Create `GET /api/news` in the backend.
2. Store the NewsAPI key in the backend's environment/secret manager.
3. The endpoint calls NewsAPI, applies the existing query and returns the JSON result.
4. Add a short server-side cache (e.g. 15–30 minutes) to stay within plan limits.
5. The frontend calls `/api/news` with no credentials; the RSS endpoint remains as fallback.

Until that endpoint exists, the frontend must not attempt direct NewsAPI requests.

## Verification

After a production build, confirm the key is absent from the bundle:

```bash
grep -R "newsapi.org/v2/everything" dist/assets
```

No output means no credentialed client request remains.
