"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const DOCS = [
  {
    id: 0,
    title: "Math & Geometry",
    tag: "Grade 1–12",
    color: "#e11d48",
    badgeBg: "#fee2e2",
    badgeText: "#b91c1c",
    screenTitle: "GRADE 1–12 MATHEMATICS",
    video: "/videos/hero/k12_math_geometry.mp4",
  },
  {
    id: 1,
    title: "Workforce Training",
    tag: "Corporate L&D",
    color: "#059669",
    badgeBg: "#dcfce7",
    badgeText: "#15803d",
    screenTitle: "CORPORATE WORKFORCE L&D",
    video: "/videos/hero/corporate_learning_ops.mp4",
  },
  {
    id: 2,
    title: "Supply Chain & Ops",
    tag: "Logistics SOP",
    color: "#d97706",
    badgeBg: "#fef3c7",
    badgeText: "#b45309",
    screenTitle: "GLOBAL SUPPLY CHAIN",
    video: "/videos/hero/supply_chain_pipeline.mp4",
  },
];

export default function HeroScene() {
  // Screen starts on scene 0 (K-12) immediately and stays active
  const [screenScene, setScreenScene] = useState<number>(0);
  // Next document to be ingested starts with doc 1 (EdTech)
  const [docIndex, setDocIndex] = useState<number>(1);
  const [pulseKey, setPulseKey] = useState<number>(0);

  // Synchronized Cycle:
  // - The screen on the right NEVER fades out early or leaves a blank gap.
  // - The document on the left spawns, expands, hovers, and glides into Kepler logo.
  // - ONLY when the document reaches Kepler logo (at 2200ms), Kepler logo pulses
  //   and the current screen transitions to the new screen emerging from Kepler!
  // - The screen remains visible and active while the next document comes in.
  useEffect(() => {
    // When incoming document hits Kepler logo at 2200ms:
    const absorbTimer = setTimeout(() => {
      setScreenScene(docIndex);
      setPulseKey((k) => k + 1);
    }, 2200);

    // Queue up the next incoming document on the left after display period
    const nextDocTimer = setTimeout(() => {
      setDocIndex((prev) => (prev + 1) % 3);
    }, 5200);

    return () => {
      clearTimeout(absorbTimer);
      clearTimeout(nextDocTimer);
    };
  }, [docIndex]);

  const currentDoc = DOCS[docIndex];

  return (
    <div className="relative w-full aspect-[16/9] max-w-5xl mx-auto flex items-center justify-center select-none">
      <svg 
        viewBox="60 40 910 480" 
        className="w-full h-full overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Cyan & Blue Glow Filters */}
          <filter id="glow-cyan" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="glow-heavy" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="14" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="glow-subtle" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="drop-shadow-soft" x="-40%" y="-40%" width="180%" height="180%">
            <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#040e24" floodOpacity="0.3" />
          </filter>
          <filter id="screen-shadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="24" stdDeviation="28" floodColor="#010614" floodOpacity="0.65" />
          </filter>

          {/* Gradients */}
          <linearGradient id="screen-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#091b36" stopOpacity="0.95" />
            <stop offset="60%" stopColor="#051224" stopOpacity="0.98" />
            <stop offset="100%" stopColor="#020814" stopOpacity="1" />
          </linearGradient>

          <linearGradient id="screen-border" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.85" />
            <stop offset="45%" stopColor="#0284c7" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.75" />
          </linearGradient>

          <linearGradient id="doc-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#f8fafc" />
          </linearGradient>

          {/* Soft, delicate blue aura gradient (reduced opacity) */}
          <radialGradient id="avatar-blue-aura" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.16" />
            <stop offset="40%" stopColor="#0284c7" stopOpacity="0.06" />
            <stop offset="80%" stopColor="#0369a1" stopOpacity="0.01" />
            <stop offset="100%" stopColor="#0369a1" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="area-chart-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Soft, airy ambient background glow field (less blue, low opacity) */}
        <motion.circle 
          cx="370" cy="280" r="175" 
          fill="url(#avatar-blue-aura)" 
          animate={{ scale: [1, 1.06, 1], opacity: [0.35, 0.5, 0.35] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* ═════════════════════════════════════════════════════════════ */}
        {/* 1. THE INPUT: DOCUMENT FADES IN & EXPANDS, THEN SHRINKS & GOES */}
        {/* ═════════════════════════════════════════════════════════════ */}

        {/* Ghost docking guide at spawn position */}
        <g transform="translate(130, 280) scale(1.15)">
          <path 
            d="M -34,-48 L 14,-48 L 34,-28 L 34,48 L -34,48 Z" 
            fill="none" 
            stroke="#e2e8f0" 
            strokeWidth="1.5" 
            strokeDasharray="4 4" 
            opacity="0.35"
          />
        </g>

        {/* Trajectory guide line towards Kepler logo */}
        <g fill="none">
          <path 
            d="M 180 280 C 235 260, 290 270, 355 280" 
            stroke="#0284c7" 
            strokeWidth="1.5" 
            strokeDasharray="4 6" 
            opacity="0.2"
          />
        </g>

        {/* The Animated Document: Fades in, expands, then shrinks and moves into Kepler */}
        <g transform="translate(130, 280)">
          <AnimatePresence mode="wait">
            <motion.g
              key={`doc-${docIndex}`}
              initial={{ x: 0, y: 0, scale: 0.25, opacity: 0 }}
              animate={{
                x: [0, 0, 0, 240],
                y: [0, 0, -6, 0],
                scale: [0.25, 1.15, 1.15, 0.06],
                opacity: [0, 1, 1, 0],
                rotate: [0, 0, 2, -14],
              }}
              transition={{
                duration: 2.2,
                times: [0, 0.22, 0.48, 1],
                ease: ["easeOut", "easeInOut", "easeInOut"],
              }}
              filter="url(#drop-shadow-soft)"
            >
              {/* Document Base */}
              <path 
                d="M -34,-48 L 14,-48 L 34,-28 L 34,48 L -34,48 Z" 
                fill="url(#doc-gradient)" 
                stroke="#e2e8f0" 
                strokeWidth="2"
                strokeLinejoin="round" 
              />
              {/* Folded Top-Right Corner */}
              <path 
                d="M 14,-48 L 34,-28 L 14,-28 Z" 
                fill="#e2e8f0" 
                stroke="#cbd5e1" 
                strokeWidth="1.5" 
                strokeLinejoin="round" 
              />

              {/* Document Header Bar in domain color */}
              <rect x="-22" y="-34" width="28" height="6" rx="3" fill={currentDoc.color} />
              <circle cx="22" cy="-31" r="3" fill="#38bdf8" />

              {/* Document Content Lines */}
              <rect x="-22" y="-18" width="44" height="4" rx="2" fill="#0f2a52" opacity="0.8" />
              <rect x="-22" y="-8" width="38" height="4" rx="2" fill="#0f2a52" opacity="0.6" />
              <rect x="-22" y="2" width="42" height="4" rx="2" fill="#0f2a52" opacity="0.6" />
              <rect x="-22" y="12" width="32" height="4" rx="2" fill="#0f2a52" opacity="0.6" />
              <rect x="-22" y="22" width="24" height="4" rx="2" fill={currentDoc.color} opacity="0.7" />

              {/* Domain Badge Pill */}
              <rect x="-24" y="32" width="48" height="9" rx="4.5" fill={currentDoc.badgeBg} />
              <text x="0" y="38.5" fill={currentDoc.badgeText} fontSize="5.5" fontWeight="bold" textAnchor="middle">
                {currentDoc.tag}
              </text>

              {/* Pulsing Scan Ring on entrance */}
              <motion.circle 
                cx="0" cy="0" r="48" 
                fill="none" 
                stroke={currentDoc.color} 
                strokeWidth="1.5" 
                strokeDasharray="4 4"
                initial={{ scale: 0.6, opacity: 0.9 }}
                animate={{ scale: 1.3, opacity: 0 }}
                transition={{ duration: 1.1, ease: "easeOut" }}
              />
            </motion.g>
          </AnimatePresence>
        </g>

        {/* ═════════════════════════════════════════════════════════════ */}
        {/* 2. THE KPLOR AVATAR IN SPACE (NO TABLE, NO SHINE, SOFT AURA) */}
        {/* ═════════════════════════════════════════════════════════════ */}

        <g transform="translate(370, 280) scale(1.15)">
          {/* Outer Segmented AI Tech Orbitals (Soft, delicate) */}
          <motion.circle 
            cx="0" cy="0" r="88" 
            fill="none" 
            stroke="#0284c7" 
            strokeWidth="1.2" 
            strokeDasharray="16 28 8 36"
            opacity="0.4"
            animate={{ rotate: 360 }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          />
          <motion.circle 
            cx="0" cy="0" r="74" 
            fill="none" 
            stroke="#38bdf8" 
            strokeWidth="1" 
            strokeDasharray="8 18 32 14"
            opacity="0.3"
            animate={{ rotate: -360 }}
            transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
          />

          {/* Subtle Circuit Nodes */}
          {[-60, 60, -35, 45].map((ang, i) => {
            const rad = (ang * Math.PI) / 180;
            const x = Math.cos(rad) * 78;
            const y = Math.sin(rad) * 78;
            return (
              <motion.circle 
                key={i} 
                cx={x} cy={y} r="2" 
                fill="#38bdf8" 
                opacity="0.4"
                animate={{ opacity: [0.15, 0.6, 0.15] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.6 }}
              />
            );
          })}

          {/* Ingestion Shockwave: Fires right when document enters */}
          <motion.circle
            key={`pulse-${pulseKey}`}
            cx="0" cy="5" r="16"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="2.5"
            initial={{ r: 16, opacity: 1 }}
            animate={{ r: 85, opacity: 0 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
          />

          {/* THE KPLOR AVATAR (Pure brand geometry floating in space) */}
          <motion.g
            animate={{ 
              y: [-8, 8, -8], 
              rotate: [-1.5, 1.5, -1.5] 
            }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* White Body - Sculpted bell geometry with convex curves */}
            <path 
              d="M -11,-16 Q 0,-24 11,-16 Q 34,20 34,50 Q 0,62 -34,50 Q -34,20 -11,-16 Z" 
              fill="#ffffff" 
              stroke="#94a3b8" 
              strokeWidth="1.5" 
              strokeLinejoin="round" 
              filter="url(#drop-shadow-soft)"
            />

            {/* Subtle 3D Surface Bevel Tone */}
            <path 
              d="M -6,-12 Q 0,-18 6,-12 Q 24,18 22,44 Q 0,52 -22,44 Q -24,18 -6,-12 Z" 
              fill="#f8fafc" 
              opacity="0.8"
            />

            {/* Glowing Cyan Head - Pure uniform sphere with NO dotty shine */}
            <motion.g
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Outer Neon Glow */}
              <circle cx="0" cy="-44" r="16" fill="#00e5ff" opacity="0.25" filter="url(#glow-heavy)" />
              {/* Cyan Glow Layer */}
              <circle cx="0" cy="-44" r="15" fill="#38bdf8" filter="url(#glow-cyan)" />
              {/* Solid Pure Cyan Core (No specular white dot shine) */}
              <circle cx="0" cy="-44" r="15" fill="#22d3ee" />
            </motion.g>
          </motion.g>
        </g>

        {/* ═════════════════════════════════════════════════════════════ */}
        {/* DATA BEAM (Avatar -> Screen: Fires when document enters)     */}
        {/* ═════════════════════════════════════════════════════════════ */}

        <g fill="none">
          <line 
            x1="415" y1="280" x2="510" y2="280" 
            stroke="#0284c7" 
            strokeWidth="1.5" 
            strokeDasharray="4 6" 
            opacity="0.25"
          />
          {/* Synchronized Energy Pulse shooting into Screen */}
          <motion.g
            key={`beam-${pulseKey}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <line 
              x1="415" y1="280" x2="510" y2="280" 
              stroke="#38bdf8" 
              strokeWidth="3.5" 
              filter="url(#glow-cyan)"
            />
            <motion.circle
              r="5" 
              fill="#ffffff" 
              filter="url(#glow-cyan)"
              initial={{ cx: 415, cy: 280 }}
              animate={{ cx: 510, cy: 280 }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
            />
          </motion.g>
        </g>

        {/* ═════════════════════════════════════════════════════════════ */}
        {/* 3. SCREEN ON RIGHT: NEVER FADES OUT UNTIL NEXT SCREEN COMES! */}
        {/* ═════════════════════════════════════════════════════════════ */}

        <g transform="translate(735, 280)">
          <AnimatePresence initial={false}>
            <motion.g
              key={`screen-${screenScene}`}
              // Emerges from Kepler logo when triggered
              initial={{ x: -260, scale: 0.25, opacity: 0 }}
              animate={{ x: 0, scale: 1, opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.3 } }}
              transition={{
                duration: 0.75,
                ease: [0.16, 1, 0.3, 1], // Smooth spring-like emergence
              }}
              style={{ transformOrigin: "0px 0px" }}
            >
              {/* Floating Gentle Bobbing motion while active */}
              <motion.g
                animate={{ y: [-4, 4, -4] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              >
                {/* Screen Glass Base (450w x 305h, Centered at 0, 0) */}
                <rect 
                  x="-225" y="-152" 
                  width="450" height="305" 
                  rx="18" 
                  fill="url(#screen-bg)" 
                  stroke="url(#screen-border)" 
                  strokeWidth="2.5" 
                  filter="url(#screen-shadow)"
                />

                {/* Glowing Corner Accents */}
                <path d="M -215 -132 L -215 -142 L -205 -142" stroke="#38bdf8" strokeWidth="2.5" fill="none" />
                <path d="M 215 -132 L 215 -142 L 205 -142" stroke="#38bdf8" strokeWidth="2.5" fill="none" />
                <path d="M -215 132 L -215 142 L -205 142" stroke="#38bdf8" strokeWidth="2.5" fill="none" />
                <path d="M 215 132 L 215 142 L 205 142" stroke="#38bdf8" strokeWidth="2.5" fill="none" />

                {/* Screen Header Bar */}
                <g transform="translate(0, -128)">
                  {/* Header separator line */}
                  <line x1="-210" y1="14" x2="210" y2="14" stroke="#0ea5e9" strokeWidth="1" opacity="0.25" />

                  {/* Status Indicator & Title */}
                  <circle cx="-200" cy="0" r="4" fill="#22c55e" filter="url(#glow-subtle)" />
                  <text x="-187" y="4" fill="#94a3b8" fontSize="9.5" fontWeight="bold" letterSpacing="1">
                    KPLOR OUTPUT: {DOCS[screenScene].screenTitle}
                  </text>
                </g>

                {/* ───────────────────────────────────────────────────────── */}
                {/* INNER VIDEO VIEWPORT (Real Diffusion / Vector Animation)   */}
                {/* ───────────────────────────────────────────────────────── */}
                <g transform="translate(-205, -96)">
                  <foreignObject
                    x="0"
                    y="0"
                    width="410"
                    height="230"
                    className="overflow-hidden rounded-xl"
                  >
                    <div className="w-full h-full relative rounded-xl overflow-hidden bg-slate-950 shadow-inner">
                      <video
                        key={DOCS[screenScene].video}
                        src={DOCS[screenScene].video}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover rounded-xl"
                      />
                    </div>
                  </foreignObject>
                </g>
              </motion.g>
            </motion.g>
          </AnimatePresence>
        </g>
      </svg>
    </div>
  );
}

{/* ═════════════════════════════════════════════════════════════════════ */}
{/* SCENE 1: K-12 EDUCATION (Complex Science, Orbitals & Math Geometry) */}
{/* ═════════════════════════════════════════════════════════════════════ */}
export function SceneK12Detailed() {
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.45 }}
    >
      {/* Subject Header Subtitle Badge */}
      <g transform="translate(0, 10)">
        <rect x="0" y="0" width="135" height="18" rx="9" fill="#03254c" stroke="#38bdf8" strokeWidth="1" />
        <text x="12" y="12" fill="#38bdf8" fontSize="8.5" fontWeight="bold" letterSpacing="1">
          PHYSICS &amp; STEM LAB
        </text>
        <text x="405" y="12" fill="#64748b" fontSize="8" fontWeight="medium" textAnchor="end">
          GRADE 10 · ATOMIC &amp; WAVE THEORY
        </text>
      </g>

      {/* LEFT: 3D Rotating Atomic Simulation */}
      <g transform="translate(105, 112)">
        {/* Glow halo behind nucleus */}
        <circle cx="0" cy="0" r="24" fill="#38bdf8" opacity="0.2" filter="url(#glow-heavy)" />
        
        {/* Central Nucleus with Proton / Neutron Cluster */}
        <circle cx="-3" cy="-3" r="6.5" fill="#f59e0b" />
        <circle cx="4" cy="-2" r="6" fill="#ef4444" />
        <circle cx="0" cy="4" r="6.5" fill="#38bdf8" />
        <circle cx="-1" cy="0" r="4.5" fill="#ffffff" opacity="0.8" />

        {/* Orbit 1: Inclined Ellipse (8s rotation) */}
        <motion.g 
          animate={{ rotate: 360 }} 
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          <ellipse cx="0" cy="0" rx="66" ry="24" fill="none" stroke="#38bdf8" strokeWidth="1.8" opacity="0.75" />
          <motion.circle 
            cx="66" cy="0" r="3.8" 
            fill="#38bdf8" 
            filter="url(#glow-cyan)"
          />
        </motion.g>

        {/* Orbit 2: 60deg Tilted Orbit (6.5s rotation) */}
        <g transform="rotate(60)">
          <motion.g 
            animate={{ rotate: 360 }} 
            transition={{ duration: 6.5, repeat: Infinity, ease: "linear" }}
          >
            <ellipse cx="0" cy="0" rx="66" ry="24" fill="none" stroke="#22d3ee" strokeWidth="1.8" opacity="0.7" />
            <circle cx="-66" cy="0" r="3.8" fill="#22d3ee" filter="url(#glow-cyan)" />
          </motion.g>
        </g>

        {/* Orbit 3: 120deg Tilted Orbit (5.5s rotation) */}
        <g transform="rotate(120)">
          <motion.g 
            animate={{ rotate: -360 }} 
            transition={{ duration: 5.5, repeat: Infinity, ease: "linear" }}
          >
            <ellipse cx="0" cy="0" rx="66" ry="24" fill="none" stroke="#818cf8" strokeWidth="1.8" opacity="0.7" />
            <circle cx="66" cy="0" r="3.8" fill="#818cf8" filter="url(#glow-cyan)" />
          </motion.g>
        </g>

        {/* Energy Level Shell Markers */}
        <text x="0" y="46" fill="#38bdf8" fontSize="7.5" fontWeight="bold" textAnchor="middle">
          Bohr Energy Shell (n=3)
        </text>
      </g>

      {/* RIGHT: Oscillating Wave Function & Kinetic Geometry */}
      <g transform="translate(225, 38)">
        {/* Oscillating Sine Wave Grid Panel */}
        <rect x="0" y="0" width="180" height="78" rx="8" fill="#071a33" stroke="#1e3a5f" strokeWidth="1" />
        <line x1="10" y1="39" x2="170" y2="39" stroke="#1e3a5f" strokeWidth="1" strokeDasharray="3 3" />
        
        {/* Animated Harmonic Sine Wave */}
        <motion.path 
          d="M 15 39 Q 35 14, 55 39 T 95 39 T 135 39 T 170 39"
          fill="none" 
          stroke="#38bdf8" 
          strokeWidth="2.2"
          animate={{
            d: [
              "M 15 39 Q 35 14, 55 39 T 95 39 T 135 39 T 170 39",
              "M 15 39 Q 35 64, 55 39 T 95 39 T 135 39 T 170 39",
              "M 15 39 Q 35 14, 55 39 T 95 39 T 135 39 T 170 39"
            ]
          }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Wave Crest Particle */}
        <motion.circle 
          r="3" 
          fill="#f59e0b" 
          filter="url(#glow-subtle)"
          animate={{ cx: [35, 75, 115, 35], cy: [14, 64, 14, 14] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        />

        <text x="12" y="16" fill="#94a3b8" fontSize="7.5" fontWeight="bold">λ = h / p</text>
        <text x="168" y="16" fill="#38bdf8" fontSize="7.5" fontWeight="bold" textAnchor="end">f = 4.82 GHz</text>
      </g>

      {/* Geometric Construction & Formula Cards */}
      <g transform="translate(225, 126)">
        {/* Pythagorean Triangle */}
        <polygon points="10,50 58,50 58,16" fill="#0e305e" stroke="#22d3ee" strokeWidth="1.8" />
        <rect x="50" y="42" width="8" height="8" fill="none" stroke="#22d3ee" strokeWidth="1" />
        <text x="32" y="58" fill="#94a3b8" fontSize="7" textAnchor="middle">a = 4</text>
        <text x="65" y="34" fill="#94a3b8" fontSize="7">b = 3</text>
        <text x="26" y="26" fill="#38bdf8" fontSize="7.5" fontWeight="bold">c = 5</text>

        {/* Floating Science Math Formulas */}
        <g transform="translate(90, 8)">
          <rect x="0" y="0" width="90" height="20" rx="4" fill="#0f294d" stroke="#0284c7" strokeWidth="0.8" />
          <text x="45" y="13.5" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">
            E = mc² · ΔK
          </text>

          <rect x="0" y="26" width="90" height="20" rx="4" fill="#0f294d" stroke="#0284c7" strokeWidth="0.8" />
          <text x="45" y="39.5" fill="#38bdf8" fontSize="8" fontWeight="bold" textAnchor="middle">
            ∫ sin(θ) dθ = -cos(θ)
          </text>
        </g>
      </g>

      {/* BOTTOM: Audio Waveform & Real-time Transcript */}
      <g transform="translate(0, 194)">
        <rect x="0" y="0" width="405" height="24" rx="6" fill="#05152b" stroke="#1e3a5f" strokeWidth="1" />
        {/* Animated equalizer bars */}
        {[8, 14, 20, 26, 32, 38, 44, 50].map((x, i) => (
          <motion.rect
            key={i}
            x={x}
            width="3"
            rx="1.5"
            fill="#38bdf8"
            animate={{
              y: [16 - (i % 3) * 3, 6 + (i % 4) * 2, 16 - (i % 3) * 3],
              height: [6 + (i % 3) * 3, 16 - (i % 4) * 2, 6 + (i % 3) * 3]
            }}
            transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1 }}
          />
        ))}
        <text x="64" y="15" fill="#cbd5e1" fontSize="8.5" fontWeight="medium">
          ▶ &quot;Electrons absorb quantized photons, leaping to higher energy shells...&quot;
        </text>
      </g>
    </motion.g>
  );
}

{/* ═════════════════════════════════════════════════════════════ */}
{/* SCENE 2: EDTECH (Interactive Coding, Skill Trees & Video Learning)  */}
{/* ═════════════════════════════════════════════════════════════════════ */}
export function SceneEdTechDetailed() {
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.45 }}
    >
      {/* Subject Header Subtitle Badge */}
      <g transform="translate(0, 10)">
        <rect x="0" y="0" width="135" height="18" rx="9" fill="#2e1065" stroke="#a855f7" strokeWidth="1" />
        <text x="12" y="12" fill="#c084fc" fontSize="8.5" fontWeight="bold" letterSpacing="1">
          EDTECH PLATFORM
        </text>
        <text x="405" y="12" fill="#94a3b8" fontSize="8" fontWeight="medium" textAnchor="end">
          ADAPTIVE CODE &amp; AI MODULES
        </text>
      </g>

      {/* LEFT: Mini Code Editor / IDE Panel */}
      <g transform="translate(0, 36)">
        <rect x="0" y="0" width="200" height="144" rx="8" fill="#080f1e" stroke="#334155" strokeWidth="1.2" />
        
        {/* Editor Tab Bar */}
        <path d="M 0 0 L 200 0 L 200 20 L 0 20 Z" fill="#0b172a" />
        <circle cx="12" cy="10" r="3" fill="#ef4444" />
        <circle cx="22" cy="10" r="3" fill="#eab308" />
        <circle cx="32" cy="10" r="3" fill="#22c55e" />
        <text x="48" y="13" fill="#94a3b8" fontSize="7.5" fontWeight="mono">pipeline.ts</text>
        <text x="185" y="13" fill="#38bdf8" fontSize="7" textAnchor="end">TS</text>

        {/* Syntax Highlighted Lines */}
        <g transform="translate(10, 34)">
          <text x="0" y="0" fill="#a855f7" fontSize="7.5" fontWeight="bold" fontFamily="monospace">async function</text>
          <text x="68" y="0" fill="#38bdf8" fontSize="7.5" fontWeight="bold" fontFamily="monospace">learnModel()</text>
          
          <text x="10" y="14" fill="#94a3b8" fontSize="7.5" fontFamily="monospace">const concept = await</text>
          <text x="105" y="14" fill="#eab308" fontSize="7.5" fontFamily="monospace">fetch()</text>

          <text x="10" y="28" fill="#38bdf8" fontSize="7.5" fontFamily="monospace">Kplor.synthesize({`{`}</text>
          <text x="20" y="42" fill="#4ade80" fontSize="7.5" fontFamily="monospace">mode: &apos;interactive&apos;,</text>
          <text x="20" y="56" fill="#4ade80" fontSize="7.5" fontFamily="monospace">pace: &apos;adaptive&apos;</text>
          <text x="10" y="70" fill="#38bdf8" fontSize="7.5" fontFamily="monospace">{`});`}</text>

          <text x="0" y="84" fill="#a855f7" fontSize="7.5" fontWeight="bold" fontFamily="monospace">return</text>
          <text x="35" y="84" fill="#22c55e" fontSize="7.5" fontFamily="monospace">renderExplainer();</text>

          {/* Blinking IDE Cursor */}
          <motion.rect 
            x="122" y="76" width="4" height="9" fill="#38bdf8"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.9, repeat: Infinity }}
          />
        </g>

        {/* Compiler Status Pill */}
        <rect x="8" y="124" width="184" height="13" rx="3" fill="#042f2e" stroke="#0d9488" strokeWidth="0.8" />
        <circle cx="18" cy="130.5" r="2.5" fill="#22c55e" />
        <text x="26" y="133.5" fill="#5eead4" fontSize="6.5" fontWeight="bold">
          Compiled in 14ms · 100% test coverage passed
        </text>
      </g>

      {/* RIGHT: Branching Skill-Tree Network */}
      <g transform="translate(215, 36)">
        <rect x="0" y="0" width="190" height="144" rx="8" fill="#081426" stroke="#1e3a5f" strokeWidth="1" />
        <text x="12" y="18" fill="#cbd5e1" fontSize="8" fontWeight="bold">
          ADAPTIVE SKILL GRAPH
        </text>
        <text x="178" y="18" fill="#22c55e" fontSize="7.5" fontWeight="bold" textAnchor="end">
          88% MASTERY
        </text>

        {/* Node Connectors (Bezier paths) */}
        <g stroke="#1e3a5f" strokeWidth="2" fill="none">
          <path d="M 35 50 C 65 50, 65 82, 98 82" />
          <path d="M 35 50 C 65 50, 65 116, 98 116" />
          <path d="M 98 82 C 128 82, 128 98, 158 98" />
        </g>

        {/* Dynamic Energy Pulses travelling along skill paths */}
        <motion.circle 
          r="3" fill="#a855f7" filter="url(#glow-cyan)"
          animate={{ cx: [35, 65, 98], cy: [50, 66, 82] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.circle 
          r="3" fill="#22c55e" filter="url(#glow-cyan)"
          animate={{ cx: [98, 128, 158], cy: [82, 90, 98] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.6, ease: "easeInOut" }}
        />

        {/* Node 1: Root Concept */}
        <g transform="translate(35, 50)">
          <circle cx="0" cy="0" r="14" fill="#0f294d" stroke="#38bdf8" strokeWidth="2" />
          <circle cx="0" cy="0" r="4" fill="#38bdf8" />
          <text x="0" y="-18" fill="#94a3b8" fontSize="6.5" fontWeight="bold" textAnchor="middle">Basics</text>
        </g>

        {/* Node 2: Algorithms */}
        <g transform="translate(98, 82)">
          <circle cx="0" cy="0" r="14" fill="#2e1065" stroke="#a855f7" strokeWidth="2" filter="url(#glow-subtle)" />
          <circle cx="0" cy="0" r="5" fill="#c084fc" />
          <text x="0" y="-18" fill="#c084fc" fontSize="6.5" fontWeight="bold" textAnchor="middle">Logic</text>
        </g>

        {/* Node 3: Simulation */}
        <g transform="translate(98, 116)">
          <circle cx="0" cy="0" r="10" fill="#0f294d" stroke="#64748b" strokeWidth="1.5" />
          <text x="0" y="18" fill="#64748b" fontSize="6" textAnchor="middle">Data</text>
        </g>

        {/* Node 4: Capstone Video */}
        <g transform="translate(158, 98)">
          <circle cx="0" cy="0" r="15" fill="#052e16" stroke="#22c55e" strokeWidth="2" filter="url(#glow-subtle)" />
          <polygon points="-3,-5 5,0 -3,5" fill="#4ade80" />
          <text x="0" y="24" fill="#4ade80" fontSize="7" fontWeight="bold" textAnchor="middle">Video Output</text>
        </g>
      </g>

      {/* BOTTOM: Video Scrubber & Live Caption */}
      <g transform="translate(0, 194)">
        <rect x="0" y="0" width="405" height="24" rx="6" fill="#080f1e" stroke="#1e3a5f" strokeWidth="1" />
        {/* Scrubber progress */}
        <rect x="12" y="10" width="80" height="4" rx="2" fill="#1e3a5f" />
        <rect x="12" y="10" width="54" height="4" rx="2" fill="#a855f7" />
        <circle cx="66" cy="12" r="4" fill="#c084fc" filter="url(#glow-subtle)" />
        <text x="102" y="15" fill="#cbd5e1" fontSize="8.5" fontWeight="medium">
          ▶ &quot;Personalizing code walk-throughs for 50,000 active students simultaneously...&quot;
        </text>
      </g>
    </motion.g>
  );
}

{/* ═════════════════════════════════════════════════════════════════════ */}
{/* SCENE 3: CORPORATE (Enterprise L&D, ROI Metrics & Competency Radar)  */}
{/* ═════════════════════════════════════════════════════════════════════ */}
export function SceneCorporateDetailed() {
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.45 }}
    >
      {/* Subject Header Subtitle Badge */}
      <g transform="translate(0, 10)">
        <rect x="0" y="0" width="145" height="18" rx="9" fill="#064e3b" stroke="#10b981" strokeWidth="1" />
        <text x="12" y="12" fill="#34d399" fontSize="8.5" fontWeight="bold" letterSpacing="1">
          CORPORATE L&amp;D SUITE
        </text>
        <text x="405" y="12" fill="#94a3b8" fontSize="8" fontWeight="medium" textAnchor="end">
          GLOBAL ENTERPRISE UPSKILLING
        </text>
      </g>

      {/* LEFT: Multi-Quarter Performance & Growth Area Chart */}
      <g transform="translate(0, 36)">
        <rect x="0" y="0" width="210" height="144" rx="8" fill="#07172b" stroke="#1e3a5f" strokeWidth="1" />
        
        <text x="12" y="18" fill="#f8fafc" fontSize="8.5" fontWeight="bold">
          COMPETENCY MASTERY CURVE
        </text>
        <text x="200" y="18" fill="#10b981" fontSize="8" fontWeight="bold" textAnchor="end">
          ▲ +184% YoY
        </text>

        {/* Grid Axis Lines */}
        <g stroke="#1e3a5f" strokeWidth="0.8" strokeDasharray="3 3">
          <line x1="20" y1="42" x2="195" y2="42" />
          <line x1="20" y1="68" x2="195" y2="68" />
          <line x1="20" y1="94" x2="195" y2="94" />
          <line x1="20" y1="120" x2="195" y2="120" strokeDasharray="none" stroke="#334155" />
        </g>

        {/* Quarter Markers */}
        <text x="35" y="132" fill="#64748b" fontSize="6.5">Q1</text>
        <text x="80" y="132" fill="#64748b" fontSize="6.5">Q2</text>
        <text x="125" y="132" fill="#64748b" fontSize="6.5">Q3</text>
        <text x="175" y="132" fill="#38bdf8" fontSize="6.5" fontWeight="bold">Q4 (Kplor)</text>

        {/* Gradient Filled Area Spline */}
        <path 
          d="M 25 115 Q 55 110, 80 92 T 135 64 T 190 38 L 190 120 L 25 120 Z" 
          fill="url(#area-chart-grad)" 
        />
        {/* Animated High-Growth Spline Curve */}
        <motion.path 
          d="M 25 115 Q 55 110, 80 92 T 135 64 T 190 38" 
          fill="none" 
          stroke="#38bdf8" 
          strokeWidth="2.8"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.6, ease: "easeOut" }}
          filter="url(#glow-subtle)"
        />

        {/* Peak KPI Callout Dot */}
        <motion.circle 
          cx="190" cy="38" r="4.5" 
          fill="#22c55e" 
          filter="url(#glow-cyan)"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <rect x="140" y="24" width="45" height="14" rx="4" fill="#065f46" stroke="#34d399" strokeWidth="0.8" />
        <text x="162.5" y="34" fill="#ffffff" fontSize="7" fontWeight="bold" textAnchor="middle">
          98.6% PASS
        </text>
      </g>

      {/* RIGHT: Executive Metric Cards & LMS Sync Status */}
      <g transform="translate(225, 36)">
        {/* Metric Card 1: Compliance */}
        <rect x="0" y="0" width="180" height="44" rx="7" fill="#07172b" stroke="#1e3a5f" strokeWidth="1" />
        <text x="12" y="15" fill="#94a3b8" fontSize="7" fontWeight="medium">COMPLIANCE CERTIFIED</text>
        <text x="12" y="34" fill="#ffffff" fontSize="16" fontWeight="bold">99.4%</text>
        <rect x="118" y="13" width="50" height="18" rx="9" fill="#064e3b" />
        <text x="143" y="25" fill="#34d399" fontSize="7" fontWeight="bold" textAnchor="middle">▲ 42% Faster</text>

        {/* Metric Card 2: Training Speed */}
        <rect x="0" y="50" width="180" height="44" rx="7" fill="#07172b" stroke="#1e3a5f" strokeWidth="1" />
        <text x="12" y="65" fill="#94a3b8" fontSize="7" fontWeight="medium">TIME TO PROFICIENCY</text>
        <text x="12" y="84" fill="#38bdf8" fontSize="16" fontWeight="bold">3.8 Days</text>
        <rect x="118" y="63" width="50" height="18" rx="9" fill="#0c4a6e" />
        <text x="143" y="75" fill="#38bdf8" fontSize="7" fontWeight="bold" textAnchor="middle">▼ 65% Less</text>

        {/* SCORM & Enterprise LMS Integration Status */}
        <g transform="translate(0, 100)">
          <rect x="0" y="0" width="180" height="44" rx="7" fill="#07172b" stroke="#10b981" strokeWidth="1" />
          <circle cx="16" cy="22" r="4" fill="#22c55e" filter="url(#glow-subtle)" />
          <text x="26" y="18" fill="#f8fafc" fontSize="7.5" fontWeight="bold">
            SCORM 2004 &amp; xAPI
          </text>
          <text x="26" y="30" fill="#94a3b8" fontSize="6.5">
            Auto-synced to Enterprise LMS · SSO Ready
          </text>
          <text x="168" y="24" fill="#22c55e" fontSize="9" fontWeight="bold" textAnchor="end">✓</text>
        </g>
      </g>

      {/* BOTTOM: Global Distribution Ticker */}
      <g transform="translate(0, 194)">
        <rect x="0" y="0" width="405" height="24" rx="6" fill="#07172b" stroke="#1e3a5f" strokeWidth="1" />
        <circle cx="16" cy="12" r="3.5" fill="#22c55e" filter="url(#glow-subtle)" />
        <text x="26" y="15" fill="#cbd5e1" fontSize="8.5" fontWeight="medium">
          ▶ &quot;Deploying executive leadership &amp; compliance modules to 14,000 global staff...&quot;
        </text>
      </g>
    </motion.g>
  );
}
