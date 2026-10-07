# The Language of Flowers

Visitors pick three flowers, address the bouquet to someone, and the recipient gets a link to a page that decodes it.

## Requirements

Node 20.19 or later (developed on Node 24).

## Commands

```
npm install
npm run dev     # dev server on http://localhost:5173
npm run build     # production build into dist/
npm run preview   # serve the production build (dist/) locally
```

## Stack

- React 19 and react-router 7 (declarative `<BrowserRouter>`/`<Routes>`, no data APIs). `src/components/App.jsx` maps the current pathname to a page component directly rather than nesting `<Route>`s, so it can hand each page a stable component reference + ref for animation.
- `src/components/AnimatedSwitch.jsx` replaces `react-addons-transition-group`: it wraps `react-transition-group`'s `TransitionGroup`/`Transition` and drives each page's `animateAppear(done)`/`animateEnter(done)`/`animateLeave(done)` instance methods (the modern equivalents of the old `componentWillAppear/Enter/Leave(callback)` hooks) via `addEndListener`.
- GSAP (`gsap` npm package, v3 API) drives all animation, imported as ES modules rather than loaded as CDN/global scripts.
- Vite for dev and build (`vite.config.mjs`), with `@vitejs/plugin-react` for JSX (React 19 uses the automatic runtime).
- CSS in `styles/`, processed by PostCSS (`postcss.config.mjs`): imports, native CSS custom properties (`--var`), `postcss-preset-env` for nesting/`@custom-media`/modern range media queries/autoprefixing, a small custom plugin for Sass-style `@define-extend`/`@extend` (emits one grouped rule at the definition like the old precss did), and px to rem.

## Deploying

Deployed on Netlify (`netlify.toml`): the build command is `npm run build`, and the publish directory is `dist`. Vite writes hashed `assets/` plus a verbatim copy of everything in `public/` (images, favicons, `manifest.json`, `_redirects`) into `dist/`. `dist/` is git-ignored, so Netlify builds it from source on each deploy.

The routes use `<BrowserRouter>` (HTML5 `pushState`), so the web server must serve `index.html` for every path. `public/_redirects` (`/* /index.html 200`) handles this on Netlify.

## Things to know

- The site has no analytics or tracking code, and outbound links carry no `utm_*` parameters.
- The only backend is the Netlify function `netlify/functions/send-bouquet.mts`, served at `/api/send-bouquet`. It deliberately differs from the v-2017 branch's `send-bouquet.js`: it builds the `/view-bouquet?bouquet=…&sender=…` link itself, validates and HTML-escapes all input, only accepts requests whose `Origin` is the site (`URL`, `CUSTOM_DOMAIN_URL` or `DEPLOY_PRIME_URL`), and is rate limited to 5 requests per minute per IP. It emails through Resend and needs `RESEND_API_KEY` and `SEND_EMAIL_FROM` set in Netlify (see `.env.example`). Nothing else is logged or stored. The default `/.netlify/functions/send-bouquet` URL still exists but is not rate limited; the origin check still applies. `npm run netlify:dev` runs it locally.
- `npm test` runs the Vitest unit tests (the function and the client service). Netlify runs typecheck and the tests before building, so a failure stops the deploy.
- External URLs used by the site are listed in `EXTERNAL_URLS.txt`.
