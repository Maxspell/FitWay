import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | FitWay",
  description: "Read our privacy policy to understand how FitWay collects, uses, and protects your personal information.",
};

export default function PrivacyPolicy() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="section-title mb-8 text-center">Privacy Policy</h1>

        <div className="card text-left space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-[#FF8C00]">1. Introduction</h2>
            <p className="text-gray-300 leading-relaxed">
              Welcome to FitWay. We respect your privacy and are committed to protecting your personal data.
              This Privacy Policy will inform you as to your choices and risks with regard to the personal information
              we collect and the ways in which we use that information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-[#FF8C00]">2. Information We Collect</h2>
            <p className="text-gray-300 mb-4">We collect several types of information from and about users of our Website, including:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>Personal information provided by you (e.g., email for newsletter subscription).</li>
              <li>Usage data collected automatically via cookies and tracking technologies.</li>
              <li>Device information, including IP address and browser type.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-[#FF8C00]">3. How We Use Your Information</h2>
            <p className="text-gray-300 mb-4">The information we collect is used to:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>Provide and maintain our Service.</li>
              <li>Improve our website and user experience.</li>
              <li>Send newsletters and promotional materials (if opted in).</li>
              <li>Analyze website traffic using Google Analytics.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-[#FF8C00]">4. Google AdSense and Cookies</h2>
            <p className="text-gray-300 mb-4">
              FitWay uses Google AdSense to serve ads. Google uses cookies to serve ads based on a user's previous visits
              to the website or app. Google's use of advertising cookies enables it and its partners to serve ads
              to your users based on their visit to your site and/or other sites on the Internet.
            </p>
            <p className="text-gray-300 leading-relaxed">
              You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" className="text-[#FF8C00] underline">Google Ads Settings</a>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-[#FF8C00]">5. Data Protection</h2>
            <p className="text-gray-300 leading-relaxed">
              We implement a variety of security measures to maintain the safety of your personal information.
              However, no method of transmission over the Internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-[#FF8C00]">6. Changes to This Policy</h2>
            <p className="text-gray-300 leading-relaxed">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting
              the new Privacy Policy on this page.
            </p>
          </section>

          <div className="pt-8 border-t border-gray-700 text-sm text-gray-400">
            Last updated: June 23, 2026
          </div>
        </div>
      </div>
    </div>
  );
}
