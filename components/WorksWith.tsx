'use client';
import { motion } from "framer-motion";
import { staggerUp, childUp } from "@/lib/animations";

/**
 * WorksWith Component
 * 
 * Displays official compatibility badges for major smart home platforms
 * in an elegant, Apple-inspired layout. Uses subtle animations and clean 
 * spacing to maintain a premium aesthetic while showcasing official partnerships.
 * 
 * Note: You'll need to add the following image files to your /public folder:
 * - /public/badges/works-with-apple-homekit.png
 * - /public/badges/works-with-google-assistant.png
 * - /public/badges/works-with-amazon-alexa.png
 */
export default function WorksWith() {
  // Platform compatibility data
  const platforms = [
    {
      id: "apple-homekit",
      alt: "Works with Apple HomeKit",
      imgSrc: "/badges/works-with-apple-homekit.png", // Path to the badge image
    },
    {
      id: "google-assistant",
      alt: "Works with the Google Assistant",
      imgSrc: "/badges/works-with-google-assistant.png", // Path to the badge image
    },
    {
      id: "amazon-alexa",
      alt: "Works with Amazon Alexa",
      imgSrc: "/badges/works-with-amazon-alexa.png", // Path to the badge image
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

        {/* Official badge logos with staggered animation */}
        <motion.div 
          variants={staggerUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-10"
        >
          {platforms.map((platform) => (
            <motion.div
              key={platform.id}
              variants={childUp}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="w-full max-w-[280px]"
            >
              <img 
                src={platform.imgSrc} 
                alt={platform.alt} 
                className="w-full h-auto"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
