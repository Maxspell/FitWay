import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { 
  User, 
  Award, 
  CheckCircle2, 
  BookOpen, 
  Dumbbell, 
  Linkedin, 
  Twitter, 
  Instagram, 
  ShieldCheck, 
  ArrowRight, 
  Calculator, 
  FileCheck2 
} from "lucide-react";
import { getAuthorBySlug, getAuthors } from "@/services/author.service";
import { getStrapiMedia } from "@/utils/image";
import React from "react";

interface Props {
  params: {
    slug: string;
  };
}

// SSG Pre-rendering of all author profiles
export async function generateStaticParams() {
  const authors = await getAuthors();
  return authors.map((author) => ({
    slug: author.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const author = await getAuthorBySlug(params.slug);

  if (!author) return { title: "Author Not Found" };

  const canonicalUrl = `https://fitway.best/authors/${params.slug}`;
  const rawImage = author.photo?.url ? getStrapiMedia(author.photo.url) : "https://fitway.best/images/og-image.jpg";
  const ogImage = rawImage.startsWith("http") ? rawImage : `https://fitway.best${rawImage}`;

  const title = `${author.name}, ${author.credentials || author.jobTitle || 'Fitness Expert'} - Editorial Profile`;
  const description = author.bio || `Explore evidence-based fitness articles and clinical peer-reviews by ${author.name} on FitWay.`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "profile",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${author.name} Profile`,
        },
      ],
      siteName: "FitWay",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

// Contextual tool recommendations based on author specialization
function getRecommendedTools(slug: string) {
  if (slug === "sarah-johnson") {
    return [
      {
        name: "Daily Calorie & TDEE Calculator",
        href: "/tools/calorie-calculator",
        desc: "Determine maintenance calories and optimal deficit targets based on Mifflin-St Jeor.",
      },
      {
        name: "Macronutrient Ratio Splitter",
        href: "/tools/macro-calculator",
        desc: "Calculate protein, carbohydrate, and dietary fat ratios for fat loss or lean bulk.",
      },
      {
        name: "BMI & Health Risk Calculator",
        href: "/tools/bmi-calculator",
        desc: "Evaluate body mass index benchmarks and health risk classifications.",
      },
    ];
  }

  if (slug === "mike-chen") {
    return [
      {
        name: "One-Rep Max (1RM) Calculator",
        href: "/tools/one-rep-max-calculator",
        desc: "Calculate estimated single repetition maximums using Brzycki and Epley formulas.",
      },
      {
        name: "Daily Calorie & TDEE Calculator",
        href: "/tools/calorie-calculator",
        desc: "Dial in surplus energy requirements for maximum hypertrophic stimulus.",
      },
      {
        name: "Ideal Weight Calculator",
        href: "/tools/ideal-weight-calculator",
        desc: "Estimate muscular genetic limits and optimal body weight ranges.",
      },
    ];
  }

  // Richard Botich & Default
  return [
    {
      name: "Ideal Body Weight Calculator",
      href: "/tools/ideal-weight-calculator",
      desc: "Science-based body composition and weight targets according to Lorentz & Hamwi.",
    },
    {
      name: "BMI & Healthy Range Calculator",
      href: "/tools/bmi-calculator",
      desc: "Fast biometric screening tool for baseline fitness conditioning.",
    },
    {
      name: "One-Rep Max (1RM) Calculator",
      href: "/tools/one-rep-max-calculator",
      desc: "Calibrate working loads for barbell and dumbbell compound exercises.",
    },
  ];
}

export default async function AuthorProfilePage({ params }: Props) {
  const [author, allAuthors] = await Promise.all([
    getAuthorBySlug(params.slug),
    getAuthors(),
  ]);

  if (!author) {
    notFound();
  }

  const imageUrl = getStrapiMedia(author.photo?.url || null);

  const articles = author.articles || [];
  const workoutsCreated = author.workoutsCreated || [];
  const articlesReviewed = author.articlesReviewed || [];
  const workoutsReviewed = author.workoutsReviewed || [];

  const totalReviewedCount = articlesReviewed.length + workoutsReviewed.length;
  const colleagueAuthors = allAuthors.filter((a) => a.slug !== author.slug);
  const recommendedTools = getRecommendedTools(author.slug);

  // Schema.org Enterprise @graph
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `https://fitway.best/authors/${author.slug}/#webpage`,
        "url": `https://fitway.best/authors/${author.slug}`,
        "name": `${author.name} - FitWay Editorial Profile`,
        "description": author.bio,
        "isPartOf": {
          "@type": "WebSite",
          "@id": "https://fitway.best/#website",
          "name": "FitWay",
          "url": "https://fitway.best"
        },
        "mainEntity": {
          "@id": `https://fitway.best/authors/${author.slug}/#person`
        }
      },
      {
        "@type": "Person",
        "@id": `https://fitway.best/authors/${author.slug}/#person`,
        "name": author.name,
        "jobTitle": author.jobTitle || author.credentials || "Fitness Expert",
        "description": author.bio,
        "image": imageUrl.startsWith("http") ? imageUrl : `https://fitway.best${imageUrl}`,
        "url": `https://fitway.best/authors/${author.slug}`,
        "worksFor": {
          "@type": "Organization",
          "@id": "https://fitway.best/#organization",
          "name": "FitWay"
        },
        "publishingPrinciples": "https://fitway.best/editorial-policy",
        "sameAs": [author.linkedin, author.twitter, author.instagram].filter(Boolean),
        "knowsAbout": author.specializations || [
          "Strength Training",
          "Sports Nutrition",
          "Exercise Science"
        ],
        "hasCredential": (author.certifications || []).map((cert: any) => ({
          "@type": "EducationalOccupationalCredential",
          "credentialCategory": "Professional Certification",
          "name": typeof cert === "string" ? cert : (cert.name || "Certified Fitness Specialist")
        }))
      }
    ]
  };

  return (
    <article className="min-h-screen bg-[#0F1720] text-white pt-14 sm:pt-16 md:pt-20 pb-12 md:pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container mx-auto px-4 max-w-6xl">
        {/* Hero Profile Section */}
        <div className="rounded-3xl bg-gradient-to-br from-[#1B2B3B] to-[#121C26] border border-white/10 p-8 md:p-12 mb-12 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF8C00] opacity-5 rounded-full blur-[100px] pointer-events-none" />

          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center md:items-start relative z-10">
            {/* Avatar & Verification Badge */}
            <div className="relative shrink-0">
              <div className="w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden border-4 border-[#FF8C00]/30 bg-black/40 relative shadow-2xl">
                {author.photo?.url ? (
                  <Image 
                    src={imageUrl} 
                    alt={author.name} 
                    fill 
                    className="object-cover" 
                    sizes="(max-width: 768px) 160px, 208px" 
                    priority 
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#FF8C00]">
                    <User size={80} />
                  </div>
                )}
              </div>
              <div 
                className="absolute bottom-2 right-2 w-9 h-9 rounded-full bg-[#00C853] border-4 border-[#0F1720] flex items-center justify-center text-white shadow-lg"
                title="Verified FitWay Editorial Board Member"
              >
                <CheckCircle2 size={18} />
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00C853]/10 border border-[#00C853]/20 text-[#00C853] text-xs font-semibold mb-3">
                <ShieldCheck size={14} />
                <span>Verified E-E-A-T Editorial Reviewer</span>
              </div>

              <h1 className="text-3xl md:text-5xl font-extrabold mb-3 tracking-tight">
                {author.name}
              </h1>

              {/* Credentials & Role */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-5">
                {(author.credentials || author.jobTitle) && (
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FF8C00]/10 text-[#FF8C00] border border-[#FF8C00]/20 font-semibold text-sm">
                    <Award size={16} />
                    <span>{author.credentials || author.jobTitle}</span>
                  </div>
                )}
                {author.yearsExperience && (
                  <span className="text-sm text-gray-300 font-medium">
                    {author.yearsExperience}+ Years Clinical & Field Experience
                  </span>
                )}
                <Link
                  href="/editorial-policy"
                  className="text-xs text-gray-400 hover:text-[#FF8C00] transition-colors underline flex items-center gap-1"
                >
                  <FileCheck2 size={13} />
                  Editorial Standards
                </Link>
              </div>

              {/* Bio summary */}
              {author.bio && (
                <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6 max-w-2xl">
                  {author.bio}
                </p>
              )}

              {/* Social Profiles */}
              <div className="flex items-center justify-center md:justify-start gap-4 mb-8">
                {author.linkedin && (
                  <a 
                    href={author.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label={`${author.name} on LinkedIn`}
                    className="p-2 rounded-lg bg-white/5 text-gray-300 hover:text-[#FF8C00] hover:bg-white/10 transition-all"
                  >
                    <Linkedin size={20} />
                  </a>
                )}
                {author.twitter && (
                  <a 
                    href={author.twitter} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label={`${author.name} on Twitter`}
                    className="p-2 rounded-lg bg-white/5 text-gray-300 hover:text-[#FF8C00] hover:bg-white/10 transition-all"
                  >
                    <Twitter size={20} />
                  </a>
                )}
                {author.instagram && (
                  <a 
                    href={author.instagram} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label={`${author.name} on Instagram`}
                    className="p-2 rounded-lg bg-white/5 text-gray-300 hover:text-[#FF8C00] hover:bg-white/10 transition-all"
                  >
                    <Instagram size={20} />
                  </a>
                )}
              </div>

              {/* Real-time Content Activity Counters */}
              <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-6 max-w-md">
                <div>
                  <div className="text-2xl md:text-3xl font-extrabold text-white mb-0.5">{articles.length}</div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Articles</div>
                </div>
                <div>
                  <div className="text-2xl md:text-3xl font-extrabold text-white mb-0.5">{workoutsCreated.length}</div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Workouts</div>
                </div>
                <div>
                  <div className="text-2xl md:text-3xl font-extrabold text-[#00C853] mb-0.5">{totalReviewedCount}</div>
                  <div className="text-xs text-[#00C853] uppercase tracking-wider font-semibold">Peer-Reviewed</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Grid: Content + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-12">
            {/* Extended Biography */}
            <section className="p-8 rounded-2xl bg-[#1B2B3B]/40 border border-white/5">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 text-white">
                <User className="text-[#FF8C00]" size={24} />
                About {author.name}
              </h2>
              <div className="prose prose-invert prose-orange max-w-none text-gray-300 text-sm md:text-base leading-relaxed">
                {author.fullBio ? (
                  <ReactMarkdown>{author.fullBio as string}</ReactMarkdown>
                ) : (
                  <p>{author.bio}</p>
                )}
              </div>
            </section>

            {/* SEPARATE SECTION 1: PEER-REVIEWED CONTENT (E-E-A-T CRUCIAL SIGNAL) */}
            {(articlesReviewed.length > 0 || workoutsReviewed.length > 0) && (
              <section className="p-8 rounded-2xl bg-gradient-to-br from-[#12232F]/80 via-[#101E2B]/80 to-[#0A131C]/80 border border-[#00C853]/30 shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                      <ShieldCheck className="text-[#00C853]" size={26} />
                      Peer-Reviewed Content by {author.name.split(' ')[0]}
                    </h2>
                    <p className="text-xs md:text-sm text-gray-400 mt-1">
                      Fact-checked for clinical accuracy, physiological safety, and ISSN/ACSM adherence.
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#00C853]/10 text-[#00C853] border border-[#00C853]/20 text-xs font-bold">
                    {totalReviewedCount} Verified
                  </span>
                </div>

                <div className="space-y-4">
                  {/* Reviewed Articles */}
                  {articlesReviewed.map((article: any) => (
                    <Link
                      href={`/blog/${article.slug}`}
                      key={`rev-art-${article.id || article.slug}`}
                      className="p-4 rounded-xl bg-[#0F1720]/80 border border-white/5 hover:border-[#00C853]/40 transition-all flex items-center gap-4 group"
                    >
                      <div className="w-16 h-16 bg-black/40 rounded-lg overflow-hidden shrink-0 relative">
                        {article.image && (
                          <Image
                            src={getStrapiMedia(article.image.url)}
                            alt={article.title}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#00C853]">
                            <CheckCircle2 size={12} />
                            Peer-Reviewed
                          </span>
                          {article.category?.name && (
                            <span className="text-[11px] text-gray-400 bg-white/5 px-2 py-0.5 rounded">
                              {article.category.name}
                            </span>
                          )}
                        </div>
                        <h3 className="font-bold text-white text-sm md:text-base group-hover:text-[#00C853] transition-colors truncate">
                          {article.title}
                        </h3>
                        <p className="text-xs text-gray-400 line-clamp-1 mt-0.5">{article.excerpt}</p>
                      </div>
                      <ArrowRight size={18} className="text-gray-500 group-hover:text-[#00C853] group-hover:translate-x-1 transition-all shrink-0" />
                    </Link>
                  ))}

                  {/* Reviewed Workouts */}
                  {workoutsReviewed.map((workout: any) => (
                    <Link
                      href={`/workouts/${workout.slug}`}
                      key={`rev-wrk-${workout.id || workout.slug}`}
                      className="p-4 rounded-xl bg-[#0F1720]/80 border border-white/5 hover:border-[#00C853]/40 transition-all flex items-center gap-4 group"
                    >
                      <div className="w-16 h-16 bg-black/40 rounded-lg overflow-hidden shrink-0 relative">
                        {workout.image && (
                          <Image
                            src={getStrapiMedia(workout.image.url)}
                            alt={workout.title}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#00C853]">
                            <CheckCircle2 size={12} />
                            Biomechanically Audited
                          </span>
                          <span className="text-[11px] text-gray-400 bg-white/5 px-2 py-0.5 rounded">
                            {workout.difficulty} • {workout.duration} min
                          </span>
                        </div>
                        <h3 className="font-bold text-white text-sm md:text-base group-hover:text-[#00C853] transition-colors truncate">
                          {workout.title}
                        </h3>
                        <p className="text-xs text-gray-400 line-clamp-1 mt-0.5">{workout.description}</p>
                      </div>
                      <ArrowRight size={18} className="text-gray-500 group-hover:text-[#00C853] group-hover:translate-x-1 transition-all shrink-0" />
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* SEPARATE SECTION 2: AUTHORED ARTICLES */}
            {articles.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold flex items-center gap-3 text-white">
                    <BookOpen className="text-[#FF8C00]" size={24} />
                    Published Articles by {author.name.split(' ')[0]}
                  </h2>
                  <span className="text-xs text-gray-400 font-semibold">{articles.length} Total</span>
                </div>
                <div className="grid gap-4">
                  {articles.map((article: any) => (
                    <Link
                      href={`/blog/${article.slug}`}
                      key={`art-${article.id || article.slug}`}
                      className="p-4 rounded-xl bg-[#1B2B3B]/50 border border-white/5 hover:border-[#FF8C00]/30 transition-all flex items-center gap-4 group"
                    >
                      <div className="w-16 h-16 bg-black/40 rounded-lg overflow-hidden shrink-0 relative">
                        {article.image && (
                          <Image
                            src={getStrapiMedia(article.image.url)}
                            alt={article.title}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        {article.category?.name && (
                          <span className="text-[11px] font-semibold text-[#FF8C00] uppercase tracking-wider mb-1 block">
                            {article.category.name}
                          </span>
                        )}
                        <h3 className="font-bold text-white text-sm md:text-base group-hover:text-[#FF8C00] transition-colors truncate">
                          {article.title}
                        </h3>
                        <p className="text-xs text-gray-400 line-clamp-1 mt-0.5">{article.excerpt}</p>
                      </div>
                      <ArrowRight size={18} className="text-gray-500 group-hover:text-[#FF8C00] group-hover:translate-x-1 transition-all shrink-0" />
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* SEPARATE SECTION 3: CREATED WORKOUTS */}
            {workoutsCreated.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold flex items-center gap-3 text-white">
                    <Dumbbell className="text-[#FF8C00]" size={24} />
                    Training Programs Designed
                  </h2>
                  <span className="text-xs text-gray-400 font-semibold">{workoutsCreated.length} Programs</span>
                </div>
                <div className="grid gap-4">
                  {workoutsCreated.map((workout: any) => (
                    <Link
                      href={`/workouts/${workout.slug}`}
                      key={`wrk-${workout.id || workout.slug}`}
                      className="p-4 rounded-xl bg-[#1B2B3B]/50 border border-white/5 hover:border-[#FF8C00]/30 transition-all flex items-center gap-4 group"
                    >
                      <div className="w-16 h-16 bg-black/40 rounded-lg overflow-hidden shrink-0 relative">
                        {workout.image && (
                          <Image
                            src={getStrapiMedia(workout.image.url)}
                            alt={workout.title}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[11px] text-gray-400 uppercase tracking-wider mb-1 block">
                          {workout.difficulty} • {workout.duration} min
                        </span>
                        <h3 className="font-bold text-white text-sm md:text-base group-hover:text-[#FF8C00] transition-colors truncate">
                          {workout.title}
                        </h3>
                        <p className="text-xs text-gray-400 line-clamp-1 mt-0.5">{workout.description}</p>
                      </div>
                      <ArrowRight size={18} className="text-gray-500 group-hover:text-[#FF8C00] group-hover:translate-x-1 transition-all shrink-0" />
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* HIGH-RPM TOOLS RECOMMENDED SECTION */}
            <section className="p-8 rounded-2xl bg-[#1B2B3B]/30 border border-white/5">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
                    <Calculator className="text-[#FF8C00]" size={22} />
                    Calculators & Tools Recommended by {author.name.split(' ')[0]}
                  </h2>
                  <p className="text-xs md:text-sm text-gray-400 mt-1">
                    Calibrate your training volume and nutrition targets with clinically validated formulas.
                  </p>
                </div>
                <Link href="/tools" className="text-xs font-semibold text-[#FF8C00] hover:underline shrink-0">
                  All Tools &rarr;
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {recommendedTools.map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className="p-4 rounded-xl bg-[#0F1720]/80 border border-white/5 hover:border-[#FF8C00]/40 transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <h3 className="font-bold text-white text-sm group-hover:text-[#FF8C00] transition-colors mb-1.5">
                        {tool.name}
                      </h3>
                      <p className="text-xs text-gray-400 leading-relaxed line-clamp-3">
                        {tool.desc}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#FF8C00] mt-3 group-hover:translate-x-1 transition-transform">
                      Open Tool &rarr;
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar Column */}
          <aside className="space-y-8">
            {/* Specializations & Hub Linking */}
            {author.specializations && author.specializations.length > 0 && (
              <div className="card bg-[#1B2B3B] p-6 rounded-2xl border border-white/5">
                <h2 className="text-sm font-bold mb-4 uppercase tracking-wider text-gray-400">
                  Areas of Expertise
                </h2>
                <div className="flex flex-wrap gap-2">
                  {author.specializations.map((spec: any, i: number) => {
                    const specName = typeof spec === 'string' ? spec : (spec.name || JSON.stringify(spec));
                    return (
                      <span
                        key={i}
                        className="px-3 py-1.5 bg-[#0F1720] text-gray-300 rounded-lg text-xs font-medium border border-white/5"
                      >
                        {specName}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Certifications (Accredited) */}
            {author.certifications && author.certifications.length > 0 && (
              <div className="card bg-[#1B2B3B] p-6 rounded-2xl border border-white/5">
                <h2 className="text-sm font-bold mb-4 uppercase tracking-wider text-gray-400">
                  Verified Certifications
                </h2>
                <ul className="space-y-3">
                  {author.certifications.map((cert: any, i: number) => {
                    const certName = typeof cert === 'string' ? cert : (cert.name || JSON.stringify(cert));
                    return (
                      <li key={i} className="flex items-start gap-3 text-gray-300">
                        <CheckCircle2 size={16} className="text-[#00C853] shrink-0 mt-0.5" />
                        <span className="text-xs md:text-sm font-medium leading-tight">
                          {certName}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {/* E-E-A-T Editorial Policy Pledge */}
            <div className="card bg-gradient-to-br from-[#1B2B3B] to-[#121C26] p-6 rounded-2xl border border-[#FF8C00]/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF8C00] opacity-5 rounded-full blur-[40px]" />
              <h2 className="text-base font-bold mb-2 text-white flex items-center gap-2">
                <ShieldCheck size={18} className="text-[#FF8C00]" />
                Evidence-Based Guarantee
              </h2>
              <p className="text-xs text-gray-400 leading-relaxed mb-4">
                FitWay content is created and cross-audited by certified practitioners adhering to our 4-step medical and biomechanical review workflow.
              </p>
              <Link
                href="/editorial-policy"
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#FF8C00] hover:underline"
              >
                Read Editorial Policy &rarr;
              </Link>
            </div>

            {/* Lateral Linking: Fellow Editorial Board Members */}
            {colleagueAuthors.length > 0 && (
              <div className="card bg-[#1B2B3B] p-6 rounded-2xl border border-white/5">
                <h2 className="text-sm font-bold mb-4 uppercase tracking-wider text-gray-400">
                  Editorial Board Colleagues
                </h2>
                <div className="space-y-3">
                  {colleagueAuthors.map((colleague) => {
                    const colImg = getStrapiMedia(colleague.photo?.url || null);
                    return (
                      <Link
                        key={colleague.slug}
                        href={`/authors/${colleague.slug}`}
                        className="p-3 rounded-xl bg-[#0F1720]/80 border border-white/5 hover:border-[#FF8C00]/30 transition-all flex items-center gap-3 group"
                      >
                        <div className="w-10 h-10 rounded-full overflow-hidden relative shrink-0 border border-white/10">
                          {colleague.photo?.url ? (
                            <Image src={colImg} alt={colleague.name} fill className="object-cover" sizes="40px" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[#FF8C00]">
                              <User size={18} />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-xs font-bold text-white group-hover:text-[#FF8C00] transition-colors truncate">
                            {colleague.name}
                          </h3>
                          <p className="text-[11px] text-gray-400 truncate">
                            {colleague.credentials || colleague.jobTitle}
                          </p>
                        </div>
                        <ArrowRight size={14} className="text-gray-500 group-hover:text-[#FF8C00] transition-colors shrink-0" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </article>
  );
}
