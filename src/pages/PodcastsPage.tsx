import { useEffect } from "react";
import Reveal from "../components/ui/Reveal";
import Button from "../components/ui/Button";
import { MIXES, mixcloudEmbed } from "../data/podcasts";
import { CONTACT } from "../data/site";
import styles from "./PodcastsPage.module.css";

export default function PodcastsPage() {
  useEffect(() => {
    document.title = "Podcasts - Soul 2 Souls jazz";
  }, []);

  return (
    <>
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <Reveal>
            <p className="eyebrow" style={{ color: "rgba(255,255,255,0.85)" }}>
              The Mixes
            </p>
            <h1 className={styles.h1}>Podcasts &amp; Live Mixes</h1>
            <h2 className={styles.heroSub}>
              Feel free to enjoy some of our awesome mixes. Exclusive&rsquo;s require a subscription to
              Soul2SoulsJazz on Mixcloud for $3.99/month
            </h2>
            <div className={styles.heroBtns}>
              <Button href={CONTACT.mixcloud} variant="gold">
                Subscribe on Mixcloud
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.grid}>
            {MIXES.map((mix, i) => (
              <Reveal key={mix.feed} className={styles.card} delay={(i % 3) * 90}>
                <h3 className={styles.cardTitle}>{mix.title}</h3>
                <iframe
                  title={mix.title}
                  src={mixcloudEmbed(mix.feed)}
                  width="100%"
                  height={120}
                  frameBorder={0}
                  loading="lazy"
                  allow="autoplay"
                />
              </Reveal>
            ))}
          </div>

          <Reveal className={styles.notes}>
            <p>
              Want more? View all of our shows at{" "}
              <a href={CONTACT.mixcloud} target="_blank" rel="noopener noreferrer">
                www.mixcloud.com/S2SJazz25
              </a>
            </p>
            <p className={styles.credit}>Intro/outro musical sound provided by SFR beats</p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
