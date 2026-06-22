import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, User } from 'lucide-react';
import { Author } from '@/interfaces/author';
import { getStrapiMedia } from '@/utils/image';

interface WorkoutExpertReviewBoxProps {
  reviewer: Author;
}

export default function WorkoutExpertReviewBox({ reviewer }: WorkoutExpertReviewBoxProps) {
  const imageUrl = getStrapiMedia(reviewer.photo?.url || null);

  return (
    <div className="mt-12 rounded-xl bg-[#121C26]/80 backdrop-blur-md border border-[#00C853]/20 p-6 flex flex-col sm:flex-row items-start sm:items-center gap-6 relative overflow-hidden transition-all hover:border-[#00C853]/40">
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-32 h-32 bg-[#00C853] opacity-5 blur-[50px] pointer-events-none" />
      
      {/* Reviewer Badge Icon */}
      <div className="shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-[#00C853]/10 text-[#00C853]">
        <CheckCircle2 size={24} />
      </div>

      <div className="flex-1">
        <h4 className="text-sm uppercase tracking-wider text-white/50 font-bold mb-2">Reviewed By</h4>
        
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10 relative bg-black/20">
            {reviewer.photo?.url ? (
              <Image 
                src={imageUrl} 
                alt={reviewer.name} 
                fill 
                className="object-cover"
                sizes="40px"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white/50">
                <User size={20} />
              </div>
            )}
          </div>
          <div>
            <Link href={`/authors/${reviewer.slug}`} className="font-bold text-white hover:text-[#00C853] transition-colors">
              {reviewer.name}
            </Link>
            {reviewer.credentials && (
              <p className="text-xs text-[#00C853] font-medium">{reviewer.credentials}</p>
            )}
          </div>
        </div>

        <p className="text-sm text-gray-400">
          This workout was reviewed for safety, exercise selection, and programming quality.
        </p>
      </div>
    </div>
  );
}
