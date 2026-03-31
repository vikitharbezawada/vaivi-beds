import { images } from "@/lib/images";
import {
  cloudinaryImage,
  parseImageEnvList,
} from "@/lib/cloudinary";

/**
 * Public IDs: everything after `/image/upload/` in Cloudinary’s “Copy URL”.
 * Order is preserved before shuffle; short lists are cycled to fill the grid.
 */
const GALLERY_CLOUDINARY_PUBLIC_IDS: string[] = [
  "v1774917741/12110e9e-019c-45d7-93a7-43952f2d1959-1_qeqrsp.jpg",
  "v1774917745/00SJ0121-copy-min-scaled_ghwuxr.jpg",
  "v1774917737/443e05f9-51b1-4fd3-b0c5-a8ae58a20240_ypl0hn.jpg",
  "v1774917733/9c760327-152c-4b87-88d3-353965e6f0fa_sc1uwk.jpg",
  "v1774917728/8e74fa20-16cf-48e3-adea-07b7cefdc902-2_cqcj9v.jpg",
  "v1774917724/8aa3c5ac-13b4-4632-bc49-45d0863ac16e-1_lpiutu.jpg",
  "v1774917720/04c780af-7a33-4712-ae64-6a72fc8bfc6c-1_vagzh5.jpg",
  "v1774917716/00SJ4622-copy-2-min-scaled_vxe5gs.jpg",
  "v1774917710/00SJ4580-2-min-2-scaled_b7bwte.jpg",
  "v1774917706/00SJ4560-2-min-1536x2048_wkvttz.jpg",
  "v1774917701/00SJ0149-1-copy-min-1536x2048_lhx4si.jpg",
  "v1774917676/00SJ0130-copy-min-1536x2048_mdslxc.jpg",
  "v1774917646/00SJ0121-copy-min-scaled_ytz2dq.jpg",
];

const GALLERY_LOCAL_FILENAMES = [
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

function localGalleryPaths(): string[] {
  return GALLERY_LOCAL_FILENAMES.map(
    (f) => `/images/gallery/${encodeURIComponent(f)}`,
  );
}

function galleryUnsplashFallback(): string[] {
  const base = images.heroBed;
  return GALLERY_LOCAL_FILENAMES.map((_, i) => `${base}&gallery=${i}`);
}

function defaultGalleryCloudinaryUrls(): string[] {
  return GALLERY_CLOUDINARY_PUBLIC_IDS.map((id) => cloudinaryImage(id));
}

const envUrls = parseImageEnvList(process.env.NEXT_PUBLIC_GALLERY_IMAGE_URLS);
const envPublicIds = parseImageEnvList(
  process.env.NEXT_PUBLIC_CLOUDINARY_GALLERY_PUBLIC_IDS,
);

const useLocalImages =
  process.env.NEXT_PUBLIC_USE_LOCAL_IMAGES === "1" ||
  process.env.NEXT_PUBLIC_USE_LOCAL_IMAGES === "true";

const useUnsplashFallback =
  process.env.NEXT_PUBLIC_USE_UNSPLASH_IMAGE_FALLBACK === "1" ||
  process.env.NEXT_PUBLIC_USE_UNSPLASH_IMAGE_FALLBACK === "true";

const galleryImageUrls: readonly string[] =
  envUrls.length > 0
    ? envUrls
    : envPublicIds.length > 0
      ? envPublicIds.map((id) => cloudinaryImage(id))
      : useLocalImages
        ? localGalleryPaths()
        : useUnsplashFallback
          ? galleryUnsplashFallback()
          : defaultGalleryCloudinaryUrls();

/** Bump this integer to reshuffle layout (duplicates allowed; keys are per-cell). */
const GALLERY_SHUFFLE_SEED = 582_913;

export type GalleryGridItem = {
  /** Stable React key (same `src` may repeat). */
  key: string;
  src: string;
  span: string;
  aspect: string;
};

/** Fisher–Yates with a seeded PRNG — same seed ⇒ same order (SSR/client match). */
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

const LAYOUT_SLOTS: Omit<GalleryGridItem, "key" | "src">[] = [
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
  { span: "col-span-1 row-span-1", aspect: "aspect-square" },
];

const shuffledSrcs = shuffleDeterministic(
  [...galleryImageUrls],
  GALLERY_SHUFFLE_SEED,
);
const count = Math.min(shuffledSrcs.length, LAYOUT_SLOTS.length);

export const galleryGridItems: GalleryGridItem[] = Array.from(
  { length: count },
  (_, i) => ({
    key: `gallery-${i}`,
    src: shuffledSrcs[i],
    span: LAYOUT_SLOTS[i].span,
    aspect: LAYOUT_SLOTS[i].aspect,
  }),
);
