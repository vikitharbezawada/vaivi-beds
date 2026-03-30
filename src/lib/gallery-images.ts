/**
 * Files in `public/images/gallery/` — add or remove entries when the folder changes.
 * Paths are served from the site root (`/images/gallery/...`).
 *
 * Order on the grid is shuffled (deterministic). Change `GALLERY_SHUFFLE_SEED` for a different mix.
 */
export const galleryImageFiles = [
  "00SJ0121-copy-min-scaled.jpeg",
  "00SJ0130-copy-min-1536x2048.jpeg",
  "00SJ0149-1-copy-min-1536x2048.jpeg",
  "00SJ4560-2-min-1536x2048.jpg",
  "00SJ4580-2-min-2-scaled.jpeg",
  "00SJ4622-copy-2-min-scaled.jpeg",
  "04c780af-7a33-4712-ae64-6a72fc8bfc6c-1.jpg",
  "12110e9e-019c-45d7-93a7-43952f2d1959-1.jpg",
  "443e05f9-51b1-4fd3-b0c5-a8ae58a20240.jpg",
  "8aa3c5ac-13b4-4632-bc49-45d0863ac16e-1.jpg",
  "8e74fa20-16cf-48e3-adea-07b7cefdc902-2.jpg",
  "9c760327-152c-4b87-88d3-353965e6f0fa.jpg",
] as const;

/** Bump this integer to reshuffle which photo lands in each tile (no duplicates). */
const GALLERY_SHUFFLE_SEED = 582_913;

const base = "/images/gallery";

export type GalleryGridItem = {
  src: string;
  span: string;
  aspect: string;
};

function uniqueFilenames(files: readonly string[]): string[] {
  return [...new Set(files)];
}

/** Fisher–Yates with a seeded PRNG — same seed ⇒ same order (SSR/client match), no repeats. */
function shuffleDeterministic<T>(items: T[], seed: number): T[] {
  const arr = [...items];
  let s = seed >>> 0;
  const rnd = () => {
    s = (1664525 * s + 1013904223) >>> 0;
    return s / 0xffff_ffff;
  };
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/** Visual slots (bento + trailing squares); paired 1:1 with shuffled unique files. */
const LAYOUT_SLOTS: Omit<GalleryGridItem, "src">[] = [
  {
    span: "col-span-1 md:col-span-2 row-span-2",
    aspect: "aspect-[16/10]",
  },
  { span: "col-span-1 row-span-1", aspect: "aspect-square" },
  { span: "col-span-1 row-span-2", aspect: "aspect-[2/3]" },
  { span: "col-span-1 row-span-1", aspect: "aspect-square" },
  { span: "col-span-1 row-span-1", aspect: "aspect-square" },
  {
    span: "col-span-1 md:col-span-2 row-span-1",
    aspect: "aspect-[16/9]",
  },
  { span: "col-span-1 row-span-1", aspect: "aspect-square" },
  { span: "col-span-1 row-span-1", aspect: "aspect-square" },
  { span: "col-span-1 row-span-1", aspect: "aspect-square" },
  { span: "col-span-1 row-span-1", aspect: "aspect-square" },
  { span: "col-span-1 row-span-1", aspect: "aspect-square" },
  { span: "col-span-1 row-span-1", aspect: "aspect-square" },
];

const uniqueFiles = uniqueFilenames(galleryImageFiles);
const shuffledFiles = shuffleDeterministic(uniqueFiles, GALLERY_SHUFFLE_SEED);
const count = Math.min(shuffledFiles.length, LAYOUT_SLOTS.length);

export const galleryGridItems: GalleryGridItem[] = Array.from(
  { length: count },
  (_, i) => ({
    src: `${base}/${shuffledFiles[i]}`,
    span: LAYOUT_SLOTS[i].span,
    aspect: LAYOUT_SLOTS[i].aspect,
  }),
);
