"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";

type NavbarProps = {
  variant?: "transparent" | "solid";
};

/** Pixels of scroll over which the bar goes from fully visible to fully hidden. */
const NAV_SCROLL_FADE_DISTANCE = 220;

function NavbarInner({ variant, pathname }: NavbarProps & { pathname: string }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const panelId = useId();

  const resolved =
    variant ?? (pathname === "/" ? "transparent" : "solid");
  const isHome = pathname === "/";
  const galleryHref = isHome ? "#gallery" : "/#gallery";
  const contactHref = "/contact";

  const useSolidChrome = menuOpen || resolved === "solid";

  const headerClass = useSolidChrome
    ? "bg-background/95 backdrop-blur-md border-b border-border text-foreground shadow-sm"
    : "bg-transparent text-primary-foreground";

  const desktopLink =
    resolved === "transparent" && !menuOpen
      ? "text-primary-foreground/80 hover:text-primary-foreground transition-opacity"
      : "text-foreground/75 hover:text-foreground transition-colors";

  const desktopCtaBorder =
    resolved === "transparent" && !menuOpen
      ? "border-primary-foreground/40"
      : "border-foreground/30";

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  useEffect(() => {
    const onScroll = () => {
      setScrollY(
        window.scrollY ||
          document.documentElement.scrollTop ||
          document.body.scrollTop,
      );
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const navOpacity = menuOpen
    ? 1
    : Math.max(0, 1 - Math.min(1, scrollY / NAV_SCROLL_FADE_DISTANCE));
  const navInteractive = menuOpen || navOpacity > 0.12;

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-colors duration-300 ${headerClass}`}
      style={{
        opacity: navOpacity,
        pointerEvents: navInteractive ? "auto" : "none",
      }}
    >
      <div className="section-padding !py-4 sm:!py-5">
        <nav className="flex items-center justify-between gap-4">
          <Link
            href="/"
            className="font-heading text-lg sm:text-xl font-medium shrink-0 z-[60]"
            onClick={closeMenu}
          >
            Vaivi Beds
          </Link>

          <div className="hidden md:flex items-center gap-7 lg:gap-9 text-sm">
            <Link href={galleryHref} className={desktopLink}>
              Gallery
            </Link>
            <Link href={contactHref} className={desktopLink}>
              Contact Us
            </Link>
            <Link
              href="/configure"
              className={`border px-5 py-2.5 text-sm font-medium ${desktopCtaBorder} ${desktopLink}`}
            >
              Design Your Bed
            </Link>
          </div>

          <button
            type="button"
            className={`md:hidden z-[60] p-2 -mr-2 rounded-sm border transition-colors ${
              useSolidChrome
                ? "border-border text-foreground"
                : "border-primary-foreground/40 text-primary-foreground"
            }`}
            aria-expanded={menuOpen}
            aria-controls={panelId}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? (
              <X className="w-5 h-5" strokeWidth={1.5} />
            ) : (
              <Menu className="w-5 h-5" strokeWidth={1.5} />
            )}
          </button>
        </nav>
      </div>

      <div
        id={panelId}
        className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-out border-b ${
          menuOpen
            ? "max-h-[min(85vh,28rem)] opacity-100 border-border"
            : "max-h-0 opacity-0 border-transparent pointer-events-none"
        } bg-background text-foreground`}
      >
        <div className="section-padding !pt-0 !pb-6 flex flex-col">
          <Link
            href={galleryHref}
            className="py-3.5 text-base font-medium border-b border-border/80 min-h-11 flex items-center"
            onClick={closeMenu}
          >
            Gallery
          </Link>
          <Link
            href={contactHref}
            className="py-3.5 text-base font-medium border-b border-border/80 min-h-11 flex items-center"
            onClick={closeMenu}
          >
            Contact Us
          </Link>
          <Link
            href="/configure"
            className="mt-4 bg-foreground text-background px-5 py-3 text-center text-sm font-medium min-h-11 inline-flex items-center justify-center"
            onClick={closeMenu}
          >
            Design Your Bed
          </Link>
        </div>
      </div>
    </header>
  );
}

export function Navbar(props: NavbarProps) {
  const pathname = usePathname();
  return <NavbarInner key={pathname} {...props} pathname={pathname} />;
}
