import { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us | FitWay — Expert Fitness Guidance & Support",
  description: "Get in touch with the FitWay team for professional fitness advice, partnership opportunities, or technical support. We're here to help you reach your goals.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "mainEntity": {
      "@type": "Organization",
      "name": "FitWay",
      "url": "https://fitway.best",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+1-603-842-3420",
        "contactType": "customer service",
        "email": "info@fitway.best",
        "url": "https://fitway.best/contact"
      }
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ContactClient />
    </>
  );
}
