import type { ScreenValue } from "./types";

const unitRegex = /^\s*\d+(\.\d+)?(px|em|rem|vh|vw)\s*$/;

/**
 * Custom error class for errors related to media query generation.
 */
export class MediaQueryError extends Error {
  /**
   * @param message - A description of the error.
   * @param input - The value that caused the error.
   */
  constructor(message: string, public input?: unknown) {
    super(message);
    this.name = "MediaQueryError";
  }
}

/**
 * Generates a CSS media query based on a provided screen value.
 *
 * @param screenValue - The screen value to generate the query for.
 * This can be a string, an object with `raw`, `min`, or `max` properties,
 * or an array of screen values.
 * @returns A string containing the generated media query.
 * @throws `MediaQueryError` if the screen value is invalid.
 *
 * The function handles three main types of input:
 * - **String**: A simple media query with a min-width.
 * - **Array**: A combined query where each entry is a separate query.
 * - **Object**: An object that can define complex queries using properties
 *   like `raw`, `min`, and `max`.
 *
 * ### Examples:
 * ```typescript
 * generateMediaQuery("768px"); // Returns "(min-width: 768px)"
 * generateMediaQuery({ min: "640px", max: "1024px" }); // Returns "(min-width: 640px) and (max-width: 1024px)"
 * ```
 */
export function generateMediaQuery(screenValue: ScreenValue): string {
  try {
    if (screenValue == null) {
      throw new MediaQueryError(
        "Screen value cannot be null or undefined",
        screenValue
      );
    }

    // Handle string input
    if (typeof screenValue === "string") {
      if (!screenValue.trim()) {
        throw new MediaQueryError("Screen value cannot be an empty string");
      }
      if (!unitRegex.test(screenValue)) {
        throw new MediaQueryError(
          "Invalid unit format. Must end with px, em, rem, vh, or vw",
          screenValue
        );
      }
      return `(min-width: ${screenValue})`;
    }

    // Handle array input
    if (Array.isArray(screenValue)) {
      if (screenValue.length === 0) {
        throw new MediaQueryError("Screen array cannot be empty");
      }
      const queries = screenValue.map((value) => {
        if (value == null) {
          throw new MediaQueryError("Array contains null or undefined value");
        }
        return generateMediaQuery(value);
      });
      return queries.join(", ");
    }

    // Handle object input with "raw", "min", or "max" properties
    if (typeof screenValue === "object") {
      const conditions: string[] = [];
      const validProperties = new Set(["raw", "min", "max"]);

      const hasValidProperty = Object.keys(screenValue).some((key) =>
        validProperties.has(key)
      );
      if (!hasValidProperty) {
        throw new MediaQueryError(
          "Screen object must contain at least one valid property (raw, min, or max)",
          screenValue
        );
      }

      if ("raw" in screenValue && screenValue.raw != null) {
        if (typeof screenValue.raw !== "string") {
          throw new MediaQueryError(
            "Raw value must be a string",
            screenValue.raw
          );
        }
        if (screenValue.raw.trim()) {
          conditions.push(screenValue.raw.trim());
        }
      }

      if ("min" in screenValue && screenValue.min != null) {
        if (typeof screenValue.min !== "string") {
          throw new MediaQueryError(
            "Min value must be a string",
            screenValue.min
          );
        }
        if (!unitRegex.test(screenValue.min)) {
          throw new MediaQueryError(
            "Invalid min unit format. Must end with px, em, rem, vh, or vw",
            screenValue.min
          );
        }
        conditions.push(`(min-width: ${screenValue.min})`);
      }

      if ("max" in screenValue && screenValue.max != null) {
        if (typeof screenValue.max !== "string") {
          throw new MediaQueryError(
            "Max value must be a string",
            screenValue.max
          );
        }
        if (!unitRegex.test(screenValue.max)) {
          throw new MediaQueryError(
            "Invalid max unit format. Must end with px, em, rem, vh, or vw",
            screenValue.max
          );
        }
        conditions.push(`(max-width: ${screenValue.max})`);
      }

      if (conditions.length === 0) {
        throw new MediaQueryError(
          "No valid conditions found in screen object",
          screenValue
        );
      }

      return conditions.join(" and ");
    }

    throw new MediaQueryError("Invalid screen value type", screenValue);
  } catch (error) {
    if (error instanceof MediaQueryError) {
      throw error;
    }
    throw new MediaQueryError(
      "Unexpected error while generating media query",
      screenValue
    );
  }
}
