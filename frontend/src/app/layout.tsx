import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import ScrollToTop from "@/components/common/ScrollToTop";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://fitway.best"),
  title: {
    default: "Science-Backed Workouts & Free Fitness Calculators | FitWay",
    template: "%s | FitWay",
  },
  description: "Explore structured workout programs, expert-reviewed nutrition articles, and free fitness calculators for calories, macros, BMI, and 1RM at FitWay.",
  keywords: [
    "fitness",
    "workouts",
    "health",
    "gym",
    "exercise",
    "training",
  ],
  alternates: {
    canonical: "https://fitway.best",
  },
  robots: {
    index: true,
    follow: true,
  },
  authors: [{ name: "FitWay" }],
  creator: "FitWay",
  publisher: "FitWay",
  openGraph: {
    title: "FitWay - Health & Fitness",
    description: "Structured workout programs, coach-reviewed nutrition guides, and free fitness calculators built on exercise science.",
    url: "https://fitway.best",
    siteName: "FitWay",
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/favicon.svg",
  },
  other: {
    "google-adsense-account": process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID ?? "",
    "p:domain_verify": "33b1773b25bfe4182730971111d6bc11",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://api.fitway.best" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://api.fitway.best" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow relative">
            <div className="absolute top-0 w-full z-10 pointer-events-none">
              <div className="container mx-auto px-4 pointer-events-auto">
                <Breadcrumbs baseUrl="https://fitway.best" className="pt-4 pb-0 drop-shadow-md" />
              </div>
            </div>
            {children}
          </main>
          <Footer />
        </div>
        <ScrollToTop />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": "https://fitway.best/#organization",
              "name": "FitWay",
              "url": "https://fitway.best",
              "logo": "https://fitway.best/favicon.svg",
              "description": "Evidence-based fitness platform offering structured workout programs, expert-reviewed nutrition guides, and free health calculators.",
              "sameAs": [
                "https://www.pinterest.com/fitway_best/",
                "https://www.instagram.com/fitway.best/",
                "https://x.com/fitway_best"
              ]
            }),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "FitWay",
              "url": "https://fitway.best"
            }),
          }}
        />

        {/* Google AdSense (Temporarily disabled for Lighthouse performance / verification) */}
        {/* {process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID && (
          <Script
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )} */}

        {/* Google Analytics (deferred until lazyOnload so gtag/js never blocks FCP/LCP) */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              id="ga4-gtag-src"
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="lazyOnload"
            />
            <Script id="ga4-gtag-init" strategy="lazyOnload">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){window.dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}