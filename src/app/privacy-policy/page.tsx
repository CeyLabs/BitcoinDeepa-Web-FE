import type { Metadata } from "next";
import { pageMetadata } from "@/src/lib/seo";
import Link from "next/link";
import { BrandName } from "@/src/components/brand-provider";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How Bitcoin Deepa collects, uses and protects your personal information across our website, community, events, book orders and BitcoinDeepaBot.",
  path: "/privacy-policy",
});

export default function Privacy() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      <div className="fixed inset-0 z-0 bg-linear-to-b from-zinc-950 via-black to-zinc-950 pointer-events-none"></div>
      <div className="fixed inset-0 z-0 opacity-30 pointer-events-none">
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-full h-[600px] bg-radial-[ellipse_at_center] from-bitcoin/20 via-transparent to-transparent"></div>
      </div>
      <div className="relative z-10">
        <main className="pt-32 pb-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="mb-12 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  <span className="text-white">Privacy</span>
                  <span className="text-bitcoin ml-2">Policy</span>
                </h1>
                <p className="text-gray-400">Last updated: Nov 09, 2026</p>
              </div>

              <div className="space-y-10">
                <section className="bg-zinc-900/50 backdrop-blur-xs border border-zinc-800 rounded-xl p-6 md:p-8">
                  <p className="text-gray-300 mb-4 text-justify">
                    At <BrandName />, we are committed to protecting the privacy
                    and security of our community members’ personal information.
                    This Privacy Policy outlines how we collect, use, and
                    safeguard your information when you visit or interact with
                    our website. By using our website, you consent to the
                    practices described in this policy.
                  </p>
                </section>

                <section className="bg-zinc-900/50 backdrop-blur-xs border border-zinc-800 rounded-xl p-6 md:p-8">
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
                      sign-up, or community participation. This information is
                      collected through the third-party services we use, such as
                      Luma for events and Telegram for our community and
                      BitcoinDeepaBot. Our website itself doesn&apos;t ask you
                      for these details directly.
                    </li>
                    <li>
                      <span className="font-semibold text-bitcoin">
                        Identity verification (KYC) information:
                      </span>{" "}
                      if you buy or sell Bitcoin through BitcoinDeepaBot, we
                      collect the details needed to verify your identity, such
                      as your name and identity document details. This is done
                      through a third-party verification provider.
                      {/* TODO: review - list exactly what KYC collects (ID type, selfie, date of birth, address?), name the provider if required, and state how long KYC data is kept */}
                    </li>
                    <li>
                      <span className="font-semibold text-bitcoin">
                        Payment and billing information:
                      </span>{" "}
                      if you make purchases, payment details are securely
                      handled by internet payment gateways (IPGs).
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

                <section className="bg-zinc-900/50 backdrop-blur-xs border border-zinc-800 rounded-xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Use of Information
                  </h2>
                  <ul className="list-disc pl-6 text-gray-300 space-y-2 text-justify">
                    <li>
                      To process and fulfill your event registrations or
                      purchases.
                    </li>
                    <li>
                      To verify your identity before you buy or sell Bitcoin
                      through BitcoinDeepaBot, and to meet our legal and
                      compliance requirements.
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

                <section className="bg-zinc-900/50 backdrop-blur-xs border border-zinc-800 rounded-xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Information Sharing
                  </h2>
                  <ul className="list-disc pl-6 text-gray-300 space-y-2 text-justify">
                    <li>
                      <span className="font-semibold text-bitcoin">
                        Trusted service providers:
                      </span>{" "}
                      We may share your information with third-party providers
                      who assist us in operating our website, processing
                      payments, verifying your identity, and delivering
                      services. These providers are
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
                  <p className="text-gray-300 mt-2 text-justify">
                    We do not sell, trade, or otherwise transfer your personal
                    information to third parties without your consent, except as
                    described above.
                  </p>
                </section>

                <section className="bg-zinc-900/50 backdrop-blur-xs border border-zinc-800 rounded-xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Data Security
                  </h2>
                  <p className="text-gray-300 text-justify">
                    We implement industry-standard security measures to protect
                    your personal information from unauthorized access,
                    alteration, disclosure, or destruction. However, please be
                    aware that no method of transmission over the internet or
                    electronic storage is 100% secure, and we cannot guarantee
                    absolute security.
                  </p>
                </section>

                <section className="bg-zinc-900/50 backdrop-blur-xs border border-zinc-800 rounded-xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Cookies and Tracking Technologies
                  </h2>
                  <p className="text-gray-300 mb-2 text-justify">
                    We use cookies and similar technologies to enhance your
                    browsing experience, analyze website traffic, and gather
                    information about your preferences and interactions with our
                    website.
                  </p>
                  <p className="text-gray-300 text-justify">
                    You have the option to disable cookies through your browser
                    settings, but this may limit certain features and
                    functionality of our website.
                  </p>
                </section>

                <section className="bg-zinc-900/50 backdrop-blur-xs border border-zinc-800 rounded-xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Changes to the Privacy Policy
                  </h2>
                  <p className="text-gray-300 text-justify">
                    We reserve the right to update or modify this Privacy Policy
                    at any time. Any changes will be posted on this page with a
                    revised “last updated” date. We encourage you to review this
                    Privacy Policy periodically to stay informed about how we
                    collect, use, and protect your information.
                  </p>
                </section>

                <section className="bg-zinc-900/50 backdrop-blur-xs border border-zinc-800 rounded-xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Contact Us
                  </h2>
                  <p className="text-gray-300 mb-2 text-justify">
                    If you have any questions, concerns, or requests regarding
                    our Privacy Policy or the handling of your personal
                    information, please contact us. You can also read our{" "}
                    <Link href="/terms" className="text-bitcoin hover:underline">
                      Terms of Service
                    </Link>
                    .
                  </p>
                  <div className="bg-zinc-800/50 p-4 rounded-lg inline-block">
                    <p className="text-gray-300">
                      By email:{" "}
                      <a
                        href="mailto:hello@bitcoindeepa.com"
                        className="text-bitcoin hover:underline"
                      >
                        hello@bitcoindeepa.com
                      </a>
                    </p>
                    <p className="text-gray-300">
                      By visiting our website:{" "}
                      <a
                        href="https://bitcoindeepa.com/"
                        className="text-bitcoin hover:underline"
                      >
                        bitcoindeepa.com
                      </a>
                    </p>
                    <p className="text-gray-300">
                      By Telegram Community:{" "}
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
      </div>
    </div>
  );
}
