// https://github.com/kodingdotninja/use-tailwind-breakpoint/blob/main/src/utils.ts
import { useEffect, useLayoutEffect } from 'react'

// https://github.com/pmndrs/zustand/blob/833f57ed131e94f3ed48627d4cfbf09cb9c7df03/src/react.ts#L20-L23

/**
 * Determines if the code is running in a Server-Side Rendering (SSR) environment.
 * - Returns `true` when running on the server.
 * - Returns `false` when running in the browser.
 *
 * It checks for `window` existence and user-agent specifics to identify SSR contexts.
 */
export const isSSR =
    typeof window === 'undefined' ||
    !window.navigator ||
    /ServerSideRendering|^Deno\//.test(window.navigator.userAgent)

/**
 * Determines if the code is running in a browser environment.
 * - Returns `true` in browser environments.
 * - Returns `false` in SSR environments.
 */
export const isBrowser = !isSSR

/**
 * Hook that uses `useLayoutEffect` on the client and `useEffect` in SSR environments,
 * ensuring compatibility with SSR contexts.
 *
 * This approach prevents warnings and errors that occur when `useLayoutEffect` is used
 * in SSR. The hook behaves identically to `useLayoutEffect` in the browser.
 */
export const useIsomorphicEffect = isBrowser ? useLayoutEffect : useEffect
