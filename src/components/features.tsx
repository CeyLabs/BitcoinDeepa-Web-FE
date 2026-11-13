import { Bitcoin, BookOpen, Globe, Shield, Users, Wallet } from "lucide-react";
import { BrandName } from "./brand-provider";

const features = [
  {
    Icon: BookOpen,
    title: "Bitcoin Education",
    description: "Learn the fundamentals of Bitcoin, blockchain technology, and the future of money.",
  },
  {
    Icon: Users,
    title: "Community Events",
    description: "Join regular meetups, workshops, and conferences to connect with fellow Bitcoin enthusiasts.",
  },
  {
    Icon: Wallet,
    title: "Wallet Setup",
    description: "Get help setting up your first Bitcoin wallet and securing your digital assets.",
  },
  {
    Icon: Globe,
    title: "Global Network",
    description: "Connect with the global Bitcoin community while representing Sri Lanka.",
  },
  {
    Icon: Shield,
    title: "Security Best Practices",
    description: "Learn how to protect your Bitcoin and stay safe in the crypto ecosystem.",
  },
  {
    Icon: Bitcoin,
    title: "Bitcoin Adoption",
    description: "Contribute to Bitcoin adoption in Sri Lanka through education and outreach.",
  },
];

export default function Features() {
  return (
    <section id="features" aria-labelledby="features-title" className="relative isolate overflow-clip py-20 md:py-28">
      {/* Warm glow rising from the bottom of the section. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[70%] bg-radial-[ellipse_at_bottom] from-bitcoin/20 via-bitcoin/5 to-transparent [mask-image:linear-gradient(to_bottom,black_45%,transparent)]"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 grid gap-8 md:mb-20 md:grid-cols-[1.4fr_1fr] md:items-center md:gap-16">
          <h2 id="features-title" className="reveal type-h2">
            <span className="block text-white">What we love</span>
            <span className="block text-zinc-500">to do.</span>
          </h2>
          <p className="reveal border-l-2 border-bitcoin pl-6 text-xl leading-relaxed text-zinc-200 md:text-2xl">
            Discover how <BrandName /> is shaping the future of Web3 in Sri Lanka.
          </p>
        </div>

        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ Icon, title, description }) => (
            <div
              key={title}
              className="reveal group flex min-h-[260px] flex-col justify-between rounded-xl bg-zinc-900 p-7 transition-colors duration-300 hover:bg-zinc-800 md:min-h-[300px] md:p-9"
            >
              <Icon className="size-9 text-zinc-300 transition-colors duration-300 group-hover:text-bitcoin" strokeWidth={1.5} />
              <div>
                <h3 className="text-2xl font-medium tracking-[-0.01em] text-white">{title}</h3>
                <p className="mt-2 leading-relaxed text-zinc-400 md:text-lg lg:min-h-[3lh]">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
