"use client";

import type React from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { useBrand } from "./brand-provider";
import { TELEGRAM_INVITE } from "./nav/nav-data";

type FaqItem = { question: string; answer: React.ReactNode };

const link = "text-bitcoin underline underline-offset-4 transition-colors hover:text-bitcoin-light";

function getFaqs(brand: string): FaqItem[] {
  return [
    {
      question: `What is ${brand}?`,
      answer: `${brand} – Pearl of Satoshi is Sri Lanka's leading grassroots Bitcoin-only community. We focus on educating, connecting, and empowering individuals around the philosophy, technology, and use cases of Bitcoin.`,
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
          Start with these basics: watch the{" "}
          <a
            href="https://youtu.be/gS05vIvAW9I?list=PL0wRLuowx3txfNX4NzbRDLja2SSWL0c3g"
            target="_blank"
            rel="noopener noreferrer"
            className={link}
          >
            &lsquo;What is Bitcoin?&rsquo; series on YouTube
          </a>
          , read{" "}
          <a href="https://saifedean.com/tbs" target="_blank" rel="noopener noreferrer" className={link}>
            &lsquo;The Bitcoin Standard&rsquo; by Saifedean Ammous
          </a>
          , and attend a local {brand} meetup to ask questions in person.
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
      answer: `Yes. ${brand} is inclusive. Whether you're a beginner, developer, business owner, or just curious, we welcome anyone who wants to explore Bitcoin in an open, respectful environment.`,
    },
    {
      question: "Do you collaborate with international Bitcoin organizations?",
      answer:
        "Yes. We're working on connecting with global Bitcoin educators, dev communities, and advocacy groups to bring more value to Sri Lanka and create knowledge bridges.",
    },
    {
      question: `How is ${brand} funded?`,
      answer:
        "We are community-driven. Events are often funded by donations, community sponsorships, or volunteers. We may also work with aligned Bitcoin-only sponsors to maintain neutrality and decentralization.",
    },
  ];
}

export default function Faq() {
  const { brand } = useBrand();
  const faqs = getFaqs(brand);

  return (
    <section id="faq" aria-labelledby="faq-title" className="relative px-4 py-20 sm:px-6 md:py-28">
      {/* Header */}
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <h2 id="faq-title" className="reveal type-h2 text-white">
          Questions? <span className="text-bitcoin">Answered.</span>
        </h2>
        <p className="reveal mt-5 max-w-xl type-lede text-zinc-400">
          Quick answers about the community, Bitcoin in Sri Lanka, and how to get started.
        </p>
      </div>

      {/* Questions */}
      <div className="reveal mx-auto mt-12 w-full max-w-3xl md:mt-16">
        <Accordion.Root type="single" collapsible defaultValue="item-0" className="flex flex-col gap-1">
          {faqs.map((f, i) => (
            <Accordion.Item key={f.question} value={`item-${i}`} className="overflow-hidden rounded-lg bg-zinc-900">
              <Accordion.Header className="flex">
                <Accordion.Trigger className="group flex flex-1 cursor-pointer items-start justify-between gap-6 px-5 py-4 text-left text-base font-medium text-white outline-none focus-visible:ring-2 focus-visible:ring-bitcoin focus-visible:ring-inset md:px-6 md:py-5 md:text-lg">
                  {f.question}
                  <ChevronDown
                    aria-hidden
                    className="pointer-events-none size-5 shrink-0 translate-y-0.5 text-zinc-500 transition-transform duration-200 group-data-[state=open]:rotate-180 md:translate-y-1"
                  />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                <p className="px-5 pb-5 text-base leading-relaxed text-pretty text-zinc-400 md:px-6 md:pb-6 md:text-[17px]">{f.answer}</p>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
        <p className="mt-8 text-center text-base text-zinc-400">
          Still have a question?{" "}
          <a href={TELEGRAM_INVITE} target="_blank" rel="noopener noreferrer" className={link}>
            Ask the community on Telegram
          </a>
        </p>
      </div>
    </section>
  );
}
