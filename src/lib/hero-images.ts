import { images } from "@/lib/images";
import { cloudinaryImage, parseImageEnvList } from "@/lib/cloudinary";

/**
 * Public IDs: everything after `/image/upload/` in Cloudinary’s “Copy URL”.
 */
const HERO_CLOUDINARY_PUBLIC_IDS: string[] = [
  "v1774917856/04c780af-7a33-4712-ae64-6a72fc8bfc6c-1_xu2usa.jpg",
  "v1774917852/00SJ0149-1-copy-min-1536x2048_1_orohm2.jpg",
  "v1774917843/00SJ0130-copy-min-1536x2048_o3de4p.jpg",
];

const HERO_SLIDE_COUNT = 3;

/** Legacy local filenames under `public/images/hero/` (dev only). */
const heroLocalFiles = [
  "00SJ0130-copy-min-1536x2048.jpeg",
  "00SJ0149-1-copy-min-1536x2048 (1).jpeg",
  "04c780af-7a33-4712-ae64-6a72fc8bfc6c-1.jpg",
];

function localHeroPaths(): string[] {
  return heroLocalFiles.map((f) => `/images/hero/${encodeURIComponent(f)}`);
}

function heroUnsplashFallback(): string[] {
  const base = images.heroBed;
  return [`${base}&slide=0`, `${base}&slide=1`, `${base}&slide=2`];
}

function defaultHeroCloudinaryUrls(): string[] {
  const urls = HERO_CLOUDINARY_PUBLIC_IDS.map((id) => cloudinaryImage(id));
  return Array.from(
    { length: HERO_SLIDE_COUNT },
    (_, i) => urls[i % urls.length],
  );
}

const envUrls = parseImageEnvList(process.env.NEXT_PUBLIC_HERO_IMAGE_URLS);
const envPublicIds = parseImageEnvList(
  process.env.NEXT_PUBLIC_CLOUDINARY_HERO_PUBLIC_IDS,
);

const useLocalImages =
  process.env.NEXT_PUBLIC_USE_LOCAL_IMAGES === "1" ||
  process.env.NEXT_PUBLIC_USE_LOCAL_IMAGES === "true";

const useUnsplashFallback =
  process.env.NEXT_PUBLIC_USE_UNSPLASH_IMAGE_FALLBACK === "1" ||
  process.env.NEXT_PUBLIC_USE_UNSPLASH_IMAGE_FALLBACK === "true";

/**
 * 1. `NEXT_PUBLIC_HERO_IMAGE_URLS`
 * 2. `NEXT_PUBLIC_CLOUDINARY_HERO_PUBLIC_IDS`
 * 3. Else: `HERO_CLOUDINARY_PUBLIC_IDS` (cycled to 3 slides)
 * 4. `NEXT_PUBLIC_USE_LOCAL_IMAGES`
 * 5. `NEXT_PUBLIC_USE_UNSPLASH_IMAGE_FALLBACK`
 */
export const heroImageSources: string[] =
  envUrls.length > 0
    ? envUrls
    : envPublicIds.length > 0
      ? envPublicIds.map((id) => cloudinaryImage(id))
      : useLocalImages
        ? localHeroPaths()
        : useUnsplashFallback
          ? heroUnsplashFallback()
          : defaultHeroCloudinaryUrls();
