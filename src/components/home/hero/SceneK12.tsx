"use client";
import { motion } from "framer-motion";
import { useStill } from "./motion";

export default function SceneK12() {
  const isStill = useStill();

  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.45 }}
    >
      {/* ── Subject Header Subtitle Badge ── */}
      <g transform="translate(0, 10)">
        <rect
          x="0"
          y="0"
          width="135"
          height="18"
          rx="9"
          fill="#03254c"
          stroke="#38bdf8"
          strokeWidth="1"
        />
        <text
          x="12"
          y="12"
          fill="#38bdf8"
          fontSize="8.5"
          fontWeight="bold"
          letterSpacing="1"
        >
          PHYSICS &amp; STEM LAB
        </text>
        <text
          x="405"
          y="12"
          fill="#64748b"
          fontSize="8"
          fontWeight="500"
          textAnchor="end"
        >
          GRADE 10 · ATOMIC &amp; WAVE THEORY
        </text>
      </g>

      {/* ── LEFT: 3D Rotating Atomic Simulation ── */}
      <g transform="translate(105, 112)">
        {/* Glow halo behind nucleus */}
        <circle cx="0" cy="0" r="24" fill="#38bdf8" opacity="0.2" filter="url(#glow-heavy)" />

        {/* Central Nucleus with Proton / Neutron Cluster */}
        <circle cx="-3" cy="-3" r="6.5" fill="#f59e0b" />
        <circle cx="4" cy="-2" r="6" fill="#ef4444" />
        <circle cx="0" cy="4" r="6.5" fill="#38bdf8" />
        <circle cx="-1" cy="0" r="4.5" fill="#ffffff" opacity="0.8" />

        {/* Orbit 1: Inclined Ellipse */}
        <motion.g
          animate={isStill ? undefined : { rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          <ellipse
            cx="0"
            cy="0"
            rx="66"
            ry="24"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="1.8"
            opacity="0.75"
          />
          <circle cx="66" cy="0" r="3.8" fill="#38bdf8" filter="url(#glow-cyan)" />
        </motion.g>

        {/* Orbit 2: 60deg Tilted Orbit */}
        <g transform="rotate(60)">
          <motion.g
            animate={isStill ? undefined : { rotate: 360 }}
            transition={{ duration: 6.5, repeat: Infinity, ease: "linear" }}
          >
            <ellipse
              cx="0"
              cy="0"
              rx="66"
              ry="24"
              fill="none"
              stroke="#22d3ee"
              strokeWidth="1.8"
              opacity="0.7"
            />
            <circle cx="-66" cy="0" r="3.8" fill="#22d3ee" filter="url(#glow-cyan)" />
          </motion.g>
        </g>

        {/* Orbit 3: 120deg Tilted Orbit */}
        <g transform="rotate(120)">
          <motion.g
            animate={isStill ? undefined : { rotate: -360 }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "linear" }}
          >
            <ellipse
              cx="0"
              cy="0"
              rx="66"
              ry="24"
              fill="none"
              stroke="#818cf8"
              strokeWidth="1.8"
              opacity="0.7"
            />
            <circle cx="66" cy="0" r="3.8" fill="#818cf8" filter="url(#glow-cyan)" />
          </motion.g>
        </g>

        {/* Energy Level Shell Markers */}
        <text
          x="0"
          y="46"
          fill="#38bdf8"
          fontSize="7.5"
          fontWeight="bold"
          textAnchor="middle"
        >
          Bohr Energy Shell (n=3)
        </text>
      </g>

      {/* ── RIGHT: Oscillating Wave Function & Kinetic Geometry ── */}
      <g transform="translate(225, 38)">
        <rect
          x="0"
          y="0"
          width="180"
          height="78"
          rx="8"
          fill="#071a33"
          stroke="#1e3a5f"
          strokeWidth="1"
        />
        <line
          x1="10"
          y1="39"
          x2="170"
          y2="39"
          stroke="#1e3a5f"
          strokeWidth="1"
          strokeDasharray="3 3"
        />

        {/* Animated Harmonic Sine Wave */}
        <motion.path
          d="M 15 39 Q 35 14, 55 39 T 95 39 T 135 39 T 170 39"
          fill="none"
          stroke="#38bdf8"
          strokeWidth="2.2"
          animate={
            isStill
              ? undefined
              : {
                  d: [
                    "M 15 39 Q 35 14, 55 39 T 95 39 T 135 39 T 170 39",
                    "M 15 39 Q 35 64, 55 39 T 95 39 T 135 39 T 170 39",
                    "M 15 39 Q 35 14, 55 39 T 95 39 T 135 39 T 170 39",
                  ],
                }
          }
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Wave Crest Particle */}
        {!isStill && (
          <motion.circle
            r="3"
            fill="#f59e0b"
            filter="url(#glow-subtle)"
            animate={{ cx: [35, 75, 115, 35], cy: [14, 64, 14, 14] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          />
        )}

        <text x="12" y="16" fill="#94a3b8" fontSize="7.5" fontWeight="bold">
          λ = h / p
        </text>
        <text
          x="168"
          y="16"
          fill="#38bdf8"
          fontSize="7.5"
          fontWeight="bold"
          textAnchor="end"
        >
          f = 4.82 GHz
        </text>
      </g>

      {/* Geometric Construction & Formula Cards */}
      <g transform="translate(225, 126)">
        <polygon
          points="10,50 58,50 58,16"
          fill="#0e305e"
          stroke="#22d3ee"
          strokeWidth="1.8"
        />
        <rect
          x="50"
          y="42"
          width="8"
          height="8"
          fill="none"
          stroke="#22d3ee"
          strokeWidth="1"
        />
        <text x="32" y="58" fill="#94a3b8" fontSize="7" textAnchor="middle">
          a = 4
        </text>
        <text x="65" y="34" fill="#94a3b8" fontSize="7">
          b = 3
        </text>
        <text x="26" y="26" fill="#38bdf8" fontSize="7.5" fontWeight="bold">
          c = 5
        </text>

        <g transform="translate(90, 8)">
          <rect
            x="0"
            y="0"
            width="90"
            height="20"
            rx="4"
            fill="#0f294d"
            stroke="#0284c7"
            strokeWidth="0.8"
          />
          <text
            x="45"
            y="13.5"
            fill="#ffffff"
            fontSize="8"
            fontWeight="bold"
            textAnchor="middle"
          >
            E = mc² · ΔK
          </text>

          <rect
            x="0"
            y="26"
            width="90"
            height="20"
            rx="4"
            fill="#0f294d"
            stroke="#0284c7"
            strokeWidth="0.8"
          />
          <text
            x="45"
            y="39.5"
            fill="#38bdf8"
            fontSize="8"
            fontWeight="bold"
            textAnchor="middle"
          >
            ∫ sin(θ) dθ = -cos(θ)
          </text>
        </g>
      </g>

      {/* ── BOTTOM: Audio Waveform & Real-time Transcript ── */}
      <g transform="translate(0, 194)">
        <rect
          x="0"
          y="0"
          width="405"
          height="24"
          rx="6"
          fill="#05152b"
          stroke="#1e3a5f"
          strokeWidth="1"
        />
        {[8, 14, 20, 26, 32, 38, 44, 50].map((x, i) => (
          <motion.rect
            key={i}
            x={x}
            width="3"
            rx="1.5"
            fill="#38bdf8"
            animate={
              isStill
                ? undefined
                : {
                    y: [16 - (i % 3) * 3, 6 + (i % 4) * 2, 16 - (i % 3) * 3],
                    height: [6 + (i % 3) * 3, 16 - (i % 4) * 2, 6 + (i % 3) * 3],
                  }
            }
            transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1 }}
          />
        ))}
        <text x="64" y="15" fill="#cbd5e1" fontSize="8.5" fontWeight="500">
          ▶ &quot;Electrons absorb quantized photons, leaping to higher energy shells...&quot;
        </text>
      </g>
    </motion.g>
  );
}
