'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  /**
   * Custom mapping for URL segments to display labels.
   * Example: { 'workouts': 'My Workouts', 'full-body': 'Full Body Training' }
   */
  customLabels?: Record<string, string>;
  /**
   * Optional base URL for JSON-LD schema. Defaults to relative paths if omitted, 
   * but providing your actual domain (e.g. 'https://fitway.com') is better for SEO.
   */
  baseUrl?: string;
  className?: string;
}

export default function Breadcrumbs({ 
  customLabels = {}, 
  baseUrl = '', 
  className = '' 
}: BreadcrumbsProps) {
  const pathname = usePathname();

  const breadcrumbs = useMemo(() => {
    if (!pathname || pathname === '/') return [];

    const pathSegments = pathname.split('/').filter((segment) => segment !== '');
    const items: BreadcrumbItem[] = [];
    
    let currentPath = '';
    
    // Add Home as first item
    items.push({ label: 'Home', href: '/' });

    pathSegments.forEach((segment) => {
      currentPath += `/${segment}`;
      
      // Try to get custom label, otherwise format the segment
      const rawLabel = customLabels[segment] || segment;
      
      // Capitalize and replace dashes with spaces (e.g., full-body-workout -> Full Body Workout)
      const formattedLabel = rawLabel
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (char) => char.toUpperCase());

      items.push({
        label: formattedLabel,
        href: currentPath,
      });
    });

    return items;
  }, [pathname, customLabels]);

  if (breadcrumbs.length <= 1) {
    return null; // Don't show if only Home is present
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: `${baseUrl}${item.href}`,
    })),
  };

  return (
    <nav 
      aria-label="Breadcrumb" 
      className={`w-full overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] py-3 ${className}`}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ol className="flex items-center space-x-1 text-[13px] md:text-sm font-medium text-white/50 whitespace-nowrap min-w-max">
        {breadcrumbs.map((item, index) => {
          const isLast = index === breadcrumbs.length - 1;

          return (
            <li key={item.href} className="flex items-center">
              {isLast ? (
                <span 
                  className="text-[#FF8C00] drop-shadow-[0_0_8px_rgba(255,140,0,0.3)] ml-1" 
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : (
                <>
                  <Link
                    href={item.href}
                    className="hover:text-white transition-colors duration-300 relative after:content-[''] after:absolute after:-bottom-[2px] after:left-0 after:w-0 after:h-[1px] after:bg-white after:transition-all hover:after:w-full ml-1"
                  >
                    {item.label}
                  </Link>
                  <svg
                    className="w-3.5 h-3.5 mx-1.5 text-white/30 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
