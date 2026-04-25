import { PropsWithChildren, useEffect, useRef, useState } from "react";
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

const ScrollVideoHero = ({ children }: PropsWithChildren) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const currentTimeRef = useRef(0);
  const targetTimeRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const durationRef = useRef(0);
  const [videoReady, setVideoReady] = useState(false);

  // Drives video scrubbing across the full post-hero scroll distance.
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end end"],
  });

  // Drives the text overlay sections inside the sticky stage.
  const { scrollYProgress: storyProgress } = useScroll({
    target: storyRef,
    offset: ["start start", "end start"],
  });

  // Video fades in as soon as the user starts scrolling out of the hero.
  const videoOpacity = useTransform(scrollYProgress, [0, 0.05, 0.15], [0, 0.5, 1]);

  const firstOpacity = useTransform(storyProgress, [0.0, 0.08, 0.22, 0.32], [0, 1, 1, 0]);
  const secondOpacity = useTransform(storyProgress, [0.34, 0.42, 0.55, 0.65], [0, 1, 1, 0]);
  const thirdOpacity = useTransform(storyProgress, [0.66, 0.74, 0.88, 0.98], [0, 1, 1, 0]);
  const firstY = useTransform(storyProgress, [0.0, 0.08, 0.22, 0.32], [40, 0, 0, -40]);
  const secondY = useTransform(storyProgress, [0.34, 0.42, 0.55, 0.65], [40, 0, 0, -40]);
  const thirdY = useTransform(storyProgress, [0.66, 0.74, 0.88, 0.98], [40, 0, 0, -40]);
  const firstBlur = useTransform(storyProgress, [0.0, 0.08, 0.22, 0.32], ["8px", "0px", "0px", "8px"]);
  const secondBlur = useTransform(storyProgress, [0.34, 0.42, 0.55, 0.65], ["8px", "0px", "0px", "8px"]);
  const thirdBlur = useTransform(storyProgress, [0.66, 0.74, 0.88, 0.98], ["8px", "0px", "0px", "8px"]);
  const opacities = [firstOpacity, secondOpacity, thirdOpacity];
  const ys = [firstY, secondY, thirdY];
  const blurs = [firstBlur, secondBlur, thirdBlur];

  // Drive video.currentTime from scroll using a smooth rAF lerp loop.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const lerpFactor = 0.12;

    const markReady = () => {
      if (!video.duration || isNaN(video.duration) || video.duration === Infinity) return;
      durationRef.current = video.duration;
      const p = scrollYProgress.get();
      targetTimeRef.current = p * durationRef.current;
      currentTimeRef.current = targetTimeRef.current;
      try {
        video.currentTime = currentTimeRef.current;
      } catch {
        /* ignore */
      }
      video.pause();
      setVideoReady(true);
    };

    video.muted = true;
    video.playsInline = true;
    video.preload = "auto";

    try {
      video.load();
    } catch {
      /* ignore */
    }

    if (video.readyState >= 2) markReady();

    video.addEventListener("loadedmetadata", markReady);
    video.addEventListener("loadeddata", markReady);
    video.addEventListener("canplay", markReady);

    const tick = () => {
      if (durationRef.current) {
        const diff = targetTimeRef.current - currentTimeRef.current;
        currentTimeRef.current += diff * lerpFactor;
        try {
          video.currentTime = Math.min(
            Math.max(currentTimeRef.current, 0),
            durationRef.current - 0.05,
          );
        } catch {
          /* ignore seek errors */
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    const unsubscribe = scrollYProgress.on("change", (p) => {
      if (durationRef.current) {
        targetTimeRef.current = p * durationRef.current;
      }
    });

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      unsubscribe();
      video.removeEventListener("loadedmetadata", markReady);
      video.removeEventListener("loadeddata", markReady);
      video.removeEventListener("canplay", markReady);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [scrollYProgress]);

  const indicatorOpacity = useTransform(storyProgress, [0, 0.05], [1, 0]);

  return (
    <>
      {/* FIXED background video — sits behind everything, scrubs with scroll */}
      <motion.video
        ref={videoRef}
        src="/visoread-hero.mp4"
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        style={{ opacity: videoReady ? videoOpacity : 0 }}
        className="pointer-events-none fixed inset-0 z-0 h-screen w-screen object-cover"
      />
      {/* Dark overlay on the video */}
      <motion.div
        style={{ opacity: videoOpacity }}
        className="pointer-events-none fixed inset-0 z-0 bg-background/50"
      />

      <section ref={targetRef} className="relative w-full">
        {/* Sticky story stage that holds the text overlays on top of the fixed video */}
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <div className="relative z-10 flex h-full items-center px-4 sm:px-8">
            <div className="mx-auto w-full max-w-7xl">
              {sections.map((s, i) => (
                <motion.div
                  key={s.title}
                  style={{ opacity: opacities[i], y: ys[i] }}
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

        {/* Story spacer + the rest of the page content layered on top of the fixed video */}
        <div className="relative z-10 -mt-[100vh]">
          <div ref={storyRef} className="h-[300vh]" />
          {children}
        </div>
      </section>
    </>
  );
};

export default ScrollVideoHero;
