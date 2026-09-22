import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import styles from "./Button.module.css";

type Variant = "solid" | "outline" | "gold";
type Props = {
  children: ReactNode;
  href?: string;
  to?: string;
  variant?: Variant;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
};

export default function Button({ children, href, to, variant = "solid", onClick, className = "", type = "button" }: Props) {
  const cls = `${styles.btn} ${styles[variant]} ${className}`;
  if (to) {
    return (
      <Link to={to} className={cls} onClick={onClick}>
        <span>{children}</span>
      </Link>
    );
  }
  if (href) {
    const external = /^https?:/.test(href);
    return (
      <a
        href={href}
        className={cls}
        onClick={onClick}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        <span>{children}</span>
      </a>
    );
  }
  return (
    <button type={type} className={cls} onClick={onClick}>
      <span>{children}</span>
    </button>
  );
}
