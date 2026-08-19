import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://fitway.best"),
  title: {
    default: "AI Fitness Plans & Science-Backed Workouts | FitWay",
    template: "%s | FitWay",
  },
  description: "Get hyper-personalized workout programs and nutrition plans powered by AI and exercise science. Optimize your health with FitWay's data-driven fitness tools.",
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
    description: "Transform your body with AI-powered workout programs and science-backed nutrition plans. Start your free fitness journey at FitWay today.",
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
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "FitWay",
              "url": "https://fitway.best",
              "logo": "https://fitway.best/favicon.svg",
              "description": "AI-powered fitness platform providing science-backed workout programs and personalized nutrition plans.",
              "sameAs": [
                "https://facebook.com/fitway",
                "https://instagram.com/fitway",
                "https://twitter.com/fitway"
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

        {/* Google AdSense */}
        {process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID && (
          <Script
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}

        {/* Google Analytics */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  );
}