import { useEffect, useState } from "react";
import Reveal from "../components/ui/Reveal";
import Icon from "../components/ui/Icon";
import { CONTACT, SOCIAL } from "../data/site";
import styles from "./ContactPage.module.css";

export default function ContactPage() {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  useEffect(() => {
    document.title = "Contact - Soul 2 Souls jazz";
  }, []);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setState("sending");
    try {
      const data = new FormData(form);
      const body = new URLSearchParams(data as unknown as Record<string, string>);
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      if (!res.ok) throw new Error(String(res.status));
      setState("done");
      form.reset();
    } catch {
      setState("error");
    }
  };

  return (
    <>
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <Reveal>
            <p className="eyebrow" style={{ color: "rgba(255,255,255,0.85)" }}>
              Say Hello
            </p>
            <h1 className={styles.h1}>Contact Us</h1>
            <p className={styles.heroSub}>
              Booking, sponsorship, or just want to talk jazz? Drop us a line — we&rsquo;d love to hear from
              you.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className={`container ${styles.grid}`}>
          <Reveal className={styles.formWrap}>
            <h2 className={styles.h2}>Contact us</h2>
            <form
              name="contact"
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
              onSubmit={submit}
              className={styles.form}
            >
              <input type="hidden" name="form-name" value="contact" />
              <p className={styles.hp}>
                <label>
                  Don&rsquo;t fill this out: <input name="bot-field" />
                </label>
              </p>
              <label className={styles.field}>
                <span>Your Name</span>
                <input type="text" name="your-name" required />
              </label>
              <label className={styles.field}>
                <span>
                  Your Email <em>(required)</em>
                </span>
                <input type="email" name="your-email" required />
              </label>
              <label className={styles.field}>
                <span>Subject</span>
                <input type="text" name="your-subject" />
              </label>
              <label className={styles.field}>
                <span>Your Message</span>
                <textarea name="your-message" rows={6} required />
              </label>
              <button type="submit" className={styles.submit} disabled={state === "sending"}>
                {state === "sending" ? "Sending…" : "Send Message"}
              </button>
              <p className={styles.status} role="status" aria-live="polite">
                {state === "done" && "Thanks! Your message has been sent."}
                {state === "error" && "Sorry, something went wrong. Please email us directly."}
              </p>
            </form>
          </Reveal>

          <Reveal className={styles.info} delay={120}>
            <div className={styles.infoCard}>
              <h3>Contact</h3>
              <a href={`mailto:${CONTACT.email}`} className={styles.email}>
                <Icon name="mail" size={20} /> {CONTACT.email}
              </a>
            </div>

            <div className={styles.infoCard}>
              <h3>Booking</h3>
              <p>
                Accepting bookings for the U.S. in March 2026. Send email to{" "}
                <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> for additional information
              </p>
            </div>

            <div className={styles.infoCard}>
              <h3>Follow</h3>
              <div className={styles.social}>
                {SOCIAL.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                    <Icon name={s.icon} size={20} />
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
