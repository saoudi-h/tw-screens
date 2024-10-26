import React from "react";
import { ScreenValue } from "@/utils";
import { useBreakpoint } from "@/hooks";

export function useBreakpointReverse(breakpoint: ScreenValue): boolean {
  return useBreakpoint(breakpoint, { reverse: true });
}
