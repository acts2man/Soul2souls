// Assemble an EXACT static reproduction from the SingleFile exports.
// Preserves original HTML + CSS + images/fonts; only rewires internal nav links
// and injects the behaviour script. No redesign, no reinterpretation.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const SRC = path.join(ROOT, "exports");
const OUT = path.join(ROOT, "site");

// page export folder -> output route folder ("" = site root / home)
const PAGES = {
  Home: "",
  About: "about",
  Podcasts: "podcasts",
  Shop: "shop",
  Contact: "contact",
  Gallery: "gallery-fullwidth",
  Events: "events",
  Presskit: "presskit",
};

// Only these exact quoted hrefs get rewritten (asset URLs are left untouched).
const LINK_MAP = [
  ["https://soul2soulsjazz.com/about-example-1/", "/about/"],
  ["https://soul2soulsjazz.com/about/", "/about/"],
  ["https://soul2soulsjazz.com/podcasts/", "/podcasts/"],
  ["https://soul2soulsjazz.com/podcasts", "/podcasts/"],
  ["https://soul2soulsjazz.com/shop/", "/shop/"],
  ["https://soul2soulsjazz.com/contact/", "/contact/"],
  ["https://soul2soulsjazz.com/gallery-fullwidth/", "/gallery-fullwidth/"],
  ["https://soul2soulsjazz.com/events/", "/events/"],
  ["https://soul2soulsjazz.com/presskit/", "/presskit/"],
];

function rewrite(html) {
  // Convert ALL internal origin links (quoted or unquoted) to local paths, but
  // leave asset/API URLs on the origin (wp-content images, wp-json, feed, xmlrpc).
  html = html.replace(
    /https:\/\/soul2soulsjazz\.com\/(?!wp-content|wp-json|xmlrpc|feed)/g,
    "/"
  );
  // Legacy permalink -> canonical about.
  html = html.split("/about-example-1/").join("/about/");
  void LINK_MAP;
  // Inject behaviour script + overrides before </body>.
  const inject =
    '\n<link rel="stylesheet" href="/assets/s2s-overrides.css">\n' +
    '<script src="/assets/s2s.js" defer></script>\n';
  // SingleFile exports have no closing </body>; inject before it if present, else append.
  if (/<\/body>/i.test(html)) html = html.replace(/<\/body>/i, inject + "</body>");
  else html += inject;
  return html;
}

function copyDir(from, to) {
  fs.mkdirSync(to, { recursive: true });
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    const s = path.join(from, entry.name);
    const d = path.join(to, entry.name);
    if (entry.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

for (const [srcName, route] of Object.entries(PAGES)) {
  const srcDir = path.join(SRC, srcName);
  const outDir = route ? path.join(OUT, route) : OUT;
  fs.mkdirSync(outDir, { recursive: true });
  // copy assets (everything except index.html + manifest.json)
  for (const entry of fs.readdirSync(srcDir, { withFileTypes: true })) {
    if (entry.name === "index.html" || entry.name === "manifest.json") continue;
    const s = path.join(srcDir, entry.name);
    const d = path.join(outDir, entry.name);
    if (entry.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
  // rewrite + write html
  const html = rewrite(fs.readFileSync(path.join(srcDir, "index.html"), "utf8"));
  fs.writeFileSync(path.join(outDir, "index.html"), html);
  console.log(`${srcName} -> /${route}  (${(html.length / 1024).toFixed(0)}kb)`);
}

// Copy re-added behaviour assets (survives the site/ wipe because they live in _assets_src).
const ASSETS_SRC = path.join(ROOT, "_assets_src");
copyDir(ASSETS_SRC, path.join(OUT, "assets"));
console.log("assets copied");

console.log("assembled at", OUT);
