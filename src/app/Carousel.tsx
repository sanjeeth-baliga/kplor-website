// Carousel.tsx
"use client";
import { useRef, useEffect } from "react";
import { motion, useAnimate } from "framer-motion";

const universityLogos = [
  { src: "/IIM_Indore_Logo.svg", alt: "IIM I" },
  { src: "/iim_Koz.svg", alt: "IIM K" },
  { src: "/IIT_ROPAR.svg", alt: "IIT ROPAR" },
  { src: "/nita.svg", alt: "MNIT A" },
  { src: "/nitk.svg", alt: "NIT K" },
];

export default function Carousel() {
  const trackRef = useRef(null);
  const [scope, animate] = useAnimate();

  useEffect(() => {
    const animateCarousel = async () => {
      if (!trackRef.current) return;
      const totalWidth = trackRef.current.scrollWidth / 2;

      await animate(
        scope.current,
        { x: [`-${totalWidth}px`, `0px`] }, // Left ➡️ Right animation
        {
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }
      );
    };

    animateCarousel();
  }, [animate]);

  return (
    // Changed overflow-hidden to overflow-visible to allow content to flow out
    // and adjusted padding to px-[5%] to ensure some space at ends
    <div className="relative w-full overflow-visible px-[5%]" ref={scope}>
      {/* Scroll Track */}
      <motion.div className="flex whitespace-nowrap items-center" ref={trackRef}>
        {[...universityLogos, ...universityLogos].map((logo, index) => (
          <div
            key={index}
            className="flex items-center justify-center mx-6 min-w-[160px]"
          >
            <div className="bg-white p-2 rounded-xl shadow-md h-20 w-36 flex items-center justify-center">
              <img
                src={logo.src}
                alt={logo.alt}
                className="max-h-full max-w-full object-contain opacity-60"
              />
            </div>
          </div>
        ))}
      </motion.div>

      {/* Removed Left & Right Fade elements */}
    </div>
  );
}