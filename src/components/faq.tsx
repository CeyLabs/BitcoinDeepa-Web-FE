"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, X } from "lucide-react";

const faqs = [
  {
    question: "What is BitcoinDeepa?",
    answer:
      "BitcoinDeepa is the Sri Lankan Bitcoin Community, also known as the Pearl of Satoshi. We are dedicated to Bitcoin education, adoption, and community building in Sri Lanka.",
  },
  {
    question: "How can I join the community?",
    answer:
      "You can join our community by attending our local meetups, joining our Telegram group, following us on social media, or participating in our online events and discussions.",
  },
  {
    question: "Is Bitcoin legal in Sri Lanka?",
    answer:
      "While cryptocurrency regulations are evolving in Sri Lanka, Bitcoin itself is not illegal. However, we recommend staying informed about the latest regulatory developments and consulting with legal professionals for specific advice.",
  },
  {
    question: "Do I need technical knowledge to join?",
    answer:
      "Not at all! Our community welcomes everyone from beginners to experts. We provide resources and support for all knowledge levels, and our events are designed to be accessible to newcomers.",
  },
  {
    question: "How can I contribute to the community?",
    answer:
      "There are many ways to contribute: sharing your knowledge, helping organize events, creating educational content, translating resources into local languages, or simply participating in discussions and helping newcomers.",
  },
  {
    question: "Where can I learn more about Bitcoin?",
    answer:
      "We offer various educational resources including workshops, online courses, reading materials, and mentorship programs. Join our community to access these resources and connect with experienced Bitcoin users.",
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
            Common questions about BitcoinDeepa and the Sri Lankan Bitcoin
            community. Have a question not listed here? Reach out to us
            directly!
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
                      <div className="p-6 pt-0 text-gray-400 border-t border-bitcoin/10">
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
