"use client";
import { motion } from "framer-motion";
import { useStill } from "./motion";

interface KeplerScientistProps {
  pulseKey?: number;
}

export default function KeplerScientist({ pulseKey = 0 }: KeplerScientistProps) {
  const isStill = useStill();

  return (
    <g transform="translate(370, 280) scale(1.15)">
      {/* ── Outer Tech Orbital Rings ── */}
      <motion.circle
        cx="0"
        cy="0"
        r="88"
        fill="none"
        stroke="#0284c7"
        strokeWidth="1.2"
        strokeDasharray="16 28 8 36"
        opacity="0.35"
        animate={isStill ? undefined : { rotate: 360 }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
      />
      <motion.circle
        cx="0"
        cy="0"
        r="74"
        fill="none"
        stroke="#38bdf8"
        strokeWidth="1"
        strokeDasharray="8 18 32 14"
        opacity="0.25"
        animate={isStill ? undefined : { rotate: -360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      />

      {/* Orbiting Subtle Circuit Nodes */}
      {[-60, 60, -35, 45].map((ang, i) => {
        const rad = (ang * Math.PI) / 180;
        const x = Math.cos(rad) * 78;
        const y = Math.sin(rad) * 78;
        return (
          <motion.circle
            key={i}
            cx={x}
            cy={y}
            r="2"
            fill="#38bdf8"
            opacity="0.4"
            animate={isStill ? undefined : { opacity: [0.15, 0.65, 0.15] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.6 }}
          />
        );
      })}

      {/* Ingestion Shockwave: Fires right when document enters */}
      <motion.circle
        key={`pulse-${pulseKey}`}
        cx="0"
        cy="5"
        r="16"
        fill="none"
        stroke="#38bdf8"
        strokeWidth="2.5"
        initial={{ r: 16, opacity: 1 }}
        animate={{ r: 92, opacity: 0 }}
        transition={{ duration: 1.1, ease: "easeOut" }}
      />

      {/* ── AUTHENTIC KEPLER AVATAR FLOATING IN SPACE ── */}
      <motion.g
        animate={
          isStill
            ? undefined
            : {
                y: [-7, 7, -7],
                rotate: [-1.2, 1.2, -1.2],
              }
        }
        transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* ── KPLOR AVATAR FLOATING IN SPACE (NO BACKGROUND BOX) ── */}
        {/* White Body - Sculpted bell geometry */}
        <path
          d="M -11,-16 Q 0,-24 11,-16 Q 34,20 34,50 Q 0,62 -34,50 Q -34,20 -11,-16 Z"
          fill="#ffffff"
          stroke="#94a3b8"
          strokeWidth="1.5"
          strokeLinejoin="round"
          filter="url(#drop-shadow-soft)"
        />

        {/* Subtle 3D Surface Bevel */}
        <path
          d="M -6,-12 Q 0,-18 6,-12 Q 24,18 22,44 Q 0,52 -22,44 Q -24,18 -6,-12 Z"
          fill="#f8fafc"
          opacity="0.8"
        />

        {/* Glowing Cyan Head */}
        <motion.g
          animate={isStill ? undefined : { y: [0, -4, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Outer Neon Glow */}
          <circle cx="0" cy="-44" r="16" fill="#00e5ff" opacity="0.25" filter="url(#glow-heavy)" />
          {/* Cyan Glow Layer */}
          <circle cx="0" cy="-44" r="15" fill="#38bdf8" filter="url(#glow-cyan)" />
          {/* Solid Pure Cyan Core */}
          <circle cx="0" cy="-44" r="15" fill="#22d3ee" />
        </motion.g>
      </motion.g>
    </g>
  );
}
