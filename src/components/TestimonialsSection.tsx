import { Quote } from "lucide-react";

const whyPoints = [
  {
    title: "Customisable designs",
    body: "Tailored to your style—choose materials, colours, and features that suit you.",
  },
  {
    title: "Delivered within 2–3 weeks",
    body: "Fast, reliable delivery—your custom bed at your doorstep in just weeks.",
  },
  {
    title: "200+ unique designs",
    body: "Explore an exclusive collection with over 200 handcrafted bed styles.",
  },
  {
    title: "Affordable pricing",
    body: "Luxury meets value—premium quality without the premium price tag.",
  },
] as const;

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
    name: "Keerthi",
    quote:
      "This is the most beautiful store I have been to. I am literally in zen mode, every corner speaks so much and there is so much thought behind everything. Haven't seen anything like this before. Absolutely beautiful.",
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
        <p className="label-uppercase text-primary-foreground/60 mb-3 text-center !text-primary-foreground/60">
          Why Vaivi Beds?
        </p>
        <h2 className="heading-section mb-12 text-center max-w-2xl mx-auto">
          Beds that match your interiors and reflect your lifestyle.
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-20 md:mb-24 pb-16 md:pb-20 border-b border-primary-foreground/10">
          {whyPoints.map((item) => (
            <article
              key={item.title}
              className="border border-primary-foreground/10 p-6 sm:p-7 bg-primary-foreground/[0.03]"
            >
              <h3 className="font-heading text-lg font-medium mb-3 tracking-tight">
                {item.title}
              </h3>
              <p className="text-primary-foreground/55 text-sm font-light leading-relaxed">
                {item.body}
              </p>
            </article>
          ))}
        </div>

        <p className="label-uppercase text-primary-foreground/60 mb-3 !text-primary-foreground/60">
          Testimonials
        </p>
        <h2 className="heading-section mb-12 md:mb-14">
          Our clients review
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 lg:gap-14">
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
