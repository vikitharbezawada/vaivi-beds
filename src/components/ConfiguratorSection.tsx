"use client";

import Image from "next/image";
import { ImagePlus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { images } from "@/lib/images";
import { SITE } from "@/lib/site";

/* ─── Types ──────────────────────────────────────────── */
type Config = {
  size: string;
  customSize: string;
  headboardStyles: string[];
  headboardWidth: string;
  headboardPanels: string;
  headboardHeight: string;
  headboardHeightCustom: string;
  headboardMaterials: string[];
  bedHeight: string;
  baseStyles: string[];
  baseMaterial: string;
  footboard: string;
  storage: string;
  colourType: string;
  colourNotes: string;
  notes: string;
  name: string;
  email: string;
  phone: string;
};

const DEFAULT: Config = {
  size: "",
  customSize: "",
  headboardStyles: [],
  headboardWidth: "",
  headboardPanels: "1 Panel",
  headboardHeight: "Standard",
  headboardHeightCustom: "",
  headboardMaterials: [],
  bedHeight: "",
  baseStyles: [],
  baseMaterial: "",
  footboard: "",
  storage: "",
  colourType: "",
  colourNotes: "",
  notes: "",
  name: "",
  email: "",
  phone: "",
};

/* ─── Step metadata ──────────────────────────────────── */
const STEP_META = [
  {
    label: "Size",
    question: "What size bed?",
    instruction: "Pick a standard size, or enter custom dimensions.",
  },
  {
    label: "Headboard",
    question: "Design your headboard.",
    instruction: "Combine style, panels, height, and material.",
  },
  {
    label: "Bed Frame",
    question: "How should the frame sit?",
    instruction: "Choose bed height, base style, and base material.",
  },
  {
    label: "Features",
    question: "Any special features?",
    instruction: "Add footboard detailing and pick a storage option.",
  },
  {
    label: "Colour",
    question: "What colour scheme?",
    instruction: "One tone throughout, or a combination — we handle both.",
  },
  {
    label: "Inspiration",
    question: "Share your vision.",
    instruction: "Images, room photos, or a few words. Entirely optional.",
  },
  {
    label: "Your Details",
    question: "How can we reach you?",
    instruction:
      "We'll prepare a tailored quote and get back within a couple of days.",
  },
] as const;

const TOTAL = STEP_META.length;

/* ─── Option data ────────────────────────────────────── */
const SIZE_OPTIONS = [
  { label: "Single", desc: "" },
  { label: "Queen", desc: "W5′ × L6′5″" },
  { label: "Queen Wide", desc: "W5′6″ × L6′5″" },
  { label: "King", desc: "W6′ × L6′6″" },
  { label: "California King", desc: "W6′ × L7′" },
  { label: "Custom", desc: "Enter your size" },
];
const HEADBOARD_STYLES = ["Standard", "Curved", "Slatted", "Extended"];
const HEADBOARD_PANELS = ["1 Panel", "2 Panels (Double)", "3 Panels (Triple)"];
const HEADBOARD_HEIGHTS = [
  { label: "Standard", desc: "" },
  { label: "High", desc: "Custom height" },
];
const HEADBOARD_MATERIALS = ["Leather", "Fabric", "Teak wood", "Rattan"];
const BED_HEIGHTS = [
  { label: "Standard", desc: "22″" },
  { label: "Low", desc: "20″" },
  { label: "High", desc: "24″" },
];
const BASE_STYLES = ["Closed", "Open", "Floating / Boat", "Skirting"];
const BASE_MATERIALS = ["Leather", "Fabric", "Teak wood"];
const STORAGE_OPTIONS = [
  { label: "No storage", value: "none", desc: "" },
  {
    label: "Hydraulic lift-up",
    value: "liftup",
    desc: "Manual handle",
  },
  {
    label: "Hydraulic remote",
    value: "remote",
    desc: "One-touch remote",
  },
];
const COLOUR_OPTIONS = [
  { label: "Single colour", desc: "One tone throughout" },
  { label: "Multiple colours", desc: "Mix of materials or tones" },
];

/* ─── Helpers ────────────────────────────────────────── */
const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const toggle = (arr: string[], v: string) =>
  arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];

