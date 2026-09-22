import { useEffect, useState } from "react";
import Icon from "../ui/Icon";
import styles from "./BackToTop.module.css";

export default function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <button
      className={`${styles.btn} ${show ? styles.show : ""}`}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
    >
      <Icon name="arrowUp" size={22} />
    </button>
  );
}
