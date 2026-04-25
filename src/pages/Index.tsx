import heroImg from "@/assets/visoread-hero-bg.png";
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
import { useReveal } from "@/hooks/use-reveal";
import ScrollVideoHero from "@/components/ScrollVideoHero";

const navItems = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how" },
  { label: "Contact", href: "#contact" },
];

const features = [
  {
    icon: Mic,
    eyebrow: "Feature 01",
    title: "AI Voice Assistant",
    body: "A built-in AI assistant handles everyday tasks — set reminders, ask questions, or get help on the go, all hands-free.",
  },
  {
    icon: ScanText,
    eyebrow: "Feature 02",
    title: "Read Any Text Aloud",
    body: "Point your head, hear the page. VisoRead reads books, signs, menus and labels out loud in a natural voice.",
  },
  {
    icon: Banknote,
    eyebrow: "Feature 03",
    title: "Currency Detection",
    body: "Instantly identifies notes and tells you the denomination so you always know what you're holding.",
  },
  {
    icon: FileText,
    eyebrow: "Feature 04",
    title: "Smart Summaries",
    body: "Long documents become short, clear summaries — perfect for letters, articles and important paperwork.",
  },
  {
    icon: IndianRupee,
    eyebrow: "Feature 05",
    title: "Voice-Powered UPI",
    body: "A first-of-its-kind voice UPI flow built for the visually impaired — send and receive money safely with just your voice.",
  },
  {
    icon: HandCoins,
    eyebrow: "Feature 06",
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
  useReveal();

  const handleContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success("Thanks! We'll be in touch soon.");
    setEmail("");
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="fixed left-0 right-0 top-0 z-50 px-4 pt-5 sm:px-8 sm:pt-7">
        <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/10 bg-background/45 px-4 py-2 shadow-[0_24px_80px_-36px_hsl(var(--foreground)/0.35)] backdrop-blur-xl sm:px-6 sm:py-3">
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
            PARTNER WITH US
          </a>
        </nav>
      </header>

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
          {/* Bottom content */}
          <section className="mt-auto px-4 pb-14 sm:px-8 sm:pb-20">
            <div className="mx-auto max-w-7xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-foreground/80 backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--brand))]" />
                Coming soon
              </span>
              <h1 className="mt-5 max-w-4xl text-5xl font-bold leading-[0.95] tracking-tight sm:text-6xl md:text-7xl lg:text-[5.5rem]">
                SEE THE WORLD
                <br />
                THROUGH SOUND.
              </h1>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-full bg-foreground px-8 py-4 text-sm font-semibold tracking-wide text-background transition-transform hover:scale-[1.02] sm:text-base"
                >
                  CONTACT US
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

      {/* ================= SCROLL VIDEO HERO ================= */}
      <ScrollVideoHero>

      {/* ================= FEATURES INTRO ================= */}
      <section id="features" className="relative px-4 pt-24 sm:px-8 sm:pt-32">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
          <div className="reveal max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-foreground/80 backdrop-blur">
              <Sparkles className="h-3 w-3" /> Features
            </span>
            <h2 className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
              Everything you need.
              <br />
              Spoken, not seen.
            </h2>
          </div>
          <p className="reveal reveal-delay-1 max-w-sm text-sm text-foreground/70">
            VisoRead packs reading, money handling, and an AI assistant into a
            pair of lightweight glasses — fully controlled by your voice.
          </p>
        </div>
      </section>

      {/* ================= FEATURES — one per scroll ================= */}
      {features.map(({ icon: Icon, eyebrow, title, body }, i) => (
        <section
          key={title}
          className="relative flex min-h-screen items-center px-4 py-20 sm:px-8 sm:py-24"
        >
          {/* ambient glow */}
          <div
            className={`pointer-events-none absolute inset-0 ${
              i % 2 === 0
                ? "bg-[radial-gradient(60%_50%_at_20%_50%,hsl(var(--brand))/0.10,transparent_70%)]"
                : "bg-[radial-gradient(60%_50%_at_80%_50%,hsl(var(--brand))/0.10,transparent_70%)]"
            }`}
          />
          <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-12">
            <div className={`hidden lg:block ${i % 2 === 1 ? "lg:order-2" : ""}`}>
              <span className="reveal inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium tracking-widest text-[hsl(var(--brand))] backdrop-blur">
                {eyebrow}
              </span>
              <h3 className="reveal reveal-delay-1 mt-5 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
                {title}
              </h3>
              <p className="reveal reveal-delay-2 mt-6 max-w-xl text-base leading-relaxed text-foreground/70 sm:text-lg">
                {body}
              </p>
            </div>

            <div className={i % 2 === 1 ? "lg:order-1" : ""}>
              <div className="reveal reveal-delay-1 group relative flex min-h-[520px] w-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] via-white/[0.02] to-[hsl(var(--brand))]/[0.08] p-7 backdrop-blur-md sm:min-h-[560px] sm:p-10 lg:aspect-square lg:min-h-0 lg:p-14">
                <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[hsl(var(--brand))]/20 blur-3xl" />
                <div className="absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-white/5 blur-3xl" />
                <div className="relative flex h-full w-full flex-col justify-between">
                  <div className="flex items-start justify-between gap-4">
                    <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[hsl(var(--brand))] text-[hsl(var(--brand-foreground))] shadow-[0_20px_60px_-20px_hsl(var(--brand))]">
                      <Icon className="h-7 w-7" strokeWidth={2.2} />
                    </span>
                    <div className="text-6xl font-bold tracking-tighter text-foreground/15 sm:text-7xl lg:hidden">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                  </div>
                  <div className="lg:hidden">
                    <h3 className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
                      {title}
                    </h3>
                    <p className="mt-5 max-w-xl text-base leading-relaxed text-foreground/70 sm:text-lg">
                      {body}
                    </p>
                  </div>
                  <div className="hidden text-7xl font-bold tracking-tighter text-foreground/15 sm:text-8xl lg:block">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ================= HOW IT WORKS ================= */}
      <section id="how" className="relative px-4 py-24 sm:px-8 sm:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[hsl(var(--brand))]/[0.05] to-transparent" />
        <div className="relative mx-auto max-w-7xl">
          <div className="reveal max-w-2xl">
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
            {steps.map((s, i) => (
              <div
                key={s.n}
                className={`reveal reveal-delay-${Math.min(i + 1, 3)} bg-background p-8 sm:p-10`}
              >
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

      {/* ================= CONTACT ================= */}
      <section id="contact" className="relative px-4 pb-24 pt-8 sm:px-8 sm:pb-32">
        <div className="reveal mx-auto max-w-7xl overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] via-white/[0.03] to-[hsl(var(--brand))]/[0.08] p-8 backdrop-blur-md sm:p-14">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-foreground/80">
                Investors & Partners
              </span>
              <h2 className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
                Help us bring
                <br />
                VisoRead to life.
              </h2>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-foreground/70">
                VisoRead is launching soon. We're talking to investors, NGOs and
                organisations who want to make affordable assistive tech a
                reality. Reach out — we'd love to hear from you.
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
                Name / Organisation
              </label>
              <input
                type="text"
                placeholder="Your name or company"
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
                placeholder="Tell us how you'd like to partner with VisoRead…"
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
      </ScrollVideoHero>
    </main>
  );
};

export default Index;
