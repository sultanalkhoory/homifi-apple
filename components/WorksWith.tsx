'use client';
import { motion } from "framer-motion";
import { staggerUp, childUp } from "@/lib/animations";

/**
 * WorksWith Component
 * 
 * Displays official compatibility badges for major smart home platforms
 * in an elegant, Apple-inspired layout. Uses subtle animations and clean 
 * spacing to maintain a premium aesthetic while showcasing official partnerships.
 */
export default function WorksWith() {
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

        {/* Official partnership badges with staggered animation */}
        <motion.div 
          variants={staggerUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-10"
        >
          {/* Apple HomeKit Badge */}
          <motion.div
            variants={childUp}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className="w-full max-w-[280px]"
          >
            <div className="bg-white rounded-full py-4 px-6 shadow-sm flex items-center gap-4 border border-gray-100">
              <div className="text-amber-500">
                <svg viewBox="0 0 24 24" className="w-12 h-12 fill-current" aria-hidden="true">
                  <path d="M17.66 7.32l-1 1.74c-.66-1.21-1.91-2.06-3.41-2.06-2.19 0-3.94 1.65-3.94 4s1.75 4 3.94 4c1.5 0 2.75-.85 3.41-2.06l1 1.74c-1.12 1.62-2.94 2.56-5.06 2.56-3.72 0-6.19-2.4-6.19-6.25 0-3.86 2.47-6.25 6.19-6.25 2.12 0 3.94.94 5.06 2.56M17.87 12c0 1.5-.76 3-2.19 3-1.44 0-2.2-1.5-2.2-3s.76-3 2.2-3c1.43 0 2.19 1.5 2.19 3z" />
                </svg>
              </div>
              <div>
                <div className="text-xs font-normal text-gray-500">Works with</div>
                <div className="text-xl font-semibold tracking-tight">Apple HomeKit</div>
              </div>
            </div>
          </motion.div>
          
          {/* Google Assistant Badge */}
          <motion.div
            variants={childUp}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className="w-full max-w-[280px]"
          >
            <div className="bg-white rounded-full py-4 px-6 shadow-sm flex items-center gap-4 border border-gray-100">
              <div className="flex flex-shrink-0">
                <span className="w-3 h-3 rounded-full bg-blue-500 mr-[2px]"></span>
                <span className="w-3 h-3 rounded-full bg-red-500 mr-[2px]"></span>
                <span className="w-3 h-3 rounded-full bg-amber-400 mr-[2px]"></span>
                <span className="w-3 h-3 rounded-full bg-green-500 mr-[2px]"></span>
              </div>
              <div>
                <div className="text-xs font-normal text-gray-500">works with the</div>
                <div className="text-xl font-semibold tracking-tight">Google Assistant</div>
              </div>
            </div>
          </motion.div>
          
          {/* Amazon Alexa Badge */}
          <motion.div
            variants={childUp}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className="w-full max-w-[280px]"
          >
            <div className="bg-white rounded-full py-4 px-6 shadow-sm flex items-center gap-4 border border-gray-100">
              <div className="text-[#31C4F3]">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-10 h-10 fill-current">
                  <path d="M24 5C13.52 5 5 13.52 5 24s8.52 19 19 19 19-8.52 19-19S34.48 5 24 5zm0 7.5c2.07 0 3.75 1.68 3.75 3.75S26.07 20 24 20s-3.75-1.68-3.75-3.75S21.93 12.5 24 12.5zm0 24.29c-4.96 0-9.27-2.54-11.77-6.38 1.56-2.83 7.4-4.29 11.77-4.29s10.21 1.46 11.77 4.29c-2.5 3.84-6.81 6.38-11.77 6.38z" />
                </svg>
              </div>
              <div>
                <div className="text-xs font-normal text-gray-500 uppercase">Works with</div>
                <div className="text-xl font-semibold tracking-tight lowercase">amazon alexa</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
