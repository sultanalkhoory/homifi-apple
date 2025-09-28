'use client';
import { useState } from 'react';
import Header from "@/components/Header";
import FeatureStrip from "@/components/FeatureStrip";
import { motion } from "framer-motion";
import { fadeRise } from "@/lib/animations";

// Import all our UI options
import SmartIndicators from "@/components/SmartIndicators";
import MinimalistOverlay from "@/components/MinimalistOverlay";
import SequentialReveal from "@/components/SequentialReveal";
import VisionInspiredUI from "@/components/VisionInspiredUI";

// UI options for the demo
type UIOption = {
  id: string;
  label: string;
  component: React.ComponentType;
};

const uiOptions: UIOption[] = [
  { id: 'indicators', label: 'Smart Indicators', component: SmartIndicators },
  { id: 'minimalist', label: 'Minimalist Overlay', component: MinimalistOverlay },
  { id: 'sequential', label: 'Sequential Reveal', component: SequentialReveal },
  { id: 'vision', label: 'Apple Vision UI', component: VisionInspiredUI },
];

export default function Page() {
  // State to track which UI option is selected
  const [selectedUiOption, setSelectedUiOption] = useState('indicators');
  
  // Get the currently selected component
  const SelectedComponent = uiOptions.find(opt => opt.id === selectedUiOption)?.component || SmartIndicators;
  
  return (
    <main>
      <Header />
      <section className="pt-32 pb-20">
        <div className="mx-auto max-w-6xl px-4 grid md:grid-cols-2 gap-12 items-center">
          
          {/* Left: Text */}
          <motion.div variants={fadeRise} initial="hidden" animate="show" className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-gray-600">
              <span>Seamless Smart Home</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-semibold tracking-tight text-black">
              Your home, perfectly in sync.
            </h1>
            <p className="text-gray-600 text-lg max-w-prose">
              Apple-first integration for lighting, privacy, climate, and security —
              designed to feel invisible until you need it.
            </p>
            <div className="flex gap-3">
              <a href="#features" className="rounded-full bg-black text-white px-5 py-3 text-sm">
                Explore Features
              </a>
              <a href="#contact" className="rounded-full border px-5 py-3 text-sm">
                Get Started
              </a>
            </div>
            
            {/* UI Option Switcher - Remove this in production */}
            <div className="pt-6 space-y-2">
              <p className="text-sm text-gray-500 font-medium">UI Options (Demo Only):</p>
              <div className="flex flex-wrap gap-2">
                {uiOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setSelectedUiOption(option.id)}
                    className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
                      selectedUiOption === option.id
                        ? 'bg-black text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Room with selected UI overlay */}
          <motion.div 
            className="relative rounded-3xl overflow-hidden shadow-lg"
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
            
            {/* The selected UI component */}
            <SelectedComponent />
          </motion.div>
        </div>
      </section>
      <FeatureStrip />
    </main>
  );
}
