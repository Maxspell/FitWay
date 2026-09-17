const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "https://api.fitway.best";

export function getStrapiMedia(url: string | undefined) {
  if (!url) return "";
  if (url.startsWith("http") || url.startsWith("//")) return url;
  return `${STRAPI_URL}${url.startsWith("/") ? "" : "/"}${url}`;
}
