"use client"

import { motion } from "framer-motion"

export default function BitcoinIcon() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative w-64 h-64 mx-auto"
    >
      <div className="absolute inset-0 bg-orange-500/20 rounded-full blur-3xl"></div>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        className="relative z-10 w-full h-full flex items-center justify-center"
      >
        <svg
          width="160"
          height="160"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-orange-500"
        >
          <path
            d="M9.5 2C9.5 1.44772 9.94772 1 10.5 1H12.5C13.0523 1 13.5 1.44772 13.5 2V3H14.5C15.0523 3 15.5 3.44772 15.5 4C15.5 4.55228 15.0523 5 14.5 5H13.5V19H14.5C15.0523 19 15.5 19.4477 15.5 20C15.5 20.5523 15.0523 21 14.5 21H13.5V22C13.5 22.5523 13.0523 23 12.5 23H10.5C9.94772 23 9.5 22.5523 9.5 22V21H8.5C7.94772 21 7.5 20.5523 7.5 20C7.5 19.4477 7.94772 19 8.5 19H9.5V5H8.5C7.94772 5 7.5 4.55228 7.5 4C7.5 3.44772 7.94772 3 8.5 3H9.5V2Z"
            fill="currentColor"
          />
          <path
            d="M7.5 8C7.5 7.44772 7.94772 7 8.5 7H15.5C16.0523 7 16.5 7.44772 16.5 8C16.5 8.55228 16.0523 9 15.5 9H8.5C7.94772 9 7.5 8.55228 7.5 8Z"
            fill="currentColor"
          />
          <path
            d="M7.5 16C7.5 15.4477 7.94772 15 8.5 15H15.5C16.0523 15 16.5 15.4477 16.5 16C16.5 16.5523 16.0523 17 15.5 17H8.5C7.94772 17 7.5 16.5523 7.5 16Z"
            fill="currentColor"
          />
        </svg>
      </motion.div>
    </motion.div>
  )
}