function previewImage(cfg: Config) {
  if (cfg.headboardMaterials.includes("Teak wood")) return images.configOak;
  if (cfg.headboardMaterials.includes("Leather")) return images.configCherry;
  return images.configDefault;
}

/* ─── Primitive components ───────────────────────────── */
function SectionLabel({
  children,
  hint,
}: {
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <div className="flex items-baseline gap-2.5 mb-3.5">
      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/50">
        {children}
      </span>
      {hint && (
        <span className="text-[10px] text-muted-foreground/40">{hint}</span>
      )}
    </div>
  );
}

function SelectCard({
  label,
  desc,
  selected,
  onClick,
  wide,
}: {
  label: string;
  desc?: string;
  selected: boolean;
  onClick: () => void;
  wide?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${wide ? "flex-1 min-w-[140px]" : ""} p-5 text-left rounded-sm border transition-all duration-200 ${
        selected
          ? "bg-foreground text-background border-foreground"
          : "border-border hover:border-foreground/30 hover:bg-muted/40"
      }`}
    >
      <span className="block text-sm font-medium leading-snug">{label}</span>
      {desc && (
        <span
          className={`block text-xs mt-1 ${
            selected ? "text-background/55" : "text-muted-foreground"
          }`}
        >
          {desc}
        </span>
      )}
    </button>
  );
}

function Chip({
  label,
  desc,
  selected,
  onClick,
}: {
  label: string;
  desc?: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-5 py-2.5 text-sm rounded-sm border font-medium leading-snug transition-all duration-200 text-left ${
        selected
          ? "bg-foreground text-background border-foreground"
          : "border-border hover:border-foreground/30 hover:bg-muted/40"
      }`}
    >
      <span>{label}</span>
      {desc && (
        <span
          className={`block text-xs font-normal mt-0.5 ${
            selected ? "text-background/55" : "text-muted-foreground"
          }`}
        >
          {desc}
        </span>
      )}
    </button>
  );
}

function GhostInput({
  value,
  onChange,
  placeholder,
  className,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  className?: string;
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`bg-transparent border-b border-border/50 py-2.5 text-sm placeholder:text-muted-foreground/40 focus:outline-none focus:border-foreground/40 transition-colors duration-300 text-foreground ${className ?? ""}`}
    />
  );
}

/* ─── Steps ──────────────────────────────────────────── */
function StepSize({
  cfg,
  set,
}: {
  cfg: Config;
  set: (p: Partial<Config>) => void;
}) {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        {SIZE_OPTIONS.map((o) => (
          <SelectCard
            key={o.label}
            label={o.label}
            desc={o.desc}
            selected={cfg.size === o.label}
            onClick={() => set({ size: o.label, customSize: "" })}
          />
        ))}
      </div>
      {cfg.size === "Custom" && (
        <div className="pt-1">
          <GhostInput
            value={cfg.customSize}
            onChange={(v) => set({ customSize: v })}
            placeholder="e.g. 7′ × 7′"
            className="w-full max-w-xs block"
          />
        </div>
      )}
    </div>
  );
}

