import { useState } from "react";
import styles from "./NewsletterForm.module.css";

/**
 * Newsletter signup. Wired to Netlify Forms (field name `sr_mailchimp_email`,
 * matching the original). Shows real submitting / success / error states —
 * never a fake success.
 */
export default function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setState("sending");
    try {
      const body = new URLSearchParams({ "form-name": "newsletter", sr_mailchimp_email: email });
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      if (!res.ok) throw new Error(String(res.status));
      setState("done");
      setEmail("");
    } catch {
      setState("error");
    }
  };

  return (
    <form
      name="newsletter"
      method="POST"
      data-netlify="true"
      onSubmit={submit}
      className={`${styles.form} ${compact ? styles.compact : ""}`}
    >
      <input type="hidden" name="form-name" value="newsletter" />
      <label className={styles.srOnly} htmlFor="nl-email">
        Email
      </label>
      <input
        id="nl-email"
        type="email"
        name="sr_mailchimp_email"
        placeholder="Email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={styles.input}
      />
      <button type="submit" className={styles.btn} disabled={state === "sending"}>
        {state === "sending" ? "Signing up…" : "Sign up"}
      </button>
      <p className={styles.status} role="status" aria-live="polite">
        {state === "done" && "Thanks — you're on the list!"}
        {state === "error" && "Something went wrong. Please try again."}
      </p>
    </form>
  );
}
