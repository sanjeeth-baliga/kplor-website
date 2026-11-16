import { pageMetadata } from "../../lib/seo";

export const metadata = pageMetadata({
  title: "About Kplor: Meet the Founders",
  description:
    "Meet the founders of Kplor, the AI-powered platform turning expert knowledge into engaging, LMS-ready video learning content.",
  path: "/about",
});

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
