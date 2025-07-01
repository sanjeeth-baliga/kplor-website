"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const partners = [
  {
    name: "Nvidia Inception Program",
    svg: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx="12" fill="#76B900"/><text x="24" y="28" textAnchor="middle" fontSize="12" fill="#fff" fontWeight="bold">Nvidia</text></svg>
    ),
  },
  {
    name: "Startup Karnataka",
    svg: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx="12" fill="#E94E1B"/><text x="24" y="28" textAnchor="middle" fontSize="10" fill="#fff" fontWeight="bold">Karnataka</text></svg>
    ),
  },
  {
    name: "Google for Startups Cloud Academy",
    svg: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx="12" fill="#4285F4"/><text x="24" y="28" textAnchor="middle" fontSize="8" fill="#fff" fontWeight="bold">Google</text></svg>
    ),
  },
];

export default function Carousel() {
  const [index, setIndex] = useState(0);

  // Loop carousel
  const next = () => setIndex((i) => (i + 1) % partners.length);
  const prev = () => setIndex((i) => (i - 1 + partners.length) % partners.length);

  return (
    <div className="flex flex-row items-center justify-center gap-4 w-full">
      <button
        aria-label="Previous"
        onClick={prev}
        className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
      >
        <svg width="24" height="24" fill="none"><path d="M15 18l-6-6 6-6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
      <div className="flex flex-row items-center justify-center gap-12 w-full max-w-xl">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="flex flex-col items-center justify-center min-w-[160px]"
          >
            <div className="mb-2">{partners[index].svg}</div>
            <span className="text-lg font-semibold text-white text-center whitespace-nowrap drop-shadow-lg">
              {partners[index].name}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
      <button
        aria-label="Next"
        onClick={next}
        className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
      >
        <svg width="24" height="24" fill="none"><path d="M9 6l6 6-6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
    </div>
  );
} 