"use client";
import { 
  LogoGuide, Section1_Hero, Section3_Different, Section4_HowItWorks, Section5_Audiences
} from "./HomeContent";
import { Proof } from "./HeroProof";

export default function HomePage() {
  return (
    <main className="bg-white text-charcoal font-sans selection:bg-kplor-200">
      <div className="animate-in fade-in duration-500">
        <LogoGuide />
        <Section1_Hero />
        <Proof />
        <Section3_Different />
        <Section4_HowItWorks />
        <Section5_Audiences />
      </div>
    </main>
  );
}
