import { ReactNode, useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ScrollVideoHeroProps {
  children?: ReactNode;
  /** Extra scroll length (in vh) for the intro before children begin. */
  introVh?: number;
}

const introSections = [
  {
    eyebrow: "Voice-first",
    title: "Hear the world,\nin real time.",
    body: "VisoRead reads what's in front of you — books, signs, menus, paperwork — out loud, instantly.",
  },
  {
    eyebrow: "Independent",
    title: "Money, handled\nby your voice.",
    body: "Identify currency notes and pay over UPI — all hands-free, all spoken.",
  },
  {
    eyebrow: "For everyone",
    title: "Affordable\nby design.",
    body: "Built ground-up to put assistive tech within reach for every household.",
  },
];

const ScrollVideoHero = ({ children, introVh = 400 }: ScrollVideoHeroProps) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const currentTimeRef = useRef(0);
  const targetTimeRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const [videoReady, setVideoReady] = useState(false);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  // Make sure the video is loaded enough to be seekable.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onLoaded = () => {
      // Pause it — we drive currentTime manually from scroll.
      video.pause();
      setVideoReady(true);
    };

    if (video.readyState >= 1 && video.duration) {
      onLoaded();
    } else {
      video.addEventListener("loadedmetadata", onLoaded);
      video.addEventListener("loadeddata", onLoaded);
    }

    // Some browsers require a play() call once to "unlock" seeking on muted videos.
    const tryPlay = video.play();
    if (tryPlay && typeof tryPlay.then === "function") {
      tryPlay.then(() => video.pause()).catch(() => {
        /* ignored — muted+playsInline should work, but safe to ignore */
      });
    }

    return () => {
      video.removeEventListener("loadedmetadata", onLoaded);
      video.removeEventListener("loadeddata", onLoaded);
    };
  }, []);

  // Drive video currentTime from scroll, smoothed with lerp.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoReady) return;

    const lerpFactor = 0.12;

    const tick = () => {
      const diff = targetTimeRef.current - currentTimeRef.current;
      currentTimeRef.current += diff * lerpFactor;
      const dur = video.duration;
      if (dur && !Number.isNaN(dur) && Number.isFinite(dur)) {
        const next = Math.min(Math.max(currentTimeRef.current, 0), dur - 0.05);
        try {
          video.currentTime = next;
        } catch {
          /* ignore */
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    const unsubscribe = scrollYProgress.on("change", (p) => {
      const dur = video.duration;
      if (dur && Number.isFinite(dur)) {
        targetTimeRef.current = p * dur;
      }
    });

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      unsubscribe();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [scrollYProgress, videoReady]);

  // Intro text section ranges (first ~40% of scroll progress).
  const sectionRanges: Array<[number, number, number, number]> = [
    [0.0, 0.04, 0.1, 0.16],
    [0.17, 0.22, 0.28, 0.34],
    [0.35, 0.4, 0.46, 0.52],
  ];

  const opacities = sectionRanges.map(([a, b, c, d]) =>
    useTransform(scrollYProgress, [a, b, c, d], [0, 1, 1, 0]),
  );
  const ys = sectionRanges.map(([a, b, c, d]) =>
    useTransform(scrollYProgress, [a, b, c, d], [40, 0, 0, -40]),
  );

  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.03], [1, 0]);
  // Keep the video visible throughout — light dim only.
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.45, 0.55, 0.6]);

  return (
    <section ref={targetRef} className="relative w-full">
      {/* Sticky stage holds the fixed video + overlaid intro text */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <video
          ref={videoRef}
          src="/visoread-hero.mp4"
          muted
          playsInline
          preload="auto"
          autoPlay
          loop={false}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 bg-background"
        />

        <div className="pointer-events-none absolute inset-0 z-10 flex items-center px-4 sm:px-8">
          <div className="mx-auto w-full max-w-7xl">
            {introSections.map((s, i) => (
              <motion.div
                key={s.title}
                style={{ opacity: opacities[i], y: ys[i] }}
                className="absolute inset-0 flex items-center px-4 sm:px-8"
              >
                <div className="mx-auto w-full max-w-7xl">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium tracking-widest text-foreground/80 backdrop-blur">
                    <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--brand))]" />
                    {s.eyebrow}
                  </span>
                  <h2 className="mt-5 max-w-4xl whitespace-pre-line text-5xl font-bold leading-[0.95] tracking-tight sm:text-6xl md:text-7xl lg:text-[5.5rem]">
                    {s.title}
                  </h2>
                  <p className="mt-6 max-w-md text-base leading-relaxed text-foreground/75 sm:text-lg">
                    {s.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          style={{ opacity: indicatorOpacity }}
          className="pointer-events-none absolute bottom-10 left-1/2 z-20 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2 text-foreground/70">
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em]">
              Scroll
            </span>
            <span className="flex h-9 w-5 justify-center rounded-full border border-white/30 p-1">
              <motion.span
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.6, repeat: Infinity }}
                className="h-1.5 w-1.5 rounded-full bg-foreground"
              />
            </span>
          </div>
        </motion.div>
      </div>

      {/* Spacer adds intro scroll length so the 3 intro texts can play before children arrive */}
      <div aria-hidden style={{ height: `${introVh}vh`, marginTop: "-100vh" }} />

      {/* Children scroll over the still-sticky video */}
      {children ? <div className="relative z-20">{children}</div> : null}
    </section>
  );
};

export default ScrollVideoHero;

