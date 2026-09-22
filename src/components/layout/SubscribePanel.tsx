import { useEffect } from "react";
import { SOCIAL, CONTACT } from "../../data/site";
import Icon from "../ui/Icon";
import styles from "./SubscribePanel.module.css";

type Props = { open: boolean; onClose: () => void };

const PODCAST_BLURB =
  "I have created a unique Jazz Musical Podcast that reflects my God-given passion, creativity, and skills for blending jazz.";

export default function SubscribePanel({ open, onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <>
      <div className={`${styles.scrim} ${open ? styles.scrimOpen : ""}`} onClick={onClose} aria-hidden={!open} />
      <aside className={`${styles.panel} ${open ? styles.panelOpen : ""}`} aria-label="Subscribe and follow" aria-hidden={!open}>
        <button className={styles.close} onClick={onClose} aria-label="Close">
          <Icon name="close" size={24} />
        </button>

        <p className={styles.kicker}>Subscribe &amp; Follow</p>
        <h2 className={styles.title}>
          Subscribe to my podcast <span>www.soul2soulsjazz.com</span>
        </h2>

        <div className={styles.host}>
          <img src="/img/shared/logo.webp" alt="Soul2Souls Jazz" />
          <div>
            <p className={styles.hostedBy}>Hosted by</p>
            <p className={styles.hostName}>JazzAmp aka DJ Perry</p>
          </div>
        </div>

        <p className={styles.blurb}>{PODCAST_BLURB}</p>

        <a className={styles.mixcloud} href={CONTACT.mixcloud} target="_blank" rel="noopener noreferrer">
          <Icon name="mixcloud" size={22} />
          <span>Join MixCloud</span>
        </a>

        <div className={styles.socialRow}>
          {SOCIAL.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
              <Icon name={s.icon} size={20} />
              <span>{s.label}</span>
            </a>
          ))}
        </div>
      </aside>
    </>
  );
}
