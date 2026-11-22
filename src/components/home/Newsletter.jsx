import { useState } from "react";
import { Container, Section } from "../ui/Section";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { Reveal } from "../ui/Reveal";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ type: "", msg: "" });

  const submit = (e) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus({ type: "error", msg: "Enter a valid email address." });
      return;
    }
    setStatus({ type: "success", msg: "Thank you for subscribing. Welcome to ZharpRo." });
    setEmail("");
  };

  return (
    <Section className="pt-0 md:pt-0">
      <Container>
        <Reveal>
          <div className="rounded-[2rem] border border-border bg-surface-alt/50 px-6 py-12 sm:px-10 md:py-16">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted">Newsletter</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Stay close to the next release.</h2>
              <p className="mt-4 text-muted">Receive curated product drops, editorial stories, and exclusive offers.</p>
              <form onSubmit={submit} className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Input aria-label="Email address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" className="bg-surface" />
                <Button type="submit" className="sm:w-auto">Subscribe</Button>
              </form>
              <p className="mt-3 min-h-5 text-sm" aria-live="polite">
                {status.msg ? <span className={status.type === "error" ? "text-danger" : "text-foreground"}>{status.msg}</span> : null}
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
