import { images } from "@/lib/images";

/**
 * Files in `public/images/hero/`. URL-encoded for names with spaces or special chars.
 */
/** Add/remove filenames to match `public/images/hero/`. If empty, `images.heroBed` is used. */
const heroImageFiles: string[] = [
  "00SJ0130-copy-min-1536x2048.jpeg",
  "00SJ0149-1-copy-min-1536x2048 (1).jpeg",
  "04c780af-7a33-4712-ae64-6a72fc8bfc6c-1.jpg",
];

function toPublicPath(file: string) {
  return `/images/hero/${encodeURIComponent(file)}`;
}

export const heroImageSources: string[] =
  heroImageFiles.length > 0
    ? heroImageFiles.map((f) => toPublicPath(f))
    : [images.heroBed];
