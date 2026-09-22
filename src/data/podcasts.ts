// Mixcloud mixes for the /podcasts/ page. The audio itself stays on Mixcloud's
// origin (CLAUDE.md Rule 1) — we embed, we never download.
//
// NOTE: the mix slugs captured in the Sept-2025 export (e.g. `s2sjazz-mix`,
// `72625-hot-coolsville-mix`) now 404 on Mixcloud — the account rotates its
// uploads. These are the CURRENT live cloudcasts from mixcloud.com/S2SJazz25,
// so the embeds actually resolve. Refresh this list from the account as it grows.

export type Mix = {
  title: string;
  feed: string; // Mixcloud feed path: /<account>/<slug>/
};

const ACCOUNT = "/S2SJazz25";
const mix = (slug: string, title: string): Mix => ({ title, feed: `${ACCOUNT}/${slug}/` });

export const MIXES: Mix[] = [
  mix("shes-the-one-on-laguna-beach-8-29-26", "She’s the One on Laguna Beach (8-29-26)"),
  mix("electric-do-you-remember-8-28-26", "Electric / Do You Remember (8-28-26)"),
  mix("ooh-la-la-dj-perry-8-22-26", "Ooh La La – DJ Perry (8-22-26)"),
  mix("in-da-club-dj-perrys-jammin-6-26-26", "In Da Club – DJ Perry’s Jammin (6-26-26)"),
  mix("you-make-me-wana", "You Make Me Wana"),
  mix("20-sec-into-the-mix-i-new-you-where-a-pro", "20 Sec Into the Mix – I New You Where a Pro"),
  mix("life-is-good-watching-you", "Life Is Good / Watching You"),
  mix("going-out-sax-you-up", "Going Out / Sax You Up"),
  mix("summer-time-in-the-groove", "Summer Time in the Groove"),
  mix("another-part-of-me-smile", "Another Part of Me / Smile"),
  mix("too-good-2-let-go-ya-feel-me-11-14-25", "Too Good 2 Let Go / Ya Feel Me (11-14-25)"),
];

export const mixcloudEmbed = (feedPath: string) =>
  `https://www.mixcloud.com/widget/iframe/?hide_cover=1&light=1&feed=${encodeURIComponent(feedPath)}`;
