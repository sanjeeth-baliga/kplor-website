// GifCarousel.tsx
"use client";
import { motion } from "framer-motion";

const gifs = [
  "/gif1.gif",
  "/gif2.gif",
  "/gif3.gif",
  "/gif4.gif"
];

export default function GifCarousel() {
  return (
    <div className="relative w-full h-64 overflow-hidden rounded-2xl shadow-2xl border-4 border-white/30 bg-white/10 p-2">
      <motion.div
        className="flex flex-col absolute top-0 left-0 right-0"
        animate={{
          y: [0, -((gifs.length * 240) - 240)] // Adjusted based on container height
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {gifs.map((gif, index) => (
          <div key={index} className="w-full h-60 flex items-center justify-center p-1">
            <img
              src={gif}
              alt={`Demo video ${index + 1}`}
              className="max-h-full max-w-full object-contain"
              style={{ width: "auto", height: "auto" }}
            />
          </div>
        ))}
        {/* Duplicate the first few items for seamless looping */}
        {gifs.slice(0, 2).map((gif, index) => (
          <div key={`duplicate-${index}`} className="w-full h-60 flex items-center justify-center p-1">
            <img
              src={gif}
              alt={`Demo video ${index + 1}`}
              className="max-h-full max-w-full object-contain"
              style={{ width: "auto", height: "auto" }}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}