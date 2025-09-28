'use client';
import { motion } from "framer-motion";
import { staggerUp, childUp } from "@/lib/animations";

/**
 * WorksWith Component
 * 
 * Displays official compatibility badges for major smart home platforms
 * in an elegant, Apple-inspired layout. Uses WebP format official badges
 * for optimal quality and performance.
 */
export default function WorksWith() {
  // Platform compatibility data with paths to official WebP badges
  const platforms = [
    {
      id: "apple-homekit",
      alt: "Works with Apple HomeKit",
      imgSrc: "/badges/works-with-apple-home.webp", // Updated filename
    },
    {
      id: "google-assistant",
      alt: "Works with the Google Assistant",
      imgSrc: "/badges/works-with-google-home.webp", // Updated filename
    },
    {
      id: "amazon-alexa",
      alt: "Works with Amazon Alexa",
      imgSrc: "/badges/works-with-alexa.webp", // Updated filename
    },
  ];

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

        {/* Official badges with staggered animation */}
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
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="flex-shrink-0 max-w-[280px]"
            >
              <img 
                src={platform.imgSrc} 
                alt={platform.alt} 
                className="h-auto w-full object-contain"
                // Add dimensions if known
                // width={280} 
                // height={80}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
