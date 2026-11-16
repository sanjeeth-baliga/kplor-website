"use client";
import { motion, useReducedMotion, animate, useInView } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Container, DemoButton, Reveal } from "./shared";
import HeroScene from "./HeroScene";

/* ───────────────────────── 01 HERO ───────────────────────── */
export function Hero() {
  const reduce = useReducedMotion();
  const rise = (delay: number) =>
    reduce
      ? {}
      : {
        initial: { opacity: 0, y: 28 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const },
      };

  return (
    <section className="relative overflow-hidden bg-paper pb-20 pt-14 sm:pt-20 lg:pb-28">
      <div className="kp-grid pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_75%)]" />
      <Container className="relative grid items-center gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
        <div>
          <motion.p
            {...rise(0)}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-kplor-200 bg-white px-3.5 py-1.5 text-xs font-medium text-kplor-700"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            AI-powered eLearning content, shaped by instructional design and learner psychology
          </motion.p>

          <motion.h1
            {...rise(0.08)}
            className="max-w-[14ch] text-[2.75rem] font-semibold leading-[1.02] tracking-[-0.035em] text-kplor-900 sm:text-6xl lg:text-[4.25rem]"
          >
            Turn knowledge into{" "}
            <span className="font-display font-normal italic text-kplor-500">learning</span> that works.
          </motion.h1>

          <motion.p {...rise(0.18)} className="mt-7 max-w-xl text-lg leading-relaxed text-slate sm:text-xl">
            Kplor transforms expert knowledge, course material and institutional content into engaging digital
            learning experiences, designed around how people actually learn.
          </motion.p>
          <motion.div {...rise(0.28)} className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <DemoButton id="hero-book-demo" />
            <a
              href="#how-it-works"
              className="text-sm font-medium text-kplor-700 underline decoration-kplor-200 underline-offset-4 transition-colors hover:text-kplor-500 hover:decoration-kplor-500"
            >
              See how it works
            </a>
          </motion.div>
        </div>

        <motion.div {...rise(0.3)}>
          <HeroScene />
        </motion.div>
      </Container>
    </section>
  );
}

/* ───────────────────────── 02 PROOF ───────────────────────── */
function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [val, setVal] = useState(reduce ? to : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    const c = animate(0, to, { duration: 1.6, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setVal(Math.round(v)) });
    return () => c.stop();
  }, [inView, to, reduce]);

  return (
    <span ref={ref} className="tabular-nums">
      {val.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

const stats = [
  { n: 11500, label: "videos delivered", sub: "Across schools, universities & enterprise" },
  { n: 2250, label: "video hours delivered", sub: "High-retention learning content" },
  { n: 58750, label: "people helped", sub: "Students, educators & professionals impacted" },
  { n: 25, label: "institutions trusted", sub: "" },
];

export function Proof() {
  return (
    <section id="proof" className="border-y border-line bg-white py-16 lg:py-24">
      <Container>
        <div>
          <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-line">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08} className={`${i > 0 ? "sm:pl-6 lg:pl-8" : ""} pt-6 sm:pt-0`}>
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="block text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.04em] text-kplor-700">
                    <CountUp to={s.n} suffix="+" />
                  </span>
                  <span className="mt-2 block text-base font-semibold text-charcoal">{s.label}</span>
                  {s.sub ? <span className="block text-xs sm:text-sm text-slate mt-0.5">{s.sub}</span> : null}
                </dd>
              </Reveal>
            ))}
          </dl>

          {/* Sample Video Library Button */}
          <Reveal delay={0.35} className="mt-14 flex justify-center">
            <Link
              href="/videos"
              className="group inline-flex items-center gap-3 rounded-full bg-kplor-900 px-8 py-3.5 text-base font-semibold text-white shadow-md transition-all hover:bg-kplor-700 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Sample Video Library</span>
              <svg
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
