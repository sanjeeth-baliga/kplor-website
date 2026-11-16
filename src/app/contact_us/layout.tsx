import { pageMetadata } from "../../lib/seo";

export const metadata = pageMetadata({
  title: "Contact Us",
  description:
    "Get in touch with Kplor to discuss turning your course material, manuals or expertise into AI-powered, LMS-ready explainer videos.",
  path: "/contact_us",
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
