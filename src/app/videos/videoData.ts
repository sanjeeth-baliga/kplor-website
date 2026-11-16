// src/app/videos/videoData.ts
//
// HOW TO ADD/UPDATE A VIDEO:
// 1. Open the video's file in Google Drive.
// 2. Make sure sharing is set to "Anyone with the link" (Viewer).
// 3. Click "Share" -> "Copy link". You'll get something like:
//      https://drive.google.com/file/d/1AbCdEfGhIjKlMnOpQrStUvWxYz1234567/view?usp=sharing
// 4. Copy just the ID part (between /d/ and /view):
//      1AbCdEfGhIjKlMnOpQrStUvWxYz1234567
// 5. Paste it as the `driveFileId` below.
//
// ─── SEO TEXT (edit these freely) ─────────────────────────────────────────
// Every video gets its own page at /videos/<id in lowercase>, which Google can
// index. Two fields feed that page:
//   description: 1-2 sentences about the video. Shown on the page, used in the
//                search-result snippet and in the thumbnail's alt text.
//   transcript:  OPTIONAL. Paste the narration text here and a "Transcript"
//                section appears on that video's page. Leave it out/empty and
//                the section is simply hidden.
//   uploadDate:  OPTIONAL, "YYYY-MM-DD". Falls back to a default in src/lib/site.ts.

import { DEFAULT_VIDEO_UPLOAD_DATE } from "../../lib/site";

export interface VideoItem {
  id: string; // unique slug, used as React key and in the page URL (lowercased)
  title: string; // display title (cleaned up from filename)
  driveFileId: string; // Google Drive file ID (see instructions above)
  description?: string; // 1-2 sentences, used for SEO (see above)
  transcript?: string; // optional narration text (see above)
  uploadDate?: string; // optional YYYY-MM-DD
  durationLabel?: string; // optional, e.g. "4:32", shown on the card if provided
}

export interface VideoCategory {
  id: string; // unique slug, used for tab filtering
  label: string; // display name for the tab/section
  description?: string; // optional one-liner under the section heading
  videos: VideoItem[];
}

