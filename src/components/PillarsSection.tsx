const pillars = [
  {
    title: "Customer centric",
    body: "The customer and their experiences always come first.",
  },
  {
    title: "Design & quality",
    body: "No compromise on the design detailing and material quality.",
  },
  {
    title: "Craftsmen to customer",
    body: "The true companions are our craftsmen who ensure our client's needs are met.",
  },
] as const;

export function PillarsSection() {
  return (
    <section className="section-padding bg-muted/40 border-y border-border/60">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 lg:gap-12">
        {pillars.map((p) => (
          <article key={p.title} className="text-center md:text-left">
            <h3 className="font-heading text-xl md:text-2xl font-medium mb-4 tracking-tight">
              {p.title}
            </h3>
            <p className="text-muted-foreground text-sm sm:text-base font-light leading-relaxed">
              {p.body}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
