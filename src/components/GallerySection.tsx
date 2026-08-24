import Image from "next/image";
import { galleryGridItems } from "@/lib/gallery-images";

export function GallerySection() {
  return (
    <section id="gallery" className="px-2 sm:px-3 md:px-4 py-16 sm:py-20 md:py-28 scroll-mt-16 sm:scroll-mt-20">
      <div className="max-w-screen-xl mx-auto mb-14 px-3 md:px-8">
        <div>
          <p className="label-uppercase mb-3">Our Work</p>
          <h2 className="heading-section">Made for Real Rooms</h2>
        </div>
      </div>
      <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 auto-rows-auto">
        {galleryGridItems.map((item) => (
          <div
            key={item.key}
            className={`group relative overflow-hidden ${item.span}`}
          >
            <div className={`relative w-full ${item.aspect}`}>
              <Image
                src={item.src}
                alt="A bedroom made by Vaivi Beds"
                fill
                className="object-cover transition-transform duration-[800ms] ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
                loading="lazy"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
