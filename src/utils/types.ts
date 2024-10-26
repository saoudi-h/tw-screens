/**
 * Type representing a key-value pair where keys are of type `K` (default: `string`)
 * and values are of type `V` (default: `string`).
 */
// eslint-disable-next-line
export type KeyValuePair<K extends keyof any = string, V = string> = Record<
  K,
  V
>;

/**
 * Defines the structure of a screen configuration object used in responsive design.
 *
 * Screens can specify a `raw` CSS media query string, minimum or maximum widths, or
 * both min and max width values. Example configurations include:
 * - `{ raw: "(orientation: portrait)" }`
 * - `{ min: "768px" }`
 * - `{ max: "1024px" }`
 * - `{ min: "768px", max: "1024px" }`
 */
export type Screen =
  | { raw: string }
  | { min: string }
  | { max: string }
  | { min: string; max: string };

/**
 * Configures a set of screens for responsive breakpoints.
 * - Can be an array or readonly array of screen strings.
 * - Can also use key-value pairs where keys are labels (e.g., `sm`, `md`) and values
 *   specify either a string, `Screen` object, or nested array of screens.
 */
export type ScreensConfig =
  | string[]
  | readonly string[]
  | KeyValuePair<string, string | Screen | Screen[]>;

/**
 * Defines a flexible screen value type.
 * - Accepts a string, a `Screen` object, or an array of strings and/or `Screen` objects.
 */
export type ScreenValue = string | Screen | ReadonlyArray<string | Screen>;

/**
 * Type representing a list of dependencies, commonly used in hooks like `useEffect`
 * to specify dependencies for re-runs.
 */
export type DependencyList = unknown[];
