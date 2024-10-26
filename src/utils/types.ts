type KeyValuePair<K extends keyof any = string, V = string> = Record<K, V>;

export type Screen =
  | { raw: string }
  | { min: string }
  | { max: string }
  | { min: string; max: string };

export type ScreensConfig =
  | string[]
  | readonly string[]
  | KeyValuePair<string, string | Screen | Screen[]>;

export type ScreenValue = string | Screen | ReadonlyArray<string | Screen>;

export type DependencyList = unknown[];
