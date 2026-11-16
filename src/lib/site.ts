// src/lib/site.ts
//
// SINGLE PLACE for company facts used in SEO (page titles, sharing previews,
// Google's structured data, sitemap). Edit here and every page updates.

export const SITE_URL = "https://www.kplor.com";

export const SITE = {
  name: "Kplor",
  legalName: "MindShift Labs Private Limited",
  // Shown in Google results / link previews for the homepage.
  title: "Kplor | Turn Text and Manuals into AI Explainer Videos for Learning",
  description:
    "Kplor turns course material, manuals and expert knowledge into engaging, LMS-ready, SCORM-compliant explainer videos for universities, EdTech, publishers and corporate L&D, designed around instructional design and learner psychology.",
  email: "info@kplor.com",
  logo: `${SITE_URL}/Kplor_logo.png`,
  // Used as the "sameAs" list in Google's company data. Add/remove freely.
  socials: [
    { label: "LinkedIn", url: "https://www.linkedin.com/company/kplor/" },
    { label: "X (Twitter)", url: "https://x.com/kplor_ai" },
    { label: "YouTube", url: "https://www.youtube.com/@KplorAI" },
    { label: "Instagram", url: "https://www.instagram.com/kplor_tutor" },
  ],
};

// Google asks for an upload date on every video page. This is a placeholder
// default; set `uploadDate` on an individual video in videoData.ts to override.
export const DEFAULT_VIDEO_UPLOAD_DATE = "2025-01-01";
