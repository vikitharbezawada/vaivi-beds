"use client";

/* eslint-disable @next/next/no-img-element -- user-selected blob URLs cannot use next/image */

import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  BedDouble,
  Check,
  ImagePlus,
  PackageCheck,
  Palette,
  Sparkles,
  Truck,
  Upload,
} from "lucide-react";
import { type CSSProperties, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

type Variant = "A" | "B" | "C";
type UploadPreview = { name: string; url: string } | null;
type RoomPlacement = {
  scale: number;
  horizontal: number;
  floor: number;
  perspective: number;
};

type JourneyConfig = {
  design: string;
  size: string;
  headboard: string;
  material: string;
  base: string;
  colour: string;
  name: string;
  email: string;
  postcode: string;
  delivery: string;
};

const INITIAL: JourneyConfig = {
  design: "The Nila",
  size: "King",
  headboard: "Extended Curved",
  material: "Performance Fabric",
  base: "Double Boat",
  colour: "Oat",
  name: "",
  email: "",
  postcode: "",
  delivery: "White-Glove Delivery",
};

const JOURNEY = [
  { short: "Choose", title: "Choose Your Starting Point", icon: BedDouble },
  { short: "Customise", title: "Make Every Detail Yours", icon: Palette },
  { short: "Visualise", title: "See It in Your Bedroom", icon: Sparkles },
  { short: "Deliver", title: "Approve, Build and Deliver", icon: Truck },
] as const;

const DESIGNS = [
  {
    name: "The Nila",
    note: "Soft wingback · open base",
    image: "/Images/Gallery/00SJ0121-copy-min-scaled.jpeg",
  },
  {
    name: "The Aria",
    note: "Extended panels · normal base",
    image: "/Images/Gallery/04c780af-7a33-4712-ae64-6a72fc8bfc6c-1.jpg",
  },
  {
    name: "The Cove",
    note: "Curved profile · single boat",
    image: "/Images/Gallery/12110e9e-019c-45d7-93a7-43952f2d1959-1.jpg",
  },
] as const;

const BASES = [
  {
    name: "Normal",
    note: "A grounded, full upholstered plinth",
    position: "0% 0%",
  },
  {
    name: "Open",
    note: "Raised frame with visible clearance",
    position: "100% 0%",
  },
  {
    name: "Double Boat",
    note: "Two soft layers with a floating profile",
    position: "0% 100%",
  },
  {
    name: "Single Boat",
    note: "One slim, streamlined floating layer",
    position: "100% 100%",
  },
] as const;

const COLOURS = [
  { name: "Oat", hex: "#d8c7ae" },
  { name: "Clay", hex: "#a9654a" },
  { name: "Moss", hex: "#68705d" },
  { name: "Ink", hex: "#31383c" },
  { name: "Rose", hex: "#c48e89" },
] as const;

const CATALOGUE_IMAGE: Record<string, string> = Object.fromEntries(
  DESIGNS.map((design) => [design.name, design.image]),
);

const HEADBOARD_SHEETS: Record<string, string> = {
  Standard: "/Images/Configurator/cutouts/standard.png",
  "Extended Curved":
    "/Images/Configurator/cutouts/extended-curved.png",
  "Extended Double":
    "/Images/Configurator/cutouts/extended-double.png",
  "Extended Triple":
    "/Images/Configurator/cutouts/extended-triple.png",
};

const HEADBOARD_MASKS: Record<string, string> = {
  Standard: "/Images/Configurator/cutouts/standard-upholstery-mask.png",
  "Extended Curved":
    "/Images/Configurator/cutouts/extended-curved-upholstery-mask.png",
  "Extended Double":
    "/Images/Configurator/cutouts/extended-double-upholstery-mask.png",
  "Extended Triple":
    "/Images/Configurator/cutouts/extended-triple-upholstery-mask.png",
};

const SIZE_SCALE: Record<string, number> = {
  Queen: 0.82,
  "Queen Wide": 0.9,
  King: 1,
  "California King": 0.96,
};

const DESIGN_DEFAULTS: Record<
  string,
  Pick<JourneyConfig, "headboard" | "base">
> = {
  "The Nila": { headboard: "Extended Curved", base: "Open" },
  "The Aria": { headboard: "Extended Double", base: "Normal" },
  "The Cove": { headboard: "Extended Curved", base: "Single Boat" },
};

function ConfiguredBedImage({
  config,
  className = "",
  studio = true,
}: {
  config: JourneyConfig;
  className?: string;
  studio?: boolean;
}) {
  const sheet =
    HEADBOARD_SHEETS[config.headboard] ?? HEADBOARD_SHEETS.Standard;
  const upholsteryMask =
    HEADBOARD_MASKS[config.headboard] ?? HEADBOARD_MASKS.Standard;
  const basePosition =
    BASES.find((base) => base.name === config.base)?.position ?? "0% 0%";
  const colour =
    COLOURS.find((option) => option.name === config.colour)?.hex ?? "#d8c7ae";
  const colourDepthOpacity =
    config.colour === "Ink"
      ? 0.72
      : config.colour === "Moss"
        ? 0.42
        : config.colour === "Clay"
          ? 0.28
          : config.colour === "Rose"
            ? 0.22
            : 0.06;
  const widthScale = SIZE_SCALE[config.size] ?? 1;
  const materialTreatment =
    config.material === "Leather"
      ? "contrast(1.12) saturate(0.82)"
      : config.material === "Velvet"
        ? "contrast(1.04) saturate(1.12)"
        : config.material === "Textured Fabric"
          ? "contrast(1.08) saturate(0.9)"
          : "none";
  const productLayer: CSSProperties = {
    backgroundImage: `url('${sheet}')`,
    backgroundPosition: basePosition,
    backgroundSize: "200% 200%",
    backgroundRepeat: "no-repeat",
  };
  const productMask: CSSProperties = {
    maskImage: `url('${upholsteryMask}')`,
    maskPosition: basePosition,
    maskSize: "200% 200%",
    maskRepeat: "no-repeat",
    WebkitMaskImage: `url('${upholsteryMask}')`,
    WebkitMaskPosition: basePosition,
    WebkitMaskSize: "200% 200%",
    WebkitMaskRepeat: "no-repeat",
  };

  return (
    <div className={`relative ${studio ? "overflow-hidden bg-[#eee8df]" : "overflow-visible"} ${className}`}>
      {studio && (
        <>
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, #f4f1ec 0%, #eee9e2 71%, #d8cbbc 71.25%, #e8ded2 100%)",
            }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-[29%] opacity-35"
            style={{
              backgroundImage:
                "repeating-linear-gradient(102deg, transparent 0 38px, rgba(115, 91, 67, 0.16) 39px 40px)",
            }}
          />
        </>
      )}
      <div
        key={`${sheet}-${basePosition}-${config.size}`}
        className="absolute inset-0 animate-fade-in transition-transform duration-500"
        style={{
          transform: `scaleX(${widthScale})`,
          transformOrigin: "center bottom",
          filter: materialTreatment,
        }}
      >
        <div
          className="absolute inset-0 bg-cover bg-no-repeat"
          style={productLayer}
        />
        <div
          className="absolute inset-0 transition-colors duration-500"
          style={{
            ...productMask,
            backgroundColor: colour,
            mixBlendMode: "color",
            opacity: config.colour === "Oat" ? 0.12 : 0.96,
          }}
        />
        <div
          className="absolute inset-0 transition-colors duration-500"
          style={{
            ...productMask,
            backgroundColor: colour,
            mixBlendMode: "multiply",
            opacity: colourDepthOpacity,
          }}
        />
        {config.material === "Leather" && (
          <div
            className="absolute inset-0 bg-gradient-to-br from-white/5 via-white/20 to-black/10 mix-blend-overlay"
            style={productMask}
          />
        )}
        {config.material === "Textured Fabric" && (
          <div
            className="absolute inset-0 opacity-10 mix-blend-multiply"
            style={{
              ...productMask,
              backgroundImage:
                "radial-gradient(circle at center, #3b3028 0.6px, transparent 0.7px)",
              backgroundSize: "4px 4px",
            }}
          />
        )}
      </div>
    </div>
  );
}

