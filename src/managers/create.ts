import type { DependencyList, ScreensConfig } from "@/utils";
import { useMemo, useState } from "react";
import { defaultScreens } from "./defaultScreens";
import { useIsomorphicEffect } from "@/utils";
import { BreakpointManager } from "./BreakpointManager";

/**
 * Options for customizing the behavior of the `useScreen` hook.
 */
export interface UseScreenOptions {
  /** If true, reverses the match result. */
  reverse?: boolean;
}

/**
 * Defines the return type of the `create` function, providing hooks for working
 * with screen breakpoints.
 *
 * @template Screens - A configuration of breakpoints.
 */
export interface CreateResult<Screens extends ScreensConfig> {
  /**
   * Determines if a specified breakpoint is currently matched.
   * @param breakpointName - The name of the breakpoint to check.
   * @param options - Options to modify the matching behavior.
   * @returns `true` if the breakpoint is matched; `false` otherwise.
   */
  useScreen: (
    breakpointName: Screens extends readonly string[]
      ? Screens[number]
      : Extract<keyof Screens, string>,
    options?: UseScreenOptions,
  ) => boolean;

  /**
   * Determines if a specified breakpoint is currently not matched.
   * @param breakpointName - The name of the breakpoint to check.
   * @returns `true` if the breakpoint is not matched; `false` otherwise.
   */
  useScreenReverse: (
    breakpointName: Screens extends readonly string[]
      ? Screens[number]
      : Extract<keyof Screens, string>,
  ) => boolean;

  /**
   * Runs an effect when a specified breakpoint is matched or not.
   * @param breakpointName - The name of the breakpoint to observe.
   * @param effect - A function to run when the match status changes.
   * @param deps - Optional dependencies to control when the effect should re-run.
   */
  useScreenEffect: (
    breakpointName: Screens extends readonly string[]
      ? Screens[number]
      : Extract<keyof Screens, string>,
    effect: (match: boolean) => void,
    deps?: DependencyList,
  ) => void;

  /**
   * Returns a specified value based on whether the breakpoint is matched or not.
   * @param breakpointName - The name of the breakpoint to check.
   * @param valid - The value returned if the breakpoint is matched.
   * @param invalid - The value returned if the breakpoint is not matched.
   * @returns Either `valid` or `invalid` based on the match state.
   */
  useScreenValue: <T, U>(
    breakpointName: Screens extends readonly string[]
      ? Screens[number]
      : Extract<keyof Screens, string>,
    valid: T,
    invalid: U,
  ) => T | U;

  /**
   * Provides access to the `BreakpointManager` instance managing the specified breakpoints.
   * @returns The singleton instance of `BreakpointManager`.
   */
  useBreakpointManager: () => BreakpointManager<Screens>;
}

/**
 * Generates a set of hooks for managing screen breakpoints.
 *
 * @template Screens - The configuration of breakpoints to manage.
 * @param screens - Optional configuration object or array of breakpoints.
 * Defaults to `defaultScreens`.
 * @returns A collection of hooks for using, observing, and managing screen breakpoints.
 */

export function create<Screens extends ScreensConfig = typeof defaultScreens>(
  // eslint-disable-next-line
  screens: Screens = defaultScreens as any,
): CreateResult<Screens> {
  const manager = BreakpointManager.getInstance(screens);

  type BreakpointName = Screens extends readonly string[]
    ? Screens[number]
    : Extract<keyof Screens, string>;

  /**
   * Hook to check if a breakpoint is matched, with optional reverse behavior.
   * @param breakpointName - The name of the breakpoint.
   * @param options - Options to customize the match behavior.
   * @returns `true` if the breakpoint is matched, `false` if not, and if reversed, opposite results.
   */
  const useScreen = (
    breakpointName: BreakpointName,
    options?: UseScreenOptions,
  ): boolean => {
    const [isMatch, setIsMatch] = useState<boolean>(() =>
      manager.getBreakpointState(breakpointName),
    );

    useIsomorphicEffect(() => {
      const unsubscribe = manager.subscribe(breakpointName, setIsMatch);
      return unsubscribe;
    }, [breakpointName]);

    return options?.reverse ? !isMatch : isMatch;
  };

  /**
   * Hook to check if a breakpoint is not matched.
   * @param breakpointName - The name of the breakpoint.
   * @returns `true` if the breakpoint is not matched; otherwise `false`.
   */
  const useScreenReverse = (breakpointName: BreakpointName): boolean => {
    return useScreen(breakpointName, { reverse: true });
  };

  /**
   * Hook to run an effect when the specified breakpoint's match status changes.
   * @param breakpointName - The name of the breakpoint.
   * @param effect - The effect to execute.
   * @param deps - Optional dependencies for the effect.
   */
  const useScreenEffect = (
    breakpointName: BreakpointName,
    effect: (match: boolean) => void,
    deps: DependencyList = [],
  ) => {
    const match = useScreen(breakpointName);
    useIsomorphicEffect(() => effect(match), [match, effect, ...deps]);
  };

  /**
   * Hook to return one of two values depending on the match state of a breakpoint.
   * @param breakpointName - The name of the breakpoint.
   * @param valid - The value to return if the breakpoint is matched.
   * @param invalid - The value to return if the breakpoint is not matched.
   * @returns Either `valid` or `invalid` based on the match state.
   */
  const useScreenValue = <T, U>(
    breakpointName: BreakpointName,
    valid: T,
    invalid: U,
  ): T | U => {
    const match = useScreen(breakpointName);
    return useMemo(() => (match ? valid : invalid), [match, valid, invalid]);
  };

  /**
   * Hook to access the `BreakpointManager` instance managing the breakpoints.
   * @returns The current instance of `BreakpointManager`.
   */
  const useBreakpointManager = (): BreakpointManager<Screens> => {
    return manager;
  };

  return {
    useScreen,
    useScreenReverse,
    useScreenEffect,
    useScreenValue,
    useBreakpointManager,
  };
}
