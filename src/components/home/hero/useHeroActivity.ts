"use client";
import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

export function useHeroActivity() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const isInView = useInView(containerRef, {
    margin: "100px 0px 100px 0px",
  });

  const [isTabVisible, setIsTabVisible] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined" && window.matchMedia) {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mq.matches);
      const handleMqChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      mq.addEventListener("change", handleMqChange);

      const handleVisibilityChange = () => {
        setIsTabVisible(document.visibilityState === "visible");
      };
      document.addEventListener("visibilitychange", handleVisibilityChange);

      return () => {
        mq.removeEventListener("change", handleMqChange);
        document.removeEventListener("visibilitychange", handleVisibilityChange);
      };
    }
  }, []);

  const isActive = mounted ? (isInView && isTabVisible && !prefersReducedMotion) : true;
  const isStill = mounted ? (prefersReducedMotion || !isInView || !isTabVisible) : false;

  return {
    containerRef,
    isActive,
    isStill,
    prefersReducedMotion,
  };
}