export const videoCategories: VideoCategory[] = [
  // 1. K-12
  {
    id: "k-12",
    label: "K-12",
    description: "Foundational primary and secondary school mathematics, physics, and science explainers.",
    videos: [
      {
        id: "Adding-Subtracting-Money",
        title: "Adding and Subtracting Money",
        driveFileId: "1LbQuzZ_Lbd-GwGn2vP-xg89xYFRxxwRN",
        description: "A K-12 math video teaching how to add and subtract money amounts using friendly animated examples.",
      },
      {
        id: "Apple-Bounce",
        title: "Apple Bounce Physics",
        driveFileId: "1VAppPrsF_UEYVrWbB00i7zqqxYi3cuK_",
        description: "An animated science scene that uses a bouncing apple to explain a physics concept to school learners.",
      },
      {
        id: "Chem-Grade-10",
        title: "Chemistry - Grade 10",
        driveFileId: "1mKetTGKRIY5fj83TlsW3hZELo-LT1eTg",
        description: "A Grade 10 chemistry explainer video that turns a textbook concept into a clear animated lesson.",
      },
      {
        id: "Chem-JEE",
        title: "Chemistry - JEE",
        driveFileId: "1o0M5paUxCGtl_3Jhtf2IY3_NmLrFvEDW",
        description: "A JEE-level chemistry explainer video showing how Kplor handles competitive exam content.",
      },
      {
        id: "Divide-3-Digit-Numbers",
        title: "Divide 3-Digit Numbers by 1-Digit Numbers",
        driveFileId: "1b8KKYColPMm0exfnKtc0hkCYU0s5GaIm",
        description: "A primary math video explaining how to divide 3-digit numbers by 1-digit numbers without remainders.",
      },
      {
        id: "Geography-Pilot-Video",
        title: "Geography Pilot Video",
        driveFileId: "1JEQDjYEpgfNgIIxU4ysB2BKlOctEHj2Y",
        description: "A pilot geography video that shows how Kplor brings maps and places to life for school learners.",
      },
      {
        id: "Grade-4-Math",
        title: "Grade 4 Math",
        driveFileId: "1d6XWBEzxQsHWNAg5_J19IkGEgVCEf3yc",
        description: "A Grade 4 math lesson presented as an engaging animated explainer video.",
      },
      {
        id: "Lab-Equipment-Scene",
        title: "Lab Equipment Scene",
        driveFileId: "1tjgWTcgb2N8PLTnCHyJTZyq8jiTCUW3U",
        description: "An animated scene introducing common laboratory equipment for school science learners.",
      },
      {
        id: "MicroScope-Scene",
        title: "Microscope Scene",
        driveFileId: "1AZo8C6yaWjm7wBA_8O_OVrXlDwT00xWV",
        description: "An animated scene explaining the parts and use of a microscope for school science.",
      },
      {
        id: "Multiplication-by-2-Digit-Numbers",
        title: "Multiplication by 2-Digit Numbers",
        driveFileId: "1ZHiGrg9G-6p2HFg4P4_93aA-Sbj1qUlD",
        description: "A primary math video explaining multiplication by 2-digit numbers step by step.",
      },
      {
        id: "Number-Patterns",
        title: "Number Patterns",
        driveFileId: "1jq7_O8GCYIup3CPDhjYmZUAVUXWW69K9",
        description: "An animated math video introducing number patterns to young learners.",
      },
      {
        id: "Pizaa-Integration-Scene",
        title: "Pizza Integration Scene",
        driveFileId: "1rGrd7F2d4XX-s-9p3DTVPWogKJRG47du",
        description: "A creative animated scene that uses pizza to explain the idea of integration in calculus.",
      },
      {
        id: "Prepositions-Scene",
        title: "Prepositions in English",
        driveFileId: "1yS2ZMrB76JmrwRsyIwHtdXeV2FA3v9mq",
        description: "An animated English grammar video teaching prepositions with simple visual examples.",
      },
      {
        id: "Rocket-launch-Scene",
        title: "Rocket Launch Physics",
        driveFileId: "1w0wQaDn0TP06eiOf8gRDAlhHp8WbEbyk",
        description: "An animated rocket launch scene used to explain science and propulsion concepts to school learners.",
      },
    ],
  },

  // 2. Higher Ed & University ODL Programs
  {
    id: "higher-ed",
    label: "Higher Ed & University ODL Programs",
    description: "Advanced STEM coursework, signal systems, mathematical modeling, and semester curricula designed for universities and open & distance learning.",
    videos: [
      {
        id: "exponential-linear-growth-model",
        title: "Exponential vs Linear Growth Models",
        driveFileId: "1V4ZJCdcsvO2EpJ0ZalAygk1lg6-htMT0",
        description: "A concept explainer comparing exponential and linear growth models with animated graphs and real-world data points.",
      },
      {
        id: "correlation-stem",
        title: "Correlation Analysis (STEM)",
        driveFileId: "1IAZk86HnCPZ_qaC-kCXwWxth27Qd43f_",
        description: "An animated STEM explainer on correlation, scatter plots, and statistical significance for university learners.",
      },
      {
        id: "fourier-transform",
        title: "Fourier Transform & Frequency Analysis",
        driveFileId: "1_ZNQjbqMgaj_FY7B0Z89Jec4IXF5XysY",
        description: "A visual explanation of the continuous and discrete Fourier Transform for engineering and signal processing students.",
      },
      {
        id: "z-transforms",
        title: "Z-Transforms in Discrete Systems",
        driveFileId: "1JxmiDH8y0VzVfh71EfTRnuy1aO8MJQDR",
        description: "An animated introduction to Z-Transforms, region of convergence (ROC), and discrete-time system analysis.",
      },
    ],
  },

  // 3. Faculty & Instructor-Led Videos
  {
    id: "faculty-led",
    label: "Faculty & Instructor-Led Videos",
    description: "Modules featuring instructor presence, guided visual walk-throughs, and academic lectures transformed into animated, engaging explainers.",
    videos: [
      {
        id: "course-intro-sample",
        title: "Faculty Course Intro Sample",
        driveFileId: "1LZwFPgqGCO14atKw10WUsEgQTgGCCuNE",
        description: "A sample course introduction showing how Kplor transforms faculty lecture introductions into polished, engaging multimedia.",
      },
      {
        id: "brand-video",
        title: "Faculty Lecture Visualizer & Overview",
        driveFileId: "191obJ4lLaOVSHx7eXWlInwLoz-pBODmg",
        description: "Demonstrating how raw faculty audio, slide decks, and whiteboard notes are enhanced into high-retention graphical explainers.",
      },
    ],
  },

  // 4. Corporate L&D
  {
    id: "corporate-ld",
    label: "Corporate L&D",
    description: "Enterprise workforce training, standard operating procedures, and professional skills modules built for corporate learning and development.",
    videos: [
      {
        id: "corporate-management-concepts",
        title: "Corporate Management Concepts & Strategy",
        driveFileId: "1kEeVmntr2PZbOY6yCGqgpIO3nonrrZvt",
        description: "An enterprise training module covering core management frameworks, team operations, and workplace execution.",
      },
      {
        id: "enterprise-technical-onboarding",
        title: "Technical Onboarding: Full-Stack Project Walkthrough",
        driveFileId: "13EEBb-2zzyacb6i-4s5ENqGt3S6eKlR5",
        description: "A technical onboarding explainer walking engineering teams through architecture specifications and project execution workflows.",
      },
      {
        id: "database-systems-training",
        title: "Modern Database Management Systems (DBMS)",
        driveFileId: "1dtI6pA7FHAuxnhGxD5AUNUsXPLcED34_",
        description: "An enterprise technical training module demonstrating database schema concepts, MongoDB structures, and query optimization.",
      },
    ],
  },

  // 5. EdTech
  {
    id: "edtech",
    label: "EdTech",
    description: "Aptitude reasoning, CFA finance foundations, and international accounting standards (IFRS) broken down into structured, high-retention visual lessons.",
    videos: [
      {
        id: "quant-geometry-problem",
        title: "Quant: Geometry Problem",
        driveFileId: "1UqLi2zgcBQnuHBMP3PDdwh4Ff5VhNya7",
        description: "A step-by-step animated walkthrough of a quantitative aptitude geometry problem, built to show how Kplor explains problem-solving visually.",
      },
      {
        id: "verbal-sat",
        title: "Verbal SAT Reasoning",
        driveFileId: "1vRhsFCbbX_q0FxCPo07hGnuNn8nkoUoT",
        description: "An animated explainer for a SAT verbal reasoning question, breaking down evidence extraction and answer elimination.",
      },
      {
        id: "cfa-foundation",
        title: "CFA Foundation: Financial Principles",
        driveFileId: "1SK3BeXB23TAOAUiF6LLP44KNFBBj54LL",
        description: "A foundation-level explainer video for CFA exam preparation, turning complex finance concepts into easy-to-follow visual models.",
      },
      {
        id: "accounting-solver",
        title: "Financial Accounting Problem Solver",
        driveFileId: "1n0GiW4T6aFR3dS2JyizETFM9IPb9Q8oW",
        description: "An animated accounting problem solved step by step, showing how Kplor turns numerical worked examples into clear ledger visuals.",
      },
      {
        id: "ifrs-explainer-1",
        title: "IFRS Explainer - Revenue Recognition",
        driveFileId: "19FyrZkkgez4-DOiyaqo-vT6E0VSfEpn5",
        description: "A sample explainer video on IFRS (International Financial Reporting Standards), simplifying accounting standards for learners.",
      },
      {
        id: "ifrs-explainer-2",
        title: "IFRS Explainer - Asset Valuation",
        driveFileId: "100Ja8Zd0UJbMRqIderywX5V-Fby_ppgC",
        description: "A second sample explainer video on IFRS topics, showing how Kplor presents dense financial reporting content visually.",
      },
      {
        id: "ifrs-explainer-3",
        title: "IFRS Explainer - Leases & Liabilities",
        driveFileId: "19BKFXhnpdqrOvz7snv9oxfALI-hw21dl",
        description: "A third sample explainer video on IFRS topics, part of Kplor's finance and corporate accounting video series.",
      },
    ],
  },
];

// ─── helpers (no need to edit below this line) ───────────────────────────

export interface VideoWithCategory extends VideoItem {
  slug: string;
  categoryId: string;
  categoryLabel: string;
}

export const allVideos: VideoWithCategory[] = videoCategories.flatMap((c) =>
  c.videos.map((v) => ({
    ...v,
    slug: v.id.toLowerCase(),
    categoryId: c.id,
    categoryLabel: c.label,
  }))
);

export function getVideoBySlug(slug: string): VideoWithCategory | undefined {
  return allVideos.find((v) => v.slug === slug.toLowerCase());
}

export function videoThumbnailUrl(v: Pick<VideoItem, "driveFileId">, width = 640) {
  return `https://drive.google.com/thumbnail?id=${v.driveFileId}&sz=w${width}`;
}

export function videoUploadDate(v: Pick<VideoItem, "uploadDate">) {
  return v.uploadDate ?? DEFAULT_VIDEO_UPLOAD_DATE;
}