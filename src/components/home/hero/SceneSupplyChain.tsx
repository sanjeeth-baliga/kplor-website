"use client";
import { motion } from "framer-motion";
import { useStill } from "./motion";

export default function SceneSupplyChain() {
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
          width="155"
          height="18"
          rx="9"
          fill="#451a03"
          stroke="#f59e0b"
          strokeWidth="1"
        />
        <text
          x="12"
          y="12"
          fill="#fbbf24"
          fontSize="8.5"
          fontWeight="bold"
          letterSpacing="1"
        >
          SUPPLY CHAIN &amp; LOGISTICS
        </text>
        <text
          x="405"
          y="12"
          fill="#94a3b8"
          fontSize="8"
          fontWeight="500"
          textAnchor="end"
        >
          GLOBAL OPERATIONS &amp; SOP SIMULATION
        </text>
      </g>

      {/* ── LEFT: Dynamic Supply Network Topology Graph ── */}
      <g transform="translate(0, 36)">
        <rect
          x="0"
          y="0"
          width="210"
          height="144"
          rx="8"
          fill="#07172b"
          stroke="#1e3a5f"
          strokeWidth="1"
        />

        {/* Panel Header */}
        <text x="12" y="18" fill="#f8fafc" fontSize="8.5" fontWeight="bold">
          DISTRIBUTION &amp; ROUTE TOPOLOGY
        </text>
        <circle cx="160" cy="15" r="3" fill="#22c55e" filter="url(#glow-subtle)" />
        <text x="168" y="18" fill="#22c55e" fontSize="7.5" fontWeight="bold">
          LIVE DISPATCH
        </text>

        {/* Inter-Node Route Paths */}
        <g stroke="#1e3a5f" strokeWidth="1.8" fill="none">
          <path d="M 32 60 L 85 44" />
          <path d="M 32 60 L 75 106" />
          <path d="M 85 44 L 145 64" />
          <path d="M 75 106 L 145 64" />
          <path d="M 145 64 L 185 110" />
        </g>

        {/* Animated Transit Packets */}
        {!isStill && (
          <>
            <motion.circle
              r="3.2"
              fill="#fbbf24"
              filter="url(#glow-subtle)"
              animate={{
                cx: [32, 85, 145, 185],
                cy: [60, 44, 64, 110],
              }}
              transition={{
                duration: 3.4,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            <motion.circle
              r="2.8"
              fill="#38bdf8"
              filter="url(#glow-subtle)"
              animate={{
                cx: [32, 75, 145],
                cy: [60, 106, 64],
              }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                delay: 1.2,
                ease: "linear",
              }}
            />
          </>
        )}

        {/* Node 1: Manufacturing Plant */}
        <g transform="translate(32, 60)">
          <circle cx="0" cy="0" r="14" fill="#0f294d" stroke="#f59e0b" strokeWidth="1.8" />
          {/* Factory Icon glyph */}
          <path d="M -5,3 L -5,-3 L -1,-1 L -1,-3 L 3,-1 L 3,3 Z" fill="#fbbf24" />
          <text x="0" y="22" fill="#94a3b8" fontSize="6.5" fontWeight="bold" textAnchor="middle">
            Supplier
          </text>
        </g>

        {/* Node 2: Central Fulfillment Warehouse */}
        <g transform="translate(85, 44)">
          <circle cx="0" cy="0" r="14" fill="#0f294d" stroke="#38bdf8" strokeWidth="1.8" />
          {/* Warehouse box glyph */}
          <rect x="-4" y="-4" width="8" height="8" fill="#38bdf8" />
          <text x="0" y="-18" fill="#38bdf8" fontSize="6.5" fontWeight="bold" textAnchor="middle">
            Central Hub
          </text>
        </g>

        {/* Node 3: Regional Sorting Hub */}
        <g transform="translate(75, 106)">
          <circle cx="0" cy="0" r="12" fill="#0f294d" stroke="#64748b" strokeWidth="1.4" />
          <circle cx="0" cy="0" r="3.5" fill="#94a3b8" />
          <text x="0" y="20" fill="#64748b" fontSize="6" fontWeight="bold" textAnchor="middle">
            Sorting
          </text>
        </g>

        {/* Node 4: Distribution Center */}
        <g transform="translate(145, 64)">
          <circle cx="0" cy="0" r="15" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
          <polygon points="-4,-4 4,-4 0,4" fill="#a5b4fc" />
          <text x="0" y="-19" fill="#a5b4fc" fontSize="6.5" fontWeight="bold" textAnchor="middle">
            Dist. Center
          </text>
        </g>

        {/* Node 5: Last-Mile Delivery */}
        <g transform="translate(185, 110)">
          <circle cx="0" cy="0" r="13" fill="#052e16" stroke="#22c55e" strokeWidth="1.8" />
          <circle cx="0" cy="0" r="4" fill="#4ade80" />
          <text x="0" y="20" fill="#4ade80" fontSize="6.5" fontWeight="bold" textAnchor="middle">
            Retail / SLA
          </text>
        </g>

        {/* Bottom Efficiency Telemetry bar */}
        <rect
          x="10"
          y="126"
          width="190"
          height="12"
          rx="3"
          fill="#0c1e36"
          stroke="#1e3a5f"
          strokeWidth="0.8"
        />
        <text x="18" y="135" fill="#94a3b8" fontSize="6.5">
          Optimization: <tspan fill="#38bdf8" fontWeight="bold">99.4%</tspan> · Lead Time:{" "}
          <tspan fill="#22c55e" fontWeight="bold">-40%</tspan>
        </text>
      </g>

      {/* ── RIGHT: Operational SLA, Cold-Chain & Safety SOPs ── */}
      <g transform="translate(225, 36)">
        {/* Metric Card 1: OTIF (On-Time In-Full) */}
        <rect
          x="0"
          y="0"
          width="180"
          height="44"
          rx="7"
          fill="#07172b"
          stroke="#1e3a5f"
          strokeWidth="1"
        />
        <text x="12" y="15" fill="#94a3b8" fontSize="7" fontWeight="500">
          ON-TIME IN-FULL (OTIF)
        </text>
        <text x="12" y="34" fill="#ffffff" fontSize="16" fontWeight="bold">
          99.2%
        </text>
        <rect x="110" y="13" width="58" height="18" rx="9" fill="#451a03" />
        <text x="139" y="25" fill="#fbbf24" fontSize="7" fontWeight="bold" textAnchor="middle">
          ▲ Target Met
        </text>

        {/* Metric Card 2: Inventory Safety Buffer */}
        <rect
          x="0"
          y="50"
          width="180"
          height="44"
          rx="7"
          fill="#07172b"
          stroke="#1e3a5f"
          strokeWidth="1"
        />
        <text x="12" y="65" fill="#94a3b8" fontSize="7" fontWeight="500">
          SAFETY STOCK ACCURACY
        </text>
        <text x="12" y="84" fill="#38bdf8" fontSize="16" fontWeight="bold">
          98.8%
        </text>
        <rect x="110" y="63" width="58" height="18" rx="9" fill="#0c4a6e" />
        <text x="139" y="75" fill="#38bdf8" fontSize="7" fontWeight="bold" textAnchor="middle">
          Zero Stockouts
        </text>

        {/* SOP & Compliance Standards Badge */}
        <g transform="translate(0, 100)">
          <rect
            x="0"
            y="0"
            width="180"
            height="44"
            rx="7"
            fill="#07172b"
            stroke="#f59e0b"
            strokeWidth="1"
          />
          <circle cx="16" cy="22" r="4" fill="#fbbf24" filter="url(#glow-subtle)" />
          <text x="26" y="18" fill="#f8fafc" fontSize="7.5" fontWeight="bold">
            Cold-Chain &amp; Warehouse SOPs
          </text>
          <text x="26" y="30" fill="#94a3b8" fontSize="6.5">
            ISO 9001 &amp; GDP Certified · Real-time Audit
          </text>
          <text x="168" y="24" fill="#fbbf24" fontSize="9" fontWeight="bold" textAnchor="end">
            ✓
          </text>
        </g>
      </g>

      {/* ── BOTTOM: Live Audio Scrubber & Video Transcript ── */}
      <g transform="translate(0, 194)">
        <rect
          x="0"
          y="0"
          width="405"
          height="24"
          rx="6"
          fill="#07172b"
          stroke="#1e3a5f"
          strokeWidth="1"
        />
        <circle cx="16" cy="12" r="3.5" fill="#fbbf24" filter="url(#glow-subtle)" />
        <text x="26" y="15" fill="#cbd5e1" fontSize="8.5" fontWeight="500">
          ▶ &quot;Demonstrating cold-chain custody handoff, warehouse picking SOPs, and fleet route optimization...&quot;
        </text>
      </g>
    </motion.g>
  );
}
