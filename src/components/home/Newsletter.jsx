import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Container, Section } from "../ui/Section";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Reveal from "../ui/Reveal";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ type: "", msg: "" });

  const submit = (e) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setStatus({ type: "error", msg: "Enter a valid email address." });
      return;
    }
    setStatus({ type: "success", msg: "Valid format — this demo has no mailing backend, so nothing was stored." });
    setEmail("");
  };

  return (
    <Section id="newsletter" className="pt-0 md:pt-0">
      <Container>
        <Reveal>
          <div className="border border-border bg-surface-alt/60 px-6 py-14 sm:px-12 md:py-20">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-muted">Newsletter</p>
              <h2 className="mt-5 text-section font-semibold tracking-[-0.035em] text-balance">Stay close to the next release.</h2>
              <p className="mt-5 text-muted">A considered note on new arrivals, editorial stories, and design-led technology.</p>
              <form onSubmit={submit} noValidate className="mx-auto mt-9 flex max-w-xl flex-col gap-3 sm:flex-row">
                <Input aria-label="Email address" type="email" value={email} onChange={(e) => { setEmail(e.target.value); if (status.msg) setStatus({ type: "", msg: "" }); }} placeholder="Enter your email" error={status.type === "error" ? status.msg : undefined} className="bg-background" />
                <Button type="submit" className="sm:w-auto">Subscribe <ArrowRight size={15} /></Button>
              </form>
              <p className="mt-4 min-h-5 text-sm" aria-live="polite">{status.msg ? <span className={status.type === "error" ? "text-danger" : "text-muted"}>{status.msg}</span> : null}</p>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