function OptionButton({
  active,
  children,
  onClick,
  dark = false,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
  dark?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`min-h-11 border px-4 py-3 text-left text-sm transition ${
        active
          ? dark
            ? "border-[#d5af68] bg-[#d5af68] text-[#171612]"
            : "border-foreground bg-foreground text-background"
          : dark
            ? "border-white/15 text-white/70 hover:border-white/40"
            : "border-border bg-background hover:border-foreground/40"
      }`}
    >
      {children}
    </button>
  );
}

function UploadTile({
  id,
  title,
  note,
  preview,
  onFile,
  dark = false,
}: {
  id: string;
  title: string;
  note: string;
  preview: UploadPreview;
  onFile: (file: File) => void;
  dark?: boolean;
}) {
  return (
    <label
      htmlFor={id}
      className={`group relative flex min-h-48 cursor-pointer flex-col items-center justify-center overflow-hidden border border-dashed p-6 text-center transition ${
        dark
          ? "border-white/25 bg-white/[0.04] hover:border-[#d5af68]"
          : "border-border bg-muted/30 hover:border-foreground/40"
      }`}
    >
      <input
        id={id}
        className="hidden"
        type="file"
        accept="image/*"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) onFile(file);
        }}
      />
      {preview ? (
        <>
          {/* User-selected blob URL is intentionally rendered with img. */}
          <img
            src={preview.url}
            alt="Uploaded preview"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/45" />
          <div className="relative text-white">
            <Check className="mx-auto mb-3 h-5 w-5" />
            <span className="block text-sm font-medium">{preview.name}</span>
            <span className="mt-1 block text-xs text-white/70">Click to replace</span>
          </div>
        </>
      ) : (
        <>
          <ImagePlus className="mb-4 h-6 w-6 opacity-60" strokeWidth={1.4} />
          <span className="text-sm font-medium">{title}</span>
          <span className="mt-1.5 max-w-56 text-xs opacity-55">{note}</span>
        </>
      )}
    </label>
  );
}

