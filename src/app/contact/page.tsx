import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { FooterSection } from "@/components/FooterSection";
import { Navbar } from "@/components/Navbar";
import { SITE, getMapsEmbedSrc } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Vaivi Beds – Inquire About Our Luxury Beds",
  description:
    "Get in touch with Vaivi Beds at our Banjara Hills experience center. Phone, email, and contact form.",
};

const blockTitle =
  "font-heading text-[1.125rem] font-medium mb-3 tracking-tight text-foreground";

export default function ContactPage() {
  const embedSrc = getMapsEmbedSrc();

  return (
    <>
      <Navbar variant="solid" />
      <main className="flex-1 pt-[4.5rem] sm:pt-20">
        <div className="section-padding max-w-full overflow-x-hidden !pt-10 md:!pt-16">
          <div className="max-w-5xl mx-auto mb-10 md:mb-16">
            <p className="label-uppercase mb-4 tracking-[0.3em]">Our contact</p>
            <h1 className="font-heading text-3xl md:text-5xl font-medium tracking-tight mb-6">
              Get in touch
            </h1>
            <p className="text-muted-foreground text-sm max-w-md">
              Whether you have a question about our custom beds, materials, or pricing, our team is ready to answer all your questions.
            </p>
          </div>

          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-start">
            <div className="lg:col-span-5 space-y-12">
              <div>
                <h2 className={blockTitle}>Address</h2>
                <ul className="text-muted-foreground text-base font-light leading-relaxed space-y-0.5">
                  {SITE.addressLines.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className={blockTitle}>Phone</h2>
                <a
                  href={SITE.phoneHref}
                  className="text-base font-light text-muted-foreground hover:text-foreground transition-colors tabular-nums"
                >
                  {SITE.phone}
                </a>
              </div>
              <div>
                <h2 className={blockTitle}>Email</h2>
                <a
                  href={`mailto:${SITE.email}`}
                  className="text-base font-light text-muted-foreground hover:text-foreground transition-colors break-all"
                >
                  {SITE.email}
                </a>
              </div>
            </div>

            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </div>

        <div className="w-full h-[50vh] min-h-[400px] relative border-t border-border/40 bg-muted">
          <iframe
            title="Vaivi Beds — Google Maps"
            src={embedSrc}
            className="absolute inset-0 w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          <div className="absolute bottom-6 right-6 z-10">
            <a
              href={SITE.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-background text-foreground px-6 py-3 text-xs font-semibold uppercase tracking-wider shadow-md hover:opacity-90 transition-opacity rounded-sm"
            >
              View larger map
            </a>
          </div>
        </div>
      </main>
      <FooterSection />
    </>
  );
}
