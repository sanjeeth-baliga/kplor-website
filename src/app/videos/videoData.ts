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
// Anything left as "REPLACE_WITH_FILE_ID" will still render on the page,
// but clicking it will show a "video unavailable" state instead of a player.

export interface VideoItem {
  id: string; // unique slug, used as React key
  title: string; // display title (cleaned up from filename)
  driveFileId: string; // Google Drive file ID (see instructions above)
  durationLabel?: string; // optional, e.g. "4:32" — shown on the card if provided
}

export interface VideoCategory {
  id: string; // unique slug, used for tab filtering
  label: string; // display name for the tab/section
  description?: string; // optional one-liner under the section heading
  videos: VideoItem[];
}

export const videoCategories: VideoCategory[] = [
  {
    id: "aptitude",
    label: "Aptitude Questions",
    description: "Quant and verbal reasoning, explained step by step.",
    videos: [
      {
        id: "quant-geometry-problem",
        title: "Quant: Geometry Problem",
        driveFileId: "1UqLi2zgcBQnuHBMP3PDdwh4Ff5VhNya7",
      },
      {
        id: "verbal-sat",
        title: "Verbal SAT",
        driveFileId: "1vRhsFCbbX_q0FxCPo07hGnuNn8nkoUoT",
      },
    ],
  },
  {
    id: "finance",
    label: "Finance",
    description: "Accounting, CFA foundations, and IFRS explainers.",
    videos: [
      {
        id: "accounting-solver",
        title: "Accounting Solver",
        driveFileId: "1n0GiW4T6aFR3dS2JyizETFM9IPb9Q8oW",
      },
      {
        id: "cfa-foundation",
        title: "CFA Foundation",
        driveFileId: "1SK3BeXB23TAOAUiF6LLP44KNFBBj54LL",
      },
      {
        id: "ifrs-explainer-1",
        title: "IFRS Explainer — Sample 1",
        driveFileId: "19FyrZkkgez4-DOiyaqo-vT6E0VSfEpn5",
      },
      {
        id: "ifrs-explainer-2",
        title: "IFRS Explainer — Sample 2",
        driveFileId: "100Ja8Zd0UJbMRqIderywX5V-Fby_ppgC",
      },
      {
        id: "ifrs-explainer-3",
        title: "IFRS Explainer — Sample 3",
        driveFileId: "19BKFXhnpdqrOvz7snv9oxfALI-hw21dl",
      },
    ],
  },
  {
    id: "advanced-stem",
    label: "Advanced STEM",
    description: "IIT BHU, Module 1 — higher-level math and signals content.",
    videos: [
      {
        id: "exponential-linear-growth-model",
        title: "Concept Explainer: Exponential vs Linear Growth Model",
        driveFileId: "1V4ZJCdcsvO2EpJ0ZalAygk1lg6-htMT0",
      },
      {
        id: "correlation-stem",
        title: "Correlation (STEM)",
        driveFileId: "1IAZk86HnCPZ_qaC-kCXwWxth27Qd43f_",
      },
      {
        id: "fourier-transform",
        title: "Fourier Transform",
        driveFileId: "1_ZNQjbqMgaj_FY7B0Z89Jec4IXF5XysY",
      },
      {
        id: "z-transforms",
        title: "Z-Transforms",
        driveFileId: "1JxmiDH8y0VzVfh71EfTRnuy1aO8MJQDR",
      },
    ],
  },
    {
    id: "K-12",
    label: "K-12",
    description: "K-12 STEM content, including math and science concepts.",
    videos: [
      {
        id: "Adding-Subtracting-Money",
        title: "Adding and Subtracting Money",
        driveFileId: "1LbQuzZ_Lbd-GwGn2vP-xg89xYFRxxwRN",
      },
      {
        id: "Apple-Bounce",
        title: "Apple Bounce",
        driveFileId: "1VAppPrsF_UEYVrWbB00i7zqqxYi3cuK_",
      },
      {
        id: "Chem-Grade-10",
        title: "Chemistry - Grade 10",
        driveFileId: "1mKetTGKRIY5fj83TlsW3hZELo-LT1eTg",
      },
      {
        id: "Chem-JEE",
        title: "Chemistry - JEE",
        driveFileId: "1o0M5paUxCGtl_3Jhtf2IY3_NmLrFvEDW",
      },
            {
        id: "Divide-3-Digit-Numbers",
        title: "Divide 3-Digit Numbers by 1-Digit Numbers Without Remainders",
        driveFileId: "1b8KKYColPMm0exfnKtc0hkCYU0s5GaIm",
      },
            {
        id: "Geography-Pilot-Video",
        title: "Geography Pilot Video",
        driveFileId: "1JEQDjYEpgfNgIIxU4ysB2BKlOctEHj2Y",
      },
            {
        id: "Grade-4-Math",
        title: "Grade 4 Math",
        driveFileId: "1d6XWBEzxQsHWNAg5_J19IkGEgVCEf3yc",
      },
            {
        id: "Lab-Equipment-Scene",
        title: "Lab Equipment Scene",
        driveFileId: "1tjgWTcgb2N8PLTnCHyJTZyq8jiTCUW3U",
      },
                  {
        id: "MicroScope-Scene",
        title: "MicroScope Scene",
        driveFileId: "1AZo8C6yaWjm7wBA_8O_OVrXlDwT00xWV",
      },
                  {
        id: "Multiplication-by-2-Digit-Numbers",
        title: "Multiplication by 2-Digit Numbers",
        driveFileId: "1ZHiGrg9G-6p2HFg4P4_93aA-Sbj1qUlD",
      },
                  {
        id: "Number-Patterns",
        title: "Number Patterns",
        driveFileId: "1jq7_O8GCYIup3CPDhjYmZUAVUXWW69K9",
      },
                  {
        id: "Pizaa-Integration-Scene",
        title: "Pizaa Integration Scene",
        driveFileId: "1rGrd7F2d4XX-s-9p3DTVPWogKJRG47du",
      },
                  {
        id: "Prepositions-Scene",
        title: "Prepositions",
        driveFileId: "1yS2ZMrB76JmrwRsyIwHtdXeV2FA3v9mq",
      },
                        {
        id: "Rocket-launch-Scene",
        title: "Rocket Launch Scene",
        driveFileId: "1w0wQaDn0TP06eiOf8gRDAlhHp8WbEbyk",
      },

    ],
  },
    {
    id: "PPT-Styled-Videos",
    label: "PPT Styled Videos",
    description: "PPT styled videos for various subjects, including math and science.",
    videos: [
      {
        id: "Coding-Project-Explainer",
        title: "Coding Project Explainer",
        driveFileId: "13EEBb-2zzyacb6i-4s5ENqGt3S6eKlR5",
      },
      {
        id: "DBMS-with-mongo-DB",
        title: "DBMS with Mongo DB",
        driveFileId: "1dtI6pA7FHAuxnhGxD5AUNUsXPLcED34_",
      },
      {
        id: "Management-Concepts-Explainer",
        title: "Management Concepts Explainer",
        driveFileId: "1kEeVmntr2PZbOY6yCGqgpIO3nonrrZvt",
      },
      

    ],
  },  
{
    id: "featured",
    label: "Featured",
    description: "A quick look at Kplor before you dive into a subject.",
    videos: [
      {
        id: "brand-video",
        title: "Brand Video",
        driveFileId: "191obJ4lLaOVSHx7eXWlInwLoz-pBODmg",
      },
      {
        id: "course-intro-sample",
        title: "Course Intro Sample",
        driveFileId: "1LZwFPgqGCO14atKw10WUsEgQTgGCCuNE",
      },
    ],
  },
];