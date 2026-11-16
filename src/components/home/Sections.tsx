"use client";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Container, DemoButton, Reveal, SectionLabel } from "./shared";

/* ───────────────────────── 05 DIFFERENTIATOR ───────────────────────── */
export function Differentiator() {
  const cols = [
    { h: "You bring", p: "The knowledge: course material, slides, syllabi, faculty recordings, and expert know-how.", tone: "bg-white text-charcoal border-line" },
    { h: "We design", p: "Instructional design, learner psychology and storyboarding turn it into a plan for learning.", tone: "bg-kplor-900 text-white border-kplor-900" },
    { h: "You receive", p: "Finished, SME-reviewed learning content, SCORM-compliant and ready for your LMS.", tone: "bg-white text-charcoal border-line" },
  ];
  return (
    <section id="difference" className="bg-white py-24 lg:py-36">
      <Container>
        <Reveal>
          <SectionLabel n="05">The difference</SectionLabel>
          <h2 className="mt-6 max-w-4xl text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-kplor-900 sm:text-5xl lg:text-6xl">
            Give us your knowledge. We&rsquo;ll structure it and turn it into{" "}
            <span className="font-display font-normal italic text-kplor-500">learning content.</span>
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate">
            Plenty of tools can help generate content. Kplor handles the learning transformation: we design the
            experience around the learner, then produce it at scale, with content costing up to 90% less than
            traditional production.
          </p>
        </Reveal>
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {cols.map((c, i) => (
            <Reveal key={c.h} delay={i * 0.1}>
              <div className={`h-full rounded-3xl border p-8 ${c.tone}`}>
                <p className={`font-mono text-xs ${i === 1 ? "text-kplor-200" : "text-kplor-500"}`}>0{i + 1}</p>
                <h3 className="mt-6 text-3xl font-semibold tracking-tight">{c.h}</h3>
                <p className={`mt-3 text-base leading-relaxed ${i === 1 ? "text-kplor-100" : "text-slate"}`}>{c.p}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ───────────────────────── 06 OUTPUTS ───────────────────────── */
const outputGroups = [
  { g: "Source → explanation", items: ["Explainer videos", "Kinetic typography", "AI Avatar"] },
  { g: "Learning & reach", items: ["Multilingual dubbing", "Voice cloning"] },
  { g: "Delivery", items: ["SCORM-compliant content", "LMS-ready content"] },
];

export function Outputs() {
  return (
    <section id="solutions" className="bg-paper py-24 lg:py-36">
      <Container className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <SectionLabel n="06">What Kplor creates</SectionLabel>
          <h2 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-kplor-900 sm:text-5xl">
            Digital learning content, made to be used.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-slate">
            From a single explainer to a full course library: eLearning content development that fits the way your
            institution already teaches.
          </p>
          <Link href="/videos" className="mt-8 inline-flex items-center gap-2 font-semibold text-kplor-700 underline decoration-kplor-200 underline-offset-4 hover:decoration-kplor-500">
            Watch sample videos →
          </Link>
        </Reveal>

        <div className="space-y-12">
          {outputGroups.map((grp) => (
            <Reveal key={grp.g}>
              <p className="mb-2 font-mono text-xs uppercase tracking-[0.16em] text-kplor-600">{grp.g}</p>
              <ul className="divide-y divide-line border-y border-line">
                {grp.items.map((it) => (
                  <li key={it} className="group flex items-center justify-between py-5 transition-colors hover:bg-white">
                    <span className="px-1 text-xl font-medium tracking-tight text-charcoal transition-transform group-hover:translate-x-2 sm:text-2xl">{it}</span>
                    <span aria-hidden className="pr-2 text-kplor-400 opacity-0 transition-opacity group-hover:opacity-100">↗</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ───────────────────────── 07 AUDIENCE ───────────────────────── */
const audiences = [
  { id: "edtech", label: "EdTech", h: "Content at the pace your product needs.", p: "Grow your catalogue with consistent, well-designed learning content without building a production team.", pts: ["Scalable course production", "Consistent instructional quality", "LMS-ready delivery"] },
  { id: "universities", label: "Universities", h: "Turn faculty expertise into digital learning.", p: "Convert lectures, syllabi and course material into explainers that extend your faculty's reach.", pts: ["SCORM-compliant modules", "Subject-matter expert review", "Multilingual options"] },
  { id: "odl", label: "ODL", h: "Learning that works without a classroom.", p: "Open and distance learners need clearer structure and engaging material. We design for exactly that.", pts: ["Structured self-paced learning", "Multilingual dubbing", "SCORM-compliant modules"] },
  { id: "k12", label: "K-12", h: "Concepts made clear for young learners.", p: "Animation, kinetic typography and character-led explainers that keep schools' content engaging.", pts: ["AI Avatar", "Kinetic typography", "Multilingual options"] },
  { id: "publishers", label: "Publishers", h: "Bring your books and courses to life.", p: "Extend existing publications into video, kinetic typography and AI avatars for digital-first learners.", pts: ["Source from existing material", "Institution-branded output", "Multilingual versions"] },
  { id: "corporate", label: "Corporate L&D", h: "Training content that people finish.", p: "Turn internal expertise and manuals into engaging corporate learning content on your LMS.", pts: ["Expert knowledge → modules", "SCORM-compliant delivery", "Voice cloning and dubbing"] },
];

export function Audience() {
  const [sel, setSel] = useState(0);
  const reduce = useReducedMotion();
  const a = audiences[sel];
  return (
    <section id="audience" className="border-y border-line bg-white py-24 lg:py-32">
      <Container>
        <Reveal>
          <SectionLabel n="07">Who it&rsquo;s for</SectionLabel>
          <h2 className="mt-6 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-kplor-900 sm:text-5xl lg:text-6xl">
            Built for institutions that teach at scale.
          </h2>
        </Reveal>

        <div role="tablist" aria-label="Audience" className="-mx-5 mt-10 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
          {audiences.map((x, i) => (
            <button
              key={x.id}
              role="tab"
              id={`tab-${x.id}`}
              aria-selected={sel === i}
              aria-controls="audience-panel"
              onClick={() => setSel(i)}
              className={`shrink-0 rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors ${
                sel === i ? "border-kplor-900 bg-kplor-900 text-white" : "border-line bg-white text-charcoal hover:border-kplor-400"
              }`}
            >
              {x.label}
            </button>
          ))}
        </div>

        <div id="audience-panel" role="tabpanel" aria-labelledby={`tab-${a.id}`} className="mt-8 min-h-[280px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={a.id}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid gap-8 rounded-3xl bg-kplor-50 p-8 sm:p-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16"
            >
              <div>
                <h3 className="text-3xl font-semibold leading-tight tracking-tight text-kplor-900 sm:text-4xl">{a.h}</h3>
                <p className="mt-4 max-w-lg text-lg leading-relaxed text-slate">{a.p}</p>
              </div>
              <ul className="space-y-3 self-center">
                {a.pts.map((p) => (
                  <li key={p} className="flex items-center gap-3 rounded-xl bg-white px-4 py-3.5 text-base font-medium text-charcoal shadow-sm">
                    <span className="h-2 w-2 rounded-full bg-accent" />
                    {p}
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}

/* ───────────────────────── 08 CASE STUDIES ───────────────────────── */
export type CaseStudy = {
  client: string;
  problem?: string;
  existing?: string;
  action?: string;
  result?: string; // verified outcomes only
};

// Populate with real, approved projects. Empty fields render a clearly-marked placeholder.
export const caseStudies: CaseStudy[] = [
  { client: "University programme" },
  { client: "EdTech platform" },
  { client: "Corporate L&D team" },
];

export function CaseStudies() {
  const steps: [keyof Omit<CaseStudy, "client">, string, string][] = [
    ["problem", "Problem", "What the institution already had."],
    ["existing", "Existing approach", "What needed to change."],
    ["action", "What Kplor did", "Instructional design → production → review."],
    ["result", "Result", "Verified outcome."],
  ];
  return (
    <section id="case-studies" className="bg-paper py-24 lg:py-36">
      <Container>
        <Reveal>
          <SectionLabel n="08">Proof of work</SectionLabel>
          <h2 className="mt-6 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-kplor-900 sm:text-5xl lg:text-6xl">
            Real projects, <span className="font-display font-normal italic text-kplor-500">transformed.</span>
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {caseStudies.map((c, i) => (
            <Reveal key={c.client} delay={i * 0.1}>
              <article className="flex h-full flex-col rounded-3xl border border-line bg-white p-7">
                <h3 className="text-2xl font-semibold tracking-tight text-kplor-900">{c.client}</h3>
                <ol className="mt-6 space-y-5">
                  {steps.map(([key, label, hint], n) => (
                    <li key={key} className="flex gap-4">
                      <span className="mt-0.5 font-mono text-xs text-kplor-500">0{n + 1}</span>
                      <div>
                        <p className="text-sm font-semibold text-charcoal">{label}</p>
                        <p className={`text-sm leading-relaxed ${c[key] ? "text-slate" : "italic text-slate/60"}`}>
                          {c[key] ?? `${hint}: case study coming soon.`}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* Testimonials — renders nothing until real, approved quotes are added. */
export type Testimonial = { quote: string; name: string; role: string; org?: string };
export const testimonials: Testimonial[] = [];

export function Testimonials() {
  if (testimonials.length === 0) return null;
  const t = testimonials[0];
  return (
    <section aria-label="Testimonials" className="bg-white py-24">
      <Container>
        <figure className="mx-auto max-w-4xl text-center">
          <blockquote className="font-display text-3xl leading-snug text-kplor-900 sm:text-5xl">&ldquo;{t.quote}&rdquo;</blockquote>
          <figcaption className="mt-6 text-base text-slate">
            <strong className="text-charcoal">{t.name}</strong>, {t.role}{t.org ? `, ${t.org}` : ""}
          </figcaption>
        </figure>
      </Container>
    </section>
  );
}

/* ───────────────────────── 09 TRUST + FAQ ───────────────────────── */
const trust = [
  ["Subject-matter expert review", "Content is reviewed for subject accuracy before it reaches your learners."],
  ["SCORM-compliant", "Packaged to the standard your LMS expects."],
  ["LMS-ready", "Delivered in formats that fit the platforms you already use."],
  ["Multilingual", "Multilingual dubbing and voice cloning extend content to more learners."],
  ["Production at scale", "25+ hours of video produced every day."],
  ["Your data stays yours", "Strict privacy, security and consent controls, with zero third-party sharing."],
];

const faqs = [
  ["Who owns the IP?", "You own 100% of the intellectual property. All videos, animations, and learning assets produced by Kplor are completely white-labeled and owned entirely by your institution or company. You have full rights to host, monetize, license, and upload them to your LMS with zero recurring fees or restrictions."],
  ["What kind of source material can Kplor work with?", "Course material, slides, syllabi, PDFs, notes, research, existing recordings and expert knowledge. You don't need to restructure it first."],
  ["Can Kplor work with existing faculty recordings?", "Yes. We can turn faculty recordings into graphical explainers."],
  ["Is the content LMS-ready and SCORM compliant?", "Yes. Content is delivered LMS-ready and SCORM-compliant."],
  ["Can content be produced in multiple languages?", "Yes. We offer multilingual dubbing and voice cloning."],
  ["How does Kplor ensure subject accuracy?", "Subject-matter experts review the content as part of our process."],
  ["What types of institutions does Kplor work with?", "EdTech companies, universities, ODL programmes, K-12 schools, publishers and corporate L&D teams."],
];

export function Trust() {
  return (
    <section id="trust" className="bg-white py-24 lg:py-32">
      <Container>
        <Reveal>
          <SectionLabel n="09">Trust</SectionLabel>
          <h2 className="mt-6 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-kplor-900 sm:text-5xl">
            Quality your institution can rely on.
          </h2>
        </Reveal>
        <dl className="mt-12 grid border-l border-t border-line sm:grid-cols-2 lg:grid-cols-3">
          {trust.map(([h, p]) => (
            <div key={h} className="border-b border-r border-line p-7">
              <dt className="text-lg font-semibold text-kplor-900">{h}</dt>
              <dd className="mt-2 text-base leading-relaxed text-slate">{p}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-24 grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-tight text-kplor-900 sm:text-4xl">Common questions</h2>
          </Reveal>
          <div className="divide-y divide-line border-y border-line">
            {faqs.map(([q, a]) => (
              <details key={q} className="group py-5">
                <summary className="flex cursor-pointer items-center justify-between gap-6 text-lg font-medium text-charcoal">
                  {q}
                  <span aria-hidden className="kp-plus text-2xl text-kplor-500 transition-transform">+</span>
                </summary>
                <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ───────────────────────── 10 FINAL CTA ───────────────────────── */
export function FinalCTA() {
  return (
    <section className="on-dark relative overflow-hidden bg-kplor-900 py-28 text-white lg:py-40">
      <div className="kp-grid-dark pointer-events-none absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <Container className="relative text-center">
        <Reveal>
          <SectionLabel n="10" dark>Next step</SectionLabel>
          <h2 className="mx-auto mt-8 max-w-4xl text-4xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-6xl lg:text-7xl">
            Have knowledge that needs to become{" "}
            <span className="font-display font-normal italic text-accent">learning?</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-kplor-100">
            Show us what you already have. We&rsquo;ll show you what it can become. Free pilots available to get you started.
          </p>
          <div className="mt-10 flex justify-center">
            <DemoButton variant="dark" id="final-book-demo" />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
