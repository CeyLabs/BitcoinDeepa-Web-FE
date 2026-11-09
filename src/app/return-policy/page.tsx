import type { Metadata } from "next";
import Link from "next/link";
import { BrandName } from "@/src/components/brand-provider";

export const metadata: Metadata = {
  title: "Return Policy | Bitcoin Deepa",
  description:
    "Return and Refund Policy for Bitcoin Deepa - Sri Lankan Bitcoin Community",
};

// TODO: review - every time window and refund rule on this page needs sign-off
// before going live. No specific day counts are stated until confirmed.

export default function ReturnPolicy() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-zinc-950 via-black to-zinc-950 pointer-events-none"></div>
      <div className="fixed inset-0 z-0 opacity-30 pointer-events-none">
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-full h-[600px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-bitcoin/20 via-transparent to-transparent"></div>
      </div>
      <div className="relative z-10">
        <main className="pt-32 pb-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="mb-12 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  <span className="text-white">Return</span>
                  <span className="text-bitcoin ml-2">Policy</span>
                </h1>
                <p className="text-gray-400">Last updated: Nov 09, 2026</p>
              </div>

              <div className="space-y-10">
                <section className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl p-6 md:p-8">
                  <p className="text-gray-300 mb-4 text-justify">
                    We want you to be happy with your order from <BrandName />.
                    This Return Policy explains what to do if something goes
                    wrong with a purchase, such as the Sinhala edition of
                    &quot;The Bullish Case for Bitcoin&quot; (බිට්කොයින්
                    පෙළහර), or when you buy or sell Bitcoin through
                    BitcoinDeepaBot.
                  </p>
                  <p className="text-gray-300 text-justify">
                    This policy is part of our{" "}
                    <Link href="/terms" className="text-bitcoin hover:underline">
                      Terms of Service
                    </Link>
                    .
                  </p>
                </section>

                <section className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Damaged or Wrong Items
                  </h2>
                  <p className="text-gray-300 mb-4 text-justify">
                    If your book arrives damaged, has printing faults, or you
                    receive the wrong item, we&apos;ll replace it or give you a
                    refund. To help us sort it out quickly:
                  </p>
                  <ul className="list-disc pl-6 text-gray-300 space-y-2 text-justify">
                    <li>
                      Contact us as soon as possible after your order arrives.
                      {/* TODO: review - set the reporting window (for example, within X days of delivery) */}
                    </li>
                    <li>
                      Include your name, phone number and payment reference or
                      order details.
                    </li>
                    <li>Send clear photos of the item and the packaging.</li>
                  </ul>
                  <p className="text-gray-300 mt-4 text-justify">
                    We may ask you to send the item back before we send a
                    replacement or refund. If the problem was our mistake,
                    we&apos;ll cover the return delivery cost.
                    {/* TODO: review - confirm who pays return shipping and how items are sent back */}
                  </p>
                </section>

                <section className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Change of Mind Returns
                  </h2>
                  <p className="text-gray-300 text-justify">
                    Books that arrive in good condition, as ordered, can&apos;t
                    usually be returned just because you changed your mind. If
                    you have a special case, please get in touch and we&apos;ll
                    do our best to help.
                    {/* TODO: review - confirm whether change-of-mind returns are accepted, and on what conditions */}
                  </p>
                </section>

                <section className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Order Cancellations
                  </h2>
                  <p className="text-gray-300 text-justify">
                    If you need to cancel an order, please contact us as soon as
                    possible. If your order hasn&apos;t been dispatched yet,
                    we&apos;ll cancel it and give you a full refund. Once an
                    order has been dispatched, it can&apos;t be cancelled, but
                    the sections above still apply.
                    {/* TODO: review - confirm the cancellation rule */}
                  </p>
                </section>

                <section className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Out of Stock and Undelivered Orders
                  </h2>
                  <ul className="list-disc pl-6 text-gray-300 space-y-2 text-justify">
                    <li>
                      <span className="font-semibold text-bitcoin">
                        Out of stock:
                      </span>{" "}
                      stock is limited. If we can&apos;t fulfil your order,
                      we&apos;ll let you know and give you a full refund.
                    </li>
                    <li>
                      <span className="font-semibold text-bitcoin">
                        Not delivered:
                      </span>{" "}
                      if your order hasn&apos;t arrived within the expected
                      delivery time, contact us and we&apos;ll check with the
                      courier. If it was lost in transit, we&apos;ll send a
                      replacement or give you a full refund.
                      {/* TODO: review - confirm delivery estimate and lost-parcel handling */}
                    </li>
                  </ul>
                </section>

                <section className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Buying and Selling Bitcoin with BitcoinDeepaBot
                  </h2>
                  <ul className="list-disc pl-6 text-gray-300 space-y-2 text-justify">
                    <li>
                      <span className="font-semibold text-bitcoin">
                        Completed trades are final:
                      </span>{" "}
                      once Bitcoin has been added to your BitcoinDeepaBot wallet,
                      or the LKR amount for a sale has been paid out, the trade
                      can&apos;t be cancelled, returned or refunded. This
                      includes when the price of Bitcoin changes after your
                      trade.
                    </li>
                    <li>
                      <span className="font-semibold text-bitcoin">
                        Trades that don&apos;t go through:
                      </span>{" "}
                      if you&apos;ve paid but your trade couldn&apos;t be
                      completed, for example because of a payment problem,
                      failed verification or a technical error, we&apos;ll
                      refund the LKR amount you paid.
                    </li>
                    <li>
                      <span className="font-semibold text-bitcoin">
                        Refunds go to your bank account only:
                      </span>{" "}
                      all refunds for Bitcoin trades are made by bank transfer
                      to a bank account in your own name. We don&apos;t refund
                      in Bitcoin, in cash, or to anyone else&apos;s account. We
                      may ask you to confirm your bank details and identity
                      before we send a refund.
                      {/* TODO: review - confirm Sri Lankan bank accounts only, account-name matching rule and refund processing time */}
                    </li>
                    <li>
                      <span className="font-semibold text-bitcoin">
                        Mistakes when sending Bitcoin:
                      </span>{" "}
                      Bitcoin or Lightning payments sent to the wrong address
                      or invoice can&apos;t be reversed, and we can&apos;t
                      refund them.
                    </li>
                  </ul>
                  <p className="text-gray-300 mt-4 text-justify">
                    To ask about a trade, contact us with your Telegram username
                    and the details of the transaction.
                  </p>
                </section>

                <section className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    How Refunds Work
                  </h2>
                  <p className="text-gray-300 mb-2 text-justify">
                    For book orders, approved refunds are sent back to your
                    original payment method through the internet payment
                    gateway (IPG). For Bitcoin trades, refunds are made to your bank
                    account only, as explained above. We&apos;ll confirm with
                    you once a refund has been processed.
                  </p>
                  <p className="text-gray-300 text-justify">
                    How long it takes for the money to show in your account
                    depends on your bank or card provider.
                    {/* TODO: review - confirm refund processing time and whether delivery charges are refunded */}
                  </p>
                </section>

                <section className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Changes to This Policy
                  </h2>
                  <p className="text-gray-300 text-justify">
                    We may update this Return Policy from time to time. Any
                    changes will be posted on this page with a new &quot;Last
                    updated&quot; date. The version in place when you placed
                    your order is the one that applies to that order.
                  </p>
                </section>

                <section className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Contact Us
                  </h2>
                  <p className="text-gray-300 mb-2 text-justify">
                    For returns, refunds or any questions about your order,
                    please contact us:
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