function StepHeadboard({
  cfg,
  set,
}: {
  cfg: Config;
  set: (p: Partial<Config>) => void;
}) {
  return (
    <div className="space-y-8">
      <div>
        <SectionLabel hint="select all that apply">Style</SectionLabel>
        <div className="flex flex-wrap gap-2">
          {HEADBOARD_STYLES.map((s) => (
            <Chip
              key={s}
              label={s}
              selected={cfg.headboardStyles.includes(s)}
              onClick={() =>
                set({ headboardStyles: toggle(cfg.headboardStyles, s) })
              }
            />
          ))}
        </div>
        {cfg.headboardStyles.includes("Extended") && (
          <GhostInput
            value={cfg.headboardWidth}
            onChange={(v) => set({ headboardWidth: v })}
            placeholder="Width, e.g. 9′5″ or 10′"
            className="block w-full max-w-xs mt-4"
          />
        )}
      </div>

      <div>
        <SectionLabel>Panels</SectionLabel>
        <div className="flex flex-wrap gap-2">
          {HEADBOARD_PANELS.map((p) => (
            <Chip
              key={p}
              label={p}
              selected={cfg.headboardPanels === p}
              onClick={() => set({ headboardPanels: p })}
            />
          ))}
        </div>
      </div>

      <div>
        <SectionLabel>Height</SectionLabel>
        <div className="flex flex-wrap gap-2">
          {HEADBOARD_HEIGHTS.map((h) => (
            <Chip
              key={h.label}
              label={h.label}
              desc={h.desc}
              selected={cfg.headboardHeight === h.label}
              onClick={() =>
                set({ headboardHeight: h.label, headboardHeightCustom: "" })
              }
            />
          ))}
        </div>
        {cfg.headboardHeight === "High" && (
          <GhostInput
            value={cfg.headboardHeightCustom}
            onChange={(v) => set({ headboardHeightCustom: v })}
            placeholder="Height, e.g. 4′"
            className="block w-full max-w-xs mt-4"
          />
        )}
      </div>

      <div>
        <SectionLabel hint="select all that apply">Material</SectionLabel>
        <div className="flex flex-wrap gap-2">
          {HEADBOARD_MATERIALS.map((m) => (
            <Chip
              key={m}
              label={m}
              selected={cfg.headboardMaterials.includes(m)}
              onClick={() =>
                set({ headboardMaterials: toggle(cfg.headboardMaterials, m) })
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function StepFrame({
  cfg,
  set,
}: {
  cfg: Config;
  set: (p: Partial<Config>) => void;
}) {
  return (
    <div className="space-y-8">
      <div>
        <SectionLabel>Bed height</SectionLabel>
        <div className="flex flex-wrap gap-2">
          {BED_HEIGHTS.map((h) => (
            <Chip
              key={h.label}
              label={h.label}
              desc={h.desc}
              selected={cfg.bedHeight === h.label}
              onClick={() => set({ bedHeight: h.label })}
            />
          ))}
        </div>
      </div>

      <div>
        <SectionLabel hint="select all that apply">Base style</SectionLabel>
        <div className="flex flex-wrap gap-2">
          {BASE_STYLES.map((s) => (
            <Chip
              key={s}
              label={s}
              selected={cfg.baseStyles.includes(s)}
              onClick={() => set({ baseStyles: toggle(cfg.baseStyles, s) })}
            />
          ))}
        </div>
      </div>

      <div>
        <SectionLabel>Base material</SectionLabel>
        <div className="flex flex-wrap gap-2">
          {BASE_MATERIALS.map((m) => (
            <Chip
              key={m}
              label={m}
              selected={cfg.baseMaterial === m}
              onClick={() => set({ baseMaterial: m })}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function StepFeatures({
  cfg,
  set,
}: {
  cfg: Config;
  set: (p: Partial<Config>) => void;
}) {
  return (
    <div className="space-y-8">
      <div>
        <SectionLabel>Footboard detailing</SectionLabel>
        <div className="flex gap-2">
          <SelectCard
            label="No footboard"
            selected={cfg.footboard === "no"}
            onClick={() => set({ footboard: "no" })}
            wide
          />
          <SelectCard
            label="Yes, add footboard"
            selected={cfg.footboard === "yes"}
            onClick={() => set({ footboard: "yes" })}
            wide
          />
        </div>
      </div>

      <div>
        <SectionLabel>Storage</SectionLabel>
        <div className="flex flex-wrap gap-2">
          {STORAGE_OPTIONS.map((o) => (
            <Chip
              key={o.value}
              label={o.label}
              desc={o.desc}
              selected={cfg.storage === o.value}
              onClick={() => set({ storage: o.value })}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function StepColour({
  cfg,
  set,
}: {
  cfg: Config;
  set: (p: Partial<Config>) => void;
}) {
  return (
    <div className="space-y-5">
      <div className="flex gap-2.5">
        {COLOUR_OPTIONS.map((o) => (
          <SelectCard
            key={o.label}
            label={o.label}
            desc={o.desc}
            selected={cfg.colourType === o.label}
            onClick={() => set({ colourType: o.label, colourNotes: "" })}
            wide
          />
        ))}
      </div>
      {cfg.colourType === "Multiple colours" && (
        <GhostInput
          value={cfg.colourNotes}
          onChange={(v) => set({ colourNotes: v })}
          placeholder="Describe your colour combination or preferences"
          className="block w-full"
        />
      )}
    </div>
  );
}

function StepInspiration({
  cfg,
  set,
  inspoPhotos,
  roomPhotos,
  onInspoFiles,
  onRoomFiles,
  removeInspo,
  removeRoom,
}: {
  cfg: Config;
  set: (p: Partial<Config>) => void;
  inspoPhotos: { file: File; preview: string }[];
  roomPhotos: { file: File; preview: string }[];
  onInspoFiles: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRoomFiles: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeInspo: (i: number) => void;
  removeRoom: (i: number) => void;
}) {
  return (
    <div className="space-y-8">
      <div>
        <SectionLabel>Inspiration images</SectionLabel>
        <p className="text-xs text-muted-foreground/60 mb-4 leading-relaxed">
          Beds you love, Pinterest boards, magazine pages — up to 5 images.
        </p>
        <input
          id="inspo-input"
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={onInspoFiles}
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
                onClick={() => removeInspo(i)}
                className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-foreground text-background rounded-full text-xs flex items-center justify-center leading-none"
                aria-label="Remove"
              >
                ×
              </button>
            </div>
          ))}
          {inspoPhotos.length < 5 && (
            <label
              htmlFor="inspo-input"
              className="inline-flex items-center gap-2 cursor-pointer text-sm font-medium border border-border px-4 py-2.5 rounded-sm hover:bg-muted transition-colors"
            >
              <ImagePlus className="w-4 h-4" />
              Add photos
            </label>
          )}
        </div>
      </div>

      <div>
        <SectionLabel>Your room (optional)</SectionLabel>
        <p className="text-xs text-muted-foreground/60 mb-4 leading-relaxed">
          A photo or render of your bedroom — we&apos;ll visualise how the bed
          fits your space.
        </p>
        <input
          id="room-input"
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={onRoomFiles}
        />
        <div className="flex flex-wrap gap-2 items-center">
          {roomPhotos.map((p, i) => (
            <div key={p.preview} className="relative">
              <img
                src={p.preview}
                alt=""
                className="w-20 h-20 object-cover rounded-sm"
              />
              <button
                type="button"
                onClick={() => removeRoom(i)}
                className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-foreground text-background rounded-full text-xs flex items-center justify-center leading-none"
                aria-label="Remove"
              >
                ×
              </button>
            </div>
          ))}
          {roomPhotos.length < 3 && (
            <label
              htmlFor="room-input"
              className="inline-flex items-center gap-2 cursor-pointer text-sm font-medium border border-border px-4 py-2.5 rounded-sm hover:bg-muted transition-colors"
            >
              <ImagePlus className="w-4 h-4" />
              Add room photo
            </label>
          )}
        </div>
      </div>

      <div>
        <SectionLabel>Anything else?</SectionLabel>
        <textarea
          value={cfg.notes}
          onChange={(e) => set({ notes: e.target.value })}
          rows={3}
          maxLength={2000}
          placeholder="Room dimensions, style preferences, that one bed you saw in a hotel once…"
          className="w-full bg-transparent border-b border-border/50 py-3 text-sm resize-none focus:outline-none focus:border-foreground/40 transition-colors duration-300 placeholder:text-muted-foreground/40"
        />
      </div>
    </div>
  );
}

function StepDetails({
  cfg,
  set,
}: {
  cfg: Config;
  set: (p: Partial<Config>) => void;
}) {
  return (
    <div className="space-y-6 max-w-sm">
      <div>
        <GhostInput
          value={cfg.name}
          onChange={(v) => set({ name: v })}
          placeholder="Full name"
          className="block w-full"
        />
      </div>
      <div>
        <GhostInput
          value={cfg.email}
          onChange={(v) => set({ email: v })}
          placeholder="Email address"
          className="block w-full"
        />
      </div>
      <div>
        <GhostInput
          value={cfg.phone}
          onChange={(v) => set({ phone: v })}
          placeholder="Phone number (optional)"
          className="block w-full"
        />
      </div>
    </div>
  );
}

/* ─── Progress bar ───────────────────────────────────── */
function ProgressBar({ current }: { current: number }) {
  return (
    <div className="mb-10 sm:mb-12">
      <div className="flex gap-1 mb-3">
        {Array.from({ length: TOTAL }).map((_, i) => (
          <div
            key={i}
            className={`h-[2px] flex-1 rounded-full transition-all duration-500 ease-out ${
              i <= current ? "bg-foreground" : "bg-border"
            }`}
          />
        ))}
      </div>
      <div className="flex justify-between items-center">
        <span className="text-[10px] text-muted-foreground/40 font-medium uppercase tracking-[0.18em]">
          Step {current + 1} of {TOTAL}
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground/60">
          {STEP_META[current].label}
        </span>
      </div>
    </div>
  );
}

/* ─── Live summary (left panel) ──────────────────────── */
function LiveSummary({ cfg }: { cfg: Config }) {
  const rows: [string, string][] = [];
  if (cfg.size)
    rows.push([
      "Size",
      cfg.size === "Custom" && cfg.customSize ? cfg.customSize : cfg.size,
    ]);
  if (cfg.headboardStyles.length)
    rows.push(["Headboard", cfg.headboardStyles.join(", ")]);
  if (cfg.headboardMaterials.length)
    rows.push(["Material", cfg.headboardMaterials.join(", ")]);
  if (cfg.bedHeight) rows.push(["Bed height", cfg.bedHeight]);
  if (cfg.baseStyles.length) rows.push(["Base", cfg.baseStyles.join(", ")]);
  if (cfg.baseMaterial) rows.push(["Base material", cfg.baseMaterial]);
  if (cfg.storage)
    rows.push([
      "Storage",
      cfg.storage === "none"
        ? "None"
        : cfg.storage === "liftup"
          ? "Hydraulic lift-up"
          : "Hydraulic remote",
    ]);
  if (cfg.colourType) rows.push(["Colour", cfg.colourType]);
  if (!rows.length) return null;
  return (
    <div className="mt-7 pt-6 border-t border-border/30">
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/40 mb-4">
        Your selection
      </p>
      <div className="space-y-3">
        {rows.map(([label, value]) => (
          <div
            key={label}
            className="flex justify-between items-baseline gap-4 text-xs"
          >
            <span className="text-muted-foreground/60 shrink-0">{label}</span>
            <span className="text-foreground/75 text-right leading-relaxed">
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Success screen ─────────────────────────────────── */
function SuccessScreen({
  cfg,
  onReset,
}: {
  cfg: Config;
  onReset: () => void;
}) {
  const summaryRows: [string, string][] = [
    ["Size", cfg.size === "Custom" ? cfg.customSize || "Custom" : cfg.size || "—"],
    ["Headboard", cfg.headboardStyles.join(", ") || "—"],
    ["Material", cfg.headboardMaterials.join(", ") || "—"],
    ["Bed height", cfg.bedHeight || "—"],
    ["Base style", cfg.baseStyles.join(", ") || "—"],
    ["Base material", cfg.baseMaterial || "—"],
    ["Footboard", cfg.footboard === "yes" ? "Yes" : cfg.footboard === "no" ? "No" : "—"],
    [
      "Storage",
      cfg.storage === "none"
        ? "None"
        : cfg.storage === "liftup"
          ? "Hydraulic lift-up"
          : cfg.storage === "remote"
            ? "Hydraulic remote"
            : "—",
    ],
    ["Colour", cfg.colourType || "—"],
  ].filter(([, v]) => v && v !== "—") as [string, string][];

  return (
    <div className="max-w-5xl mx-auto">
      <div className="max-w-4xl mx-auto py-8 text-center mb-16 animate-fade-up">
        <p className="label-uppercase mb-6 tracking-[0.3em]">We got it</p>
        <h2 className="font-heading text-3xl md:text-5xl font-medium tracking-tight mb-4">
          Thanks, {cfg.name}
        </h2>
        <p className="text-muted-foreground text-sm max-w-md mx-auto">
          We&apos;ll review your configuration and get back to you within a
          couple of days with a detailed quote.
        </p>
      </div>

      <div
        className="relative overflow-hidden mb-12 sm:mb-16 animate-fade-up rounded-sm"
        style={{ animationDelay: "0.1s" }}
      >
        <div className="relative aspect-[4/5] sm:aspect-[16/9] md:aspect-[21/9] min-h-[16rem]">
          <Image
            src={images.configDefault}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1024px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/30 sm:from-black/85 sm:via-black/40 md:bg-gradient-to-r md:from-black/80 md:via-black/45 md:to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-end md:justify-center md:items-stretch p-5 sm:p-8 md:px-14 md:py-10">
            <div className="max-w-lg w-full">
              <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.3em] text-primary-foreground/75 mb-3 sm:mb-4">
                Experience center
              </p>
              <h3 className="font-heading text-xl sm:text-2xl md:text-4xl font-medium text-primary-foreground mb-3 sm:mb-4 leading-tight">
                Visit us in Hyderabad
              </h3>
              <p className="text-primary-foreground/80 text-sm mb-4 sm:mb-6 leading-relaxed max-w-sm">
                See the materials and craftsmanship in person at our experience
                center.
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
            d: "You'll hear from us within a couple of days with pricing and any questions.",
          },
          {
            t: "We talk it through",
            d: "A quick call to finalise materials, sizing, and any special requests.",
          },
          {
            t: "We build and deliver",
            d: "Your bed is handcrafted and delivered to your home in 2–3 weeks.",
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

      {summaryRows.length > 0 && (
        <div
          className="max-w-sm mx-auto mb-16 animate-fade-up space-y-3"
          style={{ animationDelay: "0.3s" }}
        >
          <p className="label-uppercase mb-6 text-center tracking-[0.3em]">
            Your Configuration
          </p>
          {summaryRows.map(([label, value]) => (
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
      )}

      <div className="text-center">
        <button
          type="button"
          onClick={onReset}
          className="text-xs text-muted-foreground/50 tracking-wide hover:text-foreground transition-colors duration-300"
        >
          Start new configuration →
        </button>
      </div>
    </div>
  );
}

/* ─── Main export ────────────────────────────────────── */
export function ConfiguratorSection() {
  const [step, setStep] = useState(0);
  const [cfg, setCfg] = useState<Config>(DEFAULT);
  const [inspoPhotos, setInspoPhotos] = useState<
    { file: File; preview: string }[]
  >([]);
  const [roomPhotos, setRoomPhotos] = useState<
    { file: File; preview: string }[]
  >([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const set = (patch: Partial<Config>) => setCfg((c) => ({ ...c, ...patch }));
  const currentImage = previewImage(cfg);

  /* file helpers */
  function makeHandler(
    setter: React.Dispatch<
      React.SetStateAction<{ file: File; preview: string }[]>
    >,
    max: number
  ) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files?.length) return;
      setter((prev) => {
        const next = [...prev];
        for (let i = 0; i < files.length && next.length < max; i++) {
          const f = files[i];
          if (f.size > 10 * 1024 * 1024) {
            toast.error("Each image must be 10 MB or less.");
            continue;
          }
          if (!f.type.startsWith("image/")) continue;
          next.push({ file: f, preview: URL.createObjectURL(f) });
        }
        return next;
      });
      e.target.value = "";
    };
  }

  function removePhoto(
    setter: React.Dispatch<
      React.SetStateAction<{ file: File; preview: string }[]>
    >,
    index: number
  ) {
    setter((prev) => {
      const copy = [...prev];
      const [r] = copy.splice(index, 1);
      if (r) URL.revokeObjectURL(r.preview);
      return copy;
    });
  }

  /* submit */
  const submit = () => {
    if (!cfg.name.trim()) {
      toast.error("Please enter your full name.");
      return;
    }
    if (!emailOk(cfg.email)) {
      toast.error("Please enter a valid email address.");
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
    setCfg(DEFAULT);
    setInspoPhotos([]);
    setRoomPhotos([]);
    setStep(0);
  };

  if (submitted) return <SuccessScreen cfg={cfg} onReset={reset} />;

  const isFirst = step === 0;
  const isLast = step === TOTAL - 1;

  return (
    <>
      {/* Page heading */}
      <div className="max-w-5xl mx-auto mb-12 md:mb-20">
        <p className="label-uppercase mb-4 tracking-[0.3em]">Build Yours</p>
        <h2 className="font-heading text-3xl md:text-5xl font-medium tracking-tight">
          Let&apos;s figure out what you want
        </h2>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-0 lg:gap-24">
        {/* ── Left: sticky image + live summary ── */}
        <div className="hidden lg:block lg:sticky lg:top-32 lg:self-start">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm">
            <Image
              src={currentImage}
              alt=""
              fill
              className="object-cover transition-opacity duration-700"
              sizes="(max-width: 1024px) 0px, 40vw"
              priority
            />
          </div>
          <p className="text-[11px] text-muted-foreground/40 mt-3.5 tracking-wide">
            Preview updates as you configure
          </p>
          <LiveSummary cfg={cfg} />
        </div>

        {/* ── Right: stepped wizard ── */}
        <div>
          <ProgressBar current={step} />

          {/* Animated step content */}
          <div key={step} className="animate-fade-up">
            {/* Step heading */}
            <div className="mb-8 sm:mb-10">
              <h3 className="font-heading text-2xl sm:text-[1.75rem] font-medium tracking-tight leading-tight mb-2">
                {STEP_META[step].question}
              </h3>
              <p className="text-sm text-muted-foreground/70">
                {STEP_META[step].instruction}
              </p>
            </div>

            {/* Step body */}
            {step === 0 && <StepSize cfg={cfg} set={set} />}
            {step === 1 && <StepHeadboard cfg={cfg} set={set} />}
            {step === 2 && <StepFrame cfg={cfg} set={set} />}
            {step === 3 && <StepFeatures cfg={cfg} set={set} />}
            {step === 4 && <StepColour cfg={cfg} set={set} />}
            {step === 5 && (
              <StepInspiration
                cfg={cfg}
                set={set}
                inspoPhotos={inspoPhotos}
                roomPhotos={roomPhotos}
                onInspoFiles={makeHandler(setInspoPhotos, 5)}
                onRoomFiles={makeHandler(setRoomPhotos, 3)}
                removeInspo={(i) => removePhoto(setInspoPhotos, i)}
                removeRoom={(i) => removePhoto(setRoomPhotos, i)}
              />
            )}
            {step === 6 && <StepDetails cfg={cfg} set={set} />}
          </div>

          {/* Navigation */}
          <div className="flex items-center mt-12 pt-8 border-t border-border/30">
            {!isFirst ? (
              <button
                type="button"
                onClick={() => setStep((s) => s - 1)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 mr-auto"
              >
                ← Back
              </button>
            ) : (
              <div className="mr-auto" />
            )}

            {isLast ? (
              <button
                type="button"
                onClick={submit}
                disabled={submitting}
                className="bg-foreground text-background px-8 py-3.5 text-xs font-medium uppercase tracking-[0.25em] hover:opacity-80 transition-all duration-300 disabled:opacity-30 rounded-sm"
              >
                {submitting ? "Submitting…" : "Request Quotation"}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setStep((s) => s + 1)}
                className="bg-foreground text-background px-8 py-3.5 text-xs font-medium uppercase tracking-[0.25em] hover:opacity-80 transition-all duration-300 rounded-sm"
              >
                Continue →
              </button>
            )}
          </div>

          {/* Mobile: small image + summary after nav */}
          <div className="lg:hidden mt-10">
            <div className="relative aspect-video w-full overflow-hidden rounded-sm">
              <Image
                src={currentImage}
                alt=""
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>
            <LiveSummary cfg={cfg} />
          </div>
        </div>
      </div>
    </>
  );
}
