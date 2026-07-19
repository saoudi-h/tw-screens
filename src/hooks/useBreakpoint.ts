import type { ScreenValue } from '@/utils'
import { useCallback, useMemo, useSyncExternalStore } from 'react'
import { generateMediaQuery } from '@/utils'

/**
 * Options for the `useBreakpoint` hook to customize behavior.
 */
export interface UseBreakpointOptions {
    /**
     * When `true`, reverses the logic of the breakpoint match.
     * Default is `false`.
     */
    reverse?: boolean
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
 * const isMobile = useBreakpoint("680px", { reverse: true });
 * const isXS = useBreakpointReverse("480px");
 * const isLandscape = useBreakpointReverse({ raw: "(orientation: landscape)" });
 * ```
 */
export function useBreakpoint(breakpoint: ScreenValue, options?: UseBreakpointOptions): boolean {
    const mediaQuery = useMemo(() => generateMediaQuery(breakpoint), [breakpoint])

    const subscribe = useCallback(
        (callback: () => void) => {
            if (typeof window === 'undefined') return () => {}
            const mql = window.matchMedia(mediaQuery)
            mql.addEventListener('change', callback)
            return () => mql.removeEventListener('change', callback)
        },
        [mediaQuery]
    )

    const getSnapshot = useCallback(() => {
        if (typeof window === 'undefined') return false
        return window.matchMedia(mediaQuery).matches
    }, [mediaQuery])

    const matches = useSyncExternalStore(
        subscribe,
        getSnapshot,
        () => false // Server snapshot
    )

    return options?.reverse ? !matches : matches
}
