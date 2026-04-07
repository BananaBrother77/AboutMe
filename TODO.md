# Fix Root PNF Issue - Steps

- Ensure root ('/', '') always allowed.
- Add debug logs.
- Treat root as home.

## 2. [x] Update script.js ✅

- Robust root handling, no history push on init for root.

## 3. [ ] Cloudflare Config

- Add SPA rewrite rule: /\* → /index.html
- Via Wrangler or dashboard.

## 4. [x] Test Local ✅

- Works on localhost (`npx vite` or `npx serve . --spa`).

## 5. [ ] Deploy & Test

- `wrangler deploy`
- mysubdomain.online/ shows home.

## 6. [ ] Complete
