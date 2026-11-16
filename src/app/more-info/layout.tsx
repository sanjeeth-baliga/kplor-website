import { pageMetadata } from "../../lib/seo";

export const metadata = pageMetadata({
  title: "FAQs, Case Studies and Team",
  description:
    "Answers to common questions about Kplor, case studies from universities and EdTech platforms, and the team behind our AI-powered, LMS-ready learning content.",
  path: "/more-info",
});

export default function MoreInfoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
