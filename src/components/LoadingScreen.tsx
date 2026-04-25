import Lottie from "lottie-react";
import { useEffect, useRef, useState } from "react";

interface Props {
  isReady: boolean;
}

const LoadingScreen = ({ isReady }: Props) => {
  const [mounted, setMounted] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [animationData, setAnimationData] = useState<any>(null);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  // Fetch the Lottie JSON from /public at runtime
  useEffect(() => {
    fetch("/Sun-Glasses.json")
      .then((r) => r.json())
      .then(setAnimationData)
      .catch(() => {/* silently skip if missing */});
  }, []);

  // Lock scroll while visible
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // Animate progress bar — accelerates toward 85% on its own, then snaps to
  // 100% once isReady fires. Uses rAF for smooth 60 fps updates.
  useEffect(() => {
    const target = isReady ? 100 : 85;
    const speed = isReady ? 0.08 : 0.015;

    const tick = () => {
      const diff = target - progressRef.current;
      if (Math.abs(diff) > 0.15) {
        progressRef.current += diff * speed;
        setProgress(progressRef.current);
        rafRef.current = requestAnimationFrame(tick);
      } else if (!isReady) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        progressRef.current = 100;
        setProgress(100);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [isReady]);

  // Release scroll + unmount after fade completes
  useEffect(() => {
    if (!isReady) return;
    document.body.style.overflow = "";
    const t = setTimeout(() => setMounted(false), 900);
    return () => clearTimeout(t);
  }, [isReady]);

  if (!mounted) return null;

  return (
    <div
      className={[
        "fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black overflow-hidden",
        "transition-opacity duration-700 ease-in-out",
        isReady ? "pointer-events-none opacity-0" : "opacity-100",
      ].join(" ")}
    >
      {/* Ambient brand glow behind animation */}
      <div
        className="pointer-events-none absolute rounded-full blur-[120px]"
        style={{
          width: 420,
          height: 420,
          background: "radial-gradient(circle, hsl(28 100% 58% / 0.22) 0%, transparent 70%)",
        }}
      />

      {/* Lottie animation */}
      <div className="relative z-10">
        {animationData ? (
          <Lottie
            animationData={animationData}
            loop
            className="h-64 w-64 sm:h-72 sm:w-72"
          />
        ) : (
          // Fallback pulse while JSON loads
          <div className="h-64 w-64 rounded-full animate-pulse bg-white/5" />
        )}
      </div>

      {/* Wordmark + tagline */}
      <div className="relative z-10 mt-6 flex flex-col items-center gap-2 text-center">
        <span className="text-[13px] font-bold tracking-[0.5em] text-white select-none">
          VISOREAD
        </span>
        <p className="text-[11px] tracking-[0.2em] text-white/40 select-none">
          Voice-first AI glasses
        </p>
      </div>

      {/* Progress bar — bottom of screen */}
      <div className="absolute bottom-0 left-0 right-0 z-10 px-0">
        <div className="h-[2px] w-full bg-white/5">
          <div
            className="h-full bg-[hsl(28,100%,58%)] transition-none"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
