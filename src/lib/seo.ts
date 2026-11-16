// src/lib/seo.ts
// Helper so every page gets a title, description, canonical URL and share preview
// consistently. Usage: export const metadata = pageMetadata({ title, description, path });
import type { Metadata } from "next";
import { SITE } from "./site";

export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
}: {
  title: string; // page title; " | Kplor" is appended automatically
  description: string;
  path: string; // e.g. "/videos"
  absoluteTitle?: boolean; // true = use the title exactly as written
}): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${SITE.name}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: SITE.name,
      title: fullTitle,
      description,
      url: path,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}
