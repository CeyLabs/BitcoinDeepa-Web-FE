"use client"

import { motion } from "framer-motion"
import { Bitcoin, BookOpen, Users, Wallet, Globe, Shield } from "lucide-react"
import { BitcoinGradientIcon } from "./bitcoin-gradient-icon"
import { BrandName } from "./brand-provider"

const features = [
  {
    icon: <BookOpen className="h-10 w-10 text-bitcoin" />,
    title: "Bitcoin Education",
    description: "Learn the fundamentals of Bitcoin, blockchain technology, and the future of money.",
  },
  {
    icon: <Users className="h-10 w-10 text-bitcoin" />,
    title: "Community Events",
    description: "Join regular monthly meetups, community, and conferences to connect with fellow Bitcoin enthusiasts.",
  },
  {
    icon: <Wallet className="h-10 w-10 text-bitcoin" />,
    title: "Wallet Setup",
    description: "Get help setting up your first Bitcoin wallet and securing your digital assets.",
  },
  {
    icon: <Globe className="h-10 w-10 text-bitcoin" />,
    title: "Global Network",
    description: "Connect with the global Bitcoin community while representing Sri Lanka.",
  },
  {
    icon: <Shield className="h-10 w-10 text-bitcoin" />,
    title: "Security Best Practices",
    description: "Learn how to protect your Bitcoin and stay safe in the crypto ecosystem.",
  },
  {
    icon: <Bitcoin className="h-10 w-10 text-bitcoin" icon={Bitcoin} size={40} />,
    title: "Bitcoin Adoption",
    description: "Contribute to Bitcoin adoption in Sri Lanka through education and outreach.",
  },
]

export default function FeaturesWithGradient() {
  return (
    <section id="features" className="py-16 md:py-24 relative">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bitcoin-gradient-text">What</span> we love to do
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto font-light">
            Discover How <BrandName /> Is Shaping the Future of Web3 in Sri Lanka.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-zinc-900/50 backdrop-blur-sm border border-bitcoin/10 rounded-xl p-6 hover:border-bitcoin/30 transition-all duration-300"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
              <p className="text-gray-400 font-light">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
