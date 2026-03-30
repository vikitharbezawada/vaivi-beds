import Link from "next/link";
import { SITE } from "@/lib/site";

export function FooterSection() {
  const year = new Date().getFullYear();
  return (
    <footer
      id="contact"
      className="section-padding !py-12 sm:!py-16 border-t border-border scroll-mt-20"
    >
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 lg:gap-24">
          <div>
            <p className="font-heading text-xl font-medium mb-4">{SITE.name}</p>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
              Luxury premium beds that are completely customisable. Complete
              your bedroom look with Vaivi Beds.
            </p>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground mb-4">
              Contacts
            </h3>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="leading-relaxed">{SITE.experienceCenter}</li>
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="hover:text-foreground transition-colors underline-offset-4 hover:underline"
                >
                  {SITE.email}
                </a>
              </li>
              <li>
                <a
                  href={SITE.phoneHref}
                  className="hover:text-foreground transition-colors underline-offset-4 hover:underline tabular-nums"
                >
                  {SITE.phone}
                </a>
              </li>
            </ul>
            <div className="flex flex-wrap gap-x-6 gap-y-3 mt-6">
              <Link
                href="/contact"
                className="text-xs font-semibold uppercase tracking-wider text-accent hover:opacity-80 transition-opacity"
              >
                Contact us →
              </Link>
              <Link
                href="/configure"
                className="text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
              >
                Get started →
              </Link>
            </div>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-12 pt-8 border-t border-border text-center md:text-left">
          Copyright © {year} Vaivibeds
        </p>
      </div>
    </footer>
  );
}
