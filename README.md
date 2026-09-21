# The Language of Flowers

Penhaligon's campaign site. Visitors pick three flowers, address the bouquet to someone, and the recipient gets a link to a page that decodes it.

## Requirements

Node 20.19 or later (developed on Node 24).

## Commands

```
npm install
npm run watch     # dev server on http://localhost:5173 (same as `npm start`)
npm run build     # production build into dist/
npm run preview   # serve the production build (dist/) locally
```

## Stack

- React 15, react-router 3, `react-addons-transition-group` (the animation code relies on its `componentWillAppear/Enter/Leave` hooks)
- Vite for dev and build (`vite.config.mjs`). `@vitejs/plugin-react` is not used, because React 15 has no automatic JSX runtime, so JSX is compiled with the classic transform.
- jQuery and GSAP (TweenMax 1.19 plus the DrawSVG, ScrollTo and Modifiers plugins in `public/scripts/`) are loaded as globals from `index.html`.
- CSS in `styles/`, processed by PostCSS (`postcss.config.mjs`): imports, `$variables`, nesting, Sass-style `@define-extend` / `@extend` (a small plugin in the config, which emits one grouped rule at the definition like the old precss did), `@custom-media`, px to rem and autoprefixer.

## Deploying

`npm run build` writes Vite's default output folder, `dist/`, copying everything in `public/` unchanged (images, fonts, scripts, favicons, `manifest.json`, `submit.php`, `opt-in.php`) next to the generated `index.html` and hashed `assets/`. `dist/` is git-ignored. The build empties `dist/` first, including its copy of `responses.csv`, so do not build inside a directory the live site writes to, and deploy without overwriting the server's own `responses.csv` and `opt-in.csv`.

The routes use `browserHistory`, so the web server must serve `index.html` for every path.

## Things to know

- `submit.php` and `opt-in.php` do not run under the dev server, so form POSTs return 404 there. The Mailchimp call goes to the live list.
- The site has no analytics or tracking code, and outbound links carry no `utm_*` parameters.
- External URLs used by the site are listed in `EXTERNAL_URLS.txt`.
