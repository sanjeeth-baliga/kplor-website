// src/content/solutions.ts
//
// ALL TEXT FOR THE USE-CASE PAGES LIVES HERE. Edit the words below and the
// pages at /solutions/<slug> update automatically. No other file needs touching.
//
// Each entry becomes its own web page (good for Google: someone searching
// "video content for corporate training" can land directly on that page).
//
//   slug:         the URL, e.g. "corporate-training" -> kplor.com/solutions/corporate-training
//   metaTitle:    the headline Google shows in search results (keep under ~60 chars)
//   metaDescription: the snippet under it (keep under ~160 chars)
//   audience:     short label shown above the H1 and in the footer link
//   h1:           the main on-page heading
//   intro:        1-2 sentence opening paragraph
//   challenges:   problems this audience faces (bullet list)
//   howKplorHelps: [heading, text] pairs (cards)
//   videoCategoryId: which sample-video category to feature (see videos/videoData.ts)
//
// IMPORTANT: this is draft copy written from what the Kplor site already says.
// Please have the founders review it for accuracy before it goes live. Do not
// add customer names, numbers or results unless they are real and approved.

export interface Solution {
  slug: string;
  audience: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  challenges: string[];
  howKplorHelps: [string, string][];
  videoCategoryId?: string;
}

export const solutions: Solution[] = [
  {
    slug: "corporate-training",
    audience: "Corporate L&D",
    metaTitle: "Explainer Videos for Corporate Training and L&D",
    metaDescription:
      "Turn manuals, SOPs and compliance documents into engaging, SCORM-compliant training videos your employees actually finish. Built for corporate L&D teams.",
    h1: "Turn manuals and SOPs into training videos your teams actually finish",
    intro:
      "Corporate learning teams sit on valuable expertise locked in manuals, slide decks and compliance documents. Kplor transforms that raw material into structured, engaging video learning, designed around how people actually learn.",
    challenges: [
      "Dry compliance and process documents that employees skip",
      "Subject-matter experts with no time to record or script videos",
      "Slow, expensive production for every new training module",
      "Content that must fit your existing LMS and brand",
    ],
    howKplorHelps: [
      ["Start from what you have", "Share PDFs, slides, SOPs, recordings or expert know-how exactly as they are. No rewriting needed first."],
      ["Designed to be understood", "Instructional design and learner psychology shape pacing, examples and depth, so training is understood, not just watched."],
      ["Ready for your LMS", "Finished, SME-reviewed content, SCORM-compliant and ready to upload to your learning platform."],
      ["Reach every team", "Multilingual dubbing and voice cloning help you serve distributed and multilingual workforces."],
    ],
    videoCategoryId: "corporate-ld",
  },
  {
    slug: "universities-odl",
    audience: "Universities & ODL",
    metaTitle: "Video Content for Universities and Open & Distance Learning",
    metaDescription:
      "Turn faculty lectures, syllabi and course material into SCORM-compliant explainer videos for universities and open and distance learning programmes.",
    h1: "Extend your faculty's reach with LMS-ready course videos",
    intro:
      "Universities and ODL programmes need self-paced learning content at scale. Kplor converts lectures, syllabi and course material into clear, structured explainer videos that fit straight into your LMS.",
    challenges: [
      "Long faculty lectures that are hard to consume in a self-paced format",
      "Large course catalogues that need consistent, high-quality video",
      "Faculty time stretched too thin to produce video themselves",
      "The need for SCORM-compliant, LMS-ready modules",
    ],
    howKplorHelps: [
      ["Work with existing recordings", "We can turn faculty recordings and course material into graphical explainers."],
      ["Structured for learning", "Content is organised around learning objectives, with visuals that make abstract concepts concrete."],
      ["SCORM-compliant delivery", "Content is delivered LMS-ready and SCORM-compliant for Open and Distance Learning."],
      ["Built to scale", "Produce video across an entire course library without building an in-house studio."],
    ],
    videoCategoryId: "higher-ed",
  },
  {
    slug: "k12-learning-videos",
    audience: "K-12",
    metaTitle: "Animated K-12 Learning Videos for Math and Science",
    metaDescription:
      "Bring K-12 concepts to life with character animations and kinetic typography. Engaging animated explainer videos for math, science and more, built from your curriculum.",
    h1: "Animated learning videos that bring K-12 concepts to life",
    intro:
      "Young learners need explanations that are visual, paced for their level and fun to watch. Kplor turns curriculum content into animated explainer videos with character animation and kinetic typography.",
    challenges: [
      "Abstract concepts that are hard to picture from a textbook",
      "Content that must match different grade levels and prior knowledge",
      "Keeping young learners focused and engaged",
      "Producing enough video to cover a full curriculum",
    ],
    howKplorHelps: [
      ["Visual by design", "Storyboarding maps every concept to scenes and visuals before production, so ideas become concrete."],
      ["Right pace, right depth", "Pacing, examples and explanation depth are shaped by who is learning and what they already know."],
      ["Character animation and typography", "Explainers, kinetic typography and avatars keep younger audiences engaged."],
      ["Curriculum-ready", "Start from your textbooks and syllabi. We handle the structuring and production."],
    ],
    videoCategoryId: "k-12",
  },
  {
    slug: "exam-preparation-videos",
    audience: "Exam Prep (JEE, CFA & more)",
    metaTitle: "Exam Preparation Videos: JEE, CFA, IFRS and Aptitude",
    metaDescription:
      "Explainer videos for competitive exam preparation: JEE chemistry, CFA foundations, IFRS and quantitative aptitude, turned from your content into clear visuals.",
    h1: "Explainer videos for competitive exam and certification prep",
    intro:
      "Exam-prep content is dense, technical and unforgiving. Kplor turns problem sets, formulas and standards into step-by-step visual explainers for exams like JEE, CFA and aptitude tests.",
    challenges: [
      "Dense, technical topics that need step-by-step visual explanation",
      "Worked examples that are tedious to produce as video",
      "Needing accurate, subject-matter-expert-reviewed content",
      "Covering many topics and question types at scale",
    ],
    howKplorHelps: [
      ["Step-by-step explanations", "Worked problems and concepts are broken into clear visual steps."],
      ["Expert reviewed", "Every video is reviewed by subject-matter experts before delivery."],
      ["Built for scale", "Cover entire syllabi, from JEE-level chemistry to CFA and IFRS topics, without a large in-house video team."],
      ["Ready for your platform", "LMS-ready, SCORM-compliant output that drops into your existing learning platform."],
    ],
    videoCategoryId: "edtech",
  },
];

export function getSolution(slug: string) {
  return solutions.find((s) => s.slug === slug);
}
