import { useState } from "react";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Container, Section, SectionHeading } from "../components/ui/Section";
import Input, { Textarea } from "../components/ui/Input";
import Button from "../components/ui/Button";
import Reveal from "../components/ui/Reveal";
import { usePageTitle } from "../components/ui/ScrollToTop";

const initial = { name: "", email: "", phone: "", subject: "", message: "" };

const details = [
  { Icon: MapPin, label: "Visit", value: "51P, Sen Sok, Phnom Penh, Cambodia" },
  { Icon: Mail, label: "Email", value: "support@zharpro.com", href: "mailto:support@zharpro.com" },
  { Icon: Phone, label: "Phone", value: "+855 96 575 7413", href: "tel:+855965757413" },
  { Icon: Clock, label: "Hours", value: "Monday – Saturday, 9:00 AM – 6:00 PM" },
];

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
    setStatus({ type: "success", msg: "Form validated locally. This demo has no submission backend; connect one to deliver messages." });
    setForm(initial);
  };

  return (
    <main id="main">
      <Section className="border-b border-border bg-surface-alt/40 py-14 md:py-20">
        <Container>
          <SectionHeading as="h1" eyebrow="Contact" title="We’re here to help." description="Questions about products, orders, or partnerships — our team is ready with thoughtful support." />
        </Container>
      </Section>

      <Section className="py-14 md:py-20">
        <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal className="space-y-5">
            <div className="border border-border bg-surface p-7 sm:p-8">
              <h2 className="text-[10px] font-semibold uppercase tracking-[0.24em] text-muted">Contact information</h2>
              <div className="mt-8 space-y-6">
                {details.map(({ Icon, label, value, href }) => (
                  <div key={label} className="flex gap-4 border-b border-border pb-5 last:border-0 last:pb-0">
                    <Icon size={18} className="mt-0.5 shrink-0 text-foreground" strokeWidth={1.6} />
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">{label}</p>
                      {href ? <a href={href} className="mt-1 inline-block text-sm text-foreground transition-colors hover:text-muted">{value}</a> : <p className="mt-1 text-sm text-foreground">{value}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="border border-border bg-surface-alt/60 p-7">
              <p className="text-sm leading-7 text-muted">For order support, include your order reference in the message so we can assist you quickly.</p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <form onSubmit={submit} noValidate className="border border-border bg-surface p-6 sm:p-9">
              <div>
                <h2 className="text-xl font-semibold tracking-tight">Send a message</h2>
                <p className="mt-2 text-sm text-muted">Fields marked with an asterisk are required.</p>
              </div>
              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                <Input label="Full name *" id="name" name="name" value={form.name} onChange={onChange} autoComplete="name" error={errors.name} />
                <Input label="Email address *" id="email" name="email" type="email" value={form.email} onChange={onChange} autoComplete="email" error={errors.email} />
                <Input label="Phone number *" id="phone" name="phone" type="tel" value={form.phone} onChange={onChange} autoComplete="tel" error={errors.phone} />
                <Input label="Subject *" id="subject" name="subject" value={form.subject} onChange={onChange} error={errors.subject} />
              </div>
              <div className="mt-6">
                <Textarea label="Message *" id="message" name="message" rows={6} value={form.message} onChange={onChange} error={errors.message} placeholder="How can we help?" />
              </div>
              <div className="mt-7 flex flex-wrap items-center gap-5">
                <Button type="submit">Send message</Button>
                <p className="flex-1 text-xs leading-6" role="status" aria-live="polite">{status.msg ? <span className={status.type === "error" ? "text-danger" : "text-muted"}>{status.msg}</span> : null}</p>
              </div>
            </form>
          </Reveal>
        </Container>
      </Section>
    </main>
  );
}
