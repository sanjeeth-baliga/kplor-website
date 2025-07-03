// Carousel.tsx
"use client";
import { useEffect } from "react";
import { motion, useAnimate } from "framer-motion";

const universityLogos = [
  { src: "/IIM_Indore_Logo.svg", alt: "IIM I" },
  { src: "/iim_Koz.svg", alt: "IIM K" },
  { src: "/IIT_ROPAR.svg", alt: "IIT ROPAR" },
  { src: "/nita.svg", alt: "MNIT A" },
  { src: "/nitk.svg", alt: "NIT K" },
];

export default function Carousel() {
  const [scope, animate] = useAnimate<HTMLDivElement>();

  useEffect(() => {
    const animateCarousel = async () => {
      const track = scope.current;
      if (!track) return;

      // The track is duplicated, so we move it by half its width for a seamless loop
      const totalWidth = track.scrollWidth / 2;

      await animate(
        track,
        { x: [`-${totalWidth}px`, "0px"] },
        {
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }
      );
    };

    animateCarousel();
  }, [animate, scope]);

  return (
    <div className="relative w-full overflow-hidden px-[5%] py-4">
      {/* Scroll Track */}
      <motion.div className="flex whitespace-nowrap items-center" ref={scope}>
        {[...universityLogos, ...universityLogos].map((logo, index) => (
          <div
            key={index}
            className="flex items-center justify-center mx-4 min-w-[200px] my-4"
          >
            <div className="bg-white p-2 rounded-xl shadow-xl shadow-gray-500/50 h-44 w-60 flex items-center justify-center">
              <img src={logo.src} alt={logo.alt} className="max-h-full max-w-full object-contain opacity-60" />
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}