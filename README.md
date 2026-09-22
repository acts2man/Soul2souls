# Soul2SoulsJazz — Website Reconstruction

A faithful React rebuild of [soul2soulsjazz.com](https://soul2soulsjazz.com) — the jazz musical
podcast of **JazzAmp aka DJ Perry**. Purple/gold jazz theme with an animated announcement marquee,
watermark header, off-canvas menu, slide-in subscribe panel, scroll-reveal animations, and a
signature sticky audio player.

## Stack

- **React 18 + TypeScript + Vite**
- **CSS Modules** + a global design-token file (`src/styles/tokens.css`)
- **React Router** (client-side routing, trailing-slash + legacy-permalink handling)
- Google Fonts: Quicksand, Josefin Sans, Abel
- Deploys to **Netlify** (SPA fallback + redirects in `netlify.toml`)

## Routes

| Route        | Page                                            |
| ------------ | ----------------------------------------------- |
| `/`          | Home — hero, go-live, about-the-show, chart, featured mix, mission, movement, sponsor CTA |
| `/about`     | About — story, mission, Meet JazzAmp bio, CTA   |
| `/podcasts`  | Podcasts — Mixcloud mix grid                    |
| `/shop`      | Shop — 16-product merch catalog ("Coming Soon!")|
| `/contact`   | Contact — form + booking info                   |
| `*`          | 404                                             |

Nav items **S2S Gallery**, **Events**, and **Presskit** were not part of the supplied export set,
so they link out to the live origin (`soul2soulsjazz.com/...`) rather than being reconstructed.

## Develop

```bash
npm install
npm run dev      # http://localhost:5188
npm run build    # type-check + production build -> dist/
npm run preview
```

## Notes / deviations

- **Media stays on origin.** No audio/video is downloaded (per project rules). The sticky player's
  intro track is routed through `src/data/mediaSrc.ts` (`INTRO_TRACK`) and points at the origin —
  swap to the real asset URL at cutover. The player UI (play/pause/seek/volume/repeat) is fully
  functional against whatever source is set.
- **Mixcloud mixes refreshed.** The mix slugs captured in the Sept-2025 export now 404 on Mixcloud
  (the account rotates uploads). `src/data/podcasts.ts` uses the **current** live cloudcasts from
  `mixcloud.com/S2SJazz25` so the embeds actually play. Update that list as the account grows.
- **Forms are real, not faked.** Contact and newsletter forms post to **Netlify Forms** (field names
  match the original) with real submitting / success / error states. Static detection stubs live in
  `index.html`.
- **Shop** shows a "Coming Soon!" catalog matching the live site; "Add to cart" flips to a
  "Notify me" state rather than faking a checkout (no live cart exists yet).
- Images are copied locally to `public/img/`. Original source zips are git-ignored.

## Assets

Product, hero, and portrait images were extracted from the site exports into `public/img/`.
The Soul2Souls logo is `public/img/shared/logo.webp`.
