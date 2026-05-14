export const getStrapiMedia = (url: string | null) => {
  if (url == null) {
    return "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80"; // Fitness placeholder
  }

  // Return the full URL if it's already absolute
  if (url.startsWith("http") || url.startsWith("//")) {
    return url;
  }

  // Otherwise, prepend the Strapi URL
  return `${process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"}${url}`;
};

export const getPostImage = (post: any, format: "large" | "medium" | "small" | "thumbnail" = "large") => {
  if (!post.image) return "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80";

  const formats = post.image.formats;
  if (!formats) return getStrapiMedia(post.image.url);

  // Try the requested format, then fallback to others
  const selectedFormat = formats[format] || formats.large || formats.medium || formats.small || formats.thumbnail;
  
  if (selectedFormat && selectedFormat.url) {
    return getStrapiMedia(selectedFormat.url);
  }

  return getStrapiMedia(post.image.url);
};
