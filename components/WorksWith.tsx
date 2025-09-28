'use client';
import { motion } from "framer-motion";
import { staggerUp, childUp } from "@/lib/animations";

/**
 * WorksWith Component
 * 
 * Displays official compatibility badges for major smart home platforms
 * in an elegant, Apple-inspired card layout. Each badge is presented in
 * a subtle card with Apple-style shadows and animations.
 */
export default function WorksWith() {
  // Platform compatibility data with paths to official WebP badges
  const platforms = [
    {
      id: "apple-homekit",
      alt: "Works with Apple HomeKit",
      imgSrc: "/badges/works-with-apple-home.webp",
    },
    {
      id: "google-assistant",
      alt: "Works with the Google Assistant",
      imgSrc: "/badges/works-with-google-home.webp",
    },
    {
      id: "amazon-alexa",
      alt: "Works with Amazon Alexa",
      imgSrc: "/badges/works-with-alexa.webp",
    },
  ];

  return (
    <section className="py-24 bg-white border-t border-gray-100">
      <div className="mx-auto max-w-6xl px-4">
        {/* Heading with subtle fade animation */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <h2 className="text-gray-500 text-sm font-medium tracking-wide">
            Compatible with all major smart home platforms
          </h2>
          <p className="text-gray-400 text-xs mt-2 max-w-md mx-auto">
            Control your home with the voice assistant you already use
          </p>
        </motion.div>

        {/* Apple-style cards with platform badges */}
        <motion.div 
          variants={staggerUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-wrap justify-center items-center gap-8 md:gap-12"
        >
          {platforms.map((platform) => (
            <motion.div
              key={platform.id}
              variants={childUp}
              whileHover={{ 
                y: -4, 
                boxShadow: "0 12px 24px rgba(0,0,0,0.08), 0 4px 8px rgba(0,0,0,0.03)",
                transition: { duration: 0.2 } 
              }}
              className="flex-shrink-0"
            >
              {/* Apple-style card container */}
              <div className="bg-white rounded-2xl px-8 py-6 flex items-center justify-center h-24 w-64
                shadow-[0_8px_16px_rgba(0,0,0,0.04),_0_2px_4px_rgba(0,0,0,0.02)]
                border border-gray-50 transition-all duration-300"
              >
                {/* Platform badge image */}
                <img 
                  src={platform.imgSrc} 
                  alt={platform.alt} 
                  className="h-auto max-w-full object-contain max-h-16"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
