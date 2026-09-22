// Single source of truth for site-wide content: nav, social, contact, footer.

export type NavItem = {
  label: string;
  /** internal route (starts with /) or external absolute URL */
  href: string;
  external?: boolean;
};

// Primary navigation, from the live site's off-canvas menu (in order).
// Events / S2S Gallery / Presskit were not part of the exported set, so they
// point to the live origin so links resolve without inventing content.
export const NAV: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Podcasts", href: "/podcasts" },
  { label: "S2S Gallery", href: "https://soul2soulsjazz.com/gallery-fullwidth/", external: true },
  { label: "Events", href: "https://soul2soulsjazz.com/events/", external: true },
  { label: "Shop", href: "/shop" },
  { label: "Presskit", href: "https://soul2soulsjazz.com/presskit/", external: true },
  { label: "Contact", href: "/contact" },
];

export type Social = { label: string; href: string; icon: "instagram" | "tiktok" | "youtube" | "mixcloud" | "lemon8" };

export const SOCIAL: Social[] = [
  { label: "Instagram", href: "https://www.instagram.com/soul2soulsjazz25/", icon: "instagram" },
  { label: "TikTok", href: "https://www.tiktok.com/@soul2soulsjazz/", icon: "tiktok" },
  { label: "YouTube", href: "https://www.youtube.com/@JazzAmpakaDJPerry/", icon: "youtube" },
  { label: "Mixcloud", href: "https://www.mixcloud.com/S2SJazz25/", icon: "mixcloud" },
  { label: "Lemon8", href: "https://v.lemon8-app.com/s/OgryUFhFsR", icon: "lemon8" },
];

export const CONTACT = {
  email: "info@soul2soulsjazz.com",
  mixcloud: "https://www.mixcloud.com/S2SJazz25/",
};

export const ANNOUNCEMENT = "IT'S THE WEEKENNNND BABY!";

export const FOOTER_SIGNUP =
  "Join our digital mailing list now and get notified when we release exclusive mixes, merch sales and more";

export const COPYRIGHT = "© Soul2SoulsJazz Musical Podcast LLC";
