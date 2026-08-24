import {
  BedDouble,
  Hammer,
  Palette,
  Truck,
} from "lucide-react";

const steps = [
  {
    icon: BedDouble,
    title: "Choose a Design",
    description:
      "Pick from our catalogue, or show us a bed you already love.",
  },
  {
    icon: Palette,
    title: "Make It Yours",
    description:
      "Choose the size, base, headboard, material and colour.",
  },
  {
    icon: Hammer,
    title: "See It in Your Room",
    description:
      "Share a room photo and review the design before we begin making it.",
  },
  {
    icon: Truck,
    title: "We Build and Install",
    description:
      "Your bed is made, delivered and installed by our team.",
  },
] as const;

export function ProcessSection() {
  return (
    <section className="section-padding bg-primary text-primary-foreground overflow-hidden">
      <div className="mb-12 sm:mb-16 md:mb-20 text-center max-w-2xl mx-auto px-1">
        <p className="font-body text-sm font-medium text-accent mb-4">
          How It Works
        </p>
        <h2 className="heading-section mb-6">
          From an Idea to Your Bedroom
        </h2>
        <div className="w-16 h-px bg-accent mx-auto" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-primary-foreground/[0.12] max-w-6xl mx-auto overflow-hidden">
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
    </section>
  );
}
