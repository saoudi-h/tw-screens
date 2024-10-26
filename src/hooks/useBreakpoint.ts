import React from "react";
import { ScreenValue } from "@/utils";
import { useState } from "react";
import { generateMediaQuery, useIsomorphicEffect } from "@/utils";

export interface UseBreakpointOptions {
  reverse?: boolean;
}

export function useBreakpoint(
  breakpoint: ScreenValue,
  options?: UseBreakpointOptions
): boolean {
  const [matches, setMatches] = useState<boolean>(false);

  useIsomorphicEffect(() => {
    const mediaQuery = generateMediaQuery(breakpoint);

    if (typeof window !== "undefined" && window.matchMedia) {
      const mql = window.matchMedia(mediaQuery);

      const handleChange = (event: MediaQueryListEvent) => {
        setMatches(event.matches);
      };

      setMatches(mql.matches);

      mql.addEventListener("change", handleChange);

      return () => {
        mql.removeEventListener("change", handleChange);
      };
    } else {
      setMatches(false);
      return undefined;
    }
  }, [breakpoint]);

  return options?.reverse ? !matches : matches;
}
