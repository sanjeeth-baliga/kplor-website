"use client";
import { motion, useReducedMotion } from "framer-motion";
import { Container, Reveal, SectionLabel } from "./shared";

const have = ["Faculty expertise", "Course material", "Syllabi", "Research", "Existing recordings"];
const become = ["Explainer videos", "Kinetic typography", "Multilingual content", "SCORM-compliant"];

export function Problem() {
  const reduce = useReducedMotion();
  return (
    <section id="problem" className="on-dark relative overflow-hidden bg-kplor-950 py-24 text-white lg:py-36">
      <div className="kp-grid-dark pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <Container className="relative">
        <Reveal>
          <SectionLabel n="03" dark>The problem</SectionLabel>
        </Reveal>

        <div className="mt-10 grid items-center gap-12 lg:grid-cols-[1fr_auto_1fr] lg:gap-6">
          <Reveal>
            <h2 className="text-4xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-5xl lg:text-6xl">
              Your institution already has the <span className="font-display font-normal italic text-kplor-200">knowledge.</span>
            </h2>
            <ul className="mt-8 space-y-2.5">
              {have.map((h) => (
                <li key={h} className="flex items-center gap-3 text-lg text-kplor-100/80">
                  <span className="h-1.5 w-1.5 rounded-full bg-kplor-400" />
                  {h}
                </li>
              ))}
            </ul>
            <p className="mt-8 max-w-md text-base leading-relaxed text-kplor-100/70">
              Turning that knowledge into effective digital learning takes instructional expertise and serious
              production capacity. Most teams have one or the other, rarely both.
            </p>
          </Reveal>

          {/* drawn connector */}
          <svg aria-hidden viewBox="0 0 120 200" className="mx-auto hidden h-64 w-28 lg:block" fill="none">
            {[40, 100, 160].map((y, i) => (
              <motion.path
                key={y}
                d={`M0 ${y} C 50 ${y}, 70 100, 120 100`}
                stroke="#4f8ad6"
                strokeWidth="1.5"
                initial={reduce ? false : { pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 1.2, delay: 0.2 + i * 0.15 }}
              />
            ))}
            <motion.circle
              cx="120"
              cy="100"
              r="5"
              fill="#f5b53d"
              initial={reduce ? false : { scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.4, type: "spring" }}
            />
          </svg>

          <Reveal delay={0.15}>
            <h2 className="text-4xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-5xl lg:text-6xl">
              We turn it into <span className="font-display font-normal italic text-accent">learning.</span>
            </h2>
            <ul className="mt-8 grid gap-2.5 sm:grid-cols-2">
              {become.map((b, i) => (
                <motion.li
                  key={b}
                  initial={reduce ? false : { opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.08 }}
                  className="rounded-xl border border-white/15 bg-white/[0.06] px-4 py-3 text-base font-medium"
                >
                  {b}
                </motion.li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
