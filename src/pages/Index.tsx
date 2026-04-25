import heroImg from "@/assets/visoread-hero-bg.png";
import {
  Mic,
  ScanText,
  Banknote,
  FileText,
  Sparkles,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  ArrowDown,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { useReveal } from "@/hooks/use-reveal";
import LoadingScreen from "@/components/LoadingScreen";


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

const FeatureVisual = ({ index }: { index: number }) => {
  switch (index) {
    case 0: // AI Voice Assistant
      return (
        <div className="flex h-full items-center justify-center gap-2 opacity-60">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`w-3 md:w-4 rounded-full bg-white animate-waveform-${i + 1}`}
            />
          ))}
        </div>
      );
    case 1: // Read Any Text Aloud
      return (
        <div className="relative flex h-full items-center justify-center">
          <div className="relative flex h-56 w-40 flex-col gap-4 overflow-hidden rounded-2xl border border-white/15 bg-black/40 p-6 shadow-2xl backdrop-blur-sm md:h-72 md:w-52 md:gap-6 md:p-8">
            <div className="h-2 w-full rounded-full bg-white/20 md:h-2.5" />
            <div className="h-2 w-3/4 rounded-full bg-white/20 md:h-2.5" />
            <div className="h-2 w-full rounded-full bg-white/20 md:h-2.5" />
            <div className="h-2 w-5/6 rounded-full bg-white/20 md:h-2.5" />
            <div className="h-2 w-2/3 rounded-full bg-white/20 md:h-2.5" />
            {/* Scanning laser */}
            <div className="animate-scan absolute left-0 right-0 h-[1px] bg-white shadow-[0_0_15px_3px_rgba(255,255,255,0.4)]" />
          </div>
        </div>
      );
    case 2: // Currency Detection
      return (
        <div className="relative flex h-full items-center justify-center">
          {/* Banknote */}
          <div className="animate-float relative flex h-36 w-60 items-center justify-center overflow-hidden rounded-xl border border-white/20 bg-white/5 shadow-2xl backdrop-blur-sm md:h-44 md:w-72">
            <div className="h-16 w-16 rounded-full border border-white/20 opacity-50 md:h-24 md:w-24" />
            <div className="absolute right-4 top-4 font-mono text-xs text-white/50 md:right-5 md:top-5 md:text-sm">
              100
            </div>
            <div className="absolute bottom-4 left-4 font-mono text-xs text-white/50 md:bottom-5 md:left-5 md:text-sm">
              100
            </div>
          </div>
          {/* Viewfinder corners */}
          <div className="absolute h-48 w-72 opacity-40 md:h-60 md:w-80">
            <div className="absolute left-0 top-0 h-6 w-6 border-l border-t border-white" />
            <div className="absolute right-0 top-0 h-6 w-6 border-r border-t border-white" />
            <div className="absolute bottom-0 left-0 h-6 w-6 border-b border-l border-white" />
            <div className="absolute bottom-0 right-0 h-6 w-6 border-b border-r border-white" />
          </div>
        </div>
      );
    case 3: // Smart Summaries
      return (
        <div className="relative flex h-full flex-col items-center justify-center gap-8 md:gap-12">
          {/* Big document */}
          <div className="flex w-40 flex-col gap-3 opacity-20 md:w-48 md:gap-4">
            <div className="h-1.5 w-full rounded-full bg-white md:h-2" />
            <div className="h-1.5 w-full rounded-full bg-white md:h-2" />
            <div className="h-1.5 w-4/5 rounded-full bg-white md:h-2" />
            <div className="h-1.5 w-full rounded-full bg-white md:h-2" />
            <div className="h-1.5 w-2/3 rounded-full bg-white md:h-2" />
          </div>
          {/* Arrow down */}
          <ArrowDown className="h-6 w-6 animate-bounce text-white/50" strokeWidth={1.5} />
          {/* Summary block */}
          <div className="flex w-40 flex-col gap-3 rounded-2xl border border-white/15 bg-white/5 p-5 shadow-2xl backdrop-blur-sm md:w-48 md:gap-4 md:p-6">
            <div className="h-1.5 w-full rounded-full bg-white/80 md:h-2" />
            <div className="h-1.5 w-3/4 rounded-full bg-white/80 md:h-2" />
          </div>
        </div>
      );
    default:
      return null;
  }
};

