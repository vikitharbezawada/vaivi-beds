"use client";

import Image from "next/image";
import { useEffect, useState, useSyncExternalStore } from "react";

const motionQuery = "(prefers-reduced-motion: reduce)";

function subscribeToMotionPreference(onChange: () => void) {
  const media = window.matchMedia(motionQuery);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function getMotionPreference() {
  return window.matchMedia(motionQuery).matches;
}

type HeroSlideshowProps = {
  slides: string[];
  /** Time between slide changes (ms). Crossfade overlaps the end of this window. */
  intervalMs?: number;
  /** Opacity transition duration (ms). */
  fadeMs?: number;
};

export function HeroSlideshow({
  slides,
  intervalMs = 6500,
  fadeMs = 1400,
}: HeroSlideshowProps) {
  const [index, setIndex] = useState(0);
  const reduceMotion = useSyncExternalStore(
    subscribeToMotionPreference,
    getMotionPreference,
    () => false,
  );

  useEffect(() => {
    if (reduceMotion || slides.length <= 1) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [slides.length, intervalMs, reduceMotion]);

  if (slides.length === 0) return null;

  return (
    <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden>
      {slides.map((src, i) => (
        <Image
          key={`${i}-${src}`}
          src={src}
          alt=""
          fill
          priority={i === 0}
          className="object-cover"
          sizes="100vw"
          style={{
            opacity: i === index ? 1 : 0,
            zIndex: i === index ? 2 : 1,
            transition: `opacity ${fadeMs}ms ease-in-out`,
          }}
        />
      ))}
    </div>
  );
}
