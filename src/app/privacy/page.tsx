import Footer from "@/src/components/footer";
import Navbar from "@/src/components/navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | BitcoinDeepa",
  description: "Privacy Policy for BitcoinDeepa - Sri Lankan Bitcoin Community",
};

export default function Privacy() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-zinc-950 via-black to-zinc-950 pointer-events-none"></div>
      <div className="fixed inset-0 z-0 opacity-30 pointer-events-none">
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-full h-[600px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-bitcoin/20 via-transparent to-transparent"></div>
      </div>
      <div className="relative z-10">
        <Navbar />
        <main className="pt-32 pb-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="mb-12 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  <span className="text-white">Privacy</span>
                  <span className="text-bitcoin ml-2">Policy</span>
                </h1>
                <p className="text-gray-400">Last updated: Apr 28, 2025</p>
              </div>

              <div className="space-y-10">
                <section className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl p-6 md:p-8">
                  <p className="text-gray-300 mb-4">
                    At BitcoinDeepa, we are committed to protecting the privacy
                    and security of our community members’ personal information.
                    This Privacy Policy outlines how we collect, use, and
                    safeguard your information when you visit or interact with
                    our website. By using our website, you consent to the
                    practices described in this policy.
                  </p>
                </section>

                <section className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Information We Collect
                  </h2>
                  <ul className="list-disc pl-6 text-gray-300 space-y-2">
                    <li>
                      <span className="font-semibold text-bitcoin">
                        Personal identification information:
                      </span>{" "}
                      such as your name, email address, and phone number,
                      provided voluntarily by you during registration, event
                      sign-up, or community participation.
                    </li>
                    <li>
                      <span className="font-semibold text-bitcoin">
                        Payment and billing information:
                      </span>{" "}
                      if you make purchases or donations, payment details are
                      securely handled by trusted third-party processors.
                    </li>
                    <li>
                      <span className="font-semibold text-bitcoin">
                        Browsing information:
                      </span>{" "}
                      such as your IP address, browser type, and device
                      information, collected automatically using cookies and
                      similar technologies.
                    </li>
                  </ul>
                </section>

                <section className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Use of Information
                  </h2>
                  <ul className="list-disc pl-6 text-gray-300 space-y-2">
                    <li>
                      To process and fulfill your event registrations or
                      purchases.
                    </li>
                    <li>
                      To communicate with you, provide support, and respond to
                      inquiries.
                    </li>
                    <li>
                      To personalize your experience and present relevant
                      resources or promotions.
                    </li>
                    <li>
                      To improve our website, events, and community services
                      based on your feedback and usage patterns.
                    </li>
                    <li>
                      To detect and prevent fraud, unauthorized activities, and
                      abuse of our website.
                    </li>
                  </ul>
                </section>

                <section className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Information Sharing
                  </h2>
                  <ul className="list-disc pl-6 text-gray-300 space-y-2">
                    <li>
                      <span className="font-semibold text-bitcoin">
                        Trusted service providers:
                      </span>{" "}
                      We may share your information with third-party providers
                      who assist us in operating our website, processing
                      payments, and delivering services. These providers are
                      contractually obligated to handle your data securely and
                      confidentially.
                    </li>
                    <li>
                      <span className="font-semibold text-bitcoin">
                        Legal requirements:
                      </span>{" "}
                      We may disclose your information if required to do so by
                      law or in response to valid legal requests or orders.
                    </li>
                  </ul>
                  <p className="text-gray-300 mt-2">
                    We do not sell, trade, or otherwise transfer your personal
                    information to third parties without your consent, except as
                    described above.
                  </p>
                </section>

                <section className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Data Security
                  </h2>
                  <p className="text-gray-300">
                    We implement industry-standard security measures to protect
                    your personal information from unauthorized access,
                    alteration, disclosure, or destruction. However, please be
                    aware that no method of transmission over the internet or
                    electronic storage is 100% secure, and we cannot guarantee
                    absolute security.
                  </p>
                </section>

                <section className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Cookies and Tracking Technologies
                  </h2>
                  <p className="text-gray-300 mb-2">
                    We use cookies and similar technologies to enhance your
                    browsing experience, analyze website traffic, and gather
                    information about your preferences and interactions with our
                    website.
                  </p>
                  <p className="text-gray-300">
                    You have the option to disable cookies through your browser
                    settings, but this may limit certain features and
                    functionality of our website.
                  </p>
                </section>

                <section className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Changes to the Privacy Policy
                  </h2>
                  <p className="text-gray-300">
                    We reserve the right to update or modify this Privacy Policy
                    at any time. Any changes will be posted on this page with a
                    revised “last updated” date. We encourage you to review this
                    Privacy Policy periodically to stay informed about how we
                    collect, use, and protect your information.
                  </p>
                </section>

                <section className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Contact Us
                  </h2>
                  <p className="text-gray-300 mb-2">
                    If you have any questions, concerns, or requests regarding
                    our Privacy Policy or the handling of your personal
                    information, please contact us:
                  </p>
                  <div className="bg-zinc-800/50 p-4 rounded-lg inline-block">
                    <p className="text-gray-300">
                      By email:{" "}
                      <a
                        href="mailto:info@bitcoindeepa.com"
                        className="text-bitcoin hover:underline"
                      >
                        info@bitcoindeepa.com
                      </a>
                    </p>
                    <p className="text-gray-300">
                      By visiting our website:{" "}
                      <a
                        href="https://bitcoindeepa.com/contact"
                        className="text-bitcoin hover:underline"
                      >
                        bitcoindeepa.com
                      </a>
                    </p>
                    <p className="text-gray-300">
                      By Telegram:{" "}
                      <a
                        href="https://t.me/bitcoindeepa"
                        className="text-bitcoin hover:underline"
                      >
                        t.me/bitcoindeepa
                      </a>
                    </p>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
