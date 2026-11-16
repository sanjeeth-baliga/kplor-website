"use client";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Signature visual: KNOWLEDGE → LEARNING.
 * Phase 0: raw source material is scattered
 * Phase 1–3: it aligns and passes through the Kplor design pipeline
 * Phase 4: polished learning outputs resolve
 * Only transform/opacity are animated. Reduced-motion users get the final state.
 */

const sources = [
  { tag: "PDF", title: "Course material", x: -14, y: 8, r: -5 },
  { tag: "SYL", title: "Syllabus", x: 12, y: -6, r: 4 },
  { tag: "PPT", title: "Slides", x: -8, y: 10, r: 3 },
  { tag: "REC", title: "Faculty recording", x: 14, y: -4, r: -4 },
  { tag: "TXT", title: "Expert notes", x: -10, y: 6, r: 5 },
];

const steps = ["Instructional design", "Learner psychology", "Storyboarding"];

const outputs = [
  { title: "Explainer video", kind: "video" },
  { title: "Multilingual", kind: "multilingual" },
  { title: "SCORM", kind: "scorm" },
  { title: "AI Avatar", kind: "avatar" },
  { title: "Kinetic typography", kind: "kinetic" },
] as const;

const DURATIONS = [1700, 1200, 1200, 1200, 4200];

function OutputGlyph({ kind }: { kind: (typeof outputs)[number]["kind"] }) {
  if (kind === "video")
    return (
      <div className="relative grid h-14 place-items-center rounded-md bg-kplor-900">
        <span className="grid h-7 w-7 place-items-center rounded-full bg-white/15">
          <svg width="10" height="12" viewBox="0 0 10 12" aria-hidden>
            <path d="M0 0l10 6-10 6z" fill="#fff" />
          </svg>
        </span>
        <span className="absolute bottom-1.5 left-2 right-2 h-0.5 rounded bg-white/25">
          <span className="block h-full w-1/3 rounded bg-accent" />
        </span>
      </div>
    );
  if (kind === "multilingual")
    return (
      <div className="flex h-14 items-center justify-center gap-1.5 rounded-md bg-kplor-50">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-kplor-600">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
        </svg>
      </div>
    );
  if (kind === "scorm")
    return (
      <div className="flex h-14 flex-col items-center justify-center gap-1 rounded-md bg-kplor-50">
        <div className="h-6 w-8 rounded border-2 border-kplor-600">
          <div className="mx-auto mt-1 h-1 w-4 rounded-full bg-kplor-400" />
        </div>
        <div className="h-1 w-6 rounded-full bg-kplor-300" />
      </div>
    );
  if (kind === "avatar")
    return (
      <div className="flex h-14 items-center justify-center rounded-md bg-kplor-50">
        <div className="relative h-8 w-8 overflow-hidden rounded-full border-2 border-kplor-400">
           <div className="absolute inset-x-0 -bottom-2 mx-auto h-5 w-6 rounded-t-full bg-kplor-500" />
           <div className="absolute top-1 left-1/2 -translate-x-1/2 h-3.5 w-3.5 rounded-full bg-kplor-500" />
        </div>
      </div>
    );
  return (
    <div className="flex h-14 items-center justify-center rounded-md bg-kplor-50 p-2">
      <div className="flex items-end gap-1">
        <span className="text-xl font-bold italic text-kplor-600">A</span>
        <span className="text-sm font-bold text-kplor-400">a</span>
      </div>
    </div>
  );
}

export default function TransformStage() {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const t = setTimeout(() => setPhase((p) => (p + 1) % DURATIONS.length), DURATIONS[phase]);
    return () => clearTimeout(t);
  }, [phase, reduce]);

  const p = reduce ? 4 : phase;
  const scattered = p === 0;
  const flowing = p >= 1 && p <= 3;
  const spring = { type: "spring" as const, stiffness: 120, damping: 18 };

  return (
    <div
      role="img"
      aria-label="Diagram: source material such as PDFs, syllabi, slides, recordings and notes passes through instructional design, learner psychology and storyboarding, and becomes explainer videos, multilingual content, SCORM modules, AI avatars and kinetic typography."
      className="relative rounded-3xl border border-line bg-white/70 p-4 shadow-[0_30px_80px_-40px_rgba(3,40,89,0.35)] backdrop-blur sm:p-6"
    >
      <div className="kp-grid pointer-events-none absolute inset-0 rounded-3xl opacity-60" />
      <div className="relative grid items-stretch gap-4 md:grid-cols-[1fr_auto_1.05fr_auto_1fr] md:gap-3">
        {/* SOURCES */}
        <div>
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-slate">01 · Knowledge</p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-1">
            {sources.map((s, i) => (
              <motion.div
                key={s.tag}
                animate={
                  scattered
                    ? { x: s.x, y: s.y, rotate: s.r, opacity: 1 }
                    : { x: 0, y: 0, rotate: 0, opacity: flowing ? 0.55 : p >= 4 ? 0.45 : 1 }
                }
                transition={{ ...spring, delay: scattered ? 0 : i * 0.05 }}
                className="flex items-center gap-2.5 rounded-lg border border-line bg-white px-3 py-2.5 shadow-sm"
              >
                <span className="rounded bg-kplor-50 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-kplor-700">
                  {s.tag}
                </span>
                <span className="text-[13px] font-medium text-charcoal">{s.title}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <Connector active={flowing} />

        {/* ENGINE */}
        <div>
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-slate">02 · Kplor design</p>
          <div className="flex h-[calc(100%-1.75rem)] flex-col justify-center gap-2 rounded-2xl bg-kplor-900 p-4 text-white">
            {steps.map((s, i) => {
              const done = p > i + 1;
              const active = p === i + 1;
              return (
                <motion.div
                  key={s}
                  animate={{ opacity: p === 0 ? 0.5 : active || done ? 1 : 0.5, x: active ? 4 : 0 }}
                  transition={{ duration: 0.4 }}
                  className={`flex items-center gap-3 rounded-lg border px-3 py-3 ${
                    active ? "border-accent bg-white/10" : "border-white/15 bg-white/[0.04]"
                  }`}
                >
                  <span
                    className={`grid h-6 w-6 shrink-0 place-items-center rounded-full font-mono text-[11px] font-semibold ${
                      done ? "bg-accent text-kplor-950" : active ? "bg-white text-kplor-900" : "bg-white/15 text-white"
                    }`}
                  >
                    {done ? "✓" : i + 1}
                  </span>
                  <span className="text-sm font-medium">{s}</span>
                </motion.div>
              );
            })}
            <p className="mt-1 text-[11px] leading-snug text-kplor-200">Reviewed by subject-matter experts</p>
          </div>
        </div>

        <Connector active={p >= 3} />

        {/* OUTPUTS */}
        <div>
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-slate">03 · Learning</p>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-1">
            {outputs.map((o, i) => (
              <motion.div
                key={o.title}
                animate={p >= 4 ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0.25, y: 8, scale: 0.97 }}
                transition={{ ...spring, delay: p >= 4 ? i * 0.1 : 0 }}
                className="rounded-lg border border-line bg-white p-2 shadow-sm"
              >
                <OutputGlyph kind={o.kind} />
                <p className="mt-1.5 px-0.5 text-[12px] font-semibold text-kplor-900">{o.title}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Connector({ active }: { active: boolean }) {
  return (
    <div aria-hidden className="relative flex items-center justify-center md:w-10">
      <div className="h-6 w-px bg-kplor-200 md:h-px md:w-full" />
      <motion.span
        className="absolute h-2 w-2 rounded-full bg-accent"
        animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 0.4 }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
}
