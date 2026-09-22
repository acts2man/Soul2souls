type IconProps = { name: string; size?: number; className?: string };

const paths: Record<string, JSX.Element> = {
  instagram: (
    <>
      <rect x="2" y="2" width="20" height="20" rx="5.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.4" cy="6.6" r="1.2" fill="currentColor" />
    </>
  ),
  tiktok: (
    <path
      d="M16.5 3c.4 2.3 1.9 3.9 4.1 4.1v2.9c-1.5.1-2.9-.4-4.1-1.2v5.8c0 3.4-2.8 6.1-6.2 5.9C7.3 20.3 5 17.9 5 15c0-2.9 2.5-5.3 5.5-5.1v3c-.4-.1-.8-.2-1.2-.1-1.2.1-2.2 1.1-2.2 2.3 0 1.3 1.1 2.4 2.4 2.3 1.3 0 2.3-1.1 2.3-2.4V3h3.2z"
      fill="currentColor"
    />
  ),
  youtube: (
    <>
      <rect x="2" y="5" width="20" height="14" rx="4" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M10 9l5 3-5 3V9z" fill="currentColor" />
    </>
  ),
  mixcloud: (
    <path
      d="M20 15.5c-.6 0-1.1-.2-1.5-.6-.6-2.3-2.7-4-5.2-4-1.8 0-3.4.9-4.3 2.3-.3-.1-.6-.2-1-.2-1.4 0-2.5 1.1-2.5 2.5S6.6 20 8 20h12c1.1 0 2-.9 2-2s-.9-2-2-2z"
      fill="currentColor"
    />
  ),
  lemon8: <circle cx="12" cy="12" r="9.2" fill="none" stroke="currentColor" strokeWidth="1.8" />,
  podcast: (
    <>
      <circle cx="12" cy="9" r="3.2" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M7 9a5 5 0 1 1 10 0M9 9a3 3 0 1 1 6 0" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M10.5 14.5h3l-.7 6a.8.8 0 0 1-1.6 0l-.7-6z" fill="currentColor" />
    </>
  ),
  play: <path d="M8 5v14l11-7L8 5z" fill="currentColor" />,
  pause: (
    <>
      <rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor" />
      <rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor" />
    </>
  ),
  prev: <path d="M7 5v14M20 5l-10 7 10 7V5z" fill="currentColor" />,
  next: <path d="M17 5v14M4 5l10 7L4 19V5z" fill="currentColor" />,
  repeat: (
    <path
      d="M4 9V7a3 3 0 0 1 3-3h10l-2-2M20 15v2a3 3 0 0 1-3 3H7l2 2"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  volume: (
    <path
      d="M4 9v6h4l5 4V5L8 9H4zM17 8a5 5 0 0 1 0 8M19.5 5.5a9 9 0 0 1 0 13"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  arrowUp: <path d="M12 19V5M5 12l7-7 7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />,
  close: <path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />,
  cart: (
    <path
      d="M4 5h2l1.5 11h10l1.5-8H7M9 20a1 1 0 100-2 1 1 0 000 2zM17 20a1 1 0 100-2 1 1 0 000 2z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="M4 7l8 6 8-6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </>
  ),
};

export default function Icon({ name, size = 22, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
      {paths[name] ?? null}
    </svg>
  );
}
