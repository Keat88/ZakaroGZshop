import { useState } from "react";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { Container, Section, SectionHeading } from "../components/ui/Section";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { Reveal } from "../components/ui/Reveal";
import { usePageTitle } from "../components/ui/ScrollToTop";

const initial = { name: "", email: "", phone: "", subject: "", message: "" };

export default function Contact() {
  usePageTitle("Contact");
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: "", msg: "" });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((err) => ({ ...err, [name]: "" }));
  };

  const validate = () => {
    const err = {};
    if (!form.name.trim()) err.name = "Name is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) err.email = "Enter a valid email address.";
    if (!form.phone.trim()) err.phone = "Phone number is required.";
    if (!form.subject.trim()) err.subject = "Subject is required.";
    if (form.message.trim().length < 10) err.message = "Message should be at least 10 characters.";
    return err;
  };

  const submit = (e) => {
    e.preventDefault();
    const err = validate();
    setErrors(err);
    if (Object.keys(err).length) {
      setStatus({ type: "error", msg: "Please correct the highlighted fields." });
      return;
    }
    setStatus({ type: "success", msg: "Message received. This demo stores no backend submission; connect a form endpoint to deliver messages." });
    setForm(initial);
  };

  return (
    <main>
      <Section className="border-b border-border bg-surface-alt/30 py-14 md:py-20">
        <Container>
          <SectionHeading eyebrow="Contact" title="We’re here to help." description="Questions about products, orders, or partnerships—our team is ready with thoughtful support." />
        </Container>
      </Section>

      <Section>
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <Reveal className="space-y-6">
            <div className="rounded-3xl border border-border bg-surface p-7">
              <h2 className="text-xl font-semibold">Contact information</h2>
              <div className="mt-6 space-y-5 text-sm text-muted">
                <p className="flex gap-3"><MapPin size={18} className="mt-0.5 shrink-0 text-foreground" /><span>51P, Sen Sok, Phnom Penh, Cambodia</span></p>
                <p className="flex gap-3"><Mail size={18} className="mt-0.5 shrink-0 text-foreground" /><a href="mailto:support@zharpro.com" className="hover:text-foreground">support@zharpro.com</a></p>
                <p className="flex gap-3"><Phone size={18} className="mt-0.5 shrink-0 text-foreground" /><a href="tel:+855965757413" className="hover:text-foreground">+855 96 575 7413</a></p>
                <p className="flex gap-3"><Clock size={18} className="mt-0.5 shrink-0 text-foreground" /><span>Monday – Saturday, 9:00 AM – 6:00 PM</span></p>
              </div>
            </div>
            <div className="rounded-3xl border border-border bg-surface-alt/40 p-7">
              <p className="text-sm leading-7 text-muted">For order support, include your order reference in the message so we can assist you quickly.</p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <form onSubmit={submit} noValidate className="rounded-3xl border border-border bg-surface p-7 sm:p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <Input label="Full name" id="name" name="name" value={form.name} onChange={onChange} autoComplete="name" error={errors.name} />
                <Input label="Email address" id="email" name="email" type="email" value={form.email} onChange={onChange} autoComplete="email" error={errors.email} />
                <Input label="Phone number" id="phone" name="phone" type="tel" value={form.phone} onChange={onChange} autoComplete="tel" error={errors.phone} />
                <Input label="Subject" id="subject" name="subject" value={form.subject} onChange={onChange} error={errors.subject} />
              </div>
              <label className="mt-5 block space-y-2">
                <span className="text-sm font-medium text-foreground">Message</span>
                <textarea id="message" name="message" rows={6} value={form.message} onChange={onChange} className={`w-full rounded-xl border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-foreground/15 ${errors.message ? "border-danger focus:ring-danger/20" : "border-border"}`} placeholder="How can we help?" />
                {errors.message ? <span className="text-xs text-danger">{errors.message}</span> : null}
              </label>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <Button type="submit">Send message</Button>
                <p className="text-sm" aria-live="polite">{status.msg ? <span className={status.type === "error" ? "text-danger" : "text-muted"}>{status.msg}</span> : null}</p>
              </div>
            </form>
          </Reveal>
        </Container>
      </Section>
    </main>
  );
}
