"use client";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { useRef, useState, type ReactNode } from "react";
import { Container, Reveal, SectionLabel } from "./shared";

const stages = [
  {
    k: "Knowledge",
    t: "Source material enters.",
    d: "PDFs, slides, syllabi, faculty recordings and expert know-how, exactly as you have them. No rewriting needed first.",
  },
  {
    k: "Instructional design",
    t: "Structured around the learning objective.",
    d: "We decide what the learner must be able to do, then organise the content into a sequence that gets them there.",
  },
  {
    k: "Learner psychology",
    t: "Designed for the audience.",
    d: "Pacing, examples and explanation depth are shaped by who is learning and what they already know.",
  },
  {
    k: "Storyboarding",
    t: "The narrative becomes visual.",
    d: "Every concept is mapped to scenes, visuals and narration before production begins, so review happens early.",
  },
  {
    k: "Production",
    t: "Video, typography and avatars are created.",
    d: "Explainers, kinetic typography, AI avatars, multilingual dubbing and voice cloning, reviewed by subject-matter experts.",
  },
  {
    k: "Deliverables",
    t: "Ready to deploy.",
    d: "SCORM-compliant, LMS-ready learning content that sits inside your existing platform and brand.",
  },
];

/* ───────── visuals: one artifact that changes at every stage ───────── */
function Bars({ widths, tone = "bg-kplor-100" }: { widths: number[]; tone?: string }) {
  return (
    <div className="space-y-2">
      {widths.map((w, i) => (
        <div key={i} className={`h-2 rounded ${tone}`} style={{ width: `${w}%` }} />
      ))}
    </div>
  );
}

function Group({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="rounded-xl border border-kplor-100 bg-white p-4">
      <p className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-wider text-kplor-600">{label}</p>
      {children}
    </div>
  );
}

function Chip({ children, tone = "light" }: { children: ReactNode; tone?: "light" | "solid" }) {
  return (
    <span
      className={`rounded-full px-3 py-1.5 text-xs font-medium ${
        tone === "solid" ? "bg-kplor-900 text-white" : "border border-kplor-200 bg-kplor-50 text-kplor-800"
      }`}
    >
      {children}
    </span>
  );
}

export function StageVisual({ i }: { i: number }) {
  switch (i) {
    case 0:
      return (
        <div className="space-y-3">
          {[
            [92, 70, 84],
            [60, 95, 48],
            [88, 52, 76],
            [70, 90, 40],
          ].map((row, r) => (
            <div key={r} className="rounded-lg border border-line bg-white p-3" style={{ transform: `rotate(${(r % 2 ? 1 : -1) * 0.8}deg)` }}>
              <Bars widths={row} tone="bg-mist" />
            </div>
          ))}
          <p className="pt-1 text-center text-xs text-slate">Unstructured: slides, notes, transcripts</p>
        </div>
      );
    case 1:
      return (
        <div className="grid gap-3 sm:grid-cols-2">
          <Group label="Learning objective"><Bars widths={[90, 60]} tone="bg-kplor-200" /></Group>
          <Group label="Key concepts"><Bars widths={[80, 70, 55]} /></Group>
          <Group label="Worked examples"><Bars widths={[85, 50]} /></Group>
          <Group label="Practice"><Bars widths={[75, 60]} /></Group>
        </div>
      );
    case 2:
      return (
        <div className="space-y-3">
          <Group label="Audience profile">
            <div className="flex flex-wrap gap-2"><Chip>Who is learning</Chip><Chip>Prior knowledge</Chip><Chip>Learning goal</Chip></div>
          </Group>
          <Group label="Experience shaped by learner">
            <div className="flex flex-wrap gap-2"><Chip tone="solid">Pacing</Chip><Chip tone="solid">Depth</Chip><Chip tone="solid">Examples</Chip><Chip tone="solid">Practice</Chip></div>
          </Group>
          <Bars widths={[88, 64]} />
        </div>
      );
    case 3:
      return (
        <div className="grid grid-cols-2 gap-3">
          {["Hook", "Explain", "Demonstrate", "Check"].map((s, n) => (
            <div key={s} className="rounded-lg border border-kplor-100 bg-white p-2">
              <div className="grid aspect-video place-items-center rounded bg-kplor-50">
                <span className="font-mono text-xs font-semibold text-kplor-500">Scene {n + 1}</span>
              </div>
              <p className="mt-2 px-1 text-xs font-medium text-charcoal">{s}</p>
            </div>
          ))}
        </div>
      );
    case 4:
      return (
        <div className="grid grid-cols-2 gap-3">
          <div className="relative grid aspect-video place-items-center rounded-lg bg-kplor-900">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-white/15"><svg width="12" height="14" viewBox="0 0 10 12" aria-hidden><path d="M0 0l10 6-10 6z" fill="#fff" /></svg></span>
            <span className="absolute bottom-2 left-3 text-[10px] text-white/80">Explainer video</span>
          </div>
          <Group label="AI Avatar">
            <div className="flex justify-center"><div className="relative h-6 w-6 overflow-hidden rounded-full border border-kplor-400"><div className="absolute inset-x-0 -bottom-1.5 mx-auto h-4 w-5 rounded-t-full bg-kplor-500" /><div className="absolute top-1 left-1/2 -translate-x-1/2 h-2.5 w-2.5 rounded-full bg-kplor-500" /></div></div>
          </Group>
          <Group label="SCORM">
             <div className="space-y-2">{[0, 1].map((n) => <div key={n} className="flex items-center gap-2"><span className={`h-2.5 w-2.5 rounded-sm border ${n === 1 ? "border-kplor-600 bg-kplor-600" : "border-kplor-300"}`} /><span className="h-1.5 flex-1 rounded bg-kplor-100" /></div>)}</div>
          </Group>
          <Group label="Voice & language">
            <div className="flex flex-wrap gap-1.5"><Chip>Multilingual dubbing</Chip><Chip>Voice cloning</Chip></div>
          </Group>
        </div>
      );
    default:
      return (
        <div className="rounded-xl border border-kplor-100 bg-white p-6">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-kplor-600">Learning package</p>
          <ul className="mt-4 space-y-3">
            {["SCORM-compliant", "LMS-ready", "Institution-branded", "Scales across your programmes"].map((x) => (
              <li key={x} className="flex items-center gap-3 text-base font-medium text-charcoal">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-accent text-xs font-bold text-kplor-950">✓</span>
                {x}
              </li>
            ))}
          </ul>
        </div>
      );
  }
}

