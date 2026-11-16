"use client";
// src/components/home/hero/motion.tsx
//
// Shared "still mode" helpers for the hero animation.
//
// `still` is true when the visitor prefers reduced motion OR the hero is
// scrolled out of view / the tab is hidden. In still mode nothing loops, which
// is what keeps the hero cheap and accessible.
import { createContext, useContext } from "react";
import type { MotionProps, TargetAndTransition, Transition } from "framer-motion";

export const StillCtx = createContext(false);
export const useStill = () => useContext(StillCtx);

type LoopProps = Pick<MotionProps, "animate" | "transition">;

/** Returns props for an infinite loop, or nothing at all when still. */
export function loopFor(still: boolean) {
  return (animate: TargetAndTransition, transition: Transition = {}): LoopProps =>
    still ? {} : { animate, transition: { repeat: Infinity, ...transition } };
}

export function useLoop() {
  return loopFor(useStill());
}
