'use client';
import { motion } from "framer-motion";
import { staggerUp, childUp } from "@/lib/animations";

/**
 * WorksWithExactStyle Component
 * 
 * Closely replicates the exact styling of official smart home compatibility badges
 * as shown in the screenshot, while maintaining proper spacing and animations.
 */
export default function WorksWithExactStyle() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="mx-auto max-w-6xl px-4">
        {/* Heading with subtle fade animation */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center text-gray-500 text-sm font-medium mb-12"
        >
          Compatible with all major smart home platforms
        </motion.h2>

        {/* Badge layout container */}
        <motion.div 
          variants={staggerUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          {/* Apple HomeKit Badge */}
          <motion.div
            variants={childUp}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
          >
            <div className="bg-white rounded-full py-3 px-5 flex items-center gap-3 shadow-sm border border-gray-100">
              {/* HomeKit Icon */}
              <div className="flex-shrink-0">
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 5L4 14V28L18 37L32 28V14L18 5Z" fill="#FFCC00" stroke="#FF9900" strokeWidth="2"/>
                  <path d="M18 5V19M18 37V19M18 19L32 14M18 19L4 14" stroke="#FF9900" strokeWidth="2"/>
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-gray-500">Works with</span>
                <span className="text-xl font-semibold tracking-tight">Apple HomeKit</span>
              </div>
            </div>
          </motion.div>
          
          {/* Google Assistant Badge */}
          <motion.div
            variants={childUp}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
          >
            <div className="bg-white rounded-full py-3 px-5 flex items-center gap-3 shadow-sm border border-gray-100">
              {/* Google Assistant Icon */}
              <div className="flex-shrink-0 flex items-center">
                <div className="flex flex-col gap-[2px]">
                  <div className="w-8 h-8 rounded-full bg-[#4285F4] flex-shrink-0"></div>
                </div>
                <div className="flex flex-col ml-1 gap-[2px]">
                  <div className="w-3 h-3 rounded-full bg-[#EA4335]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#FBBC05]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#34A853]"></div>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-gray-500">works with the</span>
                <span className="text-xl font-semibold tracking-tight">Google Assistant</span>
              </div>
            </div>
          </motion.div>
          
          {/* Amazon Alexa Badge */}
          <motion.div
            variants={childUp}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
          >
            <div className="bg-white rounded-full py-3 px-5 flex items-center gap-3 shadow-sm border border-gray-100">
              {/* Alexa Icon */}
              <div className="flex-shrink-0">
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 33C26.2843 33 33 26.2843 33 18C33 9.71573 26.2843 3 18 3C9.71573 3 3 9.71573 3 18C3 26.2843 9.71573 33 18 33Z" stroke="#31C4F3" strokeWidth="2.5" fill="none"/>
                  <circle cx="18" cy="12" r="3" fill="#31C4F3"/>
                  <path d="M25 26C23 22.5 21 21 18 21C15 21 13 22.5 11 26" stroke="#31C4F3" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 uppercase">Works with</span>
                <span className="text-xl font-semibold tracking-tight lowercase">amazon alexa</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
