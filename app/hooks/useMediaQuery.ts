"use client";

import { useEffect, useState } from "react";

/**
 * Returns true when the viewport width is below the given breakpoint.
 * Defaults to 1024px (lg breakpoint).
 *
 * Replaces the repeated useState + useEffect + resize listener pattern
 * found previously in GalleryPreview, AboutSection, and ServicesSection.
 */
export function useIsMobile(breakpoint = 1024): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);

  return isMobile;
}
