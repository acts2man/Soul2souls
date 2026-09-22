import { useEffect } from "react";
import Button from "../components/ui/Button";
import Reveal from "../components/ui/Reveal";
import { mixcloudEmbed, MIXES } from "../data/podcasts";
import { CONTACT } from "../data/site";
import styles from "./HomePage.module.css";

export default function HomePage() {
  useEffect(() => {
    document.title = "Home - Soul 2 Souls jazz";
  }, []);

  return (
    <>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroBlobs} aria-hidden="true">
          <span /><span /><span />
        </div>
        <div className={`container ${styles.heroInner}`}>
          <Reveal className={styles.heroCopy}>
            <p className="eyebrow">Soul2SoulsJazz Musical Podcast</p>
            <h1 className={styles.heroTitle}>
              Danceable Jazz <span>&ndash;</span> Evolving for Tomorrow
            </h1>
            <p className={styles.heroSub}>
              Live, professional, creatively blended jazz mixes with your host JazzAmp aka DJ Perry —
              straight-ahead, danceable jazz with an emerging Latin flair.
            </p>
            <div className={styles.heroBtns}>
              <Button href={CONTACT.mixcloud} variant="solid">
                Join Mixcloud
              </Button>
              <Button to="/podcasts" variant="outline">
                Listen Now to Creatively blended Mixes
              </Button>
            </div>
          </Reveal>
          <Reveal className={styles.heroArt} delay={120}>
            <img src="/img/home/46.webp" alt="Soul2Souls Jazz Musical Podcast" width={750} height={492} />
          </Reveal>
        </div>
      </section>

      {/* GO LIVE BAND */}
      <section className={styles.live}>
        <div className={`container ${styles.liveInner}`}>
          <Reveal>
            <h2 className={styles.liveTitle}>
              Click here to go live! Fridays at 12pm noon CST &amp; Saturdays at 9:30pm CST
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <Button href={CONTACT.mixcloud} variant="gold">
              Sign Up to Chat and Go Live!
            </Button>
          </Reveal>
        </div>
      </section>

      {/* ABOUT THE SHOW */}
      <section className="section">
        <div className={`container ${styles.split}`}>
          <Reveal className={styles.splitMedia}>
            <img src="/img/home/47.webp" alt="JazzAmp aka DJ Perry in the studio" width={500} height={666} />
            <div className={styles.mediaRing} aria-hidden="true" />
          </Reveal>
          <Reveal className={styles.splitBody} delay={120}>
            <p className="eyebrow">About the Show</p>
            <h2 className={styles.h2}>
              Welcome to the Soul2SoulsJazz WDJP FM (Fun Music)—more than stereo and better than 4K, our
              jazzy beat crafts a sophisticated sound synthesis.
            </h2>
            <p className={styles.lead}>
              Join us for some &ldquo;jive talk&rdquo; and unique danceable jazz mixes with your family,
              friends, and others around the globe as we kick off a new and entertaining musical podcast!
            </p>
            <Button to="/about" variant="solid">
              Learn More
            </Button>
          </Reveal>
        </div>
      </section>

      {/* CHART-TOPPING SUCCESS */}
      <section className={styles.chart}>
        <div className={`container ${styles.chartInner}`}>
          <Reveal>
            <p className={styles.chartKicker}>Chart-Topping Success!</p>
            <p className={styles.chartFrom}>From Soul2SoulsJazz WDJP - FM (Fun Music)</p>
            <h2 className={styles.chartHeadline}>
              Trending Week Over Week — Danceable Jazz, Vocal Jazz, Contemporary Jazz, R&amp;B, Soul Jazz and
              Latin Jazz
            </h2>
            <h3 className={styles.chartSub}>Soul2SoulsJazz Musical Podcast Making Waves Globally</h3>
          </Reveal>
          <Reveal delay={120}>
            <p className={styles.chartBody}>
              We&rsquo;re thrilled to announce that our danceable Jazz creations continue to rapidly advance
              on the global charts! A huge thank you to our amazing listeners and supporters around the world
              &ndash; your love for jazz keeps the soul in the music alive. Our mixes blend smooth rhythms,
              vibrant melodies and cool Jazz grooves that are clearly resonating throughout communities around
              the globe. If you haven&rsquo;t heard it yet, now&rsquo;s the perfect time to dive into the vibe.
              Let&rsquo;s keep the momentum going, fingers snapping and continue to advance rapidly in the
              entertainment sectors! Stay tuned, stay blessed and stay soulful!
            </p>
          </Reveal>
        </div>
      </section>

      {/* FEATURED MIX */}
      <section className="section">
        <div className="container">
          <Reveal className={styles.featHead}>
            <p className="eyebrow">On Rotation</p>
            <h2 className={styles.h2Center}>Friday&rsquo;s Featured Lunch Vibe Mix</h2>
          </Reveal>
          <Reveal delay={100} className={styles.featPlayer}>
            <iframe
              title={MIXES[0].title}
              src={mixcloudEmbed(MIXES[0].feed)}
              width="100%"
              height={140}
              frameBorder={0}
              loading="lazy"
              allow="autoplay"
            />
          </Reveal>
        </div>
      </section>

      {/* MISSION */}
      <section className={styles.mission}>
        <div className="container">
          <Reveal className={styles.missionHead}>
            <h2 className={styles.missionTitle}>Our mission is simple: Authentic Jazz for the Global Soul</h2>
            <p className={styles.missionLead}>
              Amidst a world of digital beats and synthetic sounds, Soul2SoulsJazz delivers the real thing
              &ndash; live professional performances by DJ Perry &ndash; creatively blending digital music on
              the wheels of steel by implementing straight-ahead, danceable Jazz music with an emerging Latin
              flair. Music that celebrates tradition while keeping the rhythm alive &ndash; celebrating
              Jazz&rsquo;s timeless essence.
            </p>
          </Reveal>
          <div className={styles.pillars}>
            {[
              { t: "Authentic", d: "Every performance is crafted for both listening and dancing." },
              {
                t: "Global",
                d: "From New Orleans to Nigeria, Australia to California – we celebrate Jazz as a universal language that connects cultures.",
              },
              {
                t: "Community",
                d: "Building Jazz artist awareness and listeners, creating spaces where jazz lovers gather to discover, discuss, and celebrate.",
              },
            ].map((p, i) => (
              <Reveal key={p.t} className={styles.pillar} delay={i * 120}>
                <span className={styles.pillarNum}>{String(i + 1).padStart(2, "0")}</span>
                <h3>{p.t}</h3>
                <p>{p.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* MOVEMENT */}
      <section className="section">
        <div className={`container ${styles.split} ${styles.splitReverse}`}>
          <Reveal className={styles.splitMedia}>
            <img src="/img/home/48.webp" alt="DJ Perry Remix" width={500} height={285} />
          </Reveal>
          <Reveal className={styles.splitBody} delay={120}>
            <p className="eyebrow">More Than a Podcast</p>
            <h2 className={styles.h2}>A movement of music lovers, creators, and fans.</h2>
            <p className={styles.lead}>
              Whether you&rsquo;re catching a live mix or listening on demand, Soul2Souls is more than a
              podcast &ndash; it&rsquo;s a movement of music lovers, creators, and fans around the world.
            </p>
            <Button to="/about" variant="solid">
              Learn More
            </Button>
          </Reveal>
        </div>
      </section>

      {/* SPONSOR CTA */}
      <section className={styles.sponsor}>
        <div className={`container ${styles.sponsorInner}`}>
          <Reveal>
            <h2 className={styles.sponsorTitle}>
              Would you like to become a Sponsor for our Jazz musical podcast that&rsquo;s growing rapidly
              around the globe?
            </h2>
            <p className={styles.sponsorText}>
              Want to be a sponsor for the Jazz show? Contact Us Today We&rsquo;ll make you shine.
            </p>
            <Button to="/contact" variant="gold">
              Contact Us
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
