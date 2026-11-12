import type { Metadata } from "next";
import Link from "next/link";
import { BrandName } from "@/src/components/brand-provider";
import { LegalPage, LegalSection } from "@/src/components/legal/legal-page";
import { pageMetadata } from "@/src/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Service",
  description:
    "The rules for using the Bitcoin Deepa website, joining our Sri Lankan Bitcoin community, attending events, ordering books and trading through BitcoinDeepaBot.",
  path: "/terms",
});

const SECTIONS = [
  { id: "about-us", title: "About Us" },
  { id: "educational-purpose-only", title: "Educational Purpose Only" },
  { id: "understanding-bitcoin-risks", title: "Understanding Bitcoin Risks" },
  { id: "community-guidelines", title: "Community Guidelines" },
  { id: "events-and-registrations", title: "Events and Registrations" },
  { id: "book-orders-and-purchases", title: "Book Orders and Purchases" },
  {
    id: "buying-and-selling-bitcoin-with-bitcoindeepabot",
    title: "Buying and Selling Bitcoin with BitcoinDeepaBot",
  },
  {
    id: "third-party-services-and-links",
    title: "Third-Party Services and Links",
  },
  { id: "intellectual-property", title: "Intellectual Property" },
  { id: "disclaimer-of-warranties", title: "Disclaimer of Warranties" },
  { id: "limitation-of-liability", title: "Limitation of Liability" },
  { id: "governing-law", title: "Governing Law" },
  { id: "changes-to-these-terms", title: "Changes to These Terms" },
  { id: "contact-us", title: "Contact Us" },
];

