import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { User, Award, CheckCircle2, BookOpen, Dumbbell, Linkedin, Twitter, Instagram } from "lucide-react";
import { getAuthorBySlug } from "@/services/author.service";
import { getStrapiMedia } from "@/utils/image";
import React from "react";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const author = await getAuthorBySlug(params.slug);

  if (!author) return { title: "Author Not Found | FitWay" };

  return {
    title: `${author.name} - ${author.credentials || author.jobTitle || 'Fitness Expert'}`,
    description: author.bio || `View the full profile of ${author.name} on FitWay.`,
    alternates: {
      canonical: `/authors/${params.slug}`,
    },
    openGraph: {
      title: author.name,
      description: author.bio,
      images: [getStrapiMedia(author.photo?.url || null)],
    },
  };
}

export default async function AuthorProfilePage({ params }: Props) {
  const author = await getAuthorBySlug(params.slug);

  if (!author) {
    notFound();
  }

  const imageUrl = getStrapiMedia(author.photo?.url || null);

  const articles: any[] = (author as any).articles || [];
  const workoutsCreated: any[] = (author as any).workoutsCreated || [];
  const workoutsReviewed: any[] = (author as any).workoutsReviewed || [];

  return (
    <main className="min-h-screen bg-[#0F1720] text-white py-12">
      <div className="container mx-auto px-4 max-w-5xl">

        {/* Hero Profile Section */}
        <div className="rounded-3xl bg-gradient-to-br from-[#1B2B3B] to-[#121C26] border border-white/5 p-8 md:p-12 mb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF8C00] opacity-5 rounded-full blur-[100px] pointer-events-none" />

          <div className="flex flex-col md:flex-row gap-10 items-center md:items-start relative z-10">
            {/* Large Image */}
            <div className="w-40 h-40 md:w-56 md:h-56 shrink-0 rounded-full overflow-hidden border-4 border-[#FF8C00]/20 bg-black/40 relative shadow-2xl">
              {author.photo?.url ? (
                <Image src={imageUrl} alt={author.name} fill className="object-cover" sizes="(max-width: 768px) 160px, 224px" priority />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[#FF8C00]">
                  <User size={80} />
                </div>
              )}
            </div>

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold mb-3">{author.name}</h1>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-6">
                {(author.credentials || author.jobTitle) && (
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF8C00]/10 text-[#FF8C00] border border-[#FF8C00]/20 font-medium">
                    <Award size={18} />
                    <span>{author.credentials || author.jobTitle}</span>
                  </div>
                )}
                {author.yearsExperience && (
                  <div className="inline-flex items-center gap-2 text-gray-300 font-medium">
                    <span>{author.yearsExperience}+ Years Experience</span>
                  </div>
                )}
              </div>

              {/* Socials */}
              <div className="flex items-center justify-center md:justify-start gap-4 mb-8">
                {author.linkedin && (
                  <a href={author.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#FF8C00] transition-colors"><Linkedin size={24} /></a>
                )}
                {author.twitter && (
                  <a href={author.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#FF8C00] transition-colors"><Twitter size={24} /></a>
                )}
                {author.instagram && (
                  <a href={author.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#FF8C00] transition-colors"><Instagram size={24} /></a>
                )}
              </div>

              {/* Stats */}
              <div className="flex items-center justify-center md:justify-start gap-8 border-t border-white/10 pt-6">
                <div>
                  <div className="text-2xl font-bold text-white mb-1">{articles.length}</div>
                  <div className="text-sm text-gray-400 uppercase tracking-wider font-semibold">Articles</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white mb-1">{workoutsCreated.length}</div>
                  <div className="text-sm text-gray-400 uppercase tracking-wider font-semibold">Workouts</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white mb-1">{workoutsReviewed.length}</div>
                  <div className="text-sm text-gray-400 uppercase tracking-wider font-semibold">Reviewed</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content: Bio */}
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <User className="text-[#FF8C00]" />
                About {author.name.split(' ')[0]}
              </h2>
              <div className="prose prose-invert prose-orange max-w-none text-gray-300">
                {author.fullBio ? (
                  <ReactMarkdown>{author.fullBio as string}</ReactMarkdown>
                ) : (
                  <p>{author.bio}</p>
                )}
              </div>
            </section>

            {/* Published Articles List */}
            {articles.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <BookOpen className="text-[#FF8C00]" />
                  Latest Articles
                </h2>
                <div className="grid gap-4">
                  {articles.map((article: any) => (
                    <Link href={`/blog/${article.slug}`} key={article.id} className="p-4 rounded-xl bg-[#1B2B3B]/50 border border-white/5 hover:border-[#FF8C00]/30 transition-all flex items-center gap-4 group">
                      <div className="w-16 h-16 bg-black/40 rounded-lg overflow-hidden shrink-0 relative">
                        {article.image && <Image src={getStrapiMedia(article.image.url)} alt={article.title} fill className="object-cover" sizes="64px" />}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-white group-hover:text-[#FF8C00] transition-colors">{article.title}</h4>
                        <p className="text-sm text-gray-400 line-clamp-1">{article.excerpt}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Created Workouts */}
            {workoutsCreated.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <Dumbbell className="text-[#FF8C00]" />
                  Workouts Created
                </h2>
                <div className="grid gap-4">
                  {workoutsCreated.map((workout: any) => (
                    <Link href={`/workouts/${workout.slug}`} key={workout.id} className="p-4 rounded-xl bg-[#1B2B3B]/50 border border-white/5 hover:border-[#FF8C00]/30 transition-all flex items-center gap-4 group">
                      <div className="w-16 h-16 bg-black/40 rounded-lg overflow-hidden shrink-0 relative">
                        {workout.image && <Image src={getStrapiMedia(workout.image.url)} alt={workout.title} fill className="object-cover" sizes="64px" />}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-white group-hover:text-[#FF8C00] transition-colors">{workout.title}</h4>
                        <p className="text-sm text-gray-400">{workout.difficulty} • {workout.duration} min</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar: Credentials & Expertise */}
          <div className="space-y-8">
            {author.specializations && author.specializations.length > 0 && (
              <div className="card bg-[#1B2B3B] p-6 rounded-2xl border border-white/5">
                <h3 className="text-lg font-bold mb-4 uppercase tracking-wider text-gray-400">Areas of Expertise</h3>
                <div className="flex flex-wrap gap-2">
                  {author.specializations.map((spec: string, i: number) => (
                    <span key={i} className="px-3 py-1.5 bg-[#0F1720] text-gray-300 rounded-lg text-sm border border-white/5 font-medium">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {author.certifications && author.certifications.length > 0 && (
              <div className="card bg-[#1B2B3B] p-6 rounded-2xl border border-white/5">
                <h3 className="text-lg font-bold mb-4 uppercase tracking-wider text-gray-400">Certifications</h3>
                <ul className="space-y-3">
                  {author.certifications.map((cert: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-gray-300">
                      <CheckCircle2 size={18} className="text-[#00C853] shrink-0 mt-0.5" />
                      <span className="text-sm font-medium leading-tight">{cert}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Evidence-Based Statement */}
            <div className="card bg-[#1B2B3B] p-6 rounded-2xl border border-[#FF8C00]/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF8C00] opacity-5 rounded-full blur-[40px]" />
              <h3 className="text-lg font-bold mb-3 text-white">Trust & Quality</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                FitWay content is created and reviewed by certified professionals to ensure it is evidence-based, safe, and effective. We adhere to strict editorial guidelines.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": author.name,
            "jobTitle": author.jobTitle || author.credentials,
            "description": author.bio,
            "image": imageUrl,
            "url": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://fitway.best'}/authors/${author.slug}`,
            "sameAs": [author.linkedin, author.twitter, author.instagram].filter(Boolean),
            "knowsAbout": author.specializations || [],
            "award": author.certifications || []
          }),
        }}
      />
    </main>
  );
}
