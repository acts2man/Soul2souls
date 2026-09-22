import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../ui/Icon";
import styles from "./Header.module.css";

type Props = { onMenu: () => void; onSubscribe: () => void };

export default function Header({ onMenu, onSubscribe }: Props) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <span className={styles.watermark} aria-hidden="true">
        Soul2Souls
      </span>
      <div className={styles.inner}>
        <Link to="/" className={styles.logoLink} aria-label="Soul2Souls Jazz — Home">
          <img
            src="/img/shared/logo.webp"
            alt="Soul2Souls Jazz Musical Podcast, hosted by JazzAmp aka DJ Perry"
            className={styles.logo}
            width={210}
            height={210}
          />
        </Link>

        <p className={styles.premier} aria-hidden="true">
          Premier Jazz
        </p>

        <div className={styles.actions}>
          <button className={styles.subscribe} onClick={onSubscribe}>
            <span>Subscribe</span>
            <span className={styles.subIcon}>
              <Icon name="podcast" size={18} />
            </span>
          </button>
          <button className={styles.menuBtn} onClick={onMenu} aria-label="Open menu">
            <span>Menu</span>
            <span className={styles.bars}>
              <i />
              <i />
              <i />
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