const Index = () => {
  const [email, setEmail] = useState("");
  useReveal();

  // ── Loading gate ─────────────────────────────────────────────────────────
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // Open the gate when both assets have signalled ready
  useEffect(() => {
    if (videoLoaded && heroLoaded) {
      const t = setTimeout(() => setIsReady(true), 200);
      return () => clearTimeout(t);
    }
  }, [videoLoaded, heroLoaded]);

  // Fallback: never leave users stuck — reveal after 6 s regardless
  useEffect(() => {
    const t = setTimeout(() => setIsReady(true), 6000);
    return () => clearTimeout(t);
  }, []);

  // ── Scroll-driven video scrub ────────────────────────────────────────────
  const videoRef = useRef<HTMLVideoElement>(null);
  const currentTimeRef = useRef(0);
  const targetTimeRef = useRef(0);
  const durationRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.playsInline = true;
    video.preload = "auto";
    video.pause();

    const getScrollFraction = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      return scrollable > 0 ? Math.min(Math.max(window.scrollY / scrollable, 0), 1) : 0;
    };

    const markReady = () => {
      if (!video.duration || isNaN(video.duration)) return;
      durationRef.current = video.duration;
      const t = getScrollFraction() * durationRef.current;
      targetTimeRef.current = t;
      currentTimeRef.current = t;
      try { video.currentTime = t; } catch { /* ignore */ }
      setVideoLoaded(true); // signal the loading gate
    };

    video.addEventListener("loadedmetadata", markReady);
    video.addEventListener("loadeddata", markReady);
    video.addEventListener("canplay", markReady);
    if (video.readyState >= 1) markReady();

    const onScroll = () => {
      if (!durationRef.current) return;
      targetTimeRef.current = getScrollFraction() * durationRef.current;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Hybrid approach: direct jump for fast scroll, smooth step for slow scroll.
    // Crucially, we only call video.currentTime when NOT already seeking to
    // prevent seek-queue buildup — the #1 source of HTML5 video scrub lag.
    const tick = () => {
      if (durationRef.current) {
        const diff = targetTimeRef.current - currentTimeRef.current;
        const absDiff = Math.abs(diff);

        if (absDiff > 0.5) {
          // Fast scroll — snap directly so the video keeps up
          currentTimeRef.current = targetTimeRef.current;
        } else if (absDiff > 0.016) {
          // Slow scroll — smooth lerp (0.35 ≈ ~3 frames to settle)
          currentTimeRef.current += diff * 0.35;
        }

        // Only seek when the browser isn't mid-seek; prevents queue buildup
        if (!video.seeking && absDiff > 0.016) {
          try {
            video.currentTime = Math.min(
              Math.max(currentTimeRef.current, 0),
              durationRef.current,
            );
          } catch { /* ignore seek errors */ }
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", onScroll);
      video.removeEventListener("loadedmetadata", markReady);
      video.removeEventListener("loadeddata", markReady);
      video.removeEventListener("canplay", markReady);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handleContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success("Thanks! We'll be in touch soon.");
    setEmail("");
  };

  return (
    <main className="min-h-screen text-foreground">
      <LoadingScreen isReady={isReady} />
      {/* ================= FIXED BACKGROUND VIDEO ================= */}
      <video
        ref={videoRef}
        src="/visoread-hero.mp4"
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 h-screen w-screen object-cover scale-[1.2] origin-center"
      />
      {/* Subtle dark scrim so text stays readable everywhere */}
      <div className="pointer-events-none fixed inset-0 z-[1] bg-background/65" />
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
            className="rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-xs font-medium tracking-wide text-white transition-all hover:bg-white/20 sm:text-sm"
          >
            Partner with us
          </a>
        </nav>
      </header>

      {/* ================= HERO ================= */}
      <section className="relative z-10 min-h-screen overflow-hidden bg-background">
        <img
          src={heroImg}
          alt="Person wearing VisoRead smart glasses"
          width={1920}
          height={1080}
          onLoad={() => setHeroLoaded(true)}
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
                  className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-8 py-3.5 text-sm font-medium tracking-wide text-white backdrop-blur-md transition-all hover:bg-white/20 sm:text-base"
                >
                  Contact Us
                </a>
                <p className="text-sm font-light leading-snug text-foreground/60">
                  Voice-first AI glasses
                  <br />
                  built for the visually impaired.
                </p>
              </div>
            </div>
          </section>
        </div>
      </section>

      {/* ================= HEAR THE WORLD SECTION ================= */}
      <section className="relative z-10 flex min-h-screen items-center px-4 sm:px-8">
        <div className="mx-auto w-full max-w-7xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium tracking-widest text-foreground/80 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--brand))]" />
            Voice-first
          </span>
          <h2 className="mt-5 max-w-4xl text-5xl font-bold leading-[0.95] tracking-tight sm:text-6xl md:text-7xl lg:text-[5.5rem]">
            Hear the world,
            <br />
            in real time.
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-foreground/75 sm:text-lg">
            VisoRead reads what&apos;s in front of you — books, signs, menus,
            paperwork — out loud, instantly.
          </p>
        </div>
      </section>

      {/* ================= FEATURES INTRO ================= */}
      <section id="features" className="relative z-10 px-4 pt-24 sm:px-8 sm:pt-32">
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
          className="relative z-10 flex min-h-screen items-center px-4 py-20 sm:px-8 sm:py-24"
        >
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
              <div className="reveal reveal-delay-1 group relative flex min-h-[520px] w-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] via-white/[0.03] to-transparent p-7 backdrop-blur-xl sm:min-h-[560px] sm:p-10 lg:aspect-square lg:min-h-0 lg:p-14 shadow-2xl">
                <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
                <div className="absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-white/5 blur-3xl" />
                <div className="relative flex h-full w-full flex-col justify-between">
                  <div className="flex items-start justify-between gap-4">
                    <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur">
                      <Icon className="h-6 w-6 opacity-80" strokeWidth={1.5} />
                    </span>
                    <div className="text-6xl font-bold tracking-tighter text-foreground/15 sm:text-7xl lg:hidden">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                  </div>
                  {/* Dynamic Visual Centerpiece */}
                  <div className="absolute inset-0 z-0 hidden items-center justify-center p-8 pointer-events-none lg:flex">
                    <FeatureVisual index={i} />
                  </div>

                  <div className="relative z-10 lg:hidden">
                    <h3 className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
                      {title}
                    </h3>
                    <p className="mt-5 max-w-xl text-base leading-relaxed text-foreground/70 sm:text-lg">
                      {body}
                    </p>
                  </div>
                  <div className="relative z-10 hidden text-7xl font-bold tracking-tighter text-foreground/15 sm:text-8xl lg:block">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ================= HOW IT WORKS ================= */}
      <section id="how" className="relative z-10 px-4 py-24 sm:px-8 sm:py-32">
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
                className={`reveal reveal-delay-${Math.min(i + 1, 3)} bg-gradient-to-br from-white/[0.06] via-white/[0.02] to-[hsl(var(--brand))]/[0.08] backdrop-blur-md p-8 sm:p-10`}
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
      <section id="contact" className="relative z-10 px-4 pb-24 pt-8 sm:px-8 sm:pb-32">
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
                  sales.visoread@gmail.com
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 border border-white/10">
                    <Phone className="h-4 w-4" />
                  </span>
                  +91 98765 43231
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 border border-white/10">
                    <MapPin className="h-4 w-4" />
                  </span>
                  New Delhi, India
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

    </main>
  );
};

export default Index;
