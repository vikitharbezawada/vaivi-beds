export function AboutSection() {
  return (
    <section id="about" className="section-padding scroll-mt-20">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
        <div>
          <p className="label-uppercase mb-3">About Vaivi</p>
          <h2 className="heading-section mb-6">
            Your Room Should Shape the Bed
          </h2>
          <p className="font-heading text-xl md:text-2xl font-light text-muted-foreground leading-relaxed">
            Most beds ask you to work around them. We think it should be the
            other way round.
          </p>
        </div>
        <div className="space-y-5 text-muted-foreground text-base sm:text-lg font-light leading-relaxed">
          <p>
            We make beds to fit your room and the way you live. Start with one
            of more than 200 designs, or bring us a reference of your own.
          </p>
          <p>
            Our team has spent 15 years working with wood, leather and fabric.
            We&apos;ll help you settle the proportions and materials, show you how
            the bed will sit in your room, then build and install it.
          </p>
        </div>
      </div>
    </section>
  );
}
