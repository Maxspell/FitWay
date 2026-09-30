import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath?: string; // defaults to '/blog'
  queryParams?: Record<string, string | undefined>;
}

export default function Pagination({
  currentPage,
  totalPages,
  basePath = "/blog",
  queryParams = {},
}: PaginationProps) {
  if (totalPages <= 1) return null;

  // Build page link preserving clean SEO URLs
  // Page 1 -> /workouts (or /workouts?category=weight-loss)
  // Page N -> /workouts/page/N (or /workouts/page/N?category=weight-loss)
  const getPageUrl = (page: number) => {
    const cleanBase = basePath.endsWith("/") ? basePath.slice(0, -1) : basePath;
    const path = page <= 1 ? (cleanBase === "" ? "/" : cleanBase) : `${cleanBase}/page/${page}`;

    const searchParams = new URLSearchParams();
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value && value !== "all") {
        searchParams.set(key, value);
      }
    });

    const queryString = searchParams.toString();
    return queryString ? `${path}?${queryString}` : path;
  };

  // Generate page numbers with ellipses (e.g., 1 ... 4 5 6 ... 10)
  const getPageNumbers = () => {
    const pages: (number | "dots")[] = [];
    const delta = 1; // how many pages around current page to show

    const left = Math.max(2, currentPage - delta);
    const right = Math.min(totalPages - 1, currentPage + delta);

    pages.push(1);

    if (left > 2) {
      pages.push("dots");
    }

    for (let i = left; i <= right; i++) {
      pages.push(i);
    }

    if (right < totalPages - 1) {
      pages.push("dots");
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = getPageNumbers();
  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  return (
    <nav
      role="navigation"
      aria-label="Blog Pagination"
      className="mt-14 mb-4 flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-6 rounded-2xl bg-[#243447]/60 border border-white/10 backdrop-blur-md shadow-lg"
    >
      {/* Previous Page Button */}
      <div className="w-full sm:w-auto flex justify-start">
        {hasPrev ? (
          <Link
            href={getPageUrl(currentPage - 1)}
            rel="prev"
            aria-label="Go to previous page"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white/90 bg-white/5 border border-white/10 hover:border-[#FF8C00]/50 hover:bg-[#FF8C00]/10 hover:text-[#FF8C00] transition-all duration-300 shadow-sm group"
          >
            <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5 text-[#FF8C00]" />
            <span>Previous</span>
          </Link>
        ) : (
          <span
            aria-disabled="true"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white/30 bg-white/[0.02] border border-white/5 cursor-not-allowed select-none"
          >
            <ChevronLeft className="w-4 h-4 text-white/20" />
            <span>Previous</span>
          </span>
        )}
      </div>

      {/* Numerical Page Indicators */}
      <div className="flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap">
        {pages.map((item, index) => {
          if (item === "dots") {
            return (
              <span
                key={`dots-${index}`}
                aria-hidden="true"
                className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-white/40 text-sm select-none"
              >
                •••
              </span>
            );
          }

          const isCurrent = item === currentPage;

          return (
            <Link
              key={`page-${item}`}
              href={getPageUrl(item)}
              aria-label={`Page ${item}`}
              aria-current={isCurrent ? "page" : undefined}
              className={`w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl text-sm font-bold transition-all duration-300 ${
                isCurrent
                  ? "bg-[#FF8C00] text-white shadow-[0_0_15px_rgba(255,140,0,0.4)] scale-105 pointer-events-none"
                  : "bg-white/5 text-white/80 border border-white/10 hover:border-[#FF8C00]/50 hover:bg-[#FF8C00]/10 hover:text-[#FF8C00]"
              }`}
            >
              {item}
            </Link>
          );
        })}
      </div>

      {/* Next Page Button */}
      <div className="w-full sm:w-auto flex justify-end">
        {hasNext ? (
          <Link
            href={getPageUrl(currentPage + 1)}
            rel="next"
            aria-label="Go to next page"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white/90 bg-white/5 border border-white/10 hover:border-[#FF8C00]/50 hover:bg-[#FF8C00]/10 hover:text-[#FF8C00] transition-all duration-300 shadow-sm group"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 text-[#FF8C00]" />
          </Link>
        ) : (
          <span
            aria-disabled="true"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white/30 bg-white/[0.02] border border-white/5 cursor-not-allowed select-none"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4 text-white/20" />
          </span>
        )}
      </div>
    </nav>
  );
}
