import Lottie from "lottie-react";
import { useEffect, useState } from "react";

interface Props {
  isReady: boolean;
}

/**
 * Full-screen loading overlay.
 * Plays the Sun-Glasses Lottie animation until all page assets are ready,
 * then fades out and unmounts itself.
 */
const LoadingScreen = ({ isReady }: Props) => {
  const [mounted, setMounted] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [animationData, setAnimationData] = useState<any>(null);

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

  // Release scroll + unmount after fade completes
  useEffect(() => {
    if (!isReady) return;
    document.body.style.overflow = "";
    const t = setTimeout(() => setMounted(false), 800);
    return () => clearTimeout(t);
  }, [isReady]);

  if (!mounted) return null;

  return (
    <div
      className={[
        "fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black",
        "transition-opacity duration-700 ease-in-out",
        isReady ? "pointer-events-none opacity-0" : "opacity-100",
      ].join(" ")}
    >
      {/* Lottie animation */}
      {animationData && (
        <Lottie
          animationData={animationData}
          loop
          className="h-52 w-52"
        />
      )}

      {/* Wordmark */}
      <span className="mt-2 text-[11px] font-semibold tracking-[0.55em] text-white/80 select-none">
        VISOREAD
      </span>

      {/* Status hint */}
      <p className="mt-3 text-[10px] tracking-[0.25em] text-white/30 select-none">
        {isReady ? "READY" : "LOADING"}
      </p>
    </div>
  );
};

export default LoadingScreen;
