import { Metadata } from "next";
import ContactClient from "./ContactClient";
import FAQSection from "@/components/sections/faq/FAQSection";

export const metadata: Metadata = {
  title: "Contact Us | Expert Fitness Guidance & Support",
  description: "Get in touch with the FitWay team for professional fitness advice, partnership opportunities, or technical support. We're here to help you reach your goals.",
  alternates: {
    canonical: "/contact",
  },
};

async function getFAQs() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/faqs?sort=order:asc`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
        "Content-Type": "application/json"
      },
      next: { revalidate: 3600 }
    });
    const result = await response.json();

    if (!result.data || result.data.length === 0) {
      return fallbackFAQs;
    }

    return result.data.map((item: any) => ({
      id: item.id,
      question: item.question,
      answer: item.answer,
      category: item.category
    }));
  } catch (error) {
    console.error("Error fetching FAQs on contact page:", error);
    return fallbackFAQs;
  }
}

const fallbackFAQs = [
  {
    id: 1,
    question: "How do I start my fitness journey?",
    answer: "Getting started is easy! We recommend beginning with our Goal Setting tool to define your objectives, then choosing a 'Beginner' workout plan from our collections.",
    category: "general"
  },
  {
    id: 2,
    question: "Are workouts suitable for beginners?",
    answer: "Absolutely. We have specifically designed programs for every level, from complete beginners to advanced athletes.",
    category: "workouts"
  },
  {
    id: 3,
    question: "Do I need gym equipment?",
    answer: "Not necessarily! We offer many 'Home Workout' plans that require zero equipment.",
    category: "workouts"
  },
  {
    id: 4,
    question: "Are the calculators free to use?",
    answer: "Yes, all our fitness tools including BMI, Daily Calorie, and Meal Plan generators are completely free.",
    category: "tools"
  }
];

export default async function ContactPage() {
  const faqs = await getFAQs();

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
      <FAQSection faqs={faqs} />
    </>
  );
}
