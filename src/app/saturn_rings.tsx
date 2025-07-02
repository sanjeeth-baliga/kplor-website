// Create a new file called `SaturnRings.tsx`
"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const mathNotations = [
  "∫", "∑", "∂", "∇", "∏", "√", "∞", "≈", "≠", "≤", "≥", "π", "θ", "φ", "λ", "ω"
];

export function SaturnRings() {
  const [notations, setNotations] = useState<string[]>([]);

  useEffect(() => {
    // Select 3 unique math notations for the 3 rings
    const shuffled = [...mathNotations].sort(() => 0.5 - Math.random());
    setNotations(shuffled.slice(0, 3));
  }, []);

  if (notations.length === 0) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {/* Ring 1 (innermost) */}
      <div className="absolute w-[300px] h-[300px] rounded-full border border-white/10">
        {notations[0] && (
          <motion.div
            className="absolute text-white/60 text-xl font-mono"
            initial={{ x: 0, y: -150 }}
            animate={{
              rotate: 360,
              transition: {
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }
            }}
          >
            {notations[0]}
          </motion.div>
        )}
      </div>

      {/* Ring 2 (middle) */}
      <div className="absolute w-[400px] h-[400px] rounded-full border border-white/10">
        {notations[1] && (
          <motion.div
            className="absolute text-white/50 text-lg font-mono"
            initial={{ x: 0, y: -200 }}
            animate={{
              rotate: -360,
              transition: {
                duration: 25,
                repeat: Infinity,
                ease: "linear"
              }
            }}
          >
            {notations[1]}
          </motion.div>
        )}
      </div>

      {/* Ring 3 (outermost) */}
      <div className="absolute w-[500px] h-[500px] rounded-full border border-white/10">
        {notations[2] && (
          <motion.div
            className="absolute text-white/40 text-base font-mono"
            initial={{ x: 0, y: -250 }}
            animate={{
              rotate: 360,
              transition: {
                duration: 30,
                repeat: Infinity,
                ease: "linear"
              }
            }}
          >
            {notations[2]}
          </motion.div>
        )}
      </div>
    </div>
  );
}