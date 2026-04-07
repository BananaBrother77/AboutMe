# Fix Root PNF Issue - Steps

## 1. [ ] Update url-guard.js

- Ensure root ('/', '') always allowed.
- Add debug logs.
- Treat root as home.

## 2. [ ] Update script.js

- Robust root handling, no history push on init for root.

## 3. [ ] Cloudflare Config

- Add SPA rewrite rule: /\* → /index.html
- Via Wrangler or dashboard.

## 4. [ ] Test Local

- `npx vite` → http://localhost:5173/ should show home.
- Direct /home should stay on index + SPA route.

## 5. [ ] Deploy & Test

- `wrangler deploy`
- mysubdomain.online/ shows home.

## 6. [ ] Complete
