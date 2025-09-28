'use client';
import { motion } from "framer-motion";
import { staggerUp, childUp } from "@/lib/animations";

/**
 * WorksWith Component
 * 
 * Displays compatibility with major smart home platforms in an elegant,
 * Apple-inspired design. Uses subtle animations and monochrome styling
 * to maintain a premium aesthetic.
 */
export default function WorksWith() {
  // Platform compatibility data with logos and names
  const platforms = [
    {
      id: "apple",
      name: "Apple HomeKit",
      logo: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" aria-hidden="true">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
        </svg>
      ),
    },
    {
      id: "google",
      name: "Google Home",
      logo: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" aria-hidden="true">
          <path d="M12 16.25c1.97 0 3.57-1.6 3.57-3.57s-1.6-3.57-3.57-3.57-3.57 1.6-3.57 3.57 1.6 3.57 3.57 3.57m0-12.37 7.07 3.93v6.46l-7.07 3.93-7.07-3.93V7.81L12 3.88M2.05 7.81v9.97l9.96 5.66 9.96-5.66V7.81l-9.96-5.66-9.96 5.66z" />
        </svg>
      ),
    },
    {
      id: "alexa",
      name: "Amazon Alexa",
      logo: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" aria-hidden="true">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3.33c.99 0 1.67.68 1.67 1.67s-.68 1.67-1.67 1.67-1.67-.68-1.67-1.67.68-1.67 1.67-1.67zm0 13.34c-2.33 0-4.67-.83-6.67-2.5 1.67-2.5 4.17-3.33 6.67-3.33s5 .83 6.67 3.33c-2 1.67-4.34 2.5-6.67 2.5z M12 17.33c-1.67 0-3.33-.83-5-2.5 1.67-1.67 3.33-2.5 5-2.5s3.33.83 5 2.5c-1.67 1.67-3.33 2.5-5 2.5z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-6xl px-4">
        {/* Heading with subtle fade animation */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center text-gray-500 text-sm font-medium mb-10"
        >
          Works seamlessly with
        </motion.h2>

        {/* Platform logos with staggered animation */}
        <motion.div 
          variants={staggerUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="flex justify-center items-center gap-16 md:gap-24"
        >
          {platforms.map((platform) => (
            <motion.div
              key={platform.id}
              variants={childUp}
              className="flex flex-col items-center"
            >
              {/* Subtle highlight effect on hover */}
              <div className="relative group">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gray-50 flex items-center justify-center">
                  {/* Platform logo */}
                  <div className="text-gray-800">
                    {platform.logo}
                  </div>
                </div>
                {/* Subtle glow effect on hover */}
                <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-b from-transparent to-gray-100"></div>
              </div>
              
              {/* Platform name */}
              <p className="mt-4 text-sm text-gray-600">{platform.name}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