function DesignPreview({
  config,
  customDesign,
  roomPhoto,
  visualised,
  showConfigured,
  placement,
  dark = false,
}: {
  config: JourneyConfig;
  customDesign: UploadPreview;
  roomPhoto: UploadPreview;
  visualised: boolean;
  showConfigured: boolean;
  placement: RoomPlacement;
  dark?: boolean;
}) {
  const designImage = customDesign?.url ?? CATALOGUE_IMAGE[config.design] ?? DESIGNS[0].image;
  const roomImage = roomPhoto?.url ?? "/Images/Configurator/empty-bedroom.webp";
  return (
    <div className={`overflow-hidden ${dark ? "bg-black" : "bg-card"}`}>
      <div className="relative aspect-[4/3] overflow-hidden">
        {/* Blob URLs cannot be optimized by next/image. */}
        {visualised ? (
          <img src={roomImage} alt="Bedroom preview" className="h-full w-full object-cover" />
        ) : showConfigured ? (
          <ConfiguredBedImage config={config} className="h-full w-full" />
        ) : (
          <img src={designImage} alt={config.design} className="h-full w-full object-cover" />
        )}
        {!visualised && <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/5 to-transparent" />}
        {visualised && (
          <div className="pointer-events-none absolute inset-0 overflow-hidden shadow-[inset_0_0_70px_rgba(20,16,12,0.14)]">
            <div
              className="absolute aspect-square transition-[width,left,bottom,transform] duration-300 ease-out"
              style={{
                width: `${placement.scale}%`,
                left: `${50 + placement.horizontal}%`,
                bottom: `${-23 + placement.floor}%`,
                transform: `translateX(-50%) perspective(900px) rotateX(${placement.perspective}deg)`,
                transformOrigin: "center bottom",
              }}
            >
              <div className="absolute inset-x-[16%] bottom-[15%] h-[7%] rounded-full bg-black/40 blur-md" />
              <ConfiguredBedImage
                config={config}
                studio={false}
                className="h-full w-full drop-shadow-[0_14px_12px_rgba(32,24,17,0.28)]"
              />
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/35 to-transparent px-5 pb-4 pt-12 text-white">
              <p className="font-heading text-xl">{config.design}</p>
              <p className="mt-0.5 text-[11px] text-white/75">
                {config.size} · {config.base} base · {config.colour}
              </p>
            </div>
          </div>
        )}
        {!visualised && (
          <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-7">
            <p className="font-heading text-2xl font-medium">{config.design}</p>
            <p className="mt-1 text-xs text-white/70">
              {config.size} · {config.base} base · {config.colour}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function SummaryChips({ config, dark = false }: { config: JourneyConfig; dark?: boolean }) {
  return (
    <div className="flex flex-wrap gap-2">
      {[config.design, config.size, `${config.base} base`, config.material, config.colour].map((item) => (
        <span
          key={item}
          className={`border px-2.5 py-1.5 text-xs ${
            dark ? "border-white/15 text-white/55" : "border-border text-muted-foreground"
          }`}
        >
          {item}
        </span>
      ))}
    </div>
  );
}

function PlacementControl({
  label,
  value,
  min,
  max,
  onChange,
  dark,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  dark: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-3 block text-xs font-medium opacity-60">{label}</span>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className={`h-1.5 w-full cursor-pointer appearance-none rounded-full ${
          dark ? "accent-[#d5af68]" : "accent-foreground"
        }`}
      />
    </label>
  );
}

export function CustomerJourneyPrototype({ variant }: { variant: Variant }) {
  const [step, setStep] = useState(0);
  const [config, setConfig] = useState<JourneyConfig>(INITIAL);
  const [customDesign, setCustomDesign] = useState<UploadPreview>(null);
  const [roomPhoto, setRoomPhoto] = useState<UploadPreview>(null);
  const [visualised, setVisualised] = useState(false);
  const [visualising, setVisualising] = useState(false);
  const [placement, setPlacement] = useState<RoomPlacement>({
    scale: 90,
    horizontal: 0,
    floor: 3,
    perspective: 2,
  });
  const [complete, setComplete] = useState(false);

  const dark = variant === "B";
  const update = (patch: Partial<JourneyConfig>) => setConfig((current) => ({ ...current, ...patch }));
  const setFile = (setter: (value: UploadPreview) => void, file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please choose an image file.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Please choose an image under 10 MB.");
      return;
    }
    setter({ name: file.name, url: URL.createObjectURL(file) });
  };

  useEffect(
    () => () => {
      if (customDesign) URL.revokeObjectURL(customDesign.url);
      if (roomPhoto) URL.revokeObjectURL(roomPhoto.url);
    },
    [customDesign, roomPhoto],
  );

  const stepReady = useMemo(() => {
    if (step === 0) return Boolean(config.design || customDesign);
    if (step === 1) return Boolean(config.size && config.base && config.material && config.colour);
    if (step === 2) return visualised;
    return Boolean(config.name.trim() && /.+@.+\..+/.test(config.email) && config.postcode.trim());
  }, [config, customDesign, step, visualised]);

  const generateVisual = () => {
    setVisualising(true);
    window.setTimeout(() => {
      setVisualising(false);
      setVisualised(true);
      toast.success("Room preview ready");
    }, 900);
  };

  const goNext = () => {
    if (!stepReady) {
      toast.error(
        step === 2
          ? "Generate your room preview to continue."
          : step === 3
            ? "Add your name, email and delivery postcode."
            : "Choose an option to continue.",
      );
      return;
    }
    if (step === JOURNEY.length - 1) {
      setComplete(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setStep((current) => current + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const stepBody = (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-medium tracking-tight sm:text-4xl">{JOURNEY[step].title}</h1>
        <p className={`mt-3 max-w-xl text-sm leading-relaxed ${dark ? "text-white/55" : "text-muted-foreground"}`}>
          {step === 0 && "Start with a Vaivi design, or share something you already love. We can adapt either one."}
          {step === 1 && "Choose the size, shape and material that work for your room."}
          {step === 2 && "Share a bedroom photo and see how the bed could sit in your space."}
          {step === 3 && "Tell us where the bed is going. We'll confirm the design and delivery details with you."}
        </p>
      </div>

      {step === 0 && (
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {DESIGNS.map((design) => (
            <button
              type="button"
              key={design.name}
              onClick={() => {
                update({
                  design: design.name,
                  ...DESIGN_DEFAULTS[design.name],
                });
                setCustomDesign(null);
              }}
              className={`group overflow-hidden border text-left transition ${
                config.design === design.name && !customDesign
                  ? dark
                    ? "border-[#d5af68]"
                    : "border-foreground"
                  : dark
                    ? "border-white/15 hover:border-white/40"
                    : "border-border hover:border-foreground/40"
              }`}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image src={design.image} alt={design.name} fill className="object-cover transition duration-500 group-hover:scale-105" sizes="(max-width: 640px) 50vw, 25vw" priority={design.name === "The Nila"} />
                {config.design === design.name && !customDesign && (
                  <span className="absolute right-3 top-3 grid h-7 w-7 place-items-center rounded-full bg-white text-black"><Check className="h-4 w-4" /></span>
                )}
              </div>
              <div className="p-4">
                <p className="font-heading text-lg">{design.name}</p>
                <p className={`mt-1 text-xs ${dark ? "text-white/45" : "text-muted-foreground"}`}>{design.note}</p>
              </div>
            </button>
          ))}
          <UploadTile
            id={`custom-design-${variant}`}
            title="Share Your Design"
            note="Upload a sketch, saved image or inspiration photo"
            preview={customDesign}
            onFile={(file) => {
              setFile(setCustomDesign, file);
              update({ design: "Your submitted design" });
            }}
            dark={dark}
          />
        </div>
      )}

      {step === 1 && (
        <div className="space-y-8">
          <div>
            <p className="mb-3 text-sm font-medium opacity-60">Bed Size</p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {["Queen", "Queen Wide", "King", "California King"].map((item) => (
                <OptionButton key={item} active={config.size === item} onClick={() => update({ size: item })} dark={dark}>{item}</OptionButton>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-3 text-sm font-medium opacity-60">Base Type</p>
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              {BASES.map((base) => (
                <button
                  type="button"
                  key={base.name}
                  onClick={() => update({ base: base.name })}
                  className={`overflow-hidden border text-left transition ${
                    config.base === base.name
                      ? dark ? "border-[#d5af68]" : "border-foreground"
                      : dark ? "border-white/15 hover:border-white/40" : "border-border hover:border-foreground/40"
                  }`}
                >
                  <div
                    className="aspect-square bg-cover bg-no-repeat"
                    style={{
                      backgroundImage: "url('/Images/Configurator/base-options-sheet.webp')",
                      backgroundPosition: base.position,
                      backgroundSize: "200% 200%",
                    }}
                  />
                  <div className="p-3.5">
                    <p className="text-sm font-medium">{base.name}</p>
                    <p className={`mt-1 text-[11px] leading-snug ${dark ? "text-white/45" : "text-muted-foreground"}`}>{base.note}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div>
              <p className="mb-3 text-sm font-medium opacity-60">Headboard</p>
              <div className="grid grid-cols-2 gap-2">
                {["Standard", "Extended Curved", "Extended Double", "Extended Triple"].map((item) => (
                  <OptionButton key={item} active={config.headboard === item} onClick={() => update({ headboard: item })} dark={dark}>{item}</OptionButton>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-3 text-sm font-medium opacity-60">Upholstery</p>
              <div className="grid grid-cols-2 gap-2">
                {["Performance Fabric", "Textured Fabric", "Leather", "Velvet"].map((item) => (
                  <OptionButton key={item} active={config.material === item} onClick={() => update({ material: item })} dark={dark}>{item}</OptionButton>
                ))}
              </div>
            </div>
          </div>

          <div>
            <p className="mb-3 text-sm font-medium opacity-60">Colour</p>
            <div className="flex flex-wrap gap-3">
              {COLOURS.map((colour) => (
                <button
                  type="button"
                  key={colour.name}
                  onClick={() => update({ colour: colour.name })}
                  aria-label={colour.name}
                  className={`flex min-h-11 items-center gap-2 border px-3 transition ${config.colour === colour.name ? dark ? "border-[#d5af68]" : "border-foreground" : dark ? "border-white/15" : "border-border"}`}
                >
                  <span className="h-5 w-5 rounded-full border border-black/10" style={{ background: colour.hex }} />
                  <span className="text-xs">{colour.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <UploadTile
              id={`room-photo-${variant}`}
              title="Upload Your Bedroom"
              note="A straight-on photo of the open wall and floor works best. JPG, PNG or HEIC up to 10 MB."
              preview={roomPhoto}
              onFile={(file) => {
                setFile(setRoomPhoto, file);
                setVisualised(false);
              }}
              dark={dark}
            />
            <div className={`flex min-h-48 flex-col justify-between border p-6 ${dark ? "border-white/15 bg-white/[0.04]" : "border-border bg-muted/30"}`}>
              <div>
                <Sparkles className="mb-4 h-6 w-6 opacity-60" strokeWidth={1.4} />
                <p className="text-sm font-medium">Create Your Room Preview</p>
                <p className="mt-2 max-w-sm text-xs leading-relaxed opacity-55">Place your selected bed in the room, then fine-tune its size and position.</p>
              </div>
              <button type="button" onClick={generateVisual} disabled={visualising} className={`mt-6 min-h-11 px-5 text-sm font-medium disabled:opacity-50 ${dark ? "bg-[#d5af68] text-[#171612]" : "bg-foreground text-background"}`}>
                {visualising ? "Creating Preview…" : visualised ? "Refresh Preview" : "Visualise My Bed"}
              </button>
            </div>
          </div>
          {visualised && (
            <div className={`border p-5 sm:p-6 ${dark ? "border-white/15 bg-white/[0.04]" : "border-border bg-muted/30"}`}>
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium">Fine-Tune Placement</p>
                  <p className="mt-1 text-xs opacity-50">Match the bed to the floor line and proportions of your room.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setPlacement({ scale: 90, horizontal: 0, floor: 3, perspective: 2 })}
                  className="shrink-0 text-xs underline decoration-current/30 underline-offset-4 opacity-55 transition hover:opacity-100"
                >
                  Reset
                </button>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <PlacementControl label="Bed Size" value={placement.scale} min={68} max={112} dark={dark} onChange={(scale) => setPlacement((current) => ({ ...current, scale }))} />
                <PlacementControl label="Left and Right" value={placement.horizontal} min={-24} max={24} dark={dark} onChange={(horizontal) => setPlacement((current) => ({ ...current, horizontal }))} />
                <PlacementControl label="Floor Position" value={placement.floor} min={-10} max={18} dark={dark} onChange={(floor) => setPlacement((current) => ({ ...current, floor }))} />
                <PlacementControl label="Perspective" value={placement.perspective} min={-5} max={8} dark={dark} onChange={(perspective) => setPlacement((current) => ({ ...current, perspective }))} />
              </div>
            </div>
          )}
        </div>
      )}

      {step === 3 && (
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            <input value={config.name} onChange={(event) => update({ name: event.target.value })} placeholder="Full Name" className={`w-full border bg-transparent px-4 py-3.5 text-sm outline-none ${dark ? "border-white/20 focus:border-[#d5af68]" : "border-border focus:border-foreground"}`} />
            <input value={config.email} onChange={(event) => update({ email: event.target.value })} placeholder="Email Address" type="email" className={`w-full border bg-transparent px-4 py-3.5 text-sm outline-none ${dark ? "border-white/20 focus:border-[#d5af68]" : "border-border focus:border-foreground"}`} />
            <input value={config.postcode} onChange={(event) => update({ postcode: event.target.value })} placeholder="Delivery Postcode" className={`w-full border bg-transparent px-4 py-3.5 text-sm outline-none ${dark ? "border-white/20 focus:border-[#d5af68]" : "border-border focus:border-foreground"}`} />
            <div className="grid gap-2 sm:grid-cols-2">
              {["White-Glove Delivery", "Collect from Studio"].map((item) => (
                <OptionButton key={item} active={config.delivery === item} onClick={() => update({ delivery: item })} dark={dark}>{item}</OptionButton>
              ))}
            </div>
          </div>
          <div className={`border p-6 ${dark ? "border-white/15 bg-white/[0.04]" : "border-border bg-muted/30"}`}>
            <PackageCheck className="mb-5 h-7 w-7 opacity-60" strokeWidth={1.4} />
            <p className="font-heading text-xl">What Happens Next</p>
            <ol className="mt-5 space-y-4 text-sm">
              {["Confirm the design and quote", "Review the room render", "Your bed is made in 3 to 5 weeks", "We deliver and install it at home"].map((item, index) => (
                <li key={item} className="flex gap-3"><span className="opacity-35">0{index + 1}</span><span className="opacity-70">{item}</span></li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </div>
  );

  const navigation = (
    <div className={`mt-10 flex items-center border-t pt-6 ${dark ? "border-white/15" : "border-border"}`}>
      <button type="button" onClick={() => setStep((current) => Math.max(0, current - 1))} disabled={step === 0} className="flex min-h-11 items-center gap-2 px-2 text-sm opacity-60 disabled:invisible"><ArrowLeft className="h-4 w-4" /> Back</button>
      <button type="button" onClick={goNext} className={`ml-auto flex min-h-11 items-center gap-2 px-6 text-sm font-medium ${dark ? "bg-[#d5af68] text-[#171612]" : "bg-foreground text-background"}`}>
        {step === 3 ? "Send Design Request" : "Continue"}<ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );

  if (complete) {
    return (
      <div className={`mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24 ${dark ? "text-white" : ""}`}>
        <div className="mx-auto max-w-2xl text-center">
          <div className={`mx-auto mb-7 grid h-14 w-14 place-items-center rounded-full ${dark ? "bg-[#d5af68] text-[#171612]" : "bg-foreground text-background"}`}><Check className="h-6 w-6" /></div>
          <p className="text-sm font-medium opacity-50">Design Request Received</p>
          <h1 className="mt-4 font-heading text-4xl font-medium sm:text-5xl">Thank You, {config.name}</h1>
          <p className="mx-auto mt-5 max-w-lg text-sm leading-relaxed opacity-55">We&apos;ll send the quote and room render to {config.email}. Once you&apos;re happy with both, we&apos;ll begin making your bed.</p>
        </div>
        <div className={`mt-14 grid gap-px sm:grid-cols-4 ${dark ? "bg-white/15" : "bg-border"}`}>
          {["Brief Received", "Design Approval", "Made for You", "Delivered and Installed"].map((item, index) => (
            <div key={item} className={`${dark ? "bg-[#171612]" : "bg-background"} p-5`}><p className="text-xs opacity-35">0{index + 1}</p><p className="mt-2 text-sm font-medium">{item}</p>{index === 0 && <p className="mt-1 text-xs text-accent">In Progress</p>}</div>
          ))}
        </div>
        <button type="button" onClick={() => { setComplete(false); setStep(0); }} className="mx-auto mt-10 block min-h-11 text-sm opacity-55">Start Another Design →</button>
      </div>
    );
  }

  if (variant === "B") {
    return (
      <div className="min-h-[calc(100vh-5rem)] bg-[#171612] text-white">
        <div className="grid min-h-[calc(100vh-5rem)] lg:grid-cols-[minmax(22rem,0.9fr)_minmax(32rem,1.1fr)]">
          <aside className="relative hidden border-r border-white/10 p-8 lg:block xl:p-12">
            <div className="sticky top-28">
              <DesignPreview config={config} customDesign={customDesign} roomPhoto={roomPhoto} visualised={step === 2 && visualised} showConfigured={step > 0} placement={placement} dark />
              <div className="mt-6"><SummaryChips config={config} dark /></div>
              <div className="mt-10 space-y-1">
                {JOURNEY.map((item, index) => (
                  <button type="button" key={item.short} onClick={() => index <= step && setStep(index)} className={`flex w-full items-center gap-4 border-l px-4 py-3 text-left ${index === step ? "border-[#d5af68] text-white" : "border-white/10 text-white/35"}`}>
                    <span className="text-[10px]">0{index + 1}</span><span className="text-sm">{item.short}</span>
                  </button>
                ))}
              </div>
            </div>
          </aside>
          <main className="px-4 py-12 sm:px-8 lg:px-12 xl:px-16 xl:py-16">
            <div className="mx-auto max-w-4xl">{stepBody}{navigation}</div>
          </main>
        </div>
      </div>
    );
  }

  if (variant === "C") {
    return (
      <div className="bg-[#eee9df] px-4 py-10 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-col justify-between gap-5 border-b border-black/15 pb-7 sm:flex-row sm:items-end">
            <div><p className="text-sm font-medium text-black/45">Vaivi Design Service</p><p className="mt-2 font-heading text-2xl">Your Design, in One Place</p></div>
            <SummaryChips config={config} />
          </div>
          <div className="grid gap-5 lg:grid-cols-[13rem_1fr]">
            <nav className="h-fit border border-black/10 bg-[#f8f6f1] p-3 lg:sticky lg:top-28">
              {JOURNEY.map((item, index) => (
                <button type="button" key={item.short} onClick={() => index <= step && setStep(index)} className={`flex w-full items-center gap-3 px-3 py-4 text-left ${index === step ? "bg-black text-white" : "text-black/40"}`}><item.icon className="h-4 w-4" /><span className="text-xs font-medium">{item.short}</span>{index < step && <Check className="ml-auto h-3.5 w-3.5" />}</button>
              ))}
            </nav>
            <div className="grid gap-5 xl:grid-cols-[1fr_20rem]">
              <section className="border border-black/10 bg-[#f8f6f1] p-5 sm:p-8 lg:p-10">{stepBody}{navigation}</section>
              <aside className="h-fit overflow-hidden border border-black/10 bg-[#f8f6f1] xl:sticky xl:top-28"><DesignPreview config={config} customDesign={customDesign} roomPhoto={roomPhoto} visualised={step === 2 && visualised} showConfigured={step > 0} placement={placement} /><div className="p-5"><p className="text-sm font-medium text-black/45">Your Selections</p><div className="mt-4"><SummaryChips config={config} /></div></div></aside>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16 lg:px-12">
      <div className="mb-10 grid grid-cols-2 gap-px bg-border sm:grid-cols-4">
        {JOURNEY.map((item, index) => (
          <button type="button" key={item.short} onClick={() => index <= step && setStep(index)} className={`flex items-center gap-3 p-4 text-left sm:p-5 ${index <= step ? "bg-foreground text-background" : "bg-card text-muted-foreground"}`}><item.icon className="h-4 w-4" /><span className="text-sm font-medium">{item.short}</span>{index < step && <Check className="ml-auto hidden h-3.5 w-3.5 sm:block" />}</button>
        ))}
      </div>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] xl:grid-cols-[minmax(0,1fr)_26rem]">
        <main>{stepBody}{navigation}</main>
        <aside className="h-fit lg:sticky lg:top-28"><DesignPreview config={config} customDesign={customDesign} roomPhoto={roomPhoto} visualised={step === 2 && visualised} showConfigured={step > 0} placement={placement} /></aside>
      </div>
    </div>
  );
}
