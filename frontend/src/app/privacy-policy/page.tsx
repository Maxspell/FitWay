import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Read our privacy policy to understand how FitWay collects, uses, and protects your personal information.",
  alternates: {
    canonical: "https://fitway.best/privacy-policy",
  },
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
              Welcome to FitWay (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We respect your privacy and are committed to protecting your personal data.
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website{" "}
              <a href="https://fitway.best" className="text-[#FF8C00] underline">fitway.best</a>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-[#FF8C00]">2. Information We Collect</h2>
            <p className="text-gray-300 mb-4">We collect several types of information from and about users of our Website, including:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li><strong>Voluntarily provided information:</strong> Email addresses and details provided when submitting contact forms or subscribing to newsletters.</li>
              <li><strong>Automatically collected usage data:</strong> IP addresses, browser types, operating systems, referring URLs, pages viewed, and access timestamps collected via server logs and analytics cookies.</li>
              <li><strong>Cookies and tracking technologies:</strong> Small text files placed on your device to ensure core site functionality, remember preferences, and analyze user engagement.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-[#FF8C00]">3. How We Use Your Information</h2>
            <p className="text-gray-300 mb-4">The collected information is used to:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>Provide, maintain, and improve our workouts, calculators, and informational resources.</li>
              <li>Monitor and analyze trends, traffic, and user behavior via Google Analytics.</li>
              <li>Serve personalized or contextual advertisements through advertising networks.</li>
              <li>Respond to inquiries, feedback, and technical support requests.</li>
              <li>Detect, prevent, and address technical issues or fraudulent activity.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-[#FF8C00]">4. Google AdSense & Third-Party Advertising</h2>
            <div className="text-gray-300 space-y-3 leading-relaxed">
              <p>
                We use Google AdSense and other third-party advertising vendors to display advertisements when you visit our Website.
              </p>
              <p>
                Google uses cookies (including the DoubleClick cookie) to serve ads to users based on their prior visits to FitWay and/or other websites across the Internet. Google&apos;s use of advertising cookies enables it and its partners to serve targeted ads based on your browsing history.
              </p>
              <p>
                Third-party vendors and ad networks may also serve ads on FitWay and place cookies, beacons, or scripts on your browser to measure advertisement effectiveness and personalize advertising content.
              </p>
              <div className="bg-[#1e1e1e] border border-gray-700 rounded-lg p-4 mt-4 space-y-2">
                <p className="font-semibold text-white">How you can opt out of personalized advertising:</p>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-300 ml-2">
                  <li>
                    Opt out of personalized Google ads by visiting{" "}
                    <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-[#FF8C00] underline">
                      Google Ads Settings
                    </a>.
                  </li>
                  <li>
                    Opt out of third-party vendor cookies for personalized advertising by visiting{" "}
                    <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-[#FF8C00] underline">
                      AboutAds.info Choices
                    </a>{" "}
                    or{" "}
                    <a href="https://optout.networkadvertising.org/" target="_blank" rel="noopener noreferrer" className="text-[#FF8C00] underline">
                      Network Advertising Initiative Opt-Out
                    </a>.
                  </li>
                  <li>
                    If you are located in the European Union, you can manage behavioral advertising preferences at{" "}
                    <a href="https://www.youronlinechoices.com/" target="_blank" rel="noopener noreferrer" className="text-[#FF8C00] underline">
                      Your Online Choices
                    </a>.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-[#FF8C00]">5. Cookie Management</h2>
            <p className="text-gray-300 leading-relaxed">
              Most web browsers allow you to manage your cookie preferences through their settings. You can choose to block or delete cookies entirely. However, disabling cookies may impact certain interactive features and user experience across our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-[#FF8C00]">6. Data Protection & Security</h2>
            <p className="text-gray-300 leading-relaxed">
              We apply industry-standard security measures, including SSL/TLS encryption, to safeguard your information against unauthorized access, alteration, or disclosure. However, no data transmission over the Internet or wireless network can be guaranteed to be 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-[#FF8C00]">7. Your Privacy Rights (GDPR & CCPA)</h2>
            <div className="text-gray-300 space-y-3 leading-relaxed">
              <p>Depending on your location, you may have specific statutory rights regarding your personal information:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Right to Access & Portability:</strong> You can request a copy of the personal data we hold about you.</li>
                <li><strong>Right to Rectification:</strong> You may request corrections to inaccurate or incomplete data.</li>
                <li><strong>Right to Erasure (&quot;Right to be Forgotten&quot;):</strong> You may request the deletion of your personal information where applicable by law.</li>
                <li><strong>Right to Object or Restrict Processing:</strong> You have the right to withdraw consent or object to specific processing of your data, including direct marketing.</li>
              </ul>
              <p>
                To exercise any of these rights, please reach out to us using the contact details below.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-[#FF8C00]">8. Changes to This Policy</h2>
            <p className="text-gray-300 leading-relaxed">
              We may update our Privacy Policy periodically to reflect changes in our practices or applicable legal obligations. Any updates will be published directly on this page with a revised &quot;Last updated&quot; date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-[#FF8C00]">9. Contact Us</h2>
            <p className="text-gray-300 leading-relaxed">
              If you have any questions, concerns, or requests regarding this Privacy Policy or our data handling practices, please contact us at:
            </p>
            <div className="mt-3 text-gray-300">
              <p><strong>Website:</strong> FitWay (<a href="https://fitway.best" className="text-[#FF8C00] underline">fitway.best</a>)</p>
              <p><strong>Email:</strong> <a href="mailto:support@fitway.best" className="text-[#FF8C00] underline">support@fitway.best</a></p>
            </div>
          </section>

          <div className="pt-8 border-t border-gray-700 text-sm text-gray-400">
            Last updated: October 6, 2026
          </div>
        </div>
      </div>
    </div>
  );
}
