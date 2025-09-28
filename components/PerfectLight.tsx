'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import IPhoneFrame from '@/components/IPhoneFrame';
import { fadeRise, scaleIn } from '@/lib/animations';

export default function PerfectLight() {
  const [lightsOn, setLightsOn] = useState(true);

  const handleToggle = () => {
    setLightsOn(!lightsOn);
  };

  return (
    <section id="perfect-light" className="py-20 md:py-28 bg-gray-50">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid md:grid-cols-12 gap-12 items-center">
          
          {/* Left column - Text only */}
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
            
            <div className="pt-4">
              <a 
                href="#" 
                className="inline-flex rounded-full bg-black text-white px-5 py-3 text-sm 
                  hover:bg-gray-900 transition-colors"
              >
                Learn More
              </a>
            </div>
          </motion.div>

          {/* Right column - Hybrid approach */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="md:col-span-7 space-y-6"
          >
            {/* Main photo block with iPhone overlay */}
            <div className="relative w-full aspect-[16/10] rounded-3xl overflow-hidden">
              
              {/* Lights on image */}
              <img
                src="/Curtains-Closed-Lights-On.png"
                alt="Room with lights on"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity 
                  duration-500 ${lightsOn ? 'opacity-100' : 'opacity-0'}`}
              />
              
              {/* Lights off image */}
              <img
                src="/Curtains-Closed-Lights-Off.png"
                alt="Room with lights off"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity 
                  duration-500 ${lightsOn ? 'opacity-0' : 'opacity-100'}`}
              />

              {/* iPhone overlay */}
              <div className="absolute bottom-8 right-8">
                <IPhoneFrame>
                  {/* Top status pill */}
                  <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20">
                    <div className="px-3 py-1 rounded-full backdrop-blur-sm border border-white/20"
                         style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)' }}>
                      <span className="text-white text-[8px] font-medium">
                        Living Room
                      </span>
                    </div>
                  </div>

                  {/* Large heading in center */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-20">
                    <h3 className="text-white text-[16px] font-semibold mb-1">
                      {lightsOn ? 'Lights On' : 'Lights Off'}
                    </h3>
                    <p className="text-white/80 text-[9px] font-normal">
                      {lightsOn ? 'Perfect ambiance set' : 'Ready to illuminate'}
                    </p>
                  </div>

                  {/* Action button at bottom */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
                    <button 
                      onClick={handleToggle}
                      className="px-4 py-2 rounded-full backdrop-blur-sm border border-white/20 
                        transition-all duration-200 ease-in-out"
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.15)'
                      }}
                      aria-pressed={lightsOn}
                      aria-label="Toggle lights"
                    >
                      <span className="text-white text-[8px] font-medium">
                        {lightsOn ? 'Turn Off' : 'Turn On'}
                      </span>
                    </button>
                  </div>
                </IPhoneFrame>
              </div>
            </div>

            {/* Side-by-side comparison images */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center space-y-3">
                <img
                  src="/Curtains-Closed-Lights-Off.png"
                  alt="Room with lights off"
                  className="w-full aspect-[16/10] object-cover rounded-xl"
                />
                <p className="text-sm text-gray-500">Lights Off</p>
              </div>
              <div className="text-center space-y-3">
                <img
                  src="/Curtains-Closed-Lights-On.png"
                  alt="Room with lights on"
                  className="w-full aspect-[16/10] object-cover rounded-xl"
                />
                <p className="text-sm text-gray-500">Lights On</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
