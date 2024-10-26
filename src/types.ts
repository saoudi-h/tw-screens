import { KeyValuePair, ResolvableTo, Screen } from "tailwindcss/types/config";

export { KeyValuePair, ResolvableTo, Screen };

export type ScreensConfig = ResolvableTo<
  | string[]
  | readonly string[]
  | KeyValuePair<string, string | Screen | Screen[]>
  >;

export type ScreenValue = string | Screen | ReadonlyArray<string | Screen>;

export type DependencyList = unknown[];
