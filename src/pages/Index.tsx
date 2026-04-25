import heroImg from "@/assets/hero-glasses.jpg";
import {
  Mic,
  ScanText,
  Banknote,
  FileText,
  IndianRupee,
  HandCoins,
  Sparkles,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const navItems = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how" },
  { label: "About us", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const features = [
  {
    icon: Mic,
    title: "AI Voice Assistant",
    body: "A built-in AI assistant handles everyday tasks — set reminders, ask questions, or get help on the go, all hands-free.",
  },
  {
    icon: ScanText,
    title: "Read Any Text Aloud",
    body: "Point your head, hear the page. VisoRead reads books, signs, menus and labels out loud in a natural voice.",
  },
  {
    icon: Banknote,
    title: "Currency Detection",
    body: "Instantly identifies notes and tells you the denomination so you always know what you're holding.",
  },
  {
    icon: FileText,
    title: "Smart Summaries",
    body: "Long documents become short, clear summaries — perfect for letters, articles and important paperwork.",
  },
  {
    icon: IndianRupee,
    title: "Voice-Powered UPI",
    body: "A first-of-its-kind voice UPI flow built for the visually impaired — send and receive money safely with just your voice.",
  },
  {
    icon: HandCoins,
    title: "Affordable by Design",
    body: "Built ground-up to be cost effective, so independence-enhancing tech is within reach for every household.",
  },
];

const steps = [
  {
    n: "01",
    title: "Wear & wake",
    body: "Put on VisoRead and say the wake word. The assistant is instantly ready to help.",
  },
  {
    n: "02",
    title: "Ask in your voice",
    body: 'Speak naturally — "read this", "what note is this", "pay 200 to Ramesh".',
  },
  {
    n: "03",
    title: "Hear the world back",
    body: "Clear audio responses guide you through reading, money, and daily tasks.",
  },
];

const Index = () => {
  const [email, setEmail] = useState("");

  const handleContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success("Thanks! We'll be in touch soon.");
    setEmail("");
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* ================= HERO ================= */}
      <section className="relative min-h-screen overflow-hidden">
        <img
          src={heroImg}
          alt="Person wearing VisoRead smart glasses"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover object-center opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/40" />

        <div className="relative z-10 flex min-h-screen flex-col">
          {/* Nav */}
          <header className="px-4 pt-5 sm:px-8 sm:pt-7">
            <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-xl sm:px-6 sm:py-3">
              <a href="#" className="text-base font-semibold tracking-[0.2em]">
                VISOREAD
              </a>
              <ul className="hidden items-center gap-8 md:flex">
                {navItems.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-sm text-foreground/80 transition-colors hover:text-foreground"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className="rounded-full bg-foreground px-5 py-2.5 text-xs font-semibold tracking-wide text-background transition-transform hover:scale-[1.02] sm:text-sm"
              >
                GET VISOREAD
              </a>
            </nav>
          </header>

          {/* Bottom content */}
          <section className="mt-auto px-4 pb-14 sm:px-8 sm:pb-20">
            <div className="mx-auto max-w-7xl">
              <h1 className="max-w-4xl text-5xl font-bold leading-[0.95] tracking-tight sm:text-6xl md:text-7xl lg:text-[5.5rem]">
                SEE THE WORLD
                <br />
                THROUGH SOUND.
              </h1>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-full bg-foreground px-8 py-4 text-sm font-semibold tracking-wide text-background transition-transform hover:scale-[1.02] sm:text-base"
                >
                  ORDER VISOREAD
                </a>
                <p className="text-sm leading-snug text-foreground/75">
                  Voice-first AI glasses
                  <br />
                  built for the visually impaired
                </p>
              </div>
            </div>
          </section>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section id="features" className="relative px-4 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-foreground/80 backdrop-blur">
                <Sparkles className="h-3 w-3" /> Features
              </span>
              <h2 className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
                Everything you need.
                <br />
                Spoken, not seen.
              </h2>
            </div>
            <p className="max-w-sm text-sm text-foreground/70">
              VisoRead packs reading, money handling, and an AI assistant into a
              pair of lightweight glasses — fully controlled by your voice.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: Icon, title, body }) => (
              <article
                key={title}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-md transition-colors hover:border-white/20 hover:bg-white/[0.06]"
              >
                <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[hsl(var(--brand))]/10 blur-3xl transition-opacity group-hover:opacity-100 opacity-0" />
                <span className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-[hsl(var(--brand))] text-[hsl(var(--brand-foreground))]">
                  <Icon className="h-5 w-5" strokeWidth={2.2} />
                </span>
                <h3 className="relative mt-6 text-xl font-semibold tracking-tight">
                  {title}
                </h3>
                <p className="relative mt-2 text-sm leading-relaxed text-foreground/70">
                  {body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section id="how" className="relative px-4 py-24 sm:px-8 sm:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[hsl(var(--brand))]/[0.05] to-transparent" />
        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-foreground/80 backdrop-blur">
              How it works
            </span>
            <h2 className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
              Three steps.
              <br />
              Total independence.
            </h2>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 md:grid-cols-3">
            {steps.map((s) => (
              <div key={s.n} className="bg-background p-8 sm:p-10">
                <span className="text-sm font-semibold tracking-widest text-[hsl(var(--brand))]">
                  {s.n}
                </span>
                <h3 className="mt-6 text-2xl font-semibold tracking-tight">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground/70">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section id="about" className="relative px-4 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-md sm:p-14">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-foreground/80">
            About us
          </span>
          <h2 className="mt-6 text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">
            Independence shouldn't be a luxury.
          </h2>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-foreground/75 sm:text-lg">
            We're building VisoRead for one simple reason: assistive technology
            is too expensive for the people who need it most. By combining an
            AI voice assistant, on-device reading, currency detection and a
            first-of-its-kind voice UPI flow into a single affordable pair of
            glasses, we put true independence within reach for every household.
          </p>
        </div>
      </section>

      {/* ================= CONTACT ================= */}
      <section id="contact" className="relative px-4 pb-24 pt-8 sm:px-8 sm:pb-32">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] via-white/[0.03] to-[hsl(var(--brand))]/[0.08] p-8 backdrop-blur-md sm:p-14">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-foreground/80">
                Contact
              </span>
              <h2 className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
                Bring VisoRead
                <br />
                to someone you love.
              </h2>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-foreground/70">
                Drop your email and we'll reach out with availability, pricing
                and a personal walkthrough.
              </p>

              <ul className="mt-10 space-y-4 text-sm text-foreground/80">
                <li className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 border border-white/10">
                    <Mail className="h-4 w-4" />
                  </span>
                  hello@visoread.com
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 border border-white/10">
                    <Phone className="h-4 w-4" />
                  </span>
                  +91 80000 00000
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 border border-white/10">
                    <MapPin className="h-4 w-4" />
                  </span>
                  Bengaluru, India
                </li>
              </ul>
            </div>

            <form
              onSubmit={handleContact}
              className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-black/30 p-6 backdrop-blur-md sm:p-8"
            >
              <label className="text-xs font-medium uppercase tracking-widest text-foreground/60">
                Name
              </label>
              <input
                type="text"
                placeholder="Your full name"
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-foreground/40 focus:border-white/30 focus:outline-none"
              />

              <label className="mt-2 text-xs font-medium uppercase tracking-widest text-foreground/60">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-foreground/40 focus:border-white/30 focus:outline-none"
              />

              <label className="mt-2 text-xs font-medium uppercase tracking-widest text-foreground/60">
                Message
              </label>
              <textarea
                rows={4}
                placeholder="Tell us a bit about who VisoRead is for…"
                className="resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-foreground/40 focus:border-white/30 focus:outline-none"
              />

              <button
                type="submit"
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-semibold tracking-wide text-background transition-transform hover:scale-[1.02]"
              >
                Send message <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>

        <footer className="mx-auto mt-12 flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-foreground/50 sm:flex-row">
          <span className="tracking-[0.2em]">VISOREAD</span>
          <span>© {new Date().getFullYear()} VisoRead. Built with care.</span>
        </footer>
      </section>
    </main>
  );
};

export default Index;
