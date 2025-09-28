'use client';
import { motion } from "framer-motion";
import { staggerUp, childUp } from "@/lib/animations";

/**
 * WorksWithFooter Component
 * 
 * A compact footer version of the Works With component that displays
 * official compatibility badges in an elegant, space-efficient layout.
 * Designed to be placed in the footer area of the site.
 */
export default function WorksWithFooter() {
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
    <section className="py-12 bg-gray-50 border-t border-gray-100">
      <div className="mx-auto max-w-6xl px-4">
        {/* Compact heading */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center text-gray-500 text-xs font-medium tracking-wide mb-8"
        >
          Compatible with all major smart home platforms
        </motion.h2>

        {/* Compact badge layout */}
        <motion.div 
          variants={staggerUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-wrap justify-center items-center gap-6 md:gap-10"
        >
          {platforms.map((platform) => (
            <motion.div
              key={platform.id}
              variants={childUp}
              whileHover={{ 
                y: -2,
                boxShadow: "0 8px 16px rgba(0,0,0,0.06), 0 2px 4px rgba(0,0,0,0.02)",
                transition: { duration: 0.2 } 
              }}
              className="flex-shrink-0"
            >
              {/* Smaller Apple-style card */}
              <div className="bg-white rounded-xl px-5 py-3 flex items-center justify-center h-16 w-48
                shadow-[0_4px_10px_rgba(0,0,0,0.03),_0_1px_2px_rgba(0,0,0,0.01)]
                border border-gray-50 transition-all duration-300"
              >
                <img 
                  src={platform.imgSrc} 
                  alt={platform.alt} 
                  className="h-auto max-w-full object-contain max-h-10"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
