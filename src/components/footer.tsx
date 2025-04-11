import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="py-12 border-t border-bitcoin/20 relative">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center mb-4">
              <Image
                src="/images/bitcoindeepa-h-logo.svg"
                alt="BitcoinDeepa Logo"
                width={140}
                height={28}
                className="h-7 w-auto"
              />
            </Link>
            <p className="text-gray-400 text-sm">
              Sri Lankan Bitcoin Community 🇱🇰
              <br />
              Pearl of Satoshi
            </p>
          </div>

          <div>
            <h3 className="text-white font-medium mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-400 hover:text-bitcoin text-sm">
                  Bitcoin Basics
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-bitcoin text-sm">
                  Wallet Setup Guide
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-bitcoin text-sm">
                  Security Tips
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-bitcoin text-sm">
                  Educational Videos
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-medium mb-4">Community</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-400 hover:text-bitcoin text-sm">
                  Upcoming Events
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-bitcoin text-sm">
                  Telegram Group
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-bitcoin text-sm">
                  Discord Server
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-bitcoin text-sm">
                  Contribute
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-medium mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-400 hover:text-bitcoin text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-bitcoin text-sm">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-bitcoin text-sm">
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-bitcoin text-sm">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-bitcoin/10 text-center">
          <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} BitcoinDeepa. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
