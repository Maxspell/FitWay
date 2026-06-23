import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | FitWay",
  description: "Read the Terms of Service for using the FitWay platform, including our medical disclaimer and user guidelines.",
};

export default function TermsOfService() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="section-title mb-8 text-center">Terms of Service</h1>

        <div className="card text-left space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-[#FF8C00]">1. Acceptance of Terms</h2>
            <p className="text-gray-300 leading-relaxed">
              By accessing and using the FitWay website, you agree to be bound by these Terms of Service.
              If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section className="bg-[#FF8C00]/10 border-l-4 border-[#FF8C00] p-4">
            <h2 className="text-2xl font-bold mb-4 text-[#FF8C00]">2. IMPORTANT: Medical Disclaimer</h2>
            <p className="text-gray-300 leading-relaxed">
              <strong>FitWay is NOT a medical provider.</strong> The workout programs, nutrition plans, and information
              provided on this website are for educational and informational purposes only.
            </p>
            <p className="text-gray-300 mt-4 leading-relaxed">
              You should always consult with a physician or other licensed healthcare professional before starting
              any new exercise program or changing your diet. Use of any information provided on FitWay
              is solely at your own risk. FitWay is not responsible for any injuries or health complications
              that may result from the use of our content.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-[#FF8C00]">3. Use of Service</h2>
            <p className="text-gray-300 mb-4">You agree to use the service for lawful purposes and in a way that does not:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>Violate any local, state, national, or international laws.</li>
              <li>Infringe upon the intellectual property rights of others.</li>
              <li>Interfere with the security or performance of the website.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-[#FF8C00]">4. Intellectual Property</h2>
            <p className="text-gray-300 leading-relaxed">
              All content, logos, and designs on FitWay are the property of FitWay and are protected by copyright laws.
              You may not reproduce, distribute, or modify any content without our explicit written permission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-[#FF8C00]">5. Limitation of Liability</h2>
            <p className="text-gray-300 leading-relaxed">
              To the maximum extent permitted by law, FitWay shall not be liable for any indirect, incidental,
              consequential, or punitive damages resulting from your use of the site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-[#FF8C00]">6. Governing Law</h2>
            <p className="text-gray-300 leading-relaxed">
              These terms are governed by the laws of the State of New York, USA. Any disputes shall be
              resolved in the courts of New York.
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
