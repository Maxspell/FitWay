import { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with FitWay support, share feedback, or inquire about partnership opportunities.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
