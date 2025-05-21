import Hero from "@/src/components/hero";
import Navbar from "@/src/components/navbar";
import Features from "@/src/components/features";
import Community from "@/src/components/community";
import BitcoinCard from "@/src/components/bitcoin-card";
import Faq from "@/src/components/faq";
import Footer from "@/src/components/footer";
import JoinSection from "@/src/components/join-section";
import Events from "../components/events";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* Global background gradient */}
      {/* <div className="fixed inset-0 z-0 bg-gradient-to-b from-zinc-950 via-black to-zinc-950 pointer-events-none"></div> */}

      {/* Subtle radial gradients that overlap sections */}
      {/* <div className="fixed inset-0 z-0 opacity-30 pointer-events-none">
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-full h-[600px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-bitcoin/20 via-transparent to-transparent"></div>
        <div className="absolute top-[60%] left-1/2 -translate-x-1/2 w-full h-[600px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-bitcoin/20 via-transparent to-transparent"></div>
      </div> */}

      <div className="relative z-10">
        <Navbar />
        <div className="pt-28">
          <Hero />
          <Features />
          <Community />
          <BitcoinCard />
          <Events />
          <Faq />
          <JoinSection />
          <Footer />
        </div>
      </div>
    </div>
  );
}
