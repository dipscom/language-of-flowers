# The Language of Flowers

Penhaligon's campaign site. Visitors pick three flowers, address the bouquet to someone, and the recipient gets a link to a page that decodes it.

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
- There is no form backend: the bouquet-submission and opt-in data are not sent or logged anywhere, and the Mailchimp signup call has been removed.
- External URLs used by the site are listed in `EXTERNAL_URLS.txt`.
