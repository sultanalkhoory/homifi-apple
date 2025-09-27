'use client';
import { motion } from "framer-motion";
import { staggerUp, childUp } from "@/lib/animations";

const items = [
  { label: "Voice Control", icon: "🎙️" },
  { label: "HomeKey", icon: "🔑" },
  { label: "Security", icon: "🛡️" },
  { label: "Automation", icon: "✨" },
];

export default function FeatureStrip() {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="mx-auto max-w-6xl px-4">
        <motion.ul variants={staggerUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {items.map((it) => (
            <motion.li key={it.label} variants={childUp} className="text-center">
              <div className="mx-auto w-20 h-20 rounded-full bg-white shadow grid place-items-center text-3xl">{it.icon}</div>
              <p className="mt-3 text-sm text-gray-600">{it.label}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}