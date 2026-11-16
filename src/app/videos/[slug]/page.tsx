// src/app/videos/[slug]/page.tsx
// Individual sample video pages are temporarily hidden while client work is under NDA.
// Full implementation is archived in ./ArchivedVideoDetailPage.tsx.
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function VideoPage() {
  redirect("/videos");
}
