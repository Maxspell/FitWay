import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { User } from 'lucide-react';
import { Author } from '@/interfaces/author';
import { getStrapiMedia } from '@/lib/utils';

interface AuthorSidebarCardProps {
  author: Author;
}

export default function AuthorSidebarCard({ author }: AuthorSidebarCardProps) {
  const imageUrl = getStrapiMedia(author.photo?.url);

  return (
    <div className="card h-full">
      <h3 className="text-xl font-bold mb-4">About the Author</h3>
      <Link
        href={`/authors/${author.slug}`}
        className="flex items-center gap-4 group"
      >
        <div className="w-16 h-16 rounded-full overflow-hidden border border-[#FF8C00]/20 bg-[#0F1720] flex items-center justify-center shrink-0 relative group-hover:border-[#FF8C00] transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(255,140,0,0.3)]">
          {author.photo?.url ? (
            <Image
              src={imageUrl}
              alt={author.name}
              fill
              className="object-cover"
              sizes="64px"
            />
          ) : (
            <User className="h-8 w-8 text-[#FF8C00]" />
          )}
        </div>
        <div className="flex flex-col">
          <h4 className="font-bold text-white group-hover:text-[#FF8C00] transition-colors duration-300">
            {author.name}
          </h4>
          <p className="text-[#FF8C00] text-sm font-medium">
            {author.credentials || author.jobTitle || 'Fitness Expert'}
          </p>
        </div>
      </Link>
    </div>
  );
}
