import HomePage from "../components/home/HomePage";
import { pageMetadata } from "../lib/seo";
import { SITE } from "../lib/site";

export const metadata = pageMetadata({
  title: SITE.title,
  description: SITE.description,
  path: "/",
  absoluteTitle: true,
});

export default function Home() {
  return <HomePage />;
}
