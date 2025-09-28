'use client';
import Header from "@/components/Header";
import Footer from "@/components/Footer"; // Import the new Footer component
import { motion } from "framer-motion";
import { fadeRise } from "@/lib/animations";
import SmartIndicators from "@/components/SmartIndicators";

export default function Page() {
  return (
    <main>
      <Header />
      <section className="pt-32 pb-20">
        <div className="mx-auto max-w-6xl px-4 grid md:grid-cols-12 gap-12 items-center">
          
          {/* Left: Text - Now taking up less space (5/12) */}
          <motion.div variants={fadeRise} initial="hidden" animate="show" className="space-y-6 md:col-span-5">
            <h1 className="text-5xl md:text-6xl font-semibold tracking-tight text-black">
              Your home,{" "}
              <span className="relative">
                <span className="relative z-10">perfectly in sync.</span>
                <span className="absolute bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-gray-50 to-transparent z-0"></span>
              </span>
            </h1>
            
            <p className="text-gray-600 text-lg max-w-prose">
              Apple-first integration for lighting, privacy, climate, and security —
              designed to feel invisible until you need it.
            </p>
            
            {/* Single, focused CTA */}
            <div className="pt-2">
              <a href="#features" className="rounded-full bg-black text-white px-5 py-3 text-sm inline-flex hover:bg-gray-900 transition-colors">
                Explore Features
              </a>
            </div>
          </motion.div>

          {/* Right: Room with smart indicators - Now taking up more space (7/12) */}
          <motion.div 
            className="relative rounded-3xl overflow-hidden shadow-lg md:col-span-7"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            {/* The room image */}
            <img
              src="/Curtains-Open-Lights-On.png"
              alt="Smart home living room"
              className="w-full h-auto rounded-3xl"
            />
            
            {/* Smart feature indicators overlaid on the room */}
            <SmartIndicators />
          </motion.div>
        </div>
      </section>
      {/* Add more content sections here */}
      
      {/* Footer at the end of the page */}
      <Footer />
    </main>
  );
}
