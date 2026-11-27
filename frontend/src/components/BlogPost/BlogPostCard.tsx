import { ArrowRight, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "@/interfaces/blog";
import { getStrapiMedia } from "@/utils/image";

export interface BlogPostCardProps {
  post: BlogPost;
  headingAs?: "h2" | "h3";
  priority?: boolean;
}

function getPostCoverUrl(post: BlogPost): string {
  const rawUrl =
    post.image?.formats?.medium?.url ||
    post.image?.formats?.large?.url ||
    post.image?.formats?.small?.url ||
    post.image?.url ||
    null;

  return getStrapiMedia(rawUrl);
}

function formatPostDate(dateInput?: string): string {
  if (!dateInput) return "";
  const parsed = new Date(dateInput);
  if (Number.isNaN(parsed.getTime())) return "";

  return parsed.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

function getAuthorInitial(name?: string): string {
  const trimmed = name?.trim();
  return trimmed ? trimmed.charAt(0).toUpperCase() : "F";
}

export default function BlogPostCard({
  post,
  headingAs = "h3",
  priority = false,
}: BlogPostCardProps) {
  const HeadingTag = headingAs;
  const coverUrl = getPostCoverUrl(post);
  const rawDate = post.createdAt || post.publishedAt;
  const formattedDate = formatPostDate(rawDate);
  const authorName = post.author?.name?.trim() || "FitWay Editorial";
  const authorSlug = post.author?.slug?.trim();
  const categoryName = post.category?.name?.trim();
  const categorySlug = post.category?.slug?.trim();
  const authorPhotoUrl = post.author?.photo?.url
    ? getStrapiMedia(post.author.photo.url)
    : null;

  const avatarNode = authorPhotoUrl ? (
    <div
      className="relative w-9 h-9 rounded-full overflow-hidden shrink-0 border border-white/15 hover:border-[#FF8C00]/70 transition-colors bg-[#1B2B3B]"
      aria-hidden="true"
    >
      <Image
        src={authorPhotoUrl}
        alt=""
        fill
        sizes="36px"
        className="object-cover"
      />
    </div>
  ) : (
    <div
      className="w-9 h-9 rounded-full shrink-0 border border-[#FF8C00]/30 hover:border-[#FF8C00]/70 bg-[#FF8C00]/15 text-[#FF8C00] font-bold text-xs flex items-center justify-center transition-colors"
      aria-hidden="true"
    >
      {getAuthorInitial(authorName)}
    </div>
  );

  return (
    <article className="group relative h-full flex flex-col rounded-[2rem] bg-[#243447] border border-white/10 hover:border-[#FF8C00]/40 overflow-hidden shadow-[0_12px_36px_rgba(0,0,0,0.22)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.38)] transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1.5 transform-gpu">
      {/* Edge-to-Edge Cover Image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#243447]">
        <Image
          src={coverUrl}
          alt={post.title}
          fill
          priority={priority}
          sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
          className="object-cover scale-[1.01] group-hover:scale-[1.06] transition-transform duration-500 ease-out transform-gpu"
        />

        {/* Bottom Scrim Blending Seamlessly Into #243447 Card Surface (1px overbleed prevents subpixel hover seams) */}
        <div
          className="absolute -inset-px bg-gradient-to-t from-[#243447] via-[#243447]/20 to-black/25 pointer-events-none"
          aria-hidden="true"
        />

        {/* Floating Glassmorphic Category & Read-Time Pills */}
        <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between gap-2 pointer-events-none">
          {categoryName ? (
            categorySlug ? (
              <Link
                href={`/blog/category/${categorySlug}`}
                aria-label={`View all ${categoryName} posts`}
                className="pointer-events-auto relative inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1B2B3B]/85 hover:bg-[#1B2B3B] backdrop-blur-md border border-white/15 hover:border-[#FF8C00]/60 text-[#FF8C00] text-xs font-semibold tracking-wide shadow-sm min-w-0 max-w-[65%] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF8C00]"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full bg-[#FF8C00] shrink-0"
                  aria-hidden="true"
                />
                <span className="truncate">{categoryName}</span>
              </Link>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1B2B3B]/85 backdrop-blur-md border border-white/15 text-[#FF8C00] text-xs font-semibold tracking-wide shadow-sm min-w-0 max-w-[65%]">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-[#FF8C00] shrink-0"
                  aria-hidden="true"
                />
                <span className="truncate">{categoryName}</span>
              </span>
            )
          ) : (
            <span aria-hidden="true" />
          )}

          {post.readTime && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#1B2B3B]/85 backdrop-blur-md border border-white/15 text-gray-200 text-xs font-medium shrink-0 shadow-sm">
              <Clock
                className="h-3.5 w-3.5 text-[#FF8C00] shrink-0"
                aria-hidden="true"
              />
              <span>{post.readTime}</span>
            </span>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 sm:p-7 flex flex-col flex-grow bg-[#243447]">
        <HeadingTag className="text-lg sm:text-xl font-bold text-white leading-snug mb-3 line-clamp-2 group-hover:text-[#FF8C00] transition-colors duration-200 text-pretty">
          <Link
            href={`/blog/${post.slug}`}
            className="focus:outline-none after:absolute after:inset-0 after:z-10 after:rounded-[2rem] focus-visible:after:ring-2 focus-visible:after:ring-[#FF8C00] focus-visible:after:ring-inset"
          >
            {post.title}
          </Link>
        </HeadingTag>

        <p className="text-sm text-gray-300 leading-relaxed line-clamp-3 mb-6 flex-grow">
          {post.excerpt}
        </p>

        {/* Grounded Editorial Footer */}
        <div className="border-t border-white/10 pt-4 mt-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            {authorSlug ? (
              <Link
                href={`/authors/${authorSlug}`}
                tabIndex={-1}
                aria-hidden="true"
                className="relative z-20 shrink-0 rounded-full"
              >
                {avatarNode}
              </Link>
            ) : (
              avatarNode
            )}

            <div className="flex flex-col min-w-0">
              {authorSlug ? (
                <Link
                  href={`/authors/${authorSlug}`}
                  title={`View author profile: ${authorName}`}
                  className="relative z-20 text-xs sm:text-sm font-semibold text-gray-200 hover:text-[#FF8C00] transition-colors truncate rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF8C00]"
                >
                  {authorName}
                </Link>
              ) : (
                <span className="text-xs sm:text-sm font-semibold text-gray-200 truncate">
                  {authorName}
                </span>
              )}
              {formattedDate && (
                <time
                  dateTime={rawDate}
                  className="text-xs text-gray-400 tabular-nums truncate"
                >
                  {formattedDate}
                </time>
              )}
            </div>
          </div>

          <span className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 group-hover:bg-[#C25700] border border-white/10 group-hover:border-[#C25700] text-gray-200 group-hover:text-white text-xs font-semibold transition-colors duration-200">
            <span>Read</span>
            <ArrowRight
              className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </span>
        </div>
      </div>
    </article>
  );
}