function ArtifactCard({ i }: { i: number }) {
  return (
    <div className="rounded-3xl border border-line bg-white p-5 shadow-[0_40px_90px_-50px_rgba(3,40,89,0.45)] sm:p-6">
      <div className="mb-5 flex items-center justify-between">
        <span className="rounded-md bg-kplor-50 px-2.5 py-1 font-mono text-[11px] font-semibold text-kplor-700">
          Unit · illustrative
        </span>
        <span className="font-mono text-xs text-slate">{String(i + 1).padStart(2, "0")} / 06</span>
      </div>
      <div className="min-h-[300px]">
        <StageVisual i={i} />
      </div>
    </div>
  );
}

/* ───────── section ───────── */
export function Process() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(stages.length - 1, Math.max(0, Math.floor(v * stages.length))));
  });

  return (
    <section id="how-it-works" className="bg-paper">
      <Container className="pt-24 lg:pt-32">
        <Reveal>
          <SectionLabel n="04">The transformation</SectionLabel>
          <h2 className="mt-6 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-kplor-900 sm:text-5xl lg:text-6xl">
            From raw knowledge to a learning experience, in <span className="font-display font-normal italic text-kplor-500">six steps.</span>
          </h2>
        </Reveal>
      </Container>

      {/* Desktop: sticky scroll-driven pipeline */}
      <div ref={ref} className="relative hidden lg:block" style={{ height: reduce ? "auto" : "560vh" }}>
        <div className={reduce ? "" : "sticky top-16 flex h-[calc(100vh-4rem)] items-center"}>
          <Container className="grid w-full grid-cols-[0.9fr_1.1fr] items-center gap-16 py-10">
            <div>
              <ol className="mb-8 flex gap-2" aria-label="Progress">
                {stages.map((s, n) => (
                  <li key={s.k} className={`h-1 flex-1 rounded-full transition-colors duration-500 ${n <= active ? "bg-kplor-600" : "bg-kplor-100"}`} />
                ))}
              </ol>
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={reduce ? false : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -20 }}
                  transition={{ duration: 0.35 }}
                >
                  <p className="text-[9rem] font-semibold leading-none tracking-[-0.06em] text-kplor-100">
                    {String(active + 1).padStart(2, "0")}
                  </p>
                  <h3 className="-mt-4 text-sm font-semibold uppercase tracking-[0.18em] text-kplor-600">{stages[active].k}</h3>
                  <p className="mt-3 text-4xl font-semibold leading-tight tracking-[-0.02em] text-kplor-900">{stages[active].t}</p>
                  <p className="mt-4 max-w-md text-lg leading-relaxed text-slate">{stages[active].d}</p>
                </motion.div>
              </AnimatePresence>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={reduce ? false : { opacity: 0, x: 40, scale: 0.98 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={reduce ? undefined : { opacity: 0, x: -40 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <ArtifactCard i={active} />
              </motion.div>
            </AnimatePresence>
          </Container>
        </div>
        {reduce && (
          <Container className="pb-20">
            <ol className="grid grid-cols-2 gap-8">
              {stages.map((s, n) => (
                <li key={s.k}><ArtifactCard i={n} /></li>
              ))}
            </ol>
          </Container>
        )}
      </div>

      {/* Mobile / tablet: stacked narrative */}
      <Container className="py-14 lg:hidden">
        <ol className="space-y-14">
          {stages.map((s, n) => (
            <li key={s.k}>
              <Reveal>
                <p className="font-mono text-sm font-semibold text-kplor-500">{String(n + 1).padStart(2, "0")}</p>
                <h3 className="mt-1 text-sm font-semibold uppercase tracking-[0.16em] text-kplor-600">{s.k}</h3>
                <p className="mt-2 text-2xl font-semibold leading-tight tracking-tight text-kplor-900">{s.t}</p>
                <p className="mb-5 mt-3 text-base leading-relaxed text-slate">{s.d}</p>
                <ArtifactCard i={n} />
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
