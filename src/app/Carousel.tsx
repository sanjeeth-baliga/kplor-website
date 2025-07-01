// Carousel.tsx
"use client";
import { useRef, useEffect } from "react";
import { motion, useAnimate } from "framer-motion";

const universities = [
  "Mumbai University",
  "VTU",
  "IIT Bombay",
  "IIM Kozhikode",
];

export default function Carousel() {
  const containerRef = useRef(null);
  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (!containerRef.current) return;

    const containerWidth = containerRef.current.offsetWidth;
    const contentWidth = universities.length * 200; // Adjust 200 based on actual width
    const animationDuration = 10; // Increased speed (seconds)

    animate(
      scope.current,
      { x: [0, -contentWidth + containerWidth] },
      {
        duration: animationDuration,
        repeat: Infinity,
        ease: "linear",
      }
    );
  }, []);

  return (
    <div className="relative w-full overflow-hidden" ref={scope}>
      <div className="flex whitespace-nowrap" ref={containerRef}>
        {universities.map((university, index) => (
          <motion.div
            key={index}
            className="flex items-center justify-center min-w-[200px] px-6 py-2 text-lg font-semibold text-white drop-shadow-lg"
            style={{
              background: `linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,0) 0%, rgba(0,0,0,0) 10%, rgba(0,0,0,0.3) 90%, rgba(0,0,0,0) 100%)`,
            }}
          >
            {university}
          </motion.div>
        ))}
      </div>
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black to-transparent"></div>
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black to-transparent"></div>
    </div>
  );
}