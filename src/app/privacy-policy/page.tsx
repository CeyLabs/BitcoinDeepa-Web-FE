import type { Metadata } from "next";
import Link from "next/link";
import { BrandName } from "@/src/components/brand-provider";
import { LegalPage, LegalSection } from "@/src/components/legal/legal-page";
import { pageMetadata } from "@/src/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How Bitcoin Deepa collects, uses and protects your personal information across our website, community, events, book orders and BitcoinDeepaBot.",
  path: "/privacy-policy",
});

const SECTIONS = [
  { id: "information-we-collect", title: "Information We Collect" },
  { id: "use-of-information", title: "Use of Information" },
  { id: "information-sharing", title: "Information Sharing" },
  { id: "data-security", title: "Data Security" },
  {
    id: "cookies-and-tracking-technologies",
    title: "Cookies and Tracking Technologies",
  },
  {
    id: "changes-to-the-privacy-policy",
    title: "Changes to the Privacy Policy",
  },
  { id: "contact-us", title: "Contact Us" },
];

export default function Privacy() {
  return (
    <LegalPage
      title="Privacy Policy"
      tag="Data & Privacy"
      updated="Nov 09, 2026"
      updatedIso="2026-11-09"
      path="/privacy-policy"
      sections={SECTIONS}
    >
      <div>
        <p>
          At <BrandName />, we are committed to protecting the privacy and
          security of our community members’ personal information. This Privacy
          Policy outlines how we collect, use, and safeguard your information
          when you visit or interact with our website. By using our website, you
          consent to the practices described in this policy.
        </p>
      </div>

      <LegalSection id={SECTIONS[0].id} title={SECTIONS[0].title}>
        <ul>
          <li>
            <strong>Personal identification information:</strong> such as your
            name, email address, and phone number, provided voluntarily by you
            during registration, event sign-up, or community participation. This
            information is collected through the third-party services we use,
            such as Luma for events and Telegram for our community and
            BitcoinDeepaBot. Our website itself doesn&apos;t ask you for these
            details directly.
          </li>
          <li>
            <strong>Identity verification (KYC) information:</strong> if you buy
            or sell Bitcoin through BitcoinDeepaBot, we collect the details
            needed to verify your identity, such as your name and identity
            document details. This is done through a third-party verification
            provider.
            {/* TODO: review - list exactly what KYC collects (ID type, selfie, date of birth, address?), name the provider if required, and state how long KYC data is kept */}
          </li>
          <li>
            <strong>Payment and billing information:</strong> if you make
            purchases, payment details are securely handled by internet payment
            gateways (IPGs).
          </li>
          <li>
            <strong>Browsing information:</strong> such as your IP address,
            browser type, and device information, collected automatically using
            cookies and similar technologies.
          </li>
        </ul>
      </LegalSection>

      <LegalSection id={SECTIONS[1].id} title={SECTIONS[1].title}>
        <ul>
          <li>To process and fulfill your event registrations or purchases.</li>
          <li>
            To verify your identity before you buy or sell Bitcoin through
            BitcoinDeepaBot, and to meet our legal and compliance requirements.
          </li>
          <li>
            To communicate with you, provide support, and respond to inquiries.
          </li>
          <li>
            To personalize your experience and present relevant resources or
            promotions.
          </li>
          <li>
            To improve our website, events, and community services based on your
            feedback and usage patterns.
          </li>
          <li>
            To detect and prevent fraud, unauthorized activities, and abuse of
            our website.
          </li>
        </ul>
      </LegalSection>

      <LegalSection id={SECTIONS[2].id} title={SECTIONS[2].title}>
        <ul>
          <li>
            <strong>Trusted service providers:</strong> We may share your
            information with third-party providers who assist us in operating
            our website, processing payments, verifying your identity, and
            delivering services. These providers are contractually obligated to
            handle your data securely and confidentially.
          </li>
          <li>
            <strong>Legal requirements:</strong> We may disclose your
            information if required to do so by law or in response to valid
            legal requests or orders.
          </li>
        </ul>
        <p>
          We do not sell, trade, or otherwise transfer your personal information
          to third parties without your consent, except as described above.
        </p>
      </LegalSection>

      <LegalSection id={SECTIONS[3].id} title={SECTIONS[3].title}>
        <p>
          We implement industry-standard security measures to protect your
          personal information from unauthorized access, alteration, disclosure,
          or destruction. However, please be aware that no method of
          transmission over the internet or electronic storage is 100% secure,
          and we cannot guarantee absolute security.
        </p>
      </LegalSection>

      <LegalSection id={SECTIONS[4].id} title={SECTIONS[4].title}>
        <p>
          We use cookies and similar technologies to enhance your browsing
          experience, analyze website traffic, and gather information about your
          preferences and interactions with our website.
        </p>
        <p>
          You have the option to disable cookies through your browser settings,
          but this may limit certain features and functionality of our website.
        </p>
      </LegalSection>

      <LegalSection id={SECTIONS[5].id} title={SECTIONS[5].title}>
        <p>
          We reserve the right to update or modify this Privacy Policy at any
          time. Any changes will be posted on this page with a revised “last
          updated” date. We encourage you to review this Privacy Policy
          periodically to stay informed about how we collect, use, and protect
          your information.
        </p>
      </LegalSection>

      <LegalSection id={SECTIONS[6].id} title={SECTIONS[6].title}>
        <p>
          If you have any questions, concerns, or requests regarding our Privacy
          Policy or the handling of your personal information, please contact
          us. You can also read our <Link href="/terms">Terms of Service</Link>.
        </p>
        <div className="legal-callout">
          <p>
            By email:{" "}
            <a href="mailto:hello@bitcoindeepa.com">hello@bitcoindeepa.com</a>
          </p>
          <p>
            By visiting our website:{" "}
            <a href="https://bitcoindeepa.com/">bitcoindeepa.com</a>
          </p>
          <p>
            By Telegram Community:{" "}
            <a href="https://t.me/bitcoindeepa">t.me/bitcoindeepa</a>
          </p>
        </div>
      </LegalSection>
    </LegalPage>
  );
}
