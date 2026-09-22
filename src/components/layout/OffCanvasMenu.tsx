import { useEffect } from "react";
import { Link } from "react-router-dom";
import { NAV, SOCIAL, CONTACT } from "../../data/site";
import Icon from "../ui/Icon";
import styles from "./OffCanvasMenu.module.css";

type Props = { open: boolean; onClose: () => void };

export default function OffCanvasMenu({ open, onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <>
      <div className={`${styles.scrim} ${open ? styles.scrimOpen : ""}`} onClick={onClose} aria-hidden={!open} />
      <nav className={`${styles.panel} ${open ? styles.panelOpen : ""}`} aria-label="Main menu" aria-hidden={!open}>
        <button className={styles.close} onClick={onClose} aria-label="Close menu">
          <Icon name="close" size={26} />
        </button>

        <img src="/img/shared/logo.webp" alt="Soul2Souls Jazz" className={styles.logo} />

        <ul className={styles.list}>
          {NAV.map((item, i) => (
            <li key={item.label} style={{ transitionDelay: open ? `${120 + i * 55}ms` : "0ms" }}>
              {item.external ? (
                <a href={item.href} target="_blank" rel="noopener noreferrer" onClick={onClose}>
                  {item.label}
                </a>
              ) : (
                <Link to={item.href} onClick={onClose}>
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        <div className={styles.footer}>
          <a href={`mailto:${CONTACT.email}`} className={styles.email}>
            {CONTACT.email}
          </a>
          <div className={styles.social}>
            {SOCIAL.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                <Icon name={s.icon} size={20} />
              </a>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}
