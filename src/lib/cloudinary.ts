/** Your Cloudinary cloud name (subdomain in delivery URLs). */
export const CLOUDINARY_CLOUD_NAME = "dziaauvme";

/** Parse `NEXT_PUBLIC_*` lists: comma, newline, or pipe separated. */
export function parseImageEnvList(raw: string | undefined | null): string[] {
  if (raw == null) return [];
  const s = String(raw).trim();
  if (!s) return [];
  return s
    .split(/[\n|,]+/)
    .map((x) => x.trim())
    .filter(Boolean);
}

/**
 * Default transforms so originals are not huge (helps Next dev + avoids slow downloads).
 * Placed after `upload/` and before the version/public_id path.
 */
const DEFAULT_UPLOAD_TRANSFORM = "f_auto,q_auto,c_limit,w_1920";

/**
 * Image delivery URL. Pass the public ID path — everything after `/image/upload/`
 * in the Cloudinary console (e.g. `v123/file.jpg`).
 */
export function cloudinaryImage(publicId: string) {
  const trimmed = publicId.replace(/^\/+/, "");
  const encoded = trimmed
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${DEFAULT_UPLOAD_TRANSFORM}/${encoded}`;
}
