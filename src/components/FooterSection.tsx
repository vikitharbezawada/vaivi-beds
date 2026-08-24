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
              Custom beds, made in Hyderabad for rooms across India.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-foreground mb-4">
              Visit or Call
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
            <div className="mt-6">
              <Link
                href="/contact"
                className="text-sm font-medium text-accent hover:opacity-80 transition-opacity"
              >
                Contact Us →
              </Link>
            </div>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-12 pt-8 border-t border-border text-center md:text-left">
          © {year} Vaivi Beds
        </p>
      </div>
    </footer>
  );
}
