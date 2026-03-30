import {
  BedDouble,
  FileText,
  Hammer,
  Palette,
  Sparkles,
  Truck,
} from "lucide-react";

const steps = [
  {
    icon: BedDouble,
    title: "Design Selection",
    description:
      "Choose a design from our catalogue or share your own inspiration.",
  },
  {
    icon: Palette,
    title: "Material and Colour Preferences",
    description:
      "Select your preferred materials, finishes, and colours to match your space.",
  },
  {
    icon: FileText,
    title: "Detailed Presentation",
    description:
      "Receive detailed technical drawings, 3D renders, and specifications of your custom bed.",
  },
  {
    icon: Hammer,
    title: "Excellence & Craftsmanship",
    description:
      "Our artisans begin building your custom bed with precision and care.",
  },
  {
    icon: Truck,
    title: "Delivery & Installation",
    description:
      "Your bespoke Vaivi Bed is delivered and installed right in your home.",
  },
  {
    icon: Sparkles,
    title: "Signature Comfort",
    description:
      "Relax and enjoy a luxury sleep experience, crafted specially for you!",
  },
] as const;

export function ProcessSection() {
  return (
    <section className="section-padding bg-primary text-primary-foreground overflow-hidden">
      <div className="mb-12 sm:mb-16 md:mb-20 text-center max-w-2xl mx-auto px-1">
        <p className="font-body text-xs font-semibold uppercase tracking-[0.3em] text-accent mb-4">
          Our Process
        </p>
        <h2 className="heading-section mb-6">
          Ensuring design detailing at every stage
        </h2>
        <div className="w-16 h-px bg-accent mx-auto" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-primary-foreground/[0.12] max-w-6xl mx-auto rounded-sm overflow-hidden">
        {steps.map((step, index) => (
          <div
            key={step.title}
            className="group relative p-8 sm:p-10 lg:p-12 bg-primary transition-colors duration-500 hover:bg-primary-foreground/[0.04]"
          >
            <span className="absolute top-4 right-4 sm:top-6 sm:right-8 font-heading text-5xl sm:text-6xl font-medium text-primary-foreground/[0.04] group-hover:text-accent/20 transition-colors">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-accent/30 flex items-center justify-center mb-6 sm:mb-8 group-hover:border-accent group-hover:shadow-[0_0_20px_hsl(38_35%_52%/0.15)] transition-all">
              <step.icon
                className="w-5 h-5 sm:w-6 sm:h-6 text-accent stroke-[1.25]"
                aria-hidden
              />
            </div>
            <h3 className="font-heading text-lg sm:text-xl font-medium mb-3 tracking-tight pr-12">
              {step.title}
            </h3>
            <p className="text-primary-foreground/50 font-light leading-relaxed text-sm">
              {step.description}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-12 sm:mt-16 md:mt-20 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4 text-center">
        <div className="hidden sm:block h-px w-12 bg-accent/40 shrink-0" />
        <p className="text-accent/60 text-[10px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] uppercase font-medium max-w-[16rem] sm:max-w-none leading-relaxed">
          From concept to comfort
        </p>
        <div className="hidden sm:block h-px w-12 bg-accent/40 shrink-0" />
      </div>
    </section>
  );
}
