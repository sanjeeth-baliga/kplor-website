import { pageMetadata } from "../../lib/seo";

export const metadata = pageMetadata({
  title: "Video Catalogue: AI Explainer Video Samples for Learning",
  description:
    "Browse Kplor sample explainer videos across K-12, aptitude, finance (CFA, IFRS), advanced STEM and PPT-style learning content, each built from text and course material.",
  path: "/videos",
});

export default function VideosLayout({ children }: { children: React.ReactNode }) {
  return children;
}
