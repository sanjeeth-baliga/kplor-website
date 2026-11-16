"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Tab3_More } from "../../components/home/HomeContent";

function MoreInfoContent() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab")?.toLowerCase();
  const initialTab =
    tabParam === "case" || tabParam === "cases" || tabParam === "casestudies"
      ? 1
      : tabParam === "about" || tabParam === "team"
      ? 2
      : 0;

  return <Tab3_More initialTab={initialTab} />;
}

export default function MoreInfoPage() {
  return (
    <main className="bg-white text-charcoal font-sans min-h-screen">
      <div className="pt-8">
        <Suspense fallback={<Tab3_More />}>
          <MoreInfoContent />
        </Suspense>
      </div>
    </main>
  );
}
