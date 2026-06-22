# Strapi Media in Production

## Context

Production frontend runs on `https://fitway.best`, while Strapi is exposed through:

```env
PUBLIC_URL=https://api.fitway.best
NEXT_PUBLIC_STRAPI_URL=https://api.fitway.best
```

The public Strapi URL must not resolve to `localhost` in production. Browser requests from `https://fitway.best` to `http://localhost:1337/uploads/...` are blocked because `localhost` is the visitor's own loopback address, not the VPS.

## Backend Configuration

`backend/config/server.ts` must expose the public Strapi URL:

```ts
export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: env('PUBLIC_URL', 'https://api.fitway.best'),
  app: {
    keys: env.array('APP_KEYS'),
  },
});
```

Backend `.env` on VPS:

```env
HOST=0.0.0.0
PORT=1337
PUBLIC_URL=https://api.fitway.best
NODE_ENV=production
```

## Nginx and SSL

`api.fitway.best` needs its own Nginx `server_name` block and SSL certificate. A certificate for `fitway.best` does not automatically cover `api.fitway.best` unless the certificate includes that SAN.

Recommended Certbot command:

```bash
sudo certbot --nginx -d api.fitway.best
```

If Certbot says it could not find a matching server block, create or update the Nginx config so one block contains:

```nginx
server_name api.fitway.best;
```

and proxies to Strapi:

```nginx
location / {
    proxy_pass http://localhost:1337;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_cache_bypass $http_upgrade;
}
```

After changes:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

## Next.js Image Configuration

When Strapi media URLs move to `https://api.fitway.best/uploads/...`, `next/image` needs that host in `frontend/next.config.mjs`.

```js
{
  protocol: "https",
  hostname: "api.fitway.best",
  pathname: "/uploads/**",
}
```

Without this, images requested through `/_next/image?url=https%3A%2F%2Fapi.fitway.best%2Fuploads%2F...` fail with `400 Bad Request`.

## Deployment Sequence

For frontend environment changes, rebuild Next.js because `NEXT_PUBLIC_*` values are embedded at build time:

```bash
cd /var/www/FitWay/frontend
rm -rf .next
npm run build
pm2 restart fitway-frontend --update-env
```

For backend environment changes:

```bash
cd /var/www/FitWay/backend
pm2 restart fitway-backend --update-env
```

PM2 may print `Use --update-env to update environment variables`; use it whenever `.env` or ecosystem env values changed.

## Symptoms and Fixes

- `Access to image at 'http://localhost:1337/uploads/...' from origin 'https://fitway.best' has been blocked`: production frontend was built or started with missing/old `NEXT_PUBLIC_STRAPI_URL`; set it to `https://api.fitway.best`, rebuild frontend, restart PM2 with `--update-env`.
- `net::ERR_CERT_COMMON_NAME_INVALID` on `https://api.fitway.best/uploads/...`: SSL certificate does not cover `api.fitway.best`; issue/install a certificate for that subdomain.
- `GET https://fitway.best/_next/image?...api.fitway.best... 400`: add `api.fitway.best` to `images.remotePatterns` in `next.config.mjs`, rebuild frontend.

## Related

- [[deploy/nextjs-build-failure]]
- [[frontend/data-fetching-pattern]]
- [[frontend/authors-system]]
