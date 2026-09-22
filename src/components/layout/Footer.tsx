import { Link } from "react-router-dom";
import { NAV, SOCIAL, CONTACT, FOOTER_SIGNUP, COPYRIGHT } from "../../data/site";
import NewsletterForm from "../ui/NewsletterForm";
import Icon from "../ui/Icon";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <img src="/img/shared/logo.webp" alt="Soul2Souls Jazz Musical Podcast" className={styles.logo} />
          <p className={styles.tag}>Authentic Jazz for the Global Soul.</p>
          <div className={styles.social}>
            {SOCIAL.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                <Icon name={s.icon} size={20} />
              </a>
            ))}
          </div>
        </div>

        <nav className={styles.links} aria-label="Footer">
          <h3 className={styles.colTitle}>Explore</h3>
          <ul>
            {NAV.map((item) =>
              item.external ? (
                <li key={item.label}>
                  <a href={item.href} target="_blank" rel="noopener noreferrer">
                    {item.label}
                  </a>
                </li>
              ) : (
                <li key={item.label}>
                  <Link to={item.href}>{item.label}</Link>
                </li>
              )
            )}
          </ul>
        </nav>

        <div className={styles.signup}>
          <h3 className={styles.colTitle}>Stay in the loop</h3>
          <p className={styles.signupText}>{FOOTER_SIGNUP}</p>
          <NewsletterForm />
          <a href={`mailto:${CONTACT.email}`} className={styles.email}>
            <Icon name="mail" size={18} /> {CONTACT.email}
          </a>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>{COPYRIGHT}</p>
      </div>
    </footer>
  );
}
