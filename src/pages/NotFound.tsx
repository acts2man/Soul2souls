import { useEffect } from "react";
import Button from "../components/ui/Button";
import styles from "./NotFound.module.css";

export default function NotFound() {
  useEffect(() => {
    document.title = "Page Not Found - Soul 2 Souls jazz";
  }, []);
  return (
    <section className={styles.wrap}>
      <div className="container">
        <p className={styles.code}>404</p>
        <h1 className={styles.title}>This track isn&rsquo;t in the mix.</h1>
        <p className={styles.sub}>The page you&rsquo;re looking for has moved or never existed. Let&rsquo;s get you back to the music.</p>
        <div className={styles.btns}>
          <Button to="/" variant="gold">
            Back Home
          </Button>
          <Button to="/podcasts" variant="outline">
            Browse Mixes
          </Button>
        </div>
      </div>
    </section>
  );
}
