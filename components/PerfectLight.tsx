'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { fadeRise, scaleIn } from '@/lib/animations';

export default function PerfectLight() {
  // Start with lights OFF until user scrolls to section
  const [lightsOn, setLightsOn] = useState(false);
  const [hasAutoTriggered, setHasAutoTriggered] = useState(false);
  const sectionRef = useRef(null);

  // Auto-trigger lights on when section comes into view (only once)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAutoTriggered) {
            // Delay the lights turning on for better effect
            setTimeout(() => {
              setLightsOn(true);
              setHasAutoTriggered(true); // Prevent future auto-triggers
            }, 800); // 800ms delay after section enters view
          }
        });
      },
      {
        threshold: 0.3, // Trigger when 30% of section is visible
        rootMargin: '0px 0px -100px 0px' // Start slightly before fully visible
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAutoTriggered]); // Only check hasAutoTriggered, not lightsOn

  const handleToggle = () => {
    setLightsOn(!lightsOn);
  };

  return (
    <section ref={sectionRef} id="perfect-light" className="py-20 md:py-28 bg-gray-50">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid md:grid-cols-12 gap-12 items-center">
          
          {/* Left column - Text + Interactive Button */}
          <motion.div
            variants={fadeRise}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="md:col-span-5 space-y-6"
          >
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-black">
              Perfect Light
            </h2>
            
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
              Every room, every moment.<br />
              Exactly as you want it.
            </p>
            
            <p className="text-gray-600 text-lg">
              Control your lighting with intuitive controls and automation. 
              Set the perfect ambiance for any moment.
            </p>
            
            {/* Interactive Liquid Glass Button */}
            <div className="pt-4">
              <button 
                onClick={handleToggle}
                className="group relative inline-flex rounded-full px-6 py-3 text-sm font-medium
                  backdrop-blur-md bg-white/20 border border-gray-200/50 
                  shadow-lg shadow-black/5
                  transition-all duration-300 ease-out
                  hover:bg-white/30 hover:border-gray-300/60 hover:shadow-xl hover:shadow-black/10
                  hover:scale-[1.02] hover:-translate-y-0.5
                  active:scale-[0.98] active:translate-y-0
                  text-gray-800"
              >
                <span className="relative z-10 transition-all duration-200 group-active:scale-95">
                  {lightsOn ? 'Lights On' : 'Lights Off'}
                </span>
                
                {/* Subtle inner glow on hover */}
                <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 
                  transition-opacity duration-300 group-hover:opacity-100" />
              </button>
            </div>
          </motion.div>

          {/* Right column - Single Photo */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="md:col-span-7"
          >
            {/* Photo that changes based on lights state */}
            <div className="relative w-full aspect-[16/10] rounded-3xl overflow-hidden">
              
              {/* Lights on image - back to snappy transition */}
              <img
                src="/Curtains-Closed-Lights-On.png"
                alt="Room with lights on"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity 
                  duration-300 ease-out ${lightsOn ? 'opacity-100' : 'opacity-0'}`}
              />
              
              {/* Lights off image - back to snappy transition */}
              <img
                src="/Curtains-Closed-Lights-Off.png"
                alt="Room with lights off"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity 
                  duration-300 ease-out ${lightsOn ? 'opacity-0' : 'opacity-100'}`}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
