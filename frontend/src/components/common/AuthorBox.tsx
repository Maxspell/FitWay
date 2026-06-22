import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { User, ArrowRight, Award } from 'lucide-react';
import { Author } from '@/interfaces/author';
import { getStrapiMedia } from '@/utils/image';

interface AuthorBoxProps {
  author: Author;
}

export default function AuthorBox({ author }: AuthorBoxProps) {
  const imageUrl = getStrapiMedia(author.photo?.url || null);

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1B2B3B] to-[#121C26] border border-white/10 p-6 sm:p-8 mt-12 group transition-all duration-300 hover:border-[#FF8C00]/30 hover:shadow-[0_0_30px_rgba(255,140,0,0.1)]">
      {/* Decorative gradient overlay */}
      <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-[#FF8C00] opacity-5 rounded-full blur-[80px] pointer-events-none transition-opacity duration-500 group-hover:opacity-10" />
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 relative z-10">
        {/* Author Image */}
        <div className="relative shrink-0">
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#FF8C00]/20 relative z-10 bg-[#0F1720]">
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
                <User size={40} />
              </div>
            )}
          </div>
          {/* Subtle glow behind image */}
          <div className="absolute inset-0 bg-[#FF8C00] rounded-full blur-md opacity-20 -z-10 group-hover:opacity-40 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">{author.name}</h3>
              {author.credentials && (
                <div className="flex items-center gap-1.5 text-sm font-medium text-[#FF8C00]">
                  <Award size={16} />
                  <span>{author.credentials}</span>
                </div>
              )}
            </div>
            
            <Link 
              href={`/authors/${author.slug}`}
              className="inline-flex items-center gap-2 text-sm font-medium text-white/70 hover:text-[#FF8C00] transition-colors whitespace-nowrap"
            >
              View Full Profile
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          
          <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
            {author.bio || author.jobTitle || 'Fitness Expert'}
          </p>
        </div>
      </div>
    </div>
  );
}
