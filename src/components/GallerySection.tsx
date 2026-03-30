import Image from "next/image";
import Link from "next/link";
import { galleryGridItems } from "@/lib/gallery-images";

export function GallerySection() {
  return (
    <section id="gallery" className="px-2 sm:px-3 md:px-4 py-16 sm:py-20 md:py-28 scroll-mt-16 sm:scroll-mt-20">
      <div className="max-w-screen-xl mx-auto mb-14 px-3 md:px-8 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
        <div>
          <p className="label-uppercase mb-3">Recent work</p>
          <h2 className="heading-section">A few we&apos;re proud of</h2>
        </div>
        <Link
          href="#about"
          className="bg-accent text-accent-foreground px-8 py-3.5 text-sm font-semibold uppercase tracking-wider shrink-0 self-start md:self-auto text-center"
        >
          Discover more
        </Link>
      </div>
      <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 auto-rows-auto">
        {galleryGridItems.map((item) => (
          <div
            key={item.src}
            className={`group relative overflow-hidden ${item.span}`}
          >
            <div className={`relative w-full ${item.aspect}`}>
              <Image
                src={item.src}
                alt="Vaivi Beds — handcrafted bedroom"
                fill
                className="object-cover transition-transform duration-[800ms] ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
                loading="lazy"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6 md:p-8"
              >
                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <p className="font-heading text-xl md:text-2xl font-medium text-primary-foreground">
                    Vaivi Beds
                  </p>
                  <p className="text-sm text-primary-foreground/70 mt-1">
                    Handcrafted luxury · Hyderabad
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className="max-w-xl mx-auto mt-16 text-center text-muted-foreground text-lg font-light px-4">
        No two builds are the same. Every piece starts with a conversation
        about how you live and what you want your bedroom to feel like.
      </p>
    </section>
  );
}
