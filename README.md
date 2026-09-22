# Soul2SoulsJazz — Exact Site Reproduction

A faithful, exact reproduction of [soul2soulsjazz.com](https://soul2soulsjazz.com) — the jazz
musical podcast of **JazzAmp aka DJ Perry** (Sonaar/StreamKing WordPress + Elementor theme).

This is **not** a redesign. Each page preserves the original page's real HTML, all of its original
CSS, and its images/fonts — captured with SingleFile. The only things added on top are:

- internal navigation links rewired to stay on-site (originals pointed at the live domain), and
- the JavaScript the theme needs for its off-canvas **MENU** / **SUBSCRIBE** panels and the sticky
  audio player (the SingleFile captures ship no JS).

## Pages (all 8 nav routes)

| Route                 | Page                          |
| --------------------- | ----------------------------- |
| `/`                   | Home                          |
| `/about/`             | About                         |
| `/podcasts/`          | Podcasts                      |
| `/gallery-fullwidth/` | S2S Gallery                   |
| `/events/`            | Events                        |
| `/shop/`              | Shop                          |
| `/presskit/`          | Presskit                      |
| `/contact/`           | Contact                       |

`/about-example-1/` → `/about/` (legacy permalink redirect, in `netlify.toml`).

## Layout

```
site/            <- the deployable, pre-built exact site (this is what Netlify publishes)
  index.html               (Home) + its images/ fonts/ stylesheet_*.css
  about/  podcasts/  shop/  contact/  gallery-fullwidth/  events/  presskit/
  assets/  s2s.js  s2s-overrides.css   (re-added interactivity — the only new code)
exports/         <- the raw SingleFile captures (git-ignored source; unzip the 8 zips here)
_assets_src/     <- source for the re-added JS/CSS (copied into site/assets on build)
build/assemble.mjs   <- assembles site/ from exports/ + _assets_src/
netlify.toml     <- publishes site/
```

## Deploy

`site/` is already built and committed, so Netlify needs no build step — it just publishes `site/`.
Drag-and-drop `site/` into Netlify, or connect the repo (publish dir = `site`).

## Rebuild (only if you re-export pages)

1. Re-export a page from the live site with the SingleFile browser extension (Save Page → zip).
2. Unzip it into `exports/<Name>/` (matching the folder names in `build/assemble.mjs`).
3. Run:

```bash
node build/assemble.mjs
```

It re-copies each page's HTML/CSS/assets into `site/`, rewrites internal links, and injects the
behaviour script.

## Known limitations (honest notes)

- **Audio player:** the exact *visual* is preserved and play/pause is wired, but the original theme's
  full playlist/streaming behaviour depends on the Sonaar plugin's own scripts, which the static
  captures don't include.
- **Forms:** the Contact and newsletter forms are the original markup. Point them at a real handler
  (e.g. Netlify Forms or the site's Contact Form 7 endpoint) before going live.
- **A few images** load from the origin CDN (`soul2soulsjazz.com/wp-content/...`) because SingleFile
  didn't localize them; they render fine as long as the origin stays up.
