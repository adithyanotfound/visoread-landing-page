import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const sections = [
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

const ScrollVideoHero = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const currentTimeRef = useRef(0);
  const targetTimeRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  // Drive the video currentTime from scroll, smoothed with lerp.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const lerpFactor = 0.1;

    const tick = () => {
      const diff = targetTimeRef.current - currentTimeRef.current;
      currentTimeRef.current += diff * lerpFactor;
      if (video.duration && !Number.isNaN(video.duration)) {
        try {
          video.currentTime = Math.min(
            Math.max(currentTimeRef.current, 0),
            video.duration - 0.001,
          );
        } catch {
          /* ignore seek errors */
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    const unsubscribe = scrollYProgress.on("change", (p) => {
      if (video.duration) {
        targetTimeRef.current = p * video.duration;
      }
    });

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      unsubscribe();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [scrollYProgress]);

  // Per-section transforms (3 sections evenly spread across scroll progress).
  const sectionRanges: Array<[number, number, number, number]> = [
    [0.0, 0.08, 0.22, 0.32],
    [0.34, 0.42, 0.55, 0.65],
    [0.66, 0.74, 0.88, 0.98],
  ];

  const opacities = sectionRanges.map(([a, b, c, d]) =>
    useTransform(scrollYProgress, [a, b, c, d], [0, 1, 1, 0]),
  );
  const ys = sectionRanges.map(([a, b, c, d]) =>
    useTransform(scrollYProgress, [a, b, c, d], [40, 0, 0, -40]),
  );
  const blurs = sectionRanges.map(([a, b, c, d]) =>
    useTransform(
      scrollYProgress,
      [a, b, c, d],
      ["8px", "0px", "0px", "8px"],
    ),
  );

  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  return (
    <section ref={targetRef} className="relative h-[300vh] w-full">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Fixed background video */}
        <video
          ref={videoRef}
          src="/visoread-hero.mp4"
          muted
          playsInline
          preload="auto"
          className="fixed inset-0 h-screen w-screen object-cover"
        />
        {/* Dark overlay */}
        <div className="fixed inset-0 bg-background/50" />

        {/* Text sections layered on top */}
        <div className="relative z-10 flex h-screen items-center px-4 sm:px-8">
          <div className="mx-auto w-full max-w-7xl">
            {sections.map((s, i) => (
              <motion.div
                key={s.title}
                style={{
                  opacity: opacities[i],
                  y: ys[i],
                  filter: blurs[i].get
                    ? undefined
                    : undefined,
                }}
                className="absolute inset-0 flex items-center px-4 sm:px-8"
              >
                <motion.div
                  style={{ filter: blurs[i] }}
                  className="mx-auto w-full max-w-7xl"
                >
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
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
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
    </section>
  );
};

export default ScrollVideoHero;
