import type { Metadata } from "next";
import Link from "next/link";
import { BrandName } from "@/src/components/brand-provider";
import { LegalPage, LegalSection } from "@/src/components/legal/legal-page";
import { pageMetadata } from "@/src/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Return Policy",
  description:
    "How returns, replacements and refunds work for Bitcoin Deepa orders, including the Sinhala edition of The Bullish Case for Bitcoin and BitcoinDeepaBot trades.",
  path: "/return-policy",
});

const SECTIONS = [
  { id: "damaged-or-wrong-items", title: "Damaged or Wrong Items" },
  { id: "change-of-mind-returns", title: "Change of Mind Returns" },
  { id: "order-cancellations", title: "Order Cancellations" },
  {
    id: "out-of-stock-and-undelivered-orders",
    title: "Out of Stock and Undelivered Orders",
  },
  {
    id: "buying-and-selling-bitcoin-with-bitcoindeepabot",
    title: "Buying and Selling Bitcoin with BitcoinDeepaBot",
  },
  { id: "how-refunds-work", title: "How Refunds Work" },
  { id: "changes-to-this-policy", title: "Changes to This Policy" },
  { id: "contact-us", title: "Contact Us" },
];

export default function ReturnPolicy() {
  return (
    <LegalPage
      title="Return Policy"
      tag="Orders & Refunds"
      updated="Nov 09, 2026"
      updatedIso="2026-11-09"
      path="/return-policy"
      sections={SECTIONS}
    >
      <div>
        <p>
          We want you to be happy with your order from <BrandName />. This
          Return Policy explains what to do if something goes wrong with a
          purchase, such as the Sinhala edition of &quot;The Bullish Case for
          Bitcoin&quot; (බිට්කොයින් පෙළහර), or when you buy or sell Bitcoin
          through BitcoinDeepaBot.
        </p>
        <p>
          This policy is part of our <Link href="/terms">Terms of Service</Link>
          .
        </p>
      </div>

      <LegalSection id={SECTIONS[0].id} title={SECTIONS[0].title}>
        <p>
          If your book arrives damaged, has printing faults, or you receive the
          wrong item, we&apos;ll replace it or give you a refund. To help us
          sort it out quickly:
        </p>
        <ul>
          <li>
            Contact us as soon as possible after your order arrives.
            {/* TODO: review - set the reporting window (for example, within X days of delivery) */}
          </li>
          <li>
            Include your name, phone number and payment reference or order
            details.
          </li>
          <li>Send clear photos of the item and the packaging.</li>
        </ul>
        <p>
          We may ask you to send the item back before we send a replacement or
          refund. If the problem was our mistake, we&apos;ll cover the return
          delivery cost.
          {/* TODO: review - confirm who pays return shipping and how items are sent back */}
        </p>
      </LegalSection>

      <LegalSection id={SECTIONS[1].id} title={SECTIONS[1].title}>
        <p>
          Books that arrive in good condition, as ordered, can&apos;t usually be
          returned just because you changed your mind. If you have a special
          case, please get in touch and we&apos;ll do our best to help.
          {/* TODO: review - confirm whether change-of-mind returns are accepted, and on what conditions */}
        </p>
      </LegalSection>

      <LegalSection id={SECTIONS[2].id} title={SECTIONS[2].title}>
        <p>
          If you need to cancel an order, please contact us as soon as possible.
          If your order hasn&apos;t been dispatched yet, we&apos;ll cancel it
          and give you a full refund. Once an order has been dispatched, it
          can&apos;t be cancelled, but the sections above still apply.
          {/* TODO: review - confirm the cancellation rule */}
        </p>
      </LegalSection>

      <LegalSection id={SECTIONS[3].id} title={SECTIONS[3].title}>
        <ul>
          <li>
            <strong>Out of stock:</strong> stock is limited. If we can&apos;t
            fulfil your order, we&apos;ll let you know and give you a full
            refund.
          </li>
          <li>
            <strong>Not delivered:</strong> if your order hasn&apos;t arrived
            within the expected delivery time, contact us and we&apos;ll check
            with the courier. If it was lost in transit, we&apos;ll send a
            replacement or give you a full refund.
            {/* TODO: review - confirm delivery estimate and lost-parcel handling */}
          </li>
        </ul>
      </LegalSection>

      <LegalSection id={SECTIONS[4].id} title={SECTIONS[4].title}>
        <ul>
          <li>
            <strong>Completed trades are final:</strong> once Bitcoin has been
            added to your BitcoinDeepaBot wallet, or the LKR amount for a sale
            has been paid out, the trade can&apos;t be cancelled, returned or
            refunded. This includes when the price of Bitcoin changes after your
            trade.
          </li>
          <li>
            <strong>Trades that don&apos;t go through:</strong> if you&apos;ve
            paid but your trade couldn&apos;t be completed, for example because
            of a payment problem, failed verification or a technical error,
            we&apos;ll refund the LKR amount you paid.
          </li>
          <li>
            <strong>Refunds go to your bank account only:</strong> all refunds
            for Bitcoin trades are made by bank transfer to a bank account in
            your own name. We don&apos;t refund in Bitcoin, in cash, or to
            anyone else&apos;s account. We may ask you to confirm your bank
            details and identity before we send a refund.
            {/* TODO: review - confirm Sri Lankan bank accounts only, account-name matching rule and refund processing time */}
          </li>
          <li>
            <strong>Mistakes when sending Bitcoin:</strong> Bitcoin or Lightning
            payments sent to the wrong address or invoice can&apos;t be
            reversed, and we can&apos;t refund them.
          </li>
        </ul>
        <p>
          To ask about a trade, contact us with your Telegram username and the
          details of the transaction.
        </p>
      </LegalSection>

      <LegalSection id={SECTIONS[5].id} title={SECTIONS[5].title}>
        <p>
          For book orders, approved refunds are sent back to your original
          payment method through the internet payment gateway (IPG). For Bitcoin
          trades, refunds are made to your bank account only, as explained
          above. We&apos;ll confirm with you once a refund has been processed.
        </p>
        <p>
          How long it takes for the money to show in your account depends on
          your bank or card provider.
          {/* TODO: review - confirm refund processing time and whether delivery charges are refunded */}
        </p>
      </LegalSection>

      <LegalSection id={SECTIONS[6].id} title={SECTIONS[6].title}>
        <p>
          We may update this Return Policy from time to time. Any changes will
          be posted on this page with a new &quot;Last updated&quot; date. The
          version in place when you placed your order is the one that applies to
          that order.
        </p>
      </LegalSection>

      <LegalSection id={SECTIONS[7].id} title={SECTIONS[7].title}>
        <p>
          For returns, refunds or any questions about your order, please contact
          us:
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