export default function Terms() {
  return (
    <LegalPage
      title="Terms of Service"
      tag="Website & Community"
      updated="Nov 09, 2026"
      updatedIso="2026-11-09"
      path="/terms"
      sections={SECTIONS}
    >
      <div>
        <p>
          Welcome to <BrandName />. These Terms of Service explain the rules for
          using our website, joining our community and taking part in the things
          we do, like events, book orders and buying or selling Bitcoin through
          BitcoinDeepaBot. By using our website, you agree to these terms. If
          you don&apos;t agree with them, please don&apos;t use the site.
        </p>
        <p>
          These terms work together with our{" "}
          <Link href="/privacy-policy">Privacy Policy</Link> and{" "}
          <Link href="/return-policy">Return Policy</Link>, so please read those
          too.
        </p>
      </div>

      <LegalSection id={SECTIONS[0].id} title={SECTIONS[0].title}>
        <p>
          <BrandName /> is a Sri Lankan Bitcoin community. We focus on
          education, meetups and events, and on sharing helpful Bitcoin
          resources in Sinhala and English. Our goal is to help more people in
          Sri Lanka understand Bitcoin and use it safely.
        </p>
      </LegalSection>

      <LegalSection id={SECTIONS[1].id} title={SECTIONS[1].title}>
        <p>
          Everything we share, including articles, books, events, videos and
          community discussions, is for educational purposes only.
        </p>
        <p>
          Nothing on this website or in our community is financial, investment,
          legal or tax advice. We don&apos;t tell anyone what to buy, sell or
          hold. Always do your own research, and speak to a qualified
          professional before making financial decisions.
        </p>
      </LegalSection>

      <LegalSection id={SECTIONS[2].id} title={SECTIONS[2].title}>
        <p>
          Bitcoin is exciting, but it comes with real risks. By using our
          resources, you understand that:
        </p>
        <ul>
          <li>
            <strong>Prices are volatile:</strong> the price of Bitcoin can rise
            or fall sharply in a short time, and you could lose money.
          </li>
          <li>
            <strong>Transactions are final:</strong> once a Bitcoin or Lightning
            payment is sent, it usually can&apos;t be reversed. Double check
            addresses and amounts before you send.
          </li>
          <li>
            <strong>Your keys are your responsibility:</strong> you are
            responsible for your own wallets, private keys and seed phrases. If
            they are lost or stolen, we can&apos;t recover them for you.
          </li>
          <li>
            <strong>We will never ask for your keys:</strong> no one from{" "}
            <BrandName /> will ever ask for your private keys, seed phrase or
            wallet passwords. Anyone who does is trying to scam you.
          </li>
          <li>
            <strong>Watch out for scams:</strong> be careful of impersonators,
            fake admins, &quot;guaranteed returns&quot; and investment schemes.
            If something feels off, ask in the community or contact us directly.
          </li>
        </ul>
      </LegalSection>

      <LegalSection id={SECTIONS[3].id} title={SECTIONS[3].title}>
        <p>
          We want our Telegram community and events to be friendly, welcoming
          and useful for everyone. When you take part, please:
        </p>
        <ul>
          <li>Treat other members with respect, even when you disagree.</li>
          <li>
            Don&apos;t post spam, scams, referral links or unsolicited
            promotions.
          </li>
          <li>Don&apos;t shill tokens, altcoins or investment schemes.</li>
          <li>Don&apos;t harass, threaten or abuse anyone.</li>
          <li>Don&apos;t use our spaces for anything illegal.</li>
        </ul>
        <p>
          We may remove messages, or remove or block members, who break these
          guidelines. We decide this at our own discretion to keep the community
          safe.
        </p>
      </LegalSection>

      <LegalSection id={SECTIONS[4].id} title={SECTIONS[4].title}>
        <p>
          Our events are listed and managed through Luma at{" "}
          <a
            href="https://lu.ma/bitcoindeepa"
            target="_blank"
            rel="noopener noreferrer"
          >
            lu.ma/bitcoindeepa
          </a>
          . When you register for an event, Luma&apos;s own terms and privacy
          policy also apply.
        </p>
        <p>
          Event dates, times, venues, speakers and agendas may change, and
          events may sometimes be postponed or cancelled. We&apos;ll do our best
          to let registered attendees know in advance. Please follow the venue
          rules and our community guidelines while attending.
        </p>
      </LegalSection>

      <LegalSection id={SECTIONS[5].id} title={SECTIONS[5].title}>
        <p>
          You can order the Sinhala edition of &quot;The Bullish Case for
          Bitcoin&quot; (බිට්කොයින් පෙළහර) through our website. When you place
          an order:
        </p>
        <ul>
          <li>
            <strong>Prices:</strong> all prices are shown in Sri Lankan Rupees
            (LKR). Prices and promotional offers may change at any time, but the
            price you pay is the one shown when you place your order.
          </li>
          <li>
            <strong>Payments:</strong> payments are processed securely through
            internet payment gateways (IPGs). We don&apos;t see or store your
            full card details.
          </li>
          <li>
            <strong>Delivery:</strong> we currently deliver within Sri Lanka
            only. Delivery times shown on the website are estimates, and delays
            can sometimes happen.
            {/* TODO: review - confirm delivery areas, courier, delivery charges and the 5-7 business day estimate shown on the order section */}
          </li>
          <li>
            <strong>Availability:</strong> stock is limited. If we can&apos;t
            fulfil your order, we&apos;ll contact you and give you a full
            refund.
          </li>
          <li>
            <strong>Returns and refunds:</strong> if your book arrives damaged,
            or you receive the wrong item, please contact us and we&apos;ll make
            it right. Full details are in our{" "}
            <Link href="/return-policy">Return Policy</Link>.
            {/* TODO: review - keep in sync with /return-policy once refund and return windows are confirmed */}
          </li>
        </ul>
      </LegalSection>

      <LegalSection id={SECTIONS[6].id} title={SECTIONS[6].title}>
        <p>
          You can buy and sell Bitcoin (BTC) with Sri Lankan Rupees through
          BitcoinDeepaBot, our Telegram bot and mini app at{" "}
          <a
            href="https://t.me/bitcoindeepabot"
            target="_blank"
            rel="noopener noreferrer"
          >
            t.me/bitcoindeepabot
          </a>
          . When you use it to buy or sell:
        </p>
        <ul>
          <li>
            <strong>Identity verification:</strong> you&apos;ll need to complete
            identity verification (KYC) before you can buy or sell. We may ask
            for more information, or limit or decline a transaction, when we
            need to for legal or compliance reasons.
            {/* TODO: review - confirm KYC requirements, minimum age and who is eligible (Sri Lankan residents only?) */}
          </li>
          <li>
            <strong>Prices and fees:</strong> prices are shown in LKR and follow
            the market, so they change all the time. The price and any fees are
            shown before you confirm, and a quote is only valid for a short
            time.
            {/* TODO: review - confirm pricing source, fee structure, quote validity and any minimum or maximum amounts */}
          </li>
          <li>
            <strong>Payments and payouts:</strong> LKR payments for buying
            Bitcoin are processed through internet payment gateways (IPGs). When
            you sell, we send the LKR amount to the payout method you provide.
            {/* TODO: review - confirm how sell payouts are made (bank transfer?) and how long they take */}
          </li>
          <li>
            <strong>No card payments:</strong> in line with{" "}
            <a
              href="https://www.cbsl.gov.lk/en/news/public-awareness-on-risks-in-investing-in-virtual-currencies-in-sri-lanka"
              target="_blank"
              rel="noopener noreferrer"
            >
              Central Bank of Sri Lanka guidance
            </a>{" "}
            on virtual currencies, debit and credit cards can&apos;t be used to
            buy Bitcoin. Please use one of the non-card payment options shown in
            the bot.
            {/* TODO: review - list the accepted non-card payment methods (bank transfer, etc.) */}
          </li>
          <li>
            <strong>Trades are final:</strong> once a buy or sell is confirmed,
            it can&apos;t be cancelled or reversed. We don&apos;t offer refunds
            because the price of Bitcoin went up or down after your trade. If a
            trade can&apos;t be completed, any refund is made to your bank
            account only, as explained in our{" "}
            <Link href="/return-policy">Return Policy</Link>.
          </li>
          <li>
            <strong>Your bot wallet:</strong> Bitcoin you buy is added to your
            BitcoinDeepaBot wallet. Anyone with access to your Telegram account
            may be able to use your wallet, so keep your Telegram account secure
            and turn on two-step verification. For larger amounts, consider
            moving your Bitcoin to a wallet where you hold the keys yourself.
            {/* TODO: review - confirm custody arrangement (LNbits) and withdrawal options */}
          </li>
          <li>
            <strong>Fair use:</strong> use only your own money and accounts, and
            don&apos;t use the bot for fraud, money laundering or anything
            illegal. We may suspend or close accounts that break these rules,
            and we may report suspicious activity to the authorities where the
            law requires it.
          </li>
        </ul>
        <p>
          Choosing to buy or sell Bitcoin is your own decision. Please read the
          Educational Purpose Only and Understanding Bitcoin Risks sections
          above before you trade.
        </p>
      </LegalSection>

      <LegalSection id={SECTIONS[7].id} title={SECTIONS[7].title}>
        <p>
          Our website links to, and works with, services run by other people and
          companies. These include:
        </p>
        <ul>
          <li>Our Telegram community and channels</li>
          <li>
            BitcoinDeepaBot, our Telegram Lightning wallet and tip bot, and the
            wallet provider it runs on
            {/* TODO: review - confirm whether the bot needs its own separate terms */}
          </li>
          <li>Luma, for event listings and registrations</li>
          <li>Our blog and other educational resources</li>
          <li>Internet payment gateways (IPGs) and other payment processors</li>
          <li>Other external websites we link to</li>
        </ul>
        <p>
          Each of these services has its own terms and privacy policy. We
          don&apos;t control them and we aren&apos;t responsible for their
          content, availability or how they handle your information. Please
          review their terms before you use them.
        </p>
      </LegalSection>

      <LegalSection id={SECTIONS[8].id} title={SECTIONS[8].title}>
        <p>
          The source code of this website is open source and released under the
          MIT License. You can find the full license on our{" "}
          <Link href="/license">License</Link> page.
        </p>
        <p>
          Our name, logo and branding, and content such as the Sinhala book
          translation, articles and event materials, belong to <BrandName /> or
          their respective owners. Please don&apos;t copy, republish or sell
          them without permission. Sharing links to our content is always
          welcome.
          {/* TODO: review - confirm ownership and reuse terms for the book translation and blog content */}
        </p>
      </LegalSection>

      <LegalSection id={SECTIONS[9].id} title={SECTIONS[9].title}>
        <p>
          Our website and everything on it is provided &quot;as is&quot; and
          &quot;as available&quot;. We work hard to keep information accurate
          and up to date, but we can&apos;t promise that it is always complete,
          correct or current, or that the website will always be available or
          free of errors. Price data and conversion tools are provided for
          reference only.
        </p>
      </LegalSection>

      <LegalSection id={SECTIONS[10].id} title={SECTIONS[10].title}>
        <p>
          To the fullest extent allowed by law, <BrandName /> and its
          organisers, volunteers and contributors are not liable for any
          indirect, incidental or consequential loss or damage that comes from
          using our website, community or resources. This includes any loss of
          funds, Bitcoin, profits or data, or any decisions you make based on
          our content. Nothing in these terms limits any rights you have that
          can&apos;t be excluded under Sri Lankan law.
        </p>
      </LegalSection>

      <LegalSection id={SECTIONS[11].id} title={SECTIONS[11].title}>
        <p>
          These terms are governed by the laws of Sri Lanka. Any disputes
          relating to these terms or to our website will be handled by the
          courts of Sri Lanka.
        </p>
      </LegalSection>

      <LegalSection id={SECTIONS[12].id} title={SECTIONS[12].title}>
        <p>
          We may update these Terms of Service from time to time. When we do,
          we&apos;ll post the new version on this page with a new &quot;Last
          updated&quot; date. If you keep using our website after changes are
          posted, it means you accept the updated terms.
        </p>
      </LegalSection>

      <LegalSection id={SECTIONS[13].id} title={SECTIONS[13].title}>
        <p>
          If you have any questions about these terms, please contact us. You
          can also read our <Link href="/privacy-policy">Privacy Policy</Link>{" "}
          to learn how we handle your information.
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
