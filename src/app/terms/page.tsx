import type { Metadata } from "next";
import { pageMetadata } from "@/src/lib/seo";
import Link from "next/link";
import { BrandName } from "@/src/components/brand-provider";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Service",
  description:
    "The rules for using the Bitcoin Deepa website, joining our Sri Lankan Bitcoin community, attending events, ordering books and trading through BitcoinDeepaBot.",
  path: "/terms",
});

export default function Terms() {
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
                  <span className="text-white">Terms</span>
                  <span className="text-bitcoin ml-2">of Service</span>
                </h1>
                <p className="text-gray-400">Last updated: Nov 09, 2026</p>
              </div>

              <div className="space-y-10">
                <section className="bg-zinc-900/50 backdrop-blur-xs border border-zinc-800 rounded-xl p-6 md:p-8">
                  <p className="text-gray-300 mb-4 text-justify">
                    Welcome to <BrandName />. These Terms of Service explain the
                    rules for using our website, joining our community and
                    taking part in the things we do, like events, book orders
                    and buying or selling Bitcoin through BitcoinDeepaBot. By
                    using our website, you agree to these terms. If
                    you don&apos;t agree with them, please don&apos;t use the
                    site.
                  </p>
                  <p className="text-gray-300 text-justify">
                    These terms work together with our{" "}
                    <Link
                      href="/privacy-policy"
                      className="text-bitcoin hover:underline"
                    >
                      Privacy Policy
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/return-policy"
                      className="text-bitcoin hover:underline"
                    >
                      Return Policy
                    </Link>
                    , so please read those too.
                  </p>
                </section>

                <section className="bg-zinc-900/50 backdrop-blur-xs border border-zinc-800 rounded-xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    About Us
                  </h2>
                  <p className="text-gray-300 text-justify">
                    <BrandName /> is a Sri Lankan Bitcoin community. We focus on
                    education, meetups and events, and on sharing helpful
                    Bitcoin resources in Sinhala and English. Our goal is to
                    help more people in Sri Lanka understand Bitcoin and use it
                    safely.
                  </p>
                </section>

                <section className="bg-zinc-900/50 backdrop-blur-xs border border-zinc-800 rounded-xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Educational Purpose Only
                  </h2>
                  <p className="text-gray-300 mb-2 text-justify">
                    Everything we share, including articles, books, events,
                    videos and community discussions, is for educational
                    purposes only.
                  </p>
                  <p className="text-gray-300 text-justify">
                    Nothing on this website or in our community is financial,
                    investment, legal or tax advice. We don&apos;t tell anyone
                    what to buy, sell or hold. Always do your own research, and
                    speak to a qualified professional before making financial
                    decisions.
                  </p>
                </section>

                <section className="bg-zinc-900/50 backdrop-blur-xs border border-zinc-800 rounded-xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Understanding Bitcoin Risks
                  </h2>
                  <p className="text-gray-300 mb-4 text-justify">
                    Bitcoin is exciting, but it comes with real risks. By using
                    our resources, you understand that:
                  </p>
                  <ul className="list-disc pl-6 text-gray-300 space-y-2 text-justify">
                    <li>
                      <span className="font-semibold text-bitcoin">
                        Prices are volatile:
                      </span>{" "}
                      the price of Bitcoin can rise or fall sharply in a short
                      time, and you could lose money.
                    </li>
                    <li>
                      <span className="font-semibold text-bitcoin">
                        Transactions are final:
                      </span>{" "}
                      once a Bitcoin or Lightning payment is sent, it usually
                      can&apos;t be reversed. Double check addresses and amounts
                      before you send.
                    </li>
                    <li>
                      <span className="font-semibold text-bitcoin">
                        Your keys are your responsibility:
                      </span>{" "}
                      you are responsible for your own wallets, private keys and
                      seed phrases. If they are lost or stolen, we can&apos;t
                      recover them for you.
                    </li>
                    <li>
                      <span className="font-semibold text-bitcoin">
                        We will never ask for your keys:
                      </span>{" "}
                      no one from <BrandName /> will ever ask for your private
                      keys, seed phrase or wallet passwords. Anyone who does is
                      trying to scam you.
                    </li>
                    <li>
                      <span className="font-semibold text-bitcoin">
                        Watch out for scams:
                      </span>{" "}
                      be careful of impersonators, fake admins, &quot;guaranteed
                      returns&quot; and investment schemes. If something feels
                      off, ask in the community or contact us directly.
                    </li>
                  </ul>
                </section>

                <section className="bg-zinc-900/50 backdrop-blur-xs border border-zinc-800 rounded-xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Community Guidelines
                  </h2>
                  <p className="text-gray-300 mb-4 text-justify">
                    We want our Telegram community and events to be friendly,
                    welcoming and useful for everyone. When you take part,
                    please:
                  </p>
                  <ul className="list-disc pl-6 text-gray-300 space-y-2 text-justify">
                    <li>Treat other members with respect, even when you disagree.</li>
                    <li>
                      Don&apos;t post spam, scams, referral links or unsolicited
                      promotions.
                    </li>
                    <li>Don&apos;t shill tokens, altcoins or investment schemes.</li>
                    <li>Don&apos;t harass, threaten or abuse anyone.</li>
                    <li>Don&apos;t use our spaces for anything illegal.</li>
                  </ul>
                  <p className="text-gray-300 mt-4 text-justify">
                    We may remove messages, or remove or block members, who
                    break these guidelines. We decide this at our own discretion
                    to keep the community safe.
                  </p>
                </section>

                <section className="bg-zinc-900/50 backdrop-blur-xs border border-zinc-800 rounded-xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Events and Registrations
                  </h2>
                  <p className="text-gray-300 mb-2 text-justify">
                    Our events are listed and managed through Luma at{" "}
                    <a
                      href="https://lu.ma/bitcoindeepa"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-bitcoin hover:underline"
                    >
                      lu.ma/bitcoindeepa
                    </a>
                    . When you register for an event, Luma&apos;s own terms and
                    privacy policy also apply.
                  </p>
                  <p className="text-gray-300 text-justify">
                    Event dates, times, venues, speakers and agendas may change,
                    and events may sometimes be postponed or cancelled.
                    We&apos;ll do our best to let registered attendees know in
                    advance. Please follow the venue rules and our community
                    guidelines while attending.
                  </p>
                </section>

                <section className="bg-zinc-900/50 backdrop-blur-xs border border-zinc-800 rounded-xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Book Orders and Purchases
                  </h2>
                  <p className="text-gray-300 mb-4 text-justify">
                    You can order the Sinhala edition of &quot;The Bullish Case
                    for Bitcoin&quot; (බිට්කොයින් පෙළහර) through our website.
                    When you place an order:
                  </p>
                  <ul className="list-disc pl-6 text-gray-300 space-y-2 text-justify">
                    <li>
                      <span className="font-semibold text-bitcoin">Prices:</span>{" "}
                      all prices are shown in Sri Lankan Rupees (LKR). Prices
                      and promotional offers may change at any time, but the
                      price you pay is the one shown when you place your order.
                    </li>
                    <li>
                      <span className="font-semibold text-bitcoin">
                        Payments:
                      </span>{" "}
                      payments are processed securely through internet payment
                      gateways (IPGs). We don&apos;t see or store your full card
                      details.
                    </li>
                    <li>
                      <span className="font-semibold text-bitcoin">
                        Delivery:
                      </span>{" "}
                      we currently deliver within Sri Lanka only. Delivery times
                      shown on the website are estimates, and delays can
                      sometimes happen.
                      {/* TODO: review - confirm delivery areas, courier, delivery charges and the 5-7 business day estimate shown on the order section */}
                    </li>
                    <li>
                      <span className="font-semibold text-bitcoin">
                        Availability:
                      </span>{" "}
                      stock is limited. If we can&apos;t fulfil your order,
                      we&apos;ll contact you and give you a full refund.
                    </li>
                    <li>
                      <span className="font-semibold text-bitcoin">
                        Returns and refunds:
                      </span>{" "}
                      if your book arrives damaged, or you receive the wrong
                      item, please contact us and we&apos;ll make it right. Full
                      details are in our{" "}
                      <Link
                        href="/return-policy"
                        className="text-bitcoin hover:underline"
                      >
                        Return Policy
                      </Link>
                      .
                      {/* TODO: review - keep in sync with /return-policy once refund and return windows are confirmed */}
                    </li>
                  </ul>
                </section>

                <section className="bg-zinc-900/50 backdrop-blur-xs border border-zinc-800 rounded-xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Buying and Selling Bitcoin with BitcoinDeepaBot
                  </h2>
                  <p className="text-gray-300 mb-4 text-justify">
                    You can buy and sell Bitcoin (BTC) with Sri Lankan Rupees
                    through BitcoinDeepaBot, our Telegram bot and mini app at{" "}
                    <a
                      href="https://t.me/bitcoindeepabot"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-bitcoin hover:underline"
                    >
                      t.me/bitcoindeepabot
                    </a>
                    . When you use it to buy or sell:
                  </p>
                  <ul className="list-disc pl-6 text-gray-300 space-y-2 text-justify">
                    <li>
                      <span className="font-semibold text-bitcoin">
                        Identity verification:
                      </span>{" "}
                      you&apos;ll need to complete identity verification (KYC)
                      before you can buy or sell. We may ask for more
                      information, or limit or decline a transaction, when we
                      need to for legal or compliance reasons.
                      {/* TODO: review - confirm KYC requirements, minimum age and who is eligible (Sri Lankan residents only?) */}
                    </li>
                    <li>
                      <span className="font-semibold text-bitcoin">
                        Prices and fees:
                      </span>{" "}
                      prices are shown in LKR and follow the market, so they
                      change all the time. The price and any fees are shown
                      before you confirm, and a quote is only valid for a short
                      time.
                      {/* TODO: review - confirm pricing source, fee structure, quote validity and any minimum or maximum amounts */}
                    </li>
                    <li>
                      <span className="font-semibold text-bitcoin">
                        Payments and payouts:
                      </span>{" "}
                      LKR payments for buying Bitcoin are processed through
                      internet payment gateways (IPGs). When you sell, we send the LKR amount to the
                      payout method you provide.
                      {/* TODO: review - confirm how sell payouts are made (bank transfer?) and how long they take */}
                    </li>
                    <li>
                      <span className="font-semibold text-bitcoin">
                        No card payments:
                      </span>{" "}
                      in line with{" "}
                      <a
                        href="https://www.cbsl.gov.lk/en/news/public-awareness-on-risks-in-investing-in-virtual-currencies-in-sri-lanka"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-bitcoin hover:underline"
                      >
                        Central Bank of Sri Lanka guidance
                      </a>{" "}
                      on virtual currencies, debit and credit cards can&apos;t
                      be used to buy Bitcoin. Please use one of the non-card
                      payment options shown in the bot.
                      {/* TODO: review - list the accepted non-card payment methods (bank transfer, etc.) */}
                    </li>
                    <li>
                      <span className="font-semibold text-bitcoin">
                        Trades are final:
                      </span>{" "}
                      once a buy or sell is confirmed, it can&apos;t be cancelled
                      or reversed. We don&apos;t offer refunds because the
                      price of Bitcoin went up or down after your trade. If a
                      trade can&apos;t be completed, any refund is made to your
                      bank account only, as explained in our{" "}
                      <Link
                        href="/return-policy"
                        className="text-bitcoin hover:underline"
                      >
                        Return Policy
                      </Link>
                      .
                    </li>
                    <li>
                      <span className="font-semibold text-bitcoin">
                        Your bot wallet:
                      </span>{" "}
                      Bitcoin you buy is added to your BitcoinDeepaBot wallet.
                      Anyone with access to your Telegram account may be able
                      to use your wallet, so keep your Telegram account secure
                      and turn on two-step verification. For larger amounts,
                      consider moving your Bitcoin to a wallet where you hold
                      the keys yourself.
                      {/* TODO: review - confirm custody arrangement (LNbits) and withdrawal options */}
                    </li>
                    <li>
                      <span className="font-semibold text-bitcoin">
                        Fair use:
                      </span>{" "}
                      use only your own money and accounts, and don&apos;t use
                      the bot for fraud, money laundering or anything illegal.
                      We may suspend or close accounts that break these rules,
                      and we may report suspicious activity to the authorities
                      where the law requires it.
                    </li>
                  </ul>
                  <p className="text-gray-300 mt-4 text-justify">
                    Choosing to buy or sell Bitcoin is your own decision. Please
                    read the Educational Purpose Only and Understanding Bitcoin
                    Risks sections above before you trade.
                  </p>
                </section>

                <section className="bg-zinc-900/50 backdrop-blur-xs border border-zinc-800 rounded-xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Third-Party Services and Links
                  </h2>
                  <p className="text-gray-300 mb-4 text-justify">
                    Our website links to, and works with, services run by other
                    people and companies. These include:
                  </p>
                  <ul className="list-disc pl-6 text-gray-300 space-y-2 text-justify">
                    <li>Our Telegram community and channels</li>
                    <li>
                      BitcoinDeepaBot, our Telegram Lightning wallet and tip
                      bot, and the wallet provider it runs on
                      {/* TODO: review - confirm whether the bot needs its own separate terms */}
                    </li>
                    <li>Luma, for event listings and registrations</li>
                    <li>Our blog and other educational resources</li>
                    <li>Internet payment gateways (IPGs) and other payment processors</li>
                    <li>Other external websites we link to</li>
                  </ul>
                  <p className="text-gray-300 mt-4 text-justify">
                    Each of these services has its own terms and privacy policy.
                    We don&apos;t control them and we aren&apos;t responsible
                    for their content, availability or how they handle your
                    information. Please review their terms before you use them.
                  </p>
                </section>

                <section className="bg-zinc-900/50 backdrop-blur-xs border border-zinc-800 rounded-xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Intellectual Property
                  </h2>
                  <p className="text-gray-300 mb-2 text-justify">
                    The source code of this website is open source and released
                    under the MIT License. You can find the full license on our{" "}
                    <Link href="/license" className="text-bitcoin hover:underline">
                      License
                    </Link>{" "}
                    page.
                  </p>
                  <p className="text-gray-300 text-justify">
                    Our name, logo and branding, and content such as the Sinhala
                    book translation, articles and event materials, belong to{" "}
                    <BrandName /> or their respective owners. Please don&apos;t
                    copy, republish or sell them without permission. Sharing
                    links to our content is always welcome.
                    {/* TODO: review - confirm ownership and reuse terms for the book translation and blog content */}
                  </p>
                </section>

                <section className="bg-zinc-900/50 backdrop-blur-xs border border-zinc-800 rounded-xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Disclaimer of Warranties
                  </h2>
                  <p className="text-gray-300 text-justify">
                    Our website and everything on it is provided &quot;as
                    is&quot; and &quot;as available&quot;. We work hard to keep
                    information accurate and up to date, but we can&apos;t
                    promise that it is always complete, correct or current, or
                    that the website will always be available or free of
                    errors. Price data and conversion tools are provided for
                    reference only.
                  </p>
                </section>

                <section className="bg-zinc-900/50 backdrop-blur-xs border border-zinc-800 rounded-xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Limitation of Liability
                  </h2>
                  <p className="text-gray-300 text-justify">
                    To the fullest extent allowed by law, <BrandName /> and its
                    organisers, volunteers and contributors are not liable for
                    any indirect, incidental or consequential loss or damage
                    that comes from using our website, community or resources.
                    This includes any loss of funds, Bitcoin, profits or data,
                    or any decisions you make based on our content. Nothing in
                    these terms limits any rights you have that can&apos;t be
                    excluded under Sri Lankan law.
                  </p>
                </section>

                <section className="bg-zinc-900/50 backdrop-blur-xs border border-zinc-800 rounded-xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Governing Law
                  </h2>
                  <p className="text-gray-300 text-justify">
                    These terms are governed by the laws of Sri Lanka. Any
                    disputes relating to these terms or to our website will be
                    handled by the courts of Sri Lanka.
                  </p>
                </section>

                <section className="bg-zinc-900/50 backdrop-blur-xs border border-zinc-800 rounded-xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Changes to These Terms
                  </h2>
                  <p className="text-gray-300 text-justify">
                    We may update these Terms of Service from time to time. When
                    we do, we&apos;ll post the new version on this page with a
                    new &quot;Last updated&quot; date. If you keep using our
                    website after changes are posted, it means you accept the
                    updated terms.
                  </p>
                </section>

                <section className="bg-zinc-900/50 backdrop-blur-xs border border-zinc-800 rounded-xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Contact Us
                  </h2>
                  <p className="text-gray-300 mb-2 text-justify">
                    If you have any questions about these terms, please contact
                    us. You can also read our{" "}
                    <Link
                      href="/privacy-policy"
                      className="text-bitcoin hover:underline"
                    >
                      Privacy Policy
                    </Link>{" "}
                    to learn how we handle your information.
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
