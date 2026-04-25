import { PropsWithChildren, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import heroImg from "@/assets/visoread-hero-bg.png";

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

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const { scrollYProgress: storyProgress } = useScroll({
    target: storyRef,
    offset: ["start start", "end start"],
  });

  // Transition starts immediately after the first scroll into this stage.
  const imageOpacity = useTransform(storyProgress, [0, 0.03, 0.12], [1, 0.65, 0]);
  const videoOpacity = useTransform(storyProgress, [0, 0.03, 0.12], [0, 0.6, 1]);

  const sectionRanges = useMemo<Array<[number, number, number, number]>>(
    () => [
      [0.0, 0.08, 0.22, 0.32],
      [0.34, 0.42, 0.55, 0.65],
      [0.66, 0.74, 0.88, 0.98],
    ],
    [],
  );

  const firstOpacity = useTransform(storyProgress, sectionRanges[0], [0, 1, 1, 0]);
  const secondOpacity = useTransform(storyProgress, sectionRanges[1], [0, 1, 1, 0]);
  const thirdOpacity = useTransform(storyProgress, sectionRanges[2], [0, 1, 1, 0]);
  const firstY = useTransform(storyProgress, sectionRanges[0], [40, 0, 0, -40]);
  const secondY = useTransform(storyProgress, sectionRanges[1], [40, 0, 0, -40]);
  const thirdY = useTransform(storyProgress, sectionRanges[2], [40, 0, 0, -40]);
  const firstBlur = useTransform(storyProgress, sectionRanges[0], ["8px", "0px", "0px", "8px"]);
  const secondBlur = useTransform(storyProgress, sectionRanges[1], ["8px", "0px", "0px", "8px"]);
  const thirdBlur = useTransform(storyProgress, sectionRanges[2], ["8px", "0px", "0px", "8px"]);
  const opacities = [firstOpacity, secondOpacity, thirdOpacity];
  const ys = [firstY, secondY, thirdY];
  const blurs = [firstBlur, secondBlur, thirdBlur];

  const syncTargetTime = useCallback(() => {
    if (!durationRef.current) return;
    const usableStart = durationRef.current * 0.08;
    const usableEnd = Math.max(durationRef.current - 0.05, usableStart);
    targetTimeRef.current = Math.min(
      Math.max(usableStart + scrollYProgress.get() * (usableEnd - usableStart), usableStart),
      usableEnd,
    );
  }, [scrollYProgress]);

  // Drive the video currentTime from the full post-hero scroll distance.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const lerpFactor = 0.16;

    const markReady = () => {
      if (!video.duration || isNaN(video.duration)) return;
      durationRef.current = video.duration;
      syncTargetTime();
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

    // Try to kick off loading immediately.
    try {
      video.load();
    } catch {
      /* ignore */
    }

    if (video.readyState >= 2 && video.duration) {
      markReady();
    }

    const onLoadedMeta = () => markReady();
    const onLoadedData = () => markReady();
    const onCanPlay = () => markReady();

    video.addEventListener("loadedmetadata", onLoadedMeta);
    video.addEventListener("loadeddata", onLoadedData);
    video.addEventListener("canplay", onCanPlay);

    const tick = () => {
      if (durationRef.current) {
        const usableStart = durationRef.current * 0.08;
        const usableEnd = Math.max(durationRef.current - 0.05, usableStart);
        const diff = targetTimeRef.current - currentTimeRef.current;
        currentTimeRef.current += diff * lerpFactor;
        try {
          video.currentTime = Math.min(
            Math.max(currentTimeRef.current, usableStart),
            usableEnd,
          );
        } catch {
          /* ignore seek errors */
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    const unsubscribe = scrollYProgress.on("change", (p) => {
      if (durationRef.current) {
        const usableStart = durationRef.current * 0.08;
        const usableEnd = Math.max(durationRef.current - 0.05, usableStart);
        targetTimeRef.current = Math.min(
          Math.max(usableStart + p * (usableEnd - usableStart), usableStart),
          usableEnd,
        );
      }
    });

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      unsubscribe();
      video.removeEventListener("loadedmetadata", onLoadedMeta);
      video.removeEventListener("loadeddata", onLoadedData);
      video.removeEventListener("canplay", onCanPlay);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [scrollYProgress, syncTargetTime]);

  const indicatorOpacity = useTransform(storyProgress, [0, 0.05], [1, 0]);

  return (
    <section ref={targetRef} className="relative w-full">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Hero image — visible at the very top of this section, fades out as video takes over */}
        <motion.img
          src={heroImg}
          alt=""
          aria-hidden="true"
          style={{ opacity: imageOpacity }}
          className="absolute inset-0 h-full w-full object-cover object-center"
        />

        {/* Background video — fades in over the image */}
        <motion.video
          ref={videoRef}
          src="/visoread-hero.mp4"
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          style={{ opacity: videoReady ? videoOpacity : 0 }}
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-background/50" />

        {/* Text sections layered on top */}
        <div className="relative z-10 flex h-screen items-center px-4 sm:px-8">
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

      <div className="relative z-10 -mt-[100vh]">
        <div ref={storyRef} className="h-[300vh]" />
        {children}
      </div>
    </section>
  );
};

export default ScrollVideoHero;
