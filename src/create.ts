import BreakpointManager from "./BreakpointManager";
import type { DependencyList, ScreensConfig } from "./types";
import { useIsomorphicEffect } from "./utils";
import { useMemo, useState, useCallback } from "react";

export interface UseTWScreensOptions {
  reverse?: boolean;
}

export interface CreateResult<Screens extends ScreensConfig> {
  useScreen: (
    breakpointName: Extract<keyof Screens, string>,
    options?: UseTWScreensOptions
  ) => boolean;
  useScreenReverse: (breakpointName: Extract<keyof Screens, string>) => boolean;
  useScreenEffect: (
    breakpointName: Extract<keyof Screens, string>,
    effect: (match: boolean) => void,
    deps?: DependencyList
  ) => void;
  useScreenValue: <T, U>(
    breakpointName: Extract<keyof Screens, string>,
    valid: T,
    invalid: U
  ) => T | U;
  useBreakpointManager: () => BreakpointManager<Screens>;
}

export function create<Screens extends ScreensConfig>(
  screens: Screens
): CreateResult<Screens> {
  const manager = BreakpointManager.getInstance(screens);

  type BreakpointName = Extract<keyof Screens, string>;

  const useScreen = (
    breakpointName: BreakpointName,
    options?: UseTWScreensOptions
  ): boolean => {
    const [isMatch, setIsMatch] = useState<boolean>(() =>
      manager.getBreakpointState(breakpointName)
    );

    useIsomorphicEffect(() => {
      const unsubscribe = manager.subscribe(breakpointName, setIsMatch);
      return unsubscribe;
    }, [breakpointName]);

    return options?.reverse ? !isMatch : isMatch;
  };

  const useScreenReverse = (breakpointName: BreakpointName): boolean => {
    return useScreen(breakpointName, { reverse: true });
  };

  const useScreenEffect = (
    breakpointName: BreakpointName,
    effect: (match: boolean) => void,
    deps: DependencyList = []
  ) => {
    const match = useScreen(breakpointName);
    useIsomorphicEffect(() => effect(match), [match, effect, ...deps]);
  };

  const useScreenValue = <T, U>(
    breakpointName: BreakpointName,
    valid: T,
    invalid: U
  ): T | U => {
    const match = useScreen(breakpointName);
    return useMemo(() => (match ? valid : invalid), [match, valid, invalid]);
  };

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
