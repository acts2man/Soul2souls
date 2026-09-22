const ORIGIN = "https://soul2soulsjazz.com";

/**
 * Media (audio) is served from the origin per CLAUDE.md Rule 1 — never downloaded.
 * Migrate to local/CDN at cutover, not during the build. One constant to change.
 */
export const media = (path: string) => `${ORIGIN}${path}`;

/**
 * The sticky player's intro track URL was not present in the static export
 * (it is injected by the WordPress player at runtime). Point it at the origin
 * so it can be swapped to the real asset at cutover.
 */
export const INTRO_TRACK = media("/wp-content/uploads/welcome-to-soul2souls.mp3");
