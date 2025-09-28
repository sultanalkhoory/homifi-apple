'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import IPhoneFrame from '@/components/IPhoneFrame';
import { fadeRise, scaleIn } from '@/lib/animations';

/**
 * Perfect Control Section
 * 
 * Demonstrates HomiFi lighting control with synchronized iPhone interface
 * 
 * Layout:
 * - Desktop: 5/7 grid (text left, photo+iPhone right)
 * - Mobile: Stacked (text above, photo below)
 * 
 * Features:
 * - Interactive main toggle (left column)
 * - Room photo swaps based on lights state
 * - iPhone overlay with transparent screen showing room
 * - Synchronized phone toggle inside iPhone
 * - Smooth 500ms transitions
 */

export default function PerfectControl() {
  // Lights state: true = on, false = off
  const [lightsOn, setLightsOn] = useState(true);

  /**
   * Toggle handler - flips lights state
   * Updates both room photo and all toggle UIs
   */
  const handleToggle = () => {
    setLightsOn(!lightsOn);
  };

  return (
    <section id="perfect-control" className="py-20 md:py-28 bg-gray-50">
      <div className="mx-auto max-w-6xl px-4">
        
        {/* Two-column grid: 5 cols text, 7 cols visual */}
        <div className="grid md:grid-cols-12 gap-12 items-center">
          
          {/* 
            ========== LEFT COLUMN - Text + Main Toggle ==========
            5 columns on desktop, full width on mobile
          */}
          <motion.div
            variants={fadeRise}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="md:col-span-5 space-y-6"
          >
            {/* Section title */}
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-black">
              Perfect Control
            </h2>
            
            {/* Large subheading */}
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
              Every room, every moment.<br />
              Exactly as you want it.
            </p>
            
            {/* Description paragraph */}
            <p className="text-gray-600 text-lg">
              Control every aspect of your environment with intuitive controls and automation. 
              Adjust lighting, privacy, and climate from anywhere.
            </p>
            
            {/* 
              ========== MAIN TOGGLE CONTROL ==========
              Large, accessible Apple-style toggle
              Green when on, dark gray when off
              Includes sliding indicator with checkmark/minus icons
            */}
            <div className="pt-4">
              <button 
                onClick={handleToggle}
                className="relative inline-flex h-14 w-24 flex-shrink-0 cursor-pointer 
                  rounded-full border-2 border-transparent transition-colors duration-300 
                  ease-in-out focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                style={{
                  backgroundColor: lightsOn ? '#4ade80' : '#1f2937'
                }}
                aria-pressed={lightsOn}
                aria-label="Toggle lights"
              >
                <span className="sr-only">Toggle lights</span>
                
                {/* Sliding white circle indicator */}
                <span
                  className={`pointer-events-none relative inline-block h-[52px] w-[52px] 
                    transform rounded-full bg-white shadow-lg ring-0 transition duration-300 
                    ease-in-out ${lightsOn ? 'translate-x-10' : 'translate-x-0'}`}
                >
                  {/* Icon when OFF (minus line) */}
                  <span
                    className={`absolute inset-0 flex h-full w-full items-center justify-center 
                      transition-opacity ${lightsOn ? 'opacity-0' : 'opacity-100'}`}
                    aria-hidden="true"
                  >
                    <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </span>
                  
                  {/* Icon when ON (checkmark) */}
                  <span
                    className={`absolute inset-0 flex h-full w-full items-center justify-center 
                      transition-opacity ${lightsOn ? 'opacity-100' : 'opacity-0'}`}
                    aria-hidden="true"
                  >
                    <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                </span>
              </button>
              
              {/* Status label below toggle */}
              <p className="mt-3 text-sm text-gray-500">
                {lightsOn ? 'Lights On' : 'Lights Off'}
              </p>
            </div>
            
            {/* CTA button */}
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

          {/* 
            ========== RIGHT COLUMN - Room Photo + iPhone Overlay ==========
            7 columns on desktop, full width on mobile
          */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="md:col-span-7"
          >
            {/* 
              PHOTO BLOCK - Container for room images
              aspect-[16/10] = landscape photo ratio
              Contains two overlapping images that cross-fade
            */}
            <div className="relative aspect-[16/10] rounded-3xl overflow-hidden 
              shadow-[0_20px_60px_rgba(0,0,0,0.15)]">
              
              {/* 
                LIGHTS ON IMAGE
                Visible when lightsOn is true
                500ms opacity transition for smooth cross-fade
              */}
              <img
                src="/Curtains-Open-Lights-On.png"
                alt="Room with lights on"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity 
                  duration-500 ${lightsOn ? 'opacity-100' : 'opacity-0'}`}
              />
              
              {/* 
                LIGHTS OFF IMAGE
                Visible when lightsOn is false
                500ms opacity transition for smooth cross-fade
              */}
              <img
                src="/Curtains-Closed-Lights-Off.png"
                alt="Room with lights off"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity 
                  duration-500 ${lightsOn ? 'opacity-0' : 'opacity-100'}`}
              />

              {/* 
                Subtle glow behind iPhone
                Adds depth/separation for iPhone overlay
                Positioned bottom-right where iPhone sits
              */}
              <div className="pointer-events-none absolute right-0 bottom-0 w-2/3 h-2/3
                bg-[radial-gradient(60%_60%_at_75%_75%,rgba(255,255,255,0.35),transparent_60%)]" />

              {/* 
                ========== IPHONE OVERLAY ==========
                Positioned bottom-right with slight rotation
                iPhone screen is transparent showing room photo
                Contains glass UI controls (room name, toggle)
              */}
              <div className="absolute bottom-6 right-6 origin-bottom-right
                scale-85 sm:scale-90 md:scale-95
                rotate-[10deg]">
                <IPhoneFrame>
                  {/* 
                    ========== GLASS UI CONTROLS ==========
                    Floating on top of transparent iPhone screen
                  */}
                  
                  {/* Room name label - top center of phone screen */}
                  <div className="absolute top-16 left-0 right-0 text-center z-20">
                    <span className="text-white text-xs font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
                      Living Room
                    </span>
                  </div>

                  {/* 
                    PHONE TOGGLE - bottom center of screen
                    Synchronized with main toggle
                    Smaller size appropriate for phone screen
                    Same green/gray color scheme
                  */}
                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
                    <button 
                      onClick={handleToggle}
                      className="relative inline-flex h-10 w-[68px] flex-shrink-0 cursor-pointer 
                        rounded-full border-2 border-transparent transition-colors duration-300 ease-in-out"
                      style={{
                        backgroundColor: lightsOn ? 'rgba(74, 222, 128, 0.9)' : 'rgba(31, 41, 55, 0.9)'
                      }}
                      aria-pressed={lightsOn}
                      aria-label="Toggle lights on phone"
                    >
                      <span className="sr-only">Toggle lights on phone</span>
                      
                      {/* Sliding indicator (smaller for phone) */}
                      <span
                        className={`pointer-events-none relative inline-block h-[36px] w-[36px] 
                          transform rounded-full bg-white shadow ring-0 transition duration-300 
                          ease-in-out ${lightsOn ? 'translate-x-7' : 'translate-x-0'}`}
                      />
                    </button>
                    
                    {/* Status text below phone toggle */}
                    <p className="mt-2 text-center text-[10px] text-white/80 font-medium 
                      drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
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
