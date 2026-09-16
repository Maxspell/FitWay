import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, ShieldCheck, ExternalLink, Award } from 'lucide-react';
import { Author } from '@/interfaces/author';
import { getStrapiMedia } from '@/utils/image';

interface ReviewedByBoxProps {
  reviewer: Author;
  reviewDate?: string;
  isMedical?: boolean;
}

export default function ReviewedByBox({ reviewer, reviewDate, isMedical = false }: ReviewedByBoxProps) {
  const imageUrl = getStrapiMedia(reviewer.photo?.url || null);
  const formattedDate = reviewDate 
    ? new Date(reviewDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : 'Recently';

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#12232F] via-[#101E2B] to-[#0A131C] border border-[#00C853]/25 p-6 sm:p-7 mt-8 transition-all duration-300 hover:border-[#00C853]/50 hover:shadow-[0_0_25px_rgba(0,200,83,0.12)]">
      {/* Subtle top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00C853]/70 to-transparent" />
      
      {/* Background glow */}
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-[#00C853] opacity-[0.04] rounded-full blur-[60px] pointer-events-none" />

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 relative z-10">
        {/* Reviewer Avatar */}
        <Link 
          href={`/authors/${reviewer.slug}`} 
          className="relative shrink-0 group/avatar block"
          title={`View ${reviewer.name}'s profile`}
        >
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-[#00C853]/30 bg-[#081119] relative transition-transform duration-300 group-hover/avatar:scale-105 group-hover/avatar:border-[#00C853]/70">
            {reviewer.photo?.url ? (
              <Image 
                src={imageUrl} 
                alt={reviewer.name} 
                fill 
                className="object-cover"
                sizes="(max-width: 640px) 64px, 80px"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[#00C853]">
                <ShieldCheck size={32} />
              </div>
            )}
          </div>
          {/* Verified badge pill overlay */}
          <div className="absolute -bottom-1 -right-1 bg-[#00C853] text-[#0A131C] rounded-full p-1 shadow-md border-2 border-[#12232F]">
            <CheckCircle2 size={12} className="stroke-[3]" />
          </div>
        </Link>

        {/* Info & Statement */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#00C853]/15 text-[#00E676] border border-[#00C853]/30">
              <CheckCircle2 size={13} className="shrink-0" />
              {isMedical ? 'Medically Reviewed' : 'Scientifically Reviewed'}
            </span>
            <span className="text-xs text-gray-400">
              Verified on {formattedDate}
            </span>
          </div>

          <div className="flex flex-wrap items-baseline gap-2 mb-2">
            <Link 
              href={`/authors/${reviewer.slug}`}
              className="text-lg font-bold text-white hover:text-[#00E676] transition-colors inline-flex items-center gap-1.5 group"
            >
              <span>{reviewer.name}</span>
              <ExternalLink size={14} className="text-gray-400 opacity-0 group-hover:opacity-100 group-hover:text-[#00E676] transition-all" />
            </Link>
            
            {(reviewer.credentials || reviewer.jobTitle) && (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-gray-300 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                <Award size={12} className="text-[#FF8C00]" />
                {reviewer.credentials || reviewer.jobTitle}
              </span>
            )}
          </div>

          <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-3">
            This article has been verified against current peer-reviewed research, clinical consensus, and exercise biomechanics to guarantee instructional safety and factual precision.
          </p>

          <div className="flex items-center gap-3 text-xs text-gray-400">
            <Link 
              href="/editorial-policy" 
              className="text-gray-400 hover:text-white underline underline-offset-2 transition-colors inline-flex items-center gap-1"
            >
              <ShieldCheck size={13} className="text-[#00C853]" />
              How we verify content (Editorial Policy)
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
