import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { User, Award, CheckCircle2, ArrowRight, Linkedin, Twitter, Instagram } from 'lucide-react';
import { Author } from '@/interfaces/author';
import { getStrapiMedia } from '@/utils/image';

interface AuthorCatalogCardProps {
  author: Author;
}

export default function AuthorCatalogCard({ author }: AuthorCatalogCardProps) {
  const imageUrl = getStrapiMedia(author.photo?.url || null);
  const articlesCount = author.articles?.length ?? 0;
  const workoutsCount = author.workoutsCreated?.length ?? 0;
  const reviewedCount = (author.articlesReviewed?.length ?? 0) + (author.workoutsReviewed?.length ?? 0);

  return (
    <div className="relative rounded-2xl bg-gradient-to-br from-[#1B2B3B] to-[#121C26] border border-white/10 p-6 md:p-8 flex flex-col justify-between transition-all duration-300 hover:border-[#FF8C00]/40 hover:shadow-[0_0_30px_rgba(255,140,0,0.12)]">
      {/* Decorative ambient gradient */}
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-48 h-48 bg-[#FF8C00] opacity-5 rounded-full blur-[60px] pointer-events-none" />

      <div>
        {/* Top Header: Avatar + Identity */}
        <div className="flex items-start gap-5 mb-5">
          <Link href={`/authors/${author.slug}`} className="shrink-0 relative group">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-[#FF8C00]/30 bg-[#0F1720] relative transition-transform duration-300 group-hover:scale-105 group-hover:border-[#FF8C00]">
              {author.photo?.url ? (
                <Image
                  src={imageUrl}
                  alt={author.name}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[#FF8C00]">
                  <User size={36} />
                </div>
              )}
            </div>
            <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-[#00C853] border-2 border-[#0F1720] flex items-center justify-center text-black" title="Verified Expert">
              <CheckCircle2 size={14} className="text-white" />
            </div>
          </Link>

          <div className="flex-1 min-w-0">
            <Link href={`/authors/${author.slug}`}>
              <h3 className="text-xl md:text-2xl font-bold text-white hover:text-[#FF8C00] transition-colors truncate">
                {author.name}
              </h3>
            </Link>
            
            <p className="text-sm font-semibold text-[#FF8C00] mt-0.5 flex items-center gap-1.5 flex-wrap">
              <Award size={16} className="shrink-0" />
              <span>{author.jobTitle || author.credentials || "Fitness Expert"}</span>
            </p>

            {author.yearsExperience && (
              <span className="inline-block mt-1 text-xs text-gray-400 font-medium">
                {author.yearsExperience}+ Years Clinical & Field Experience
              </span>
            )}
          </div>
        </div>

        {/* Bio Excerpt */}
        <p className="text-gray-300 text-sm leading-relaxed mb-6 line-clamp-3">
          {author.bio || "Certified fitness expert and contributor at FitWay, specialized in evidence-based exercise programming and nutritional guidance."}
        </p>

        {/* Specialization Tags */}
        {author.specializations && author.specializations.length > 0 && (
          <div className="mb-6">
            <div className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2">
              Focus Areas
            </div>
            <div className="flex flex-wrap gap-1.5">
              {author.specializations.slice(0, 4).map((spec: any, idx: number) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md bg-[#0F1720]/80 border border-white/5 text-gray-300 text-xs font-medium"
                >
                  {typeof spec === 'string' ? spec : (spec.name || JSON.stringify(spec))}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Live Content Activity Counters */}
        {(articlesCount > 0 || workoutsCount > 0 || reviewedCount > 0) && (
          <div className="grid grid-cols-3 gap-2 py-3 px-4 rounded-xl bg-[#0F1720]/60 border border-white/5 mb-6 text-center">
            <div>
              <div className="text-base font-bold text-white">{articlesCount}</div>
              <div className="text-[11px] text-gray-400 uppercase tracking-wide">Articles</div>
            </div>
            <div>
              <div className="text-base font-bold text-white">{workoutsCount}</div>
              <div className="text-[11px] text-gray-400 uppercase tracking-wide">Workouts</div>
            </div>
            <div>
              <div className="text-base font-bold text-[#00C853]">{reviewedCount}</div>
              <div className="text-[11px] text-gray-400 uppercase tracking-wide">Reviewed</div>
            </div>
          </div>
        )}
      </div>

      {/* Footer: Socials + Profile CTA */}
      <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-gray-400">
          {author.linkedin && (
            <a
              href={author.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${author.name} LinkedIn Profile`}
              className="hover:text-[#FF8C00] transition-colors"
            >
              <Linkedin size={18} />
            </a>
          )}
          {author.twitter && (
            <a
              href={author.twitter}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${author.name} Twitter Profile`}
              className="hover:text-[#FF8C00] transition-colors"
            >
              <Twitter size={18} />
            </a>
          )}
          {author.instagram && (
            <a
              href={author.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${author.name} Instagram Profile`}
              className="hover:text-[#FF8C00] transition-colors"
            >
              <Instagram size={18} />
            </a>
          )}
        </div>

        <Link
          href={`/authors/${author.slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#FF8C00] hover:text-[#FFA533] transition-colors group"
        >
          View Full Profile
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}

