/** Contact & location — aligned with https://vaivibeds.com/ and Google Maps listing */

export const SITE = {
  name: "Vaivi Beds",
  tagline: "Handcrafted luxury beds in India",
  email: "vaivibeds@gmail.com",
  phone: "9959962532",
  phoneHref: "tel:+919959962532",
  /** Display + structured address (matches Maps / contact page) */
  addressLines: [
    "6th Floor, Urmila Heights",
    "Road No. 10, Banjara Hills",
    "Hyderabad, Telangana 500034",
    "India",
  ] as const,
  /** Single-line for map search / links */
  addressSingleLine:
    "6th Floor, Urmila Heights, Road No. 10, Banjara Hills, Hyderabad, Telangana 500034, India",
  experienceCenter:
    "Experience Center — 6th Floor, Urmila Heights, Road No. 10, Banjara Hills, Hyderabad, Telangana 500034, India",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Vaivi+Beds+Urmila+Heights+Banjara+Hills+Hyderabad+500034",
} as const;

/** Google Maps embed (no API key) — query search centered on the showroom */
export function getMapsEmbedSrc(): string {
  const q = encodeURIComponent(SITE.addressSingleLine);
  return `https://maps.google.com/maps?q=${q}&hl=en&z=16&output=embed`;
}
