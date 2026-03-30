"use client";

import Image from "next/image";
import { ChevronDown, ImagePlus } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";
import { images } from "@/lib/images";
import { SITE } from "@/lib/site";

const CONFIG_STEPS = [
  {
    key: "size" as const,
    label: "SIZE",
    options: ["Twin", "Full", "Queen", "King", "California King"],
    default: "Queen",
  },
  {
    key: "wood" as const,
    label: "WOOD",
    options: [
      "White Oak",
      "Walnut",
      "Cherry",
      "Maple",
      "Reclaimed Teak",
      "White Ash",
    ],
    default: "Walnut",
  },
  {
    key: "finish" as const,
    label: "FINISH",
    options: [
      "Natural Matte",
      "Satin",
      "Hand-Rubbed Oil",
      "Ebonized",
      "Whitewashed",
    ],
    default: "Natural Matte",
  },
  {
    key: "headboard" as const,
    label: "HEADBOARD STYLE",
    options: [
      "Slatted",
      "Solid Panel",
      "Upholstered",
      "Live Edge",
      "Canopy",
      "None",
    ],
    default: "Upholstered",
  },
  {
    key: "legStyle" as const,
    label: "LEG STYLE",
    options: ["Tapered", "Straight", "Hairpin", "No Legs (Platform)"],
    default: "Tapered",
  },
] as const;

