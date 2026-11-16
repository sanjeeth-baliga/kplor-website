"use client";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export const DEMO_URL =
  "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ2mPZpVSaMqZW8ltDDcJvcmm8JxnNs8eut6ZE_akpJJ5uehlz4ev8mWkg5HzZRUxUKxy-8ugk_d";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1200px] px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}

/** Numbered section label, e.g. "02 — Proof" */
export function SectionLabel({
  n,
  children,
  dark = false,
}: {
  n: string;
  children: ReactNode;
  dark?: boolean;
}) {
  return (
    <p
      className={`flex items-center gap-3 text-xs font-medium uppercase tracking-[0.18em] ${
        dark ? "text-kplor-200" : "text-kplor-600"
      }`}
    >
      <span className="font-mono tabular-nums">{n}</span>
      <span className={`h-px w-8 ${dark ? "bg-kplor-400" : "bg-kplor-500/50"}`} />
      {children}
    </p>
  );
}

/** Fade/slide-in on first view. Falls back to a plain element for reduced motion. */
export function Reveal({
  children,
  delay = 0,
  className = "",
  y = 24,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function DemoButton({
  variant = "light",
  children = "Book a Demo",
  className = "",
  id,
}: {
  variant?: "light" | "dark";
  children?: ReactNode;
  className?: string;
  id?: string;
}) {
  const styles =
    variant === "light"
      ? "bg-kplor-900 text-white hover:bg-kplor-700 shadow-[0_10px_30px_-10px_rgba(3,40,89,0.6)]"
      : "bg-accent text-kplor-950 hover:bg-accent-strong shadow-[0_10px_40px_-10px_rgba(245,181,61,0.7)]";
  return (
    <a
      id={id}
      href={DEMO_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-base font-semibold transition-all duration-200 hover:-translate-y-0.5 ${styles} ${className}`}
    >
      {children}
      <svg
        aria-hidden
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        className="transition-transform duration-200 group-hover:translate-x-1"
      >
        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  );
}
