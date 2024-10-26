import { ScreenValue } from "@/utils";
import { useState } from "react";
import { generateMediaQuery, useIsomorphicEffect } from "@/utils";

/**
 * Options for the `useBreakpoint` hook to customize behavior.
 */
export interface UseBreakpointOptions {
  /**
   * When `true`, reverses the logic of the breakpoint match.
   * Default is `false`.
   */
  reverse?: boolean;
}

/**
 * React hook that checks if the current window size matches a specified breakpoint.
 *
 * @param breakpoint - The breakpoint to match, which can be a string or an object defining screen size.
 * @param options - Optional settings to reverse the matching logic.
 * @returns `true` if the breakpoint is matched, `false` otherwise. Reverses the value if `reverse` is enabled.
 *
 * @example
 * ```typescript
 * const isMediumScreen = useBreakpoint("768px");
 * const isSmallScreen = useBreakpoint({ max: "480px" });
 * const isLargeScreenInverted = useBreakpoint("1024px", { reverse: true });
 * ```
 */
export function useBreakpoint(
  breakpoint: ScreenValue,
  options?: UseBreakpointOptions,
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
