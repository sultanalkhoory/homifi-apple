'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeRise, scaleIn } from '@/lib/animations';

/**
 * PerfectControl Component
 * 
 * Demonstrates light control functionality with a transparent iPhone overlay.
 * The phone appears to show the room through its screen, with controls that
 * affect both the phone UI and the actual room image.
 */
export default function PerfectControl() {
  // State to track if lights are on or off
  const [lightsOn, setLightsOn] = useState(true);

  // Toggle light state
  const toggleLights = () => {
    setLightsOn(!lightsOn);
  };

  return (
    <section id="features" className="py-24 overflow-hidden">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid md:grid-cols-12 gap-12 items-center">
          {/* Text column - 5/12 on desktop */}
          <motion.div
            variants={fadeRise}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="md:col-span-5 space-y-6"
          >
            <h2 className="text-4xl font-semibold tracking-tight">Perfect Control</h2>
            <p className="text-gray-600 text-lg">
              Control every aspect of your environment with intuitive controls and automation.
              Adjust lighting, privacy, and climate from anywhere.
            </p>
            
            {/* Interactive toggle control */}
            <div className="pt-4">
              <button 
                onClick={toggleLights}
                className="relative inline-flex h-14 w-24 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent 
                  transition-colors duration-300 ease-in-out focus:outline-none"
                style={{
                  backgroundColor: lightsOn ? '#4ade80' : '#1f2937'
                }}
                aria-pressed={lightsOn}
                aria-label="Toggle lights"
              >
                <span className="sr-only">Toggle lights</span>
                <span
                  className={`pointer-events-none relative inline-block h-[52px] w-[52px] transform rounded-full bg-white 
                    shadow-lg ring-0 transition duration-300 ease-in-out ${lightsOn ? 'translate-x-10' : 'translate-x-0'}`}
                >
                  <span
                    className={`absolute inset-0 flex h-full w-full items-center justify-center transition-opacity 
                      ${lightsOn ? 'opacity-0' : 'opacity-100'}`}
                    aria-hidden="true"
                  >
                    <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </span>
                  <span
                    className={`absolute inset-0 flex h-full w-full items-center justify-center transition-opacity 
                      ${lightsOn ? 'opacity-100' : 'opacity-0'}`}
                    aria-hidden="true"
                  >
                    <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                </span>
              </button>
            </div>
          </motion.div>
          
          {/* Room visualization with phone overlay - 7/12 on desktop */}
          <div className="md:col-span-7 relative">
            {/* Room images that switch based on light state */}
            <motion.div
              variants={scaleIn}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="rounded-3xl overflow-hidden shadow-lg relative"
            >
              {/* Lights on image */}
              <img
                src="/Curtains-Open-Lights-On.png"
                alt="Room with lights on"
                className={`w-full h-auto transition-opacity duration-500 ${lightsOn ? 'opacity-100' : 'opacity-0'}`}
              />
              
              {/* Lights off image (absolutely positioned to overlap) */}
              <img
                src="/Curtains-Closed-Lights-Off.png"
                alt="Room with lights off"
                className={`w-full h-auto absolute inset-0 transition-opacity duration-500 ${lightsOn ? 'opacity-0' : 'opacity-100'}`}
              />
              
              {/* iPhone overlay */}
              <div className="absolute bottom-8 right-8 md:bottom-16 md:right-16 w-[140px] md:w-[180px] rotate-[15deg] z-10">
                {/* iPhone frame */}
                <div className="relative">
                  {/* Phone bezel */}
                  <img 
                    src="/iphone-17pro.png" 
                    alt="iPhone 17 Pro" 
                    className="w-full h-auto relative z-20"
                  />
                  
                  {/* Phone screen content - shows room through transparent screen */}
                  <div className="absolute inset-[3.5%] rounded-[12%] overflow-hidden z-10">
                    {/* Home app UI */}
                    <div className="relative w-full h-full">
                      {/* Status bar */}
                      <div className="absolute top-0 left-0 right-0 flex justify-between items-center px-3 py-1 bg-black/10 backdrop-blur-sm z-30">
                        <span className="text-white text-[8px] md:text-[10px] font-medium">9:41</span>
                        <div className="flex items-center gap-1">
                          <svg viewBox="0 0 24 24" className="w-2 h-2 md:w-3 md:h-3 text-white" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                          </svg>
                          <svg viewBox="0 0 24 24" className="w-2 h-2 md:w-3 md:h-3 text-white" fill="currentColor">
                            <path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4zM11 20v-5.5H9L13 7v5.5h2L11 20z" />
                          </svg>
                        </div>
                      </span>

                      {/* Home app room name */}
                      <div className="absolute top-8 left-0 right-0 text-center">
                        <span className="text-white text-[10px] md:text-[12px] font-medium drop-shadow-md">Living Room</span>
                      </div>

                      {/* Home app toggle switch - synchronized with the main toggle */}
                      <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                        <button 
                          onClick={toggleLights}
                          className="relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full 
                            border-2 border-transparent transition-colors duration-300 ease-in-out 
                            focus:outline-none"
                          style={{
                            backgroundColor: lightsOn ? 'rgba(74, 222, 128, 0.9)' : 'rgba(31, 41, 55, 0.9)'
                          }}
                          aria-pressed={lightsOn}
                          aria-label="Toggle lights on phone"
                        >
                          <span className="sr-only">Toggle lights on phone</span>
                          <span
                            className={`pointer-events-none relative inline-block h-4 w-4 transform rounded-full bg-white 
                              shadow ring-0 transition duration-300 ease-in-out ${lightsOn ? 'translate-x-4' : 'translate-x-0'}`}
                          />
                        </button>
                      </div>

                      {/* Semi-transparent screen overlay that shows the room behind */}
                      <div className="absolute inset-0 z-[-1]">
                        {/* Lights on screen view */}
                        <div 
                          className={`absolute inset-0 bg-black/20 backdrop-blur-[1px] transition-opacity duration-500 ${lightsOn ? 'opacity-100' : 'opacity-0'}`}
                          style={{
                            background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 100%)',
                          }}
                        />
                        
                        {/* Lights off screen view */}
                        <div 
                          className={`absolute inset-0 bg-black/50 backdrop-blur-[1px] transition-opacity duration-500 ${lightsOn ? 'opacity-0' : 'opacity-100'}`}
                          style={{
                            background: 'linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 100%)',
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Dynamic Island */}
                  <div className="absolute top-[3.5%] left-1/2 -translate-x-1/2 w-[25%] h-[3%] bg-black rounded-full z-30"></div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
