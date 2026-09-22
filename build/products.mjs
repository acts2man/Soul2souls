// Generate exact single-product pages at /product/<slug>/.
//
// Strategy: start from the REAL product HTML (which links its full theme CSS from
// the origin, so it renders exactly like the live single-product page). We keep
// those origin stylesheets, strip the origin JS (its pjax router would hijack our
// local links), rewire navigation + related-product links to local pages, and
// inject our own behaviour script (menu / subscribe / player) + a tiny shim so the
// product gallery shows without the theme's slider JS.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { load } from "cheerio";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const RAW = path.join(ROOT, "exports", "_products");
const OUT = path.join(ROOT, "site", "product");

// Rewrite internal navigation/product links to local, but leave asset URLs
// (wp-content / wp-includes / wp-json / feeds) and the i0.wp.com image CDN alone.
const NAV_ORIGIN =
  /https?:\/\/(?:www\.)?soul2soulsjazz\.com\/(?!wp-content|wp-includes|wp-json|xmlrpc|feed|cdn-cgi)/g;

function rewriteLinks(html) {
  html = html.replace(NAV_ORIGIN, "/");
  html = html.split("%e2%80%91").join("-").split("%E2%80%91").join("-");
  html = html.split("/about-example-1/").join("/about/");
  return html;
}

function slugMap() {
  const map = [];
  for (const line of fs.readFileSync(path.join(RAW, "slugs.txt"), "utf8").split(/\r?\n/)) {
    const [enc, norm] = line.split("|");
    if (enc && norm) map.push({ enc: enc.trim(), norm: norm.trim() });
  }
  return map;
}

const HEAD_SHIM =
  '<link rel="stylesheet" href="/assets/s2s-overrides.css">' +
  '<link rel="stylesheet" href="/assets/s2s-product.css">' +
  '<script src="/assets/s2s.js" defer></script>';

export function buildProducts() {
  const map = slugMap();
  fs.mkdirSync(OUT, { recursive: true });
  let count = 0;

  for (const { norm } of map) {
    const file = path.join(RAW, norm + ".html");
    if (!fs.existsSync(file)) {
      console.log("  MISSING raw:", norm);
      continue;
    }
    const $ = load(fs.readFileSync(file, "utf8"), { decodeEntities: false });

    // Strip origin JS (pjax router, trackers, gallery slider) so the page is
    // static and our local links work. Keep <link> stylesheets (origin CSS).
    $("script").remove();
    // Drop lazy-load: some images defer via data-src only; ensure src is set.
    $("img").each((_, el) => {
      const $el = $(el);
      const ds = $el.attr("data-src") || $el.attr("data-large_image");
      if (ds && !$el.attr("src")) $el.attr("src", ds);
      $el.removeAttr("loading");
    });

    // Inject our behaviour + shims into <head>.
    $("head").append(HEAD_SHIM);

    let html = $.html();
    html = rewriteLinks(html);

    const dir = path.join(OUT, norm);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, "index.html"), html);
    count++;
  }
  console.log(`  built ${count} product pages -> /product/*`);
  return map;
}

if (process.argv[1] && process.argv[1].endsWith("products.mjs")) buildProducts();
