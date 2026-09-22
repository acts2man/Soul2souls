import { CONTACT, ANNOUNCEMENT } from "../../data/site";
import styles from "./TopBar.module.css";

export default function TopBar() {
  return (
    <div className={styles.bar}>
      <div className={styles.inner}>
        <a href={`mailto:${CONTACT.email}`} className={styles.email}>
          {CONTACT.email}
        </a>
        <div className={styles.marqueeWrap} aria-hidden="true">
          <div className={styles.marquee}>
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} className={styles.tag}>
                {ANNOUNCEMENT}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
