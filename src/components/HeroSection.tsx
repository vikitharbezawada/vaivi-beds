import Link from "next/link";
import { heroImageSources } from "@/lib/hero-images";
import { HeroSlideshow } from "@/components/HeroSlideshow";

const highlights = [
  "Crafted luxury, now more attainable",
  "Personalized sizes, fabrics & finishes",
  "Premium solid wood craftsmanship",
] as const;

export function HeroSection() {
  return (
    <section className="relative min-h-[100dvh] min-h-screen flex items-end pb-16 sm:pb-20 md:pb-28 pt-24 sm:pt-28">
      <HeroSlideshow slides={heroImageSources} intervalMs={6500} fadeMs={1400} />
      <div
        className="absolute inset-0 bg-black/35 pointer-events-none z-[3]"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/20 to-transparent pointer-events-none z-[3]"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-transparent pointer-events-none z-[3]"
        aria-hidden
      />
      <div className="relative z-10 section-padding pb-0 w-full max-w-[100vw] overflow-x-hidden">
        <p
          className="label-uppercase text-primary-foreground/80 animate-fade-up !text-primary-foreground/80"
          style={{ animationDelay: "0.1s" }}
        >
          Vaivi Beds
        </p>
        <h1
          className="heading-display text-primary-foreground max-w-3xl mt-3 sm:mt-4 animate-fade-up drop-shadow-sm"
          style={{ animationDelay: "0.3s" }}
        >
          Creating your sleep sanctuary.
        </h1>
        <p
          className="text-base sm:text-lg text-primary-foreground/90 max-w-2xl font-light mt-4 sm:mt-6 animate-fade-up"
          style={{ animationDelay: "0.5s" }}
        >
          Beds and bedroom furniture — side tables, wardrobes, consoles,
          bedroom seating and benches.
        </p>
        <ul
          className="mt-6 sm:mt-8 space-y-2 text-sm sm:text-base text-primary-foreground/85 font-light animate-fade-up max-w-xl"
          style={{ animationDelay: "0.55s" }}
        >
          {highlights.map((line) => (
            <li key={line} className="flex gap-2 items-start">
              <span className="text-accent mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
              <span>{line}</span>
            </li>
          ))}
        </ul>
        <div
          className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mt-8 sm:mt-10 animate-fade-up"
          style={{ animationDelay: "0.7s" }}
        >
          <Link
            href="/configure"
            className="bg-accent text-accent-foreground px-6 sm:px-8 py-3 sm:py-3.5 text-sm font-semibold uppercase tracking-wider text-center inline-flex w-full sm:w-auto min-h-11 items-center justify-center"
          >
            Get started
          </Link>
          <Link
            href="#gallery"
            className="border border-primary-foreground/50 text-primary-foreground px-6 sm:px-8 py-3 sm:py-3.5 text-sm font-semibold uppercase tracking-wider text-center inline-flex w-full sm:w-auto min-h-11 items-center justify-center"
          >
            View gallery
          </Link>
        </div>
      </div>
    </section>
  );
}