function woodToImage(wood: string): string {
  if (wood === "White Oak" || wood === "Maple" || wood === "White Ash") {
    return images.configOak;
  }
  if (wood === "Cherry") {
    return images.configCherry;
  }
  return images.configDefault;
}

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export function ConfiguratorSection() {
  const [config, setConfig] = useState({
    size: "Queen",
    wood: "Walnut",
    finish: "Natural Matte",
    headboard: "Upholstered",
    legStyle: "Tapered",
    name: "",
    email: "",
    notes: "",
  });
  const [openStep, setOpenStep] = useState<string>("size");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [inspoPhotos, setInspoPhotos] = useState<
    { file: File; preview: string }[]
  >([]);

  const currentImage = useMemo(() => woodToImage(config.wood), [config.wood]);

  const configComplete = useMemo(
    () =>
      CONFIG_STEPS.every((s) => {
        const v = config[s.key];
        return typeof v === "string" && v.length > 0;
      }),
    [config],
  );

  const selectOption = useCallback(
    (key: (typeof CONFIG_STEPS)[number]["key"], value: string) => {
      setConfig((c) => ({ ...c, [key]: value }));
    },
    [],
  );

  const onFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;
    const next: { file: File; preview: string }[] = [...inspoPhotos];
    for (let i = 0; i < files.length && next.length < 5; i++) {
      const f = files[i];
      if (f.size > 10 * 1024 * 1024) {
        toast.error("Each image must be 10MB or less.");
        continue;
      }
      if (!f.type.startsWith("image/")) continue;
      next.push({ file: f, preview: URL.createObjectURL(f) });
    }
    setInspoPhotos(next);
    e.target.value = "";
  };

  const removePhoto = (i: number) => {
    setInspoPhotos((prev) => {
      const copy = [...prev];
      const [removed] = copy.splice(i, 1);
      if (removed) URL.revokeObjectURL(removed.preview);
      return copy;
    });
  };

  const submit = () => {
    if (!config.name.trim()) {
      toast.error("Please enter your full name.");
      return;
    }
    if (!config.email.trim() || !emailOk(config.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    if (!configComplete) {
      toast.error("Please complete all configuration steps.");
      return;
    }
    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

  const reset = () => {
    setSubmitted(false);
    setOpenStep("size");
  };

  if (submitted) {
    return (
      <div className="max-w-5xl mx-auto">
        <div className="max-w-4xl mx-auto py-8 text-center mb-16 animate-fade-up">
          <p className="label-uppercase mb-6 tracking-[0.3em]">We got it</p>
          <h2 className="font-heading text-3xl md:text-5xl font-medium tracking-tight mb-4">
            Thanks, {config.name}
          </h2>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            We&apos;ll put together a quote and get back to you within a couple
            of days.
          </p>
        </div>

        <div
          className="relative overflow-hidden mb-12 sm:mb-16 animate-fade-up rounded-sm"
          style={{ animationDelay: "0.1s" }}
        >
          <div className="relative aspect-[4/5] sm:aspect-[16/9] md:aspect-[21/9] min-h-[16rem]">
            <Image
              src={currentImage}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1024px"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/30 sm:from-black/85 sm:via-black/40 md:bg-gradient-to-r md:from-black/80 md:via-black/45 md:to-transparent"
              aria-hidden
            />
            <div className="absolute inset-0 flex flex-col justify-end md:justify-center md:items-stretch p-5 sm:p-8 md:px-14 md:py-10">
              <div className="max-w-lg w-full">
                <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.3em] text-primary-foreground/75 mb-3 sm:mb-4">
                  Experience center
                </p>
                <h3 className="font-heading text-xl sm:text-2xl md:text-4xl font-medium text-primary-foreground mb-3 sm:mb-4 leading-tight">
                  Visit us in Hyderabad
                </h3>
                <p className="text-primary-foreground/80 text-sm mb-4 sm:mb-6 leading-relaxed max-w-sm">
                  Experience your sleep sanctuary at our one-of-a-kind
                  experience center — see the wood, finishes, and beds in
                  person. Call us to plan your visit.
                </p>
                <p className="text-sm text-primary-foreground/95 leading-relaxed">
                  {SITE.experienceCenter}
                </p>
                <p className="text-xs text-primary-foreground/55 mt-3">
                  <a
                    href={SITE.phoneHref}
                    className="underline-offset-2 hover:underline"
                  >
                    {SITE.phone}
                  </a>
                  {" · "}
                  <a
                    href={`mailto:${SITE.email}`}
                    className="underline-offset-2 hover:underline"
                  >
                    {SITE.email}
                  </a>
                </p>
                <a
                  href={SITE.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-primary-foreground text-sm font-medium tracking-wide hover:gap-4 transition-all duration-300 mt-5 sm:mt-6 min-h-11"
                >
                  Get directions
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border mb-16 animate-fade-up"
          style={{ animationDelay: "0.2s" }}
        >
          {[
            {
              t: "We review your build",
              d: "You'll hear from us within a couple of days with pricing and questions",
            },
            {
              t: "We talk it through",
              d: "A quick call to nail down materials, sizing, and any special requests",
            },
            {
              t: "We build and deliver",
              d: "Your frame is handmade in our shop and delivered in about 6–8 weeks",
            },
          ].map((row, i) => (
            <div key={row.t} className="bg-background p-6 sm:p-8">
              <p className="text-xs text-muted-foreground/50 font-medium">
                {String(i + 1).padStart(2, "0")}
              </p>
              <p className="font-heading text-lg font-medium mt-2 mb-1">
                {row.t}
              </p>
              <p className="text-muted-foreground text-sm">{row.d}</p>
            </div>
          ))}
        </div>

        <div
          className="max-w-sm mx-auto mb-16 animate-fade-up space-y-3"
          style={{ animationDelay: "0.3s" }}
        >
          <p className="label-uppercase mb-6 text-center tracking-[0.3em]">
            Your Selection
          </p>
          {(
            [
              ["Size", config.size],
              ["Wood", config.wood],
              ["Finish", config.finish],
              ["Headboard", config.headboard],
              ["Leg style", config.legStyle],
            ] as const
          ).map(([label, value]) => (
            <div
              key={label}
              className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:items-baseline text-sm border-b border-border/50 pb-3"
            >
              <span className="text-muted-foreground shrink-0">{label}</span>
              <span className="font-medium break-words sm:text-right">
                {value}
              </span>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            type="button"
            onClick={reset}
            className="text-xs text-muted-foreground/60 tracking-wide hover:text-foreground transition-colors duration-300"
          >
            Start new configuration →
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-5xl mx-auto mb-10 md:mb-16">
        <p className="label-uppercase mb-4 tracking-[0.3em]">Build Yours</p>
        <h2 className="font-heading text-3xl md:text-5xl font-medium tracking-tight">
          Let&apos;s figure out what you want
        </h2>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start mb-10 lg:mb-0">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm">
            <Image
              src={currentImage}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
          <p className="text-xs text-muted-foreground/50 mt-4 tracking-wide">
            Image changes as you pick options
          </p>
        </div>

        <div>
          <div className="mb-8">
            <p className="font-heading text-xl font-medium">Your Bed Frame</p>
            <p className="text-muted-foreground text-sm mt-1">
              Built when you&apos;re ready
            </p>
            <p className="text-sm text-foreground mt-3">
              From{" "}
              <span className="font-heading text-lg font-medium">$2,800</span>
            </p>
          </div>

        <div className="border-t border-border/50">
          {CONFIG_STEPS.map((step, stepIndex) => {
            const open = openStep === step.key;
            const value = config[step.key];
            return (
              <div key={step.key} className="border-b border-border/50">
                <button
                  type="button"
                  onClick={() =>
                    setOpenStep(open ? "" : step.key)
                  }
                  className="w-full py-4 sm:py-5 text-left group"
                >
                  <div className="flex items-start sm:items-center gap-3 sm:gap-4 w-full min-w-0">
                    <span className="text-[10px] text-muted-foreground/40 font-medium w-5 shrink-0 tabular-nums pt-0.5 sm:pt-0">
                      {String(stepIndex + 1).padStart(2, "0")}
                    </span>
                  <span className="text-sm tracking-wide flex-1 min-w-0 group-hover:text-accent transition-colors duration-300 text-foreground">
                    {step.label}
                  </span>
                  <span className="hidden sm:inline text-sm text-foreground truncate max-w-[min(40%,11rem)] text-right shrink">
                    {value}
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-foreground/60 shrink-0 transition-transform duration-300 mt-0.5 sm:mt-0 ${open ? "rotate-180" : ""}`}
                  />
                </div>
                <span className="sm:hidden mt-2 block pl-8 text-sm text-foreground">
                  {value}
                </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-out ${open ? "max-h-[min(28rem,72vh)] sm:max-h-60 pb-6" : "max-h-0"}`}
                >
                  <div className="flex flex-wrap gap-2 pl-4 sm:pl-9 pr-1">
                    {step.options.map((opt) => {
                      const selected = value === opt;
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => selectOption(step.key, opt)}
                          className={`px-4 py-2 text-sm transition-all duration-300 rounded-sm ${
                            selected
                              ? "bg-foreground text-background"
                              : "bg-transparent text-foreground hover:bg-muted border border-border hover:border-foreground/30"
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Step 06 Inspiration */}
          <div className="border-b border-border/50">
            <button
              type="button"
              onClick={() =>
                setOpenStep(openStep === "inspiration" ? "" : "inspiration")
              }
              className="w-full py-4 sm:py-5 text-left group"
            >
              <div className="flex items-start sm:items-center gap-3 sm:gap-4 w-full min-w-0">
                <span className="text-[10px] text-muted-foreground/40 font-medium w-5 shrink-0 tabular-nums pt-0.5 sm:pt-0">
                  06
                </span>
                <span className="text-sm tracking-wide flex-1 min-w-0 group-hover:text-accent transition-colors duration-300 text-foreground">
                  INSPIRATION
                </span>
                <span className="hidden sm:inline text-sm text-foreground shrink truncate max-w-[min(40%,11rem)] text-right">
                  {inspoPhotos.length
                    ? `${inspoPhotos.length} photo(s)`
                    : "Optional"}
                </span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-foreground/60 shrink-0 transition-transform duration-300 mt-0.5 sm:mt-0 ${openStep === "inspiration" ? "rotate-180" : ""}`}
                />
              </div>
              <span className="sm:hidden mt-2 block pl-8 text-sm text-foreground">
                {inspoPhotos.length
                  ? `${inspoPhotos.length} photo(s)`
                  : "Optional"}
              </span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-out ${openStep === "inspiration" ? "max-h-[min(32rem,80vh)] sm:max-h-[500px] pb-6" : "max-h-0"}`}
            >
              <div className="pl-4 sm:pl-9 pr-1 space-y-4">
                <p className="text-xs text-muted-foreground/60 leading-relaxed">
                  Got Pinterest boards, magazine pages, or photos of beds you
                  like? Drop them here. Helps us understand what you&apos;re
                  going for. Up to 5 images.
                </p>
                <input
                  id="inspo-input"
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={onFiles}
                />
                <div className="flex flex-wrap gap-2 items-center">
                  {inspoPhotos.map((p, i) => (
                    <div key={p.preview} className="relative">
                      <img
                        src={p.preview}
                        alt=""
                        className="w-20 h-20 object-cover rounded-sm"
                      />
                      <button
                        type="button"
                        onClick={() => removePhoto(i)}
                        className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-foreground text-background rounded-full text-xs leading-5"
                        aria-label="Remove photo"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  {inspoPhotos.length < 5 && (
                    <label
                      htmlFor="inspo-input"
                      className="inline-flex items-center gap-2 cursor-pointer text-sm font-medium text-foreground border border-border px-4 py-2 rounded-sm hover:bg-muted transition-colors"
                    >
                      <ImagePlus className="w-4 h-4" />
                      Add photos
                    </label>
                  )}
                </div>
                  <textarea
                    value={config.notes}
                    onChange={(e) =>
                      setConfig((c) => ({ ...c, notes: e.target.value }))
                    }
                    rows={3}
                    maxLength={2000}
                    placeholder="Anything else we should know? Room dimensions, style preferences, that one bed you saw at a hotel once…"
                    className="w-full bg-transparent border-b border-border/50 py-3 text-base resize-none focus:outline-none focus:border-foreground/40 transition-colors duration-300 placeholder:text-muted-foreground/60 text-foreground"
                  />
              </div>
            </div>
          </div>

          {/* Step 07 Details */}
          <div className="border-b border-border/50">
            <button
              type="button"
              onClick={() =>
                setOpenStep(openStep === "details" ? "" : "details")
              }
              className="w-full py-4 sm:py-5 text-left group"
            >
              <div className="flex items-start sm:items-center gap-3 sm:gap-4 w-full min-w-0">
                <span className="text-[10px] text-muted-foreground/40 font-medium w-5 shrink-0 tabular-nums pt-0.5 sm:pt-0">
                  07
                </span>
                <span className="text-sm tracking-wide flex-1 min-w-0 group-hover:text-accent transition-colors duration-300 text-foreground">
                  YOUR DETAILS
                </span>
                <span className="hidden sm:inline text-sm text-foreground truncate max-w-[min(40%,11rem)] text-right shrink">
                  {config.name.trim() || "Required"}
                </span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-foreground/60 shrink-0 transition-transform duration-300 mt-0.5 sm:mt-0 ${openStep === "details" ? "rotate-180" : ""}`}
                />
              </div>
              <span className="sm:hidden mt-2 block pl-8 text-sm text-foreground truncate">
                {config.name.trim() || "Required"}
              </span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-out ${openStep === "details" ? "max-h-[min(20rem,55vh)] sm:max-h-60 pb-6" : "max-h-0"}`}
            >
              <div className="pl-4 sm:pl-9 pr-1 space-y-4">
                  <input
                    type="text"
                    maxLength={100}
                    value={config.name}
                    onChange={(e) =>
                      setConfig((c) => ({ ...c, name: e.target.value }))
                    }
                    placeholder="Full Name"
                    className="w-full bg-transparent border-b border-border/50 py-3 text-base placeholder:text-muted-foreground/60 focus:outline-none focus:border-foreground/40 transition-colors duration-300 text-foreground"
                  />
                  <input
                    type="email"
                    maxLength={255}
                    value={config.email}
                    onChange={(e) =>
                      setConfig((c) => ({ ...c, email: e.target.value }))
                    }
                    placeholder="Email Address"
                    className="w-full bg-transparent border-b border-border/50 py-3 text-base placeholder:text-muted-foreground/60 focus:outline-none focus:border-foreground/40 transition-colors duration-300 text-foreground"
                  />
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={submit}
          disabled={submitting || !configComplete}
          className="w-full bg-foreground text-background py-4 text-xs font-medium uppercase tracking-[0.25em] hover:opacity-80 transition-all duration-300 disabled:opacity-20 mt-8 rounded-sm"
        >
          {submitting ? "Submitting…" : "Request Quotation"}
        </button>

        {configComplete && (
          <div className="mt-8 pt-8 border-t border-border/30 space-y-2">
            {(
              [
                ["Size", config.size],
                ["Wood", config.wood],
                ["Finish", config.finish],
                ["Headboard", config.headboard],
                ["Leg style", config.legStyle],
              ] as const
            ).map(([label, val]) => (
              <div
                key={label}
                className="flex flex-col gap-0.5 sm:flex-row sm:justify-between sm:items-baseline text-sm"
              >
                <span className="text-muted-foreground/60">{label}</span>
                <span>{val}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    </>
  );
}
