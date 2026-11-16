// src/app/videos/[slug]/ArchivedVideoDetailPage.tsx
// ARCHIVED: Standalone video detail page preserved as-is while client work is under NDA.
// To restore /videos/[slug], copy this file's contents back into ./page.tsx.
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { allVideos, getVideoBySlug, videoThumbnailUrl, videoUploadDate } from "../videoData";
import { pageMetadata } from "../../../lib/seo";
import { SITE, SITE_URL } from "../../../lib/site";
import { DemoButton } from "../../../components/home/shared";

export function generateStaticParams() {
  return allVideos.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const video = getVideoBySlug(slug);
  if (!video) return {};
  return pageMetadata({
    title: `${video.title} | ${video.categoryLabel} Explainer Video`,
    description:
      video.description ??
      `${video.title}: an AI-powered explainer video sample from Kplor.`,
    path: `/videos/${video.slug}`,
  });
}

export default async function VideoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const video = getVideoBySlug(slug);
  if (!video) notFound();

  const isReady = video.driveFileId !== "REPLACE_WITH_FILE_ID";
  const description =
    video.description ?? `${video.title}: an AI-powered explainer video sample from Kplor.`;
  const related = allVideos
    .filter((v) => v.categoryId === video.categoryId && v.id !== video.id)
    .slice(0, 6);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: video.title,
    description,
    thumbnailUrl: videoThumbnailUrl(video, 1280),
    uploadDate: videoUploadDate(video),
    embedUrl: `https://drive.google.com/file/d/${video.driveFileId}/preview`,
    url: `${SITE_URL}/videos/${video.slug}`,
    publisher: { "@type": "Organization", name: SITE.name, logo: { "@type": "ImageObject", url: SITE.logo } },
    ...(video.transcript ? { transcript: video.transcript } : {}),
  };

  return (
    <main className="min-h-screen bg-white text-charcoal">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto w-full max-w-[1000px] px-5 py-12 sm:px-8">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-500">
          <Link href="/videos" className="hover:text-kplor-600 underline-offset-4 hover:underline">
            Video Catalogue
          </Link>{" "}
          / <span>{video.categoryLabel}</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl font-bold text-kplor-900 leading-tight">{video.title}</h1>
        <p className="mt-3 text-lg text-slate-600">{description}</p>

        <div className="mt-8 aspect-video overflow-hidden rounded-2xl bg-black shadow-lg">
          {isReady ? (
            <iframe
              src={`https://drive.google.com/file/d/${video.driveFileId}/preview`}
              title={video.title}
              className="h-full w-full"
              allow="autoplay"
              allowFullScreen
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center px-6 text-center text-white/60">
              This video isn&apos;t linked up yet. Check back soon!
            </div>
          )}
        </div>

        {video.transcript && (
          <section className="mt-12">
            <h2 className="text-2xl font-semibold text-kplor-900">Transcript</h2>
            <p className="mt-4 whitespace-pre-line leading-relaxed text-slate-700">{video.transcript}</p>
          </section>
        )}

        <section className="mt-12 rounded-2xl bg-slate-50 p-8 text-center">
          <h2 className="text-2xl font-semibold text-kplor-900">
            Want videos like this from your own material?
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-slate-600">
            Kplor turns your course content, manuals and expertise into LMS-ready, SCORM-compliant explainer videos.
          </p>
          <div className="mt-6">
            <DemoButton id="video-page-demo" />
          </div>
        </section>

        {related.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-semibold text-kplor-900">More in {video.categoryLabel}</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {related.map((r) => (
                <li key={r.id}>
                  <Link
                    href={`/videos/${r.slug}`}
                    className="block rounded-xl border border-slate-200 p-4 font-medium text-kplor-700 hover:border-kplor-400 hover:bg-slate-50"
                  >
                    {r.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </main>
  );
}
