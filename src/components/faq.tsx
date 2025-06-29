"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, X } from "lucide-react";

const faqs = [
  {
    question: "What is Bitcoin Deepa?",
    answer:
      "Bitcoin Deepa – Pearl of Satoshi is Sri Lanka's leading grassroots Bitcoin-only community. We focus on educating, connecting, and empowering individuals around the philosophy, technology, and use cases of Bitcoin.",
  },
  {
    question: "Why is it Bitcoin-only?",
    answer:
      "We believe Bitcoin is fundamentally different from other cryptocurrencies. It's decentralized, immutable, and has a clear monetary policy. Our mission is to preserve and promote the values of sound money and financial sovereignty.",
  },
  {
    question: "Is Bitcoin legal in Sri Lanka?",
    answer:
      "Bitcoin is not banned in Sri Lanka, but it's not formally regulated either. We advocate for education and responsible use, while staying compliant with local laws. We do not promote illegal activity or trading platforms that violate regulations.",
  },
  {
    question: "How can I join the community?",
    answer:
      "You can join our Telegram group, attend meetups, and follow us on social media. We also host regular IRL events, workshops, and discussions. Check out our event calendar or DM us.",
  },
  {
    question: "I'm new to Bitcoin. Where should I start?",
    answer: (
      <>
        Start with these basics: Watch{" "}
        <a
          href="https://youtu.be/gS05vIvAW9I?list=PL0wRLuowx3txfNX4NzbRDLja2SSWL0c3g"
          target="_blank"
          rel="noopener noreferrer"
          className="text-bitcoin hover:underline"
        >
          'What is Bitcoin?' series on YouTube
        </a>
        , read{" "}
        <a
          href="https://saifedean.com/tbs"
          target="_blank"
          rel="noopener noreferrer"
          className="text-bitcoin hover:underline"
        >
          'The Bitcoin Standard' by Saifedean Ammous
        </a>
        , and attend a local Bitcoin Deepa meetup to ask questions in person.
      </>
    ),
  },
  {
    question: "Do you support trading or investment advice?",
    answer:
      "No. We focus on education, not speculation. We do not offer trading tips or price predictions. Our aim is to help people understand Bitcoin's long-term value as a tool for economic freedom.",
  },
  {
    question: "Is Bitcoin mining part of your agenda?",
    answer:
      "We discuss Bitcoin mining in our education sessions, but we do not run or promote industrial mining operations. However, we support the idea of localized, renewable-powered mining for decentralization.",
  },
  {
    question: "What does 'Pearl of Satoshi' mean?",
    answer:
      "It's a play on Sri Lanka's nickname 'Pearl of the Indian Ocean' and Satoshi Nakamoto, the pseudonymous creator of Bitcoin. It symbolizes our belief that Sri Lanka can shine globally through Bitcoin.",
  },
  {
    question: "Are your events open to everyone?",
    answer:
      "Yes. Bitcoin Deepa is inclusive. Whether you're a beginner, developer, business owner, or just curious—we welcome anyone who wants to explore Bitcoin in an open, respectful environment.",
  },
  {
    question: "Do you collaborate with international Bitcoin organizations?",
    answer:
      "Yes. We're working on connecting with global Bitcoin educators, dev communities, and advocacy groups to bring more value to Sri Lanka and create knowledge bridges.",
  },
  {
    question: "How is Bitcoin Deepa funded?",
    answer:
      "We are community-driven. Events are often funded by donations, community sponsorships, or volunteers. We may also work with aligned Bitcoin-only sponsors to maintain neutrality and decentralization.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 md:py-24 relative">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4">FAQs</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Got questions about Bitcoin Deepa? Find quick answers below or reach
            out to our community for more.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="mb-4"
            >
              <div
                className={`bg-zinc-900/80 backdrop-blur-sm border ${
                  openIndex === index
                    ? "border-bitcoin/30"
                    : "border-bitcoin/10"
                } rounded-xl overflow-hidden transition-all duration-300`}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-6 text-left flex items-center justify-between"
                >
                  <span className="text-lg font-medium text-white">
                    {faq.question}
                  </span>
                  {openIndex === index ? (
                    <X className="h-5 w-5 text-bitcoin" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-bitcoin" />
                  )}
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-4 text-gray-400 border-t border-bitcoin/10">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
