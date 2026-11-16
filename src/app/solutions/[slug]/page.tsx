// src/app/solutions/[slug]/page.tsx
// Shared template for every use-case page. Text lives in src/content/solutions.ts.
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSolution, solutions } from "../../../content/solutions";
import { pageMetadata } from "../../../lib/seo";
import { Container, DemoButton } from "../../../components/home/shared";

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = getSolution(slug);
  if (!s) return {};
  return pageMetadata({
    title: s.metaTitle,
    description: s.metaDescription,
    path: `/solutions/${s.slug}`,
  });
}

export default async function SolutionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = getSolution(slug);
  if (!s) notFound();

  const others = solutions.filter((o) => o.slug !== s.slug);

  return (
    <main className="bg-white text-charcoal">
      <section className="bg-paper py-16 lg:py-24">
        <Container>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-kplor-600">{s.audience}</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight text-kplor-900 sm:text-5xl">
            {s.h1}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate">{s.intro}</p>
          <div className="mt-8">
            <DemoButton id={`solution-${s.slug}-demo-top`} />
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-20">
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-kplor-900">
              The challenge for {s.audience} teams
            </h2>
            <ul className="mt-6 space-y-3 text-slate">
              {s.challenges.map((c) => (
                <li key={c} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-kplor-500" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-kplor-900">How Kplor helps</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {s.howKplorHelps.map(([h, t]) => (
                <div key={h} className="rounded-2xl border border-line bg-white p-6">
                  <h3 className="text-lg font-semibold text-kplor-900">{h}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate">{t}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-kplor-900 py-16 text-center text-white">
        <Container>
          <h2 className="text-3xl font-semibold tracking-tight">Ready to see it with your own content?</h2>
          <p className="mx-auto mt-3 max-w-xl text-kplor-100">
            Book a demo and we&apos;ll show you how your material becomes engaging, LMS-ready video learning.
          </p>
          <div className="mt-8">
            <DemoButton variant="dark" id={`solution-${s.slug}-demo-bottom`} />
          </div>
          <p className="mt-10 text-sm text-kplor-200">
            Also for:{" "}
            {others.map((o, i) => (
              <span key={o.slug}>
                <Link href={`/solutions/${o.slug}`} className="underline underline-offset-4 hover:text-white">
                  {o.audience}
                </Link>
                {i < others.length - 1 ? " · " : ""}
              </span>
            ))}
          </p>
        </Container>
      </section>
    </main>
  );
}
