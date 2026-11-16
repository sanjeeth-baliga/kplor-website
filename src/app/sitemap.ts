import type { MetadataRoute } from "next";
import { SITE_URL } from "../lib/site";
// import { allVideos } from "./videos/videoData";
// import { solutions } from "../content/solutions";

// Auto-generated list of pages for Google. Solutions & individual sample videos
// are temporarily excluded while hidden / under NDA.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPages = [
    { path: "/", priority: 1 },
    { path: "/videos", priority: 0.8 },
    { path: "/more-info", priority: 0.7 },
    { path: "/about", priority: 0.6 },
    { path: "/contact_us", priority: 0.6 },
    { path: "/privacy-policy", priority: 0.2 },
    { path: "/terms-and-conditions", priority: 0.2 },
  ];

  return [
    ...staticPages.map((p) => ({
      url: `${SITE_URL}${p.path}`,
      lastModified: now,
      priority: p.priority,
    })),
    // Re-enable when solutions & sample video pages are public again:
    // ...solutions.map((s) => ({
    //   url: `${SITE_URL}/solutions/${s.slug}`,
    //   lastModified: now,
    //   priority: 0.8,
    // })),
    // ...allVideos.map((v) => ({
    //   url: `${SITE_URL}/videos/${v.slug}`,
    //   lastModified: now,
    //   priority: 0.5,
    // })),
  ];
}
