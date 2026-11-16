"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import { FaPhoneAlt, FaCheck, FaLinkedin } from "react-icons/fa";
import { Container, DemoButton, DEMO_URL } from "./shared";
import HeroScene from "./HeroScene";
import CallbackModal from "../common/CallbackModal";

export function LogoGuide() {
  const { scrollYProgress, scrollY } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "90vh"]);
  const [scrollDir, setScrollDir] = useState(1); // 1 = down, -1 = up

  useEffect(() => {
    let lastY = 0;
    const unsubscribe = scrollY.on("change", (latest) => {
      if (latest > lastY) setScrollDir(1);
      else if (latest < lastY) setScrollDir(-1);
      lastY = latest;
    });
    return () => unsubscribe();
  }, [scrollY]);

  return (
    <div className="fixed left-2 sm:left-4 xl:left-8 top-0 bottom-0 w-12 sm:w-16 z-[100] pointer-events-none hidden sm:block">
      {/* Floating container (left-right motion + scroll tracking) */}
      <motion.div
        style={{ top: y }}
        className="absolute left-1/2 -translate-x-1/2 w-10 h-10 sm:w-12 sm:h-12 mt-20"
      >
        <motion.div
          animate={{ x: [-8, 8, -8] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="w-full h-full"
        >
          <svg viewBox="-50 -60 100 120" className="w-full h-full overflow-visible">
            <defs>
              <filter id="avatar-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <filter id="body-shadow" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#0f2a52" floodOpacity="0.3" />
              </filter>
            </defs>

            {/* Body */}
            <motion.path
              d="M-8,-15 Q0,-20 8,-15 Q25,10 25,35 Q0,45 -25,35 Q-25,10 -8,-15 Z"
              fill="#ffffff"
              stroke="#94a3b8"
              strokeWidth="1.5"
              strokeLinejoin="round"
              filter="url(#body-shadow)"
            />

            {/* Head Container (bobbing + stretching slightly to indicate motion) */}
            <motion.g
              initial={{ y: 0, scaleY: 1 }}
              animate={{
                y: scrollDir === 1 ? 4 : -4,
                scaleY: 1.05,
              }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
              <motion.g
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              >
                {/* Glowing cyan head with a clear gap from the body */}
                <circle cx="0" cy="-38" r="14" fill="#2bc4ff" filter="url(#avatar-glow)" />
                <circle cx="0" cy="-38" r="14" fill="#2bc4ff" />
              </motion.g>
            </motion.g>
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}

export function Section1_Hero() {
  const [isCallbackOpen, setIsCallbackOpen] = useState(false);

  return (
    <section className="bg-white pt-6 pb-16 sm:pt-8 lg:pt-10 lg:pb-24 overflow-hidden">
      <Container className="grid lg:grid-cols-[1fr_1fr] items-center gap-16 relative z-10">
        <div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-[76px] font-bold text-kplor-900 leading-[1.05] tracking-tight">
            Create<br />eLearning<br />courses<br /><span className="text-sky-600">in minutes</span>
          </h1>
          <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-lg">
            Kplor transforms your content into engaging, video courses, faster and at a fraction of the cost.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4 sm:gap-5">
            <DemoButton id="hero-demo" />
            <button
              id="hero-ask-call-btn"
              type="button"
              onClick={() => setIsCallbackOpen(true)}
              className="inline-flex items-center gap-2.5 rounded-full border border-kplor-300 bg-white px-6 py-3 text-sm font-semibold text-kplor-900 transition hover:border-kplor-600 hover:bg-kplor-50/70 shadow-sm hover:shadow active:scale-95"
            >
              <FaPhoneAlt className="text-xs text-kplor-600" />
              <span>Ask our team to call you</span>
            </button>
            <CallbackModal isOpen={isCallbackOpen} onClose={() => setIsCallbackOpen(false)} />
          </div>
        </div>
        <div className="relative flex flex-col items-center">
          <div className="mb-3 sm:mb-4 text-center">
            <p className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-kplor-900 leading-tight">
              <span className="text-sky-600">AI Model</span> built to generate courses
            </p>
          </div>
          <HeroScene />
        </div>
      </Container>
    </section>
  );
}

export function Section2_Credibility() {
  const logos = [
    { text: "IIM Indore" }, { text: "IIT Ropar" }, { text: "NIT Karnataka" },
    { text: "Premier EdTech" }, { text: "Global Publishers" }
  ];
  return (
    <section className="bg-slate-50 py-16 border-y border-slate-200">
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="shrink-0">
            <p className="text-sm font-bold uppercase tracking-widest text-slate-400">Trusted By</p>
            <p className="text-3xl font-bold text-kplor-900 mt-1">25+ Institutions</p>
          </div>
          <div className="flex-1 overflow-hidden flex gap-8 whitespace-nowrap">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
              className="flex gap-16 items-center"
            >
              {[...logos, ...logos, ...logos].map((l, i) => (
                <span key={i} className="text-xl font-display font-semibold text-slate-400">{l.text}</span>
              ))}
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function Section3_Different() {
  const differentiators = [
    {
      title: "Built on instructional design frameworks",
      tagline: "EVERY MODULE STARTS WITH A LEARNING GOAL",
      description:
        "Before anything is animated, we decide what your learner should be able to do by the end. Every scene is built toward that.",
      points: [
        "Quizzes placed right where each concept lands",
        "Checked by a SME before it ships",
      ],
      accentColor: "from-sky-500/20 to-blue-600/20",
      glowColor: "rgba(2, 132, 199, 0.22)",
      tagBg: "bg-sky-50 text-sky-800 border-sky-200",
    },
    {
      title: "Speed & Scale",
      tagline: "25+ HOURS OF VIDEO, GENERATED PER DAY",
      description:
        "Send us your notes, slides or recorded lectures. We turn them into a full course catalogue, with no studio or camera crew on your side.",
      points: [
        "No in-house team to hire or grow",
        "Rush timelines welcome",
      ],
      accentColor: "from-cyan-500/20 to-teal-500/20",
      glowColor: "rgba(6, 182, 212, 0.22)",
      tagBg: "bg-cyan-50 text-cyan-800 border-cyan-200",
    },
    {
      title: "90% Lower Cost",
      tagline: "STUDIO-GRADE ANIMATION, WITHOUT STUDIO BILLS",
      description:
        "Custom characters, motion graphics and explainers for a fraction of what a traditional animation studio would quote.",
      points: [
        "SCORM-ready, drops straight into your LMS",
        "Revisions included",
      ],
      accentColor: "from-indigo-500/20 to-violet-500/20",
      glowColor: "rgba(99, 102, 241, 0.22)",
      tagBg: "bg-indigo-50 text-indigo-800 border-indigo-200",
    },
  ];

  return (
    <section className="bg-white py-24 border-b border-slate-100 relative overflow-hidden">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl lg:text-4xl font-bold text-kplor-900 tracking-tight">
            How are we different?
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {differentiators.map((d, i) => (
            <div
              key={i}
              className="group relative rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02]"
            >
              {/* Glowing Blue/Cyan Ambient Light Aura Behind Card on Hover */}
              <div
                className={`absolute -inset-1 rounded-2xl bg-gradient-to-r ${d.accentColor} opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100 -z-10`}
                style={{
                  boxShadow: `0 0 35px ${d.glowColor}`,
                }}
              />

              {/* Card Surface */}
              <div className="h-full rounded-2xl border border-slate-200 bg-white p-6 lg:p-7 shadow-sm transition-all duration-300 group-hover:border-kplor-400 group-hover:shadow-[0_12px_32px_rgba(2,132,199,0.12)] flex flex-col justify-between">
                <div>
                  <h3 className="text-xl lg:text-2xl font-bold text-kplor-900 group-hover:text-kplor-700 transition-colors md:min-h-[3.5rem] lg:min-h-[4rem] flex items-start">
                    {d.title}
                  </h3>
                  <p className="mt-1.5 text-[10.5px] sm:text-[11px] xl:text-xs font-semibold uppercase tracking-wide text-kplor-600 whitespace-nowrap overflow-hidden text-ellipsis">
                    {d.tagline}
                  </p>
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                    {d.description}
                  </p>
                </div>

                <ul className="mt-5 pt-5 border-t border-slate-100 space-y-2">
                  {d.points.map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2.5 text-xs text-slate-600">
                      <FaCheck className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

const YOU_PROVIDE_ITEMS = [
  "Text Content",
  "Brand Guidelines",
  "Audience Profile",
  "Delivery Style",
];

export function Section4_HowItWorks() {
  const [isCallbackOpen, setIsCallbackOpen] = useState(false);

  return (
    <section id="how-it-works" className="bg-[#021a3b] py-24 text-white relative overflow-hidden">
      <Container>
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-white tracking-tight">
            How Kplor Works?
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-200">
            Kplor is a new Age eLearning Content Creation Studio. Share your content &amp; our team handles the end-to-end execution.
          </p>
        </div>

        {/* Two-box "You Provide" -> Animated Chevrons -> "We Deliver" Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-[280px_auto_1fr] xl:grid-cols-[310px_auto_1fr] items-stretch gap-6 lg:gap-8 max-w-5xl mx-auto">
          {/* Left Card: You Provide */}
          <div className="rounded-3xl bg-[#0b192e] border border-white/10 p-7 sm:p-8 flex flex-col justify-between shadow-2xl">
            <h3 className="text-2xl sm:text-[26px] font-bold text-white tracking-tight mb-8">
              You Provide
            </h3>

            <ul className="space-y-6 my-auto">
              {YOU_PROVIDE_ITEMS.map((item) => (
                <li key={item} className="flex items-center gap-4">
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 26 26"
                    fill="none"
                    className="shrink-0"
                    aria-hidden="true"
                  >
                    <circle cx="13" cy="13" r="11.2" stroke="#19d3f3" strokeWidth="2" />
                    <path
                      d="M8.5 13.3L11.5 16.3L17.8 9.8"
                      stroke="#19d3f3"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-base sm:text-lg font-medium text-white/95">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Middle: Sequentially Lighting Animated Chevron Arrows */}
          <div
            className="flex flex-col lg:flex-row items-center justify-center py-2 lg:py-0 px-2 lg:px-4 gap-1.5 sm:gap-2 select-none"
            aria-hidden="true"
          >
            {[0, 1, 2, 3].map((i) => (
              <motion.svg
                key={i}
                width="30"
                height="40"
                viewBox="0 0 34 44"
                fill="none"
                className="rotate-90 lg:rotate-0 shrink-0"
                animate={{
                  opacity: [0.45, 1, 0.45],
                  scale: [0.96, 1.06, 0.96],
                  filter: [
                    "drop-shadow(0 0 0px rgba(25,211,243,0))",
                    "drop-shadow(0 0 10px rgba(25,211,243,0.75))",
                    "drop-shadow(0 0 0px rgba(25,211,243,0))",
                  ],
                }}
                transition={{
                  duration: 1.4,
                  repeat: Infinity,
                  delay: i * 0.28,
                  ease: "easeInOut",
                }}
              >
                <motion.path
                  d="M 4 4 L 18 4 L 30 22 L 18 40 L 4 40 L 16 22 Z"
                  strokeWidth="2.4"
                  strokeLinejoin="round"
                  animate={{
                    fill: ["#0b192e", "#19d3f3", "#0b192e"],
                    stroke: ["rgba(25, 211, 243, 0.35)", "#22d3ee", "rgba(25, 211, 243, 0.35)"],
                  }}
                  transition={{
                    duration: 1.4,
                    repeat: Infinity,
                    delay: i * 0.28,
                    ease: "easeInOut",
                  }}
                />
              </motion.svg>
            ))}
          </div>

          {/* Right Card: We Deliver */}
          <div className="rounded-3xl bg-[#0b192e] border border-white/10 p-7 sm:p-9 shadow-2xl flex flex-col justify-between">
            <h3 className="text-2xl sm:text-[26px] font-bold text-[#19d3f3] tracking-tight mb-7">
              We Deliver
            </h3>

            {/* Top 2-column row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pb-7 border-b border-white/10">
              {/* 1. Visual Storytelling */}
              <div>
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 28 28"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M4 11.5H24V22C24 23.1046 23.1046 24 22 24H6C4.89543 24 4 23.1046 4 22V11.5Z"
                    stroke="#19d3f3"
                    strokeWidth="1.9"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4 11.5L22.5 6.5L21 2.8L3 7.8L4 11.5Z"
                    stroke="#19d3f3"
                    strokeWidth="1.9"
                    strokeLinejoin="round"
                  />
                  <path d="M8.5 6.3L10.5 9.7" stroke="#19d3f3" strokeWidth="1.8" strokeLinecap="round" />
                  <path d="M14.5 4.7L16.5 8.1" stroke="#19d3f3" strokeWidth="1.8" strokeLinecap="round" />
                  <path d="M9.5 11.5L7.5 15.5" stroke="#19d3f3" strokeWidth="1.8" strokeLinecap="round" />
                  <path d="M15.5 11.5L13.5 15.5" stroke="#19d3f3" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
                <h4 className="text-lg font-bold text-white mt-3 mb-2">
                  Visual Storytelling
                </h4>
                <ul className="space-y-1 text-sm text-slate-300/90">
                  <li>Advanced Motion Design</li>
                  <li>Character Animations</li>
                  <li>Kinetic Typography</li>
                </ul>
              </div>

              {/* 2. Presenters & Voice */}
              <div>
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 28 28"
                  fill="none"
                  aria-hidden="true"
                >
                  <rect
                    x="10.5"
                    y="3"
                    width="7"
                    height="12"
                    rx="3.5"
                    stroke="#19d3f3"
                    strokeWidth="1.9"
                  />
                  <path
                    d="M6.5 11.5C6.5 15.6421 9.85786 19 14 19C18.1421 19 21.5 15.6421 21.5 11.5"
                    stroke="#19d3f3"
                    strokeWidth="1.9"
                    strokeLinecap="round"
                  />
                  <path d="M14 19V24.5" stroke="#19d3f3" strokeWidth="1.9" strokeLinecap="round" />
                  <path d="M10 24.5H18" stroke="#19d3f3" strokeWidth="1.9" strokeLinecap="round" />
                </svg>
                <h4 className="text-lg font-bold text-white mt-3 mb-2">
                  Presenters &amp; Voice
                </h4>
                <ul className="space-y-1 text-sm text-slate-300/90">
                  <li>AI Avatars</li>
                  <li>Enhanced Instructor Videos</li>
                  <li>Voice Cloning</li>
                  <li>Immersive Soundscapes</li>
                </ul>
              </div>
            </div>

            {/* Bottom 2-column row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-7">
              {/* 3. Global Reach */}
              <div>
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 28 28"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle cx="14" cy="14" r="10.5" stroke="#19d3f3" strokeWidth="1.9" />
                  <ellipse cx="14" cy="14" rx="4.8" ry="10.5" stroke="#19d3f3" strokeWidth="1.8" />
                  <path d="M4.2 10.5H23.8" stroke="#19d3f3" strokeWidth="1.8" strokeLinecap="round" />
                  <path d="M4.2 17.5H23.8" stroke="#19d3f3" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
                <h4 className="text-lg font-bold text-white mt-3 mb-2">
                  Global Reach
                </h4>
                <ul className="space-y-1 text-sm text-slate-300/90">
                  <li>Multilingual (Screen &amp; Audio)</li>
                  <li>Dubbing</li>
                </ul>
              </div>

              {/* 4. Accuracy & LMS-Ready */}
              <div>
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 28 28"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M14 3.2L5.5 6.8V13.4C5.5 18.95 9.13 24.05 14 25.5C18.87 24.05 22.5 18.95 22.5 13.4V6.8L14 3.2Z"
                    stroke="#19d3f3"
                    strokeWidth="1.9"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10.2 14.3L12.8 16.9L18 11.4"
                    stroke="#19d3f3"
                    strokeWidth="2.1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <h4 className="text-lg font-bold text-white mt-3 mb-2">
                  Accuracy &amp; LMS-Ready
                </h4>
                <ul className="space-y-1 text-sm text-slate-300/90">
                  <li>Technical Accuracy</li>
                  <li>SCORM Compliant</li>
                  <li>Modular &amp; Precise at Scale</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <a
            href={DEMO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-base font-semibold text-[#021a3b] shadow-md transition-all hover:bg-slate-100 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
          >
            Book a Demo
          </a>
          <button
            type="button"
            onClick={() => setIsCallbackOpen(true)}
            className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3.5 text-base font-semibold text-white transition hover:bg-white/20 hover:border-white/50 backdrop-blur-sm shadow-xs"
          >
            <FaPhoneAlt className="text-xs text-cyan-200" />
            <span>Ask our team to call you</span>
          </button>
        </div>
        <CallbackModal isOpen={isCallbackOpen} onClose={() => setIsCallbackOpen(false)} />
      </Container>
    </section>
  );
}

export function Section5_Audiences() {
  const tabs = ["K-12", "Publishers", "Universities (ODL)", "EdTech", "Corporate L&D", "Marketing Teams"];
  const [active, setActive] = useState(0);

  return (
    <section className="bg-white py-24">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-kplor-900">Who can use Kplor?</h2>
          <p className="mt-4 text-lg text-slate-600">Built for teams that need to communicate complex knowledge at scale.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {tabs.map((t, i) => (
            <button
              key={t} onClick={() => setActive(i)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold border transition-all ${active === i ? "bg-kplor-900 text-white border-kplor-900" : "bg-white text-slate-600 border-slate-200 hover:border-kplor-400"
                }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="bg-slate-50 rounded-2xl p-8 lg:p-12 text-center max-w-4xl mx-auto border border-slate-100">
          <h3 className="text-2xl font-bold text-kplor-900 mb-4">{tabs[active]}</h3>
          <p className="text-slate-600 text-lg">
            {active === 0 && "Bring concepts to life with character animations and kinetic typography designed for young learners."}
            {active === 1 && "Transform static textbooks into engaging digital media packages for a modern audience."}
            {active === 2 && "Extend faculty reach with SCORM-compliant modules structured for Open and Distance Learning."}
            {active === 3 && "Scale your course catalogue rapidly without building an expensive in-house production studio."}
            {active === 4 && "Turn dry compliance manuals and internal expertise into training modules that employees actually finish."}
            {active === 5 && "Explain complex products and services with clear, instructional-led video marketing content."}
          </p>
        </div>
      </Container>
    </section>
  );
}

export interface TeamMember {
  name: string;
  role: string;
  oneLiner?: string;
  photo: string;
  linkedin?: string;
}

export const teamMembers: TeamMember[] = [
  {
    name: "Mukil",
    role: "Co-Founder & CEO",
    photo: "/mukil.jpg",
    linkedin: "https://www.linkedin.com/in/mukil-vannan-804706a5/",
  },
  {
    name: "Sanjeeth",
    role: "Co-Founder & CTO",
    photo: "/sanjeeth.jpg",
    linkedin: "https://www.linkedin.com/in/sanjeethbaliga/",
  },
  {
    name: "Bharadhwaj",
    role: "Founder's Office Associate",
    photo: "/Bharadhwaj.jpeg",
    linkedin: "https://www.linkedin.com/in/bharadhwajkrishnamoorthy/",
  },
  {
    name: "Kanishk",
    role: "Engineering I",
    photo: "/Kanishk.PNG",
  },
  {
    name: "Saniya",
    role: "Engineer I",
    photo: "/Saniya.jpeg",
  },
  {
    name: "Sneha",
    role: "Engineering I",
    photo: "/Sneha.jpeg",
  },
];

export function Tab3_More({ initialTab = 0 }: { initialTab?: number }) {
  const [active, setActive] = useState(initialTab);
  const tabs = ["FAQs", "Case Studies", "About Us"];

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash.toLowerCase();
      if (hash === "#cases" || hash === "#casestudies") {
        setActive(1);
      } else if (hash === "#about" || hash === "#team") {
        setActive(2);
      } else if (hash === "#faqs") {
        setActive(0);
      }
    }
  }, []);

  return (
    <section className="py-24 bg-white min-h-[600px]">
      <Container>
        <div className="flex flex-wrap justify-center gap-2 mb-16">
          {tabs.map((t, i) => (
            <button
              key={t} onClick={() => setActive(i)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold border transition-all ${active === i ? "bg-kplor-900 text-white border-kplor-900" : "bg-white text-slate-600 border-slate-200 hover:border-kplor-400"
                }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="max-w-4xl mx-auto">
          {active === 0 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h3 className="text-3xl font-bold text-kplor-900 mb-8 text-center">Frequently Asked Questions</h3>
              <div className="space-y-4">
                {[
                  [
                    "Can you make content in other languages?",
                    "Yes. We produce on-screen text and voiceover in multiple languages, and can dub existing modules.",
                  ],
                  [
                    "How can it cost so much less than an animation studio?",
                    "Kplor runs on its own AI model, built specifically to generate video courses. It handles the scripting, animation and voice work that a studio does by hand, so you get studio-quality modules without paying for weeks of studio hours.",
                  ],
                  [
                    "Will it work with our LMS?",
                    "Yes. Every module is SCORM compliant, so it plugs into most LMS platforms without extra work.",
                  ],
                  [
                    "How is this different from using an AI video tool myself?",
                    "Most AI video tools use diffusion models, which generate each frame from noise. That’s where the “AI slop” comes from: warped hands, garbled text and characters that change from one shot to the next. Kplor doesn’t use diffusion. It builds every scene from designed, controllable elements, so text stays sharp, diagrams stay accurate and characters stay consistent. Instructional designers then structure each module and subject-matter experts check it before it reaches your learners.",
                  ],
                  [
                    "Who is Kplor for?",
                    "Corporate L&D teams, EdTech companies & universities. That covers anyone who needs to turn training content into video courses at scale.",
                  ],
                  [
                    "Who owns the content you create?",
                    "You do. The finished modules, scripts and assets made for you belong to you.",
                  ],
                  [
                    "Is my content kept confidential?",
                    "Yes. Your material is used only to build your modules. It isn’t shared, and it isn’t used to train Kplor’s model. We’re happy to sign an NDA before you send anything. Post delivering we’ll destroy your content from our systems.",
                  ],
                  [
                    "Can I ask for changes?",
                    "Yes. You review each module before it’s final, and we revise it based on your feedback. Because Kplor builds scenes from editable elements rather than generating fixed footage, changes don’t mean starting over.",
                  ],
                  [
                    "What if I need to update a module later?",
                    "Send us what’s changed. Every scene stays editable, so we update just that part without remaking the whole module.",
                  ],
                  [
                    "How do we get started?",
                    "Book a Demo & Send us one module. We’ll turn it around so you can see the quality before committing to anything more.",
                  ],
                  [
                    "What kind of source material can Kplor work with?",
                    "Course material, slides, syllabi, PDFs, notes, research, existing recordings and expert knowledge. You don't need to restructure it first.",
                  ],
                  [
                    "Can Kplor work with existing faculty recordings?",
                    "Yes. We can turn faculty recordings into graphical explainers.",
                  ],
                ].map(([q, a], i) => (
                  <details key={i} className="group bg-slate-50 border border-slate-100 rounded-xl p-5">
                    <summary className="flex cursor-pointer items-center justify-between font-semibold text-charcoal">
                      {q}
                      <span className="text-kplor-500 text-xl group-open:rotate-45 transition-transform">+</span>
                    </summary>
                    <p className="mt-4 text-slate-600 leading-relaxed">{a}</p>
                  </details>
                ))}
              </div>
            </div>
          )}

          {active === 1 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h3 className="text-3xl font-bold text-kplor-900 mb-8 text-center">Case Studies</h3>
              <div className="grid md:grid-cols-2 gap-8">
                {[
                  { c: "University Programme", p: "Needed to convert long faculty lectures into self-paced modules.", r: "90% completion rate across 5,000 students." },
                  { c: "EdTech Platform", p: "Needed to scale their content library without hiring a huge video team.", r: "Produced 50 hours of content in 3 weeks." },
                ].map((cs, i) => (
                  <div key={i} className="bg-white border border-line rounded-2xl p-8 shadow-sm">
                    <h4 className="text-xl font-bold text-kplor-900">{cs.c}</h4>
                    <div className="mt-4 space-y-3">
                      <div>
                        <span className="text-xs font-bold uppercase text-kplor-500">Problem</span>
                        <p className="text-slate-600">{cs.p}</p>
                      </div>
                      <div>
                        <span className="text-xs font-bold uppercase text-kplor-500">Result</span>
                        <p className="text-slate-900 font-medium">{cs.r}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {active === 2 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <h3 className="text-3xl font-bold text-kplor-900 mb-3">Meet Our Team</h3>
                <p className="text-slate-600 text-base">
                  Backed by the Government of Karnataka, our team combines AI engineering with instructional design to transform eLearning worldwide.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto mb-16">
                {teamMembers.map((member, index) => (
                  <div
                    key={index}
                    className="rounded-2xl border border-slate-200 bg-white p-7 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow justify-between"
                  >
                    <div className="flex flex-col items-center w-full">
                      <div className="w-28 h-28 rounded-full overflow-hidden mb-5 border-4 border-kplor-100 shadow-md bg-slate-100 shrink-0">
                        <img
                          src={member.photo}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h4 className="text-xl font-bold text-kplor-900">{member.name}</h4>
                      <p className="text-sm font-semibold text-kplor-600 mt-1 mb-3">{member.role}</p>
                      {member.oneLiner && (
                        <p className="text-sm text-slate-600 leading-relaxed mb-4">{member.oneLiner}</p>
                      )}
                    </div>
                    {member.linkedin ? (
                      <div className="flex items-center justify-center pt-2 mt-auto">
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="grid h-10 w-10 place-items-center rounded-full bg-slate-100 text-slate-700 hover:bg-kplor-50 hover:text-kplor-600 transition"
                          aria-label={`${member.name} on LinkedIn`}
                        >
                          <FaLinkedin size={18} />
                        </a>
                      </div>
                    ) : (
                      <div className="h-4" />
                    )}
                  </div>
                ))}
              </div>

              <div className="rounded-2xl bg-gradient-to-br from-kplor-900 to-kplor-950 p-8 sm:p-10 text-center text-white max-w-2xl mx-auto shadow-lg">
                <h4 className="text-2xl sm:text-3xl font-bold mb-3">Want to join our mission?</h4>
                <p className="text-slate-300 max-w-md mx-auto mb-6 text-sm">
                  We are always looking for passionate creators, developers, and instructional designers to join us.
                </p>
                <a
                  href="https://www.linkedin.com/company/kplor/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-full bg-cyan-400 px-8 py-3.5 text-sm font-bold text-slate-950 transition hover:bg-cyan-300 hover:shadow-lg shadow-cyan-400/20"
                >
                  Join Us!
                </a>
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
