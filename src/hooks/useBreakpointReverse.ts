import { ScreenValue } from '@/utils'
import { useBreakpoint } from '@/hooks'

/**
 * `useBreakpointReverse` is a React hook that checks if the current window size
 * does *not* match a specified breakpoint. Internally, it uses the `useBreakpoint`
 * hook with the `reverse` option enabled.
 *
 * @param breakpoint - The breakpoint to match, provided as a screen size value.
 * @returns `true` if the breakpoint is not matched, `false` otherwise.
 *
 * @example
 * ```typescript
 * const isMobile = useBreakpointReverse("680px");
 * const isDesktop = useBreakpointReverse({ max: "480px" });
 * const isMobile = useBreakpointReverse({ min: "480px" });
 * ```
 */
export function useBreakpointReverse(breakpoint: ScreenValue): boolean {
    return useBreakpoint(breakpoint, { reverse: true })
}
