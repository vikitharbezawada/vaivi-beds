import Link from "next/link";
import { heroImageSources } from "@/lib/hero-images";
import { HeroSlideshow } from "@/components/HeroSlideshow";

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
        <h1
          className="heading-display text-primary-foreground max-w-3xl animate-fade-up drop-shadow-sm"
          style={{ animationDelay: "0.15s" }}
        >
          A Bed Made for Your Room
        </h1>
        <p
          className="text-base sm:text-lg text-primary-foreground/90 max-w-2xl font-light mt-4 sm:mt-6 animate-fade-up"
          style={{ animationDelay: "0.3s" }}
        >
          Choose a design you love, then make the size, shape, fabric and finish
          your own. We&apos;ll build and install it at home.
        </p>
        <div
          className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mt-8 sm:mt-10 animate-fade-up"
          style={{ animationDelay: "0.45s" }}
        >
          <Link
            href="/configure"
            className="bg-accent text-accent-foreground px-6 sm:px-8 py-3 sm:py-3.5 text-sm font-medium text-center inline-flex w-full sm:w-auto min-h-11 items-center justify-center transition-opacity hover:opacity-90"
          >
            Design Your Bed
          </Link>
          <Link
            href="#gallery"
            className="text-primary-foreground px-3 py-3 text-sm font-medium text-center inline-flex w-full sm:w-auto min-h-11 items-center justify-center underline decoration-primary-foreground/35 underline-offset-8 hover:decoration-primary-foreground"
          >
            View Our Work
          </Link>
        </div>
      </div>
    </section>
  );
}
