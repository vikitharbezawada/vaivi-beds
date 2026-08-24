import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Swapna",
    quote:
      "Thank you so much! My daughter loves her custom made pink bed. The quality and finish is excellent and the bed has come out exactly as expected.",
  },
  {
    name: "Nikhil",
    quote:
      "Really impressed with the quality of both our beds. Worth every penny and makes our bedrooms a lot more personal and cosy.",
  },
  {
    name: "Deepti",
    quote:
      "I really love the bed in my room, it looks so beautiful and fits perfectly. Everyone who has been coming has been complimenting the bed in my room.",
  },
] as const;

export function TestimonialsSection() {
  return (
    <section className="section-padding bg-primary text-primary-foreground">
      <div className="max-w-screen-xl mx-auto">
        <p className="label-uppercase text-primary-foreground/60 mb-3 !text-primary-foreground/60">
          Client Stories
        </p>
        <h2 className="heading-section mb-12 md:mb-14 max-w-2xl">
          What Our Clients Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 lg:gap-14">
          {testimonials.map((t) => (
            <article key={t.name}>
              <Quote
                className="w-8 h-8 text-accent mb-5 opacity-60"
                strokeWidth={1.25}
                aria-hidden
              />
              <p className="text-base sm:text-lg font-light leading-relaxed mb-6">
                {t.quote}
              </p>
              <p className="font-heading font-medium">{t.name}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
