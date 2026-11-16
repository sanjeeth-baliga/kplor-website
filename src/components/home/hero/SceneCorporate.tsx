"use client";
import { motion } from "framer-motion";
import { useStill } from "./motion";

export default function SceneCorporate() {
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
          width="145"
          height="18"
          rx="9"
          fill="#064e3b"
          stroke="#10b981"
          strokeWidth="1"
        />
        <text
          x="12"
          y="12"
          fill="#34d399"
          fontSize="8.5"
          fontWeight="bold"
          letterSpacing="1"
        >
          CORPORATE L&amp;D SUITE
        </text>
        <text
          x="405"
          y="12"
          fill="#94a3b8"
          fontSize="8"
          fontWeight="500"
          textAnchor="end"
        >
          ENTERPRISE WORKFORCE TRAINING
        </text>
      </g>

      {/* ── LEFT: Performance & Retention Spline Curve ── */}
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

        <text x="12" y="18" fill="#f8fafc" fontSize="8.5" fontWeight="bold">
          COMPETENCY MASTERY CURVE
        </text>
        <text x="200" y="18" fill="#10b981" fontSize="8" fontWeight="bold" textAnchor="end">
          ▲ +32% Retention
        </text>

        {/* Grid Axis Lines */}
        <g stroke="#1e3a5f" strokeWidth="0.8" strokeDasharray="3 3">
          <line x1="20" y1="42" x2="195" y2="42" />
          <line x1="20" y1="68" x2="195" y2="68" />
          <line x1="20" y1="94" x2="195" y2="94" />
          <line x1="20" y1="120" x2="195" y2="120" strokeDasharray="none" stroke="#334155" />
        </g>

        {/* Quarter Markers */}
        <text x="35" y="132" fill="#64748b" fontSize="6.5">
          Q1
        </text>
        <text x="80" y="132" fill="#64748b" fontSize="6.5">
          Q2
        </text>
        <text x="125" y="132" fill="#64748b" fontSize="6.5">
          Q3
        </text>
        <text x="175" y="132" fill="#38bdf8" fontSize="6.5" fontWeight="bold">
          Q4 (Post-Training)
        </text>

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
          initial={isStill ? undefined : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.6, ease: "easeOut" }}
          filter="url(#glow-subtle)"
        />

        {/* Peak KPI Callout Dot */}
        <circle
          cx="190"
          cy="38"
          r="4.5"
          fill="#22c55e"
          filter="url(#glow-cyan)"
        />
        <rect
          x="136"
          y="24"
          width="49"
          height="14"
          rx="4"
          fill="#065f46"
          stroke="#34d399"
          strokeWidth="0.8"
        />
        <text
          x="160.5"
          y="34"
          fill="#ffffff"
          fontSize="7"
          fontWeight="bold"
          textAnchor="middle"
        >
          96% MASTERY
        </text>
      </g>

      {/* ── RIGHT: Realistic Metric Cards & LMS Sync Status ── */}
      <g transform="translate(225, 36)">
        {/* Metric Card 1: Compliance */}
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
          COMPLIANCE ATTAINMENT
        </text>
        <text x="12" y="34" fill="#ffffff" fontSize="16" fontWeight="bold">
          100%
        </text>
        <rect x="110" y="13" width="58" height="18" rx="9" fill="#064e3b" />
        <text x="139" y="25" fill="#34d399" fontSize="7" fontWeight="bold" textAnchor="middle">
          Audit Ready
        </text>

        {/* Metric Card 2: Training Speed */}
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
          TIME TO PROFICIENCY
        </text>
        <text x="12" y="84" fill="#38bdf8" fontSize="16" fontWeight="bold">
          4.5 Days
        </text>
        <rect x="110" y="63" width="58" height="18" rx="9" fill="#0c4a6e" />
        <text x="139" y="75" fill="#38bdf8" fontSize="7" fontWeight="bold" textAnchor="middle">
          from 12 Days
        </text>

        {/* SCORM & Enterprise LMS Integration Status */}
        <g transform="translate(0, 100)">
          <rect
            x="0"
            y="0"
            width="180"
            height="44"
            rx="7"
            fill="#07172b"
            stroke="#10b981"
            strokeWidth="1"
          />
          <circle cx="16" cy="22" r="4" fill="#22c55e" filter="url(#glow-subtle)" />
          <text x="26" y="18" fill="#f8fafc" fontSize="7.5" fontWeight="bold">
            SCORM 2004 &amp; xAPI
          </text>
          <text x="26" y="30" fill="#94a3b8" fontSize="6.5">
            Auto-synced to Enterprise LMS · SSO Ready
          </text>
          <text x="168" y="24" fill="#22c55e" fontSize="9" fontWeight="bold" textAnchor="end">
            ✓
          </text>
        </g>
      </g>

      {/* ── BOTTOM: Global Distribution Ticker ── */}
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
        <circle cx="16" cy="12" r="3.5" fill="#22c55e" filter="url(#glow-subtle)" />
        <text x="26" y="15" fill="#cbd5e1" fontSize="8.5" fontWeight="500">
          ▶ &quot;Delivering role-based onboarding, safety compliance, and leadership modules enterprise-wide...&quot;
        </text>
      </g>
    </motion.g>
  );
}
