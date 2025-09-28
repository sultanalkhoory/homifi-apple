'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import IPhoneFrame from '@/components/IPhoneFrame';
import { fadeRise, scaleIn } from '@/lib/animations';

/**
 * Perfect Light Section
 * First feature section demonstrating lighting control
 */

export default function PerfectLight() {
  const [lightsOn, setLightsOn] = useState(true);

  const handleToggle = () => {
    setLightsOn(!lightsOn);
  };

  return (
    <section id="perfect-light" className="py-20 md:py-28 bg-gray-50">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid md:grid-cols-12 gap-12 items-center">
          
          {/* Left column - Text + Toggle */}
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
            
            {/* Redesigned iOS-style toggle */}
            <div className="pt-4">
              <button 
                onClick={handleToggle}
                className="relative inline-flex h-[32px] w-[52px] items-center rounded-full
                  transition-colors duration-200 ease-in-out
                  focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                style={{
                  backgroundColor: lightsOn ? '#34C759' : '#8E8E93'
                }}
                aria-pressed={lightsOn}
                aria-label="Toggle lights"
              >
                <span
                  className={`inline-block h-[28px] w-[28px] transform rounded-full 
                    bg-white shadow-lg transition-transform duration-200 ease-in-out
                    ${lightsOn ? 'translate-x-[22px]' : 'translate-x-[2px]'}`}
                />
              </button>
              
              <p className="mt-3 text-sm text-gray-500">
                {lightsOn ? 'Lights On' : 'Lights Off'}
              </p>
            </div>
            
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

          {/* Right column - Room photo + iPhone */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="md:col-span-7"
          >
            {/* Photo container with proper size */}
            <div className="relative w-full aspect-[16/10] rounded-3xl overflow-hidden 
              shadow-[0_20px_60px_rgba(0,0,0,0.15)]">
              
              {/* Lights on image */}
              <img
                src="/Curtains-Open-Lights-On.png"
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

              {/* Subtle glow behind phone */}
              <div className="pointer-events-none absolute right-0 bottom-0 w-1/2 h-1/2
                bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.25),transparent_70%)]" />

              {/* iPhone overlay - NO rotation, proper positioning */}
              <div className="absolute bottom-8 right-8">
                <IPhoneFrame>
                  {/* Room name label */}
                  <div className="absolute top-12 left-0 right-0 text-center z-20">
                    <span className="text-white text-[9px] font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
                      Living Room
                    </span>
                  </div>

                  {/* Phone toggle - smaller iOS style */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1">
                    <button 
                      onClick={handleToggle}
                      className="relative inline-flex h-[24px] w-[40px] items-center rounded-full
                        transition-colors duration-200 ease-in-out"
                      style={{
                        backgroundColor: lightsOn ? 'rgba(52, 199, 89, 0.95)' : 'rgba(142, 142, 147, 0.95)'
                      }}
                      aria-pressed={lightsOn}
                      aria-label="Toggle lights on phone"
                    >
                      <span
                        className={`inline-block h-[20px] w-[20px] transform rounded-full 
                          bg-white shadow transition-transform duration-200 ease-in-out
                          ${lightsOn ? 'translate-x-[18px]' : 'translate-x-[2px]'}`}
                      />
                    </button>
                    
                    <p className="text-[8px] text-white/90 font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
                      {lightsOn ? 'On' : 'Off'}
                    </p>
                  </div>
                </IPhoneFrame>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
