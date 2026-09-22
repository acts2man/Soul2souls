import { useEffect } from "react";
import Button from "../components/ui/Button";
import Reveal from "../components/ui/Reveal";
import { CONTACT } from "../data/site";
import styles from "./AboutPage.module.css";

const CAREER = [
  'Managed Regional Comedian Greg Lowe and arranging comedy bits (Virgil the Virgo, Impressions) for the Don “Early Bird” Allen Show, WWDM 101.3 FM Columbia, SC and WWWZ Z 93.9 FM Charleston, SC',
  "Mixing of Souls INC. (Production) Charlotte, NC",
  'Created and implemented radio drops for “Zo’s Morning Show” on WOGR 1540 AM; WGAS 1420 AM; WOGR 93.3 FM',
  "WGIV 1370 AM – Radio broadcast DJ mix (SC)",
  "En Sound Internet Radio Broadcast DJ mix (Christian)",
  "EMERGE Entertainment Booking Artist & Management Agency. Here are just a few of the artists that Mr. Perry booked or sub booked for clients & concert tour dates – Lorenzo-Alpha Intl. /,, Freddie Jackson-Hush (FAJ) Records, Rome – MCA Record",
  "WQXL 1470 AM Columbia, SC Christian Radio (Glory Communications) – Radio Announcer",
  "WOIC 1320 AM, Columbia, SC – R&B Radio (Willis Broadcasting) – Radio Announcer",
  "The Fountain Bleu Night Club – Pro House DJ (SC)",
];

const MISSION = [
  "Celebrate Jazz and R&B across all subgenres",
  "Amplify underrepresented artists, producers, and voices in the jazz community",
  "Provide a platform for storytelling, discovery, and soul-stirring soundscapes",
  "Connect listeners with live mixes, exclusive content, and unforgettable moments",
];

export default function AboutPage() {
  useEffect(() => {
    document.title = "About - Soul 2 Souls jazz";
  }, []);

  return (
    <>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <Reveal>
            <p className="eyebrow" style={{ color: "rgba(255,255,255,0.85)" }}>
              About
            </p>
            <h1 className={styles.h1}>About Soul2SoulsJazz Musical Podcast</h1>
            <h3 className={styles.heroTag}>Amplifying Jazz, One Soul at a Time.</h3>
            <p className={styles.heroSub}>
              Founded by Mr. Perry (JazzAmp aka DJ Perry), Soul2SoulsJazz is a multi-dimensional musical
              podcast that celebrates the sound, spirit, and stories of jazz culture.
            </p>
          </Reveal>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="section">
        <div className="container">
          <Reveal className={styles.storyHead}>
            <p className="eyebrow">Our Story</p>
            <h2 className={styles.h2}>A Legacy Rooted in Rhythm and Radio</h2>
          </Reveal>
          <div className={styles.storyGrid}>
            {[
              "Soul2Souls Jazz Musical Podcast LLC was born from a deep love for the art of sound. Founded and hosted by JazzAmp, a veteran of the entertainment and broadcasting industries, the platform is designed to deliver immersive, high-quality jazz experiences that blend various genres of jazz and live show vibes.",
              "With over two decades of hands-on experience in radio, production, and artist management, JazzAmp brings a unique flavor to every episode — one that’s grounded in authenticity, musical excellence, and soulful storytelling.",
              "Whether you’re catching a live mix or listening on demand, Soul2Souls is more than a podcast — it’s a movement of music lovers, creators, and fans around the world.",
            ].map((p, i) => (
              <Reveal key={i} className={styles.storyCard} delay={i * 100}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className={styles.mission}>
        <div className={`container ${styles.missionInner}`}>
          <Reveal className={styles.missionCopy}>
            <p className="eyebrow">The Mission</p>
            <h2 className={styles.h2}>More Than Music. A Movement.</h2>
            <ul className={styles.checklist}>
              {MISSION.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal className={styles.quoteCard} delay={120}>
            <blockquote>
              &ldquo;It&rsquo;s not just about what you hear—it&rsquo;s about what you feel.&rdquo;
              <cite>&ndash; JazzAmp aka DJ Perry</cite>
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* MEET JAZZAMP */}
      <section className="section">
        <div className={`container ${styles.meet}`}>
          <Reveal className={styles.meetMedia}>
            <img src="/img/about/36.webp" alt="JazzAmp aka DJ Perry" width={407} height={462} />
            <div className={styles.meetRing} aria-hidden="true" />
          </Reveal>
          <Reveal className={styles.meetBody} delay={120}>
            <p className="eyebrow">The Host</p>
            <h2 className={styles.h2}>Meet JazzAmp aka DJ Perry</h2>
            <p className={styles.lead}>
              JazzAmp aka DJ Perry, the voice and vision behind Soul2Souls Jazz, has spent over 20 years
              shaping the entertainment landscape in radio, comedy, and artist management.
            </p>
            <ul className={styles.career}>
              {CAREER.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
            <blockquote className={styles.pullQuote}>
              &ldquo;I&rsquo;m not in this for fame—I&rsquo;m here to build a community around the culture of
              sound. Soul2Souls is my way of giving back to the music that shaped me.&rdquo;
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <div className={`container ${styles.ctaInner}`}>
          <Reveal>
            <h2 className={styles.ctaTitle}>The Movement Continues</h2>
            <p className={styles.ctaSub}>Unlock the Soul2SoulsJazz Exclusive Experience</p>
            <div className={styles.ctaBtns}>
              <Button href={CONTACT.mixcloud} variant="gold">
                Join Mixcloud
              </Button>
              <Button to="/contact" variant="outline">
                Contact Us
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
