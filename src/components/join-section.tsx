"use client"

import { motion } from "framer-motion"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Twitter, Instagram, Youtube } from "lucide-react"
import Link from "next/link"

export default function JoinSection() {
  return (
    <section id="join" className="py-16 md:py-24 relative">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="text-white">Join Sri Lanka's</span>
            <span className="block text-bitcoin mt-2">Fastest Growing Bitcoin Community 🇱🇰</span>
          </h2>
          <p className="text-gray-400 mb-8">
            Stay updated with the latest news, events, and educational resources from the Sri Lankan Bitcoin community.
          </p>

          <div className="bg-zinc-900/50 backdrop-blur-sm border border-bitcoin/20 rounded-xl p-8 mb-8">
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Input
                    type="text"
                    placeholder="Your Name"
                    className="bg-zinc-800 border-bitcoin/20 focus:border-bitcoin"
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="Your Email"
                    className="bg-zinc-800 border-bitcoin/20 focus:border-bitcoin"
                  />
                </div>
              </div>
              <Button className="w-full bg-bitcoin hover:bg-bitcoin-dark text-white">Subscribe to Newsletter</Button>
            </form>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <p className="text-gray-300 font-medium">Follow us on social media:</p>
            <div className="flex items-center gap-4">
              <Link
                href="https://x.com/pearlofsatoshi"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-zinc-800 hover:bg-zinc-700 p-3 rounded-full transition-colors"
              >
                <Twitter className="h-5 w-5 text-bitcoin" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="bg-zinc-800 hover:bg-zinc-700 p-3 rounded-full transition-colors">
                <Instagram className="h-5 w-5 text-bitcoin" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="bg-zinc-800 hover:bg-zinc-700 p-3 rounded-full transition-colors">
                <Youtube className="h-5 w-5 text-bitcoin" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
