import { describe, it, expect } from "vitest";
import type { Screen } from "@/utils";
import { generateMediaQuery, MediaQueryError } from "@/utils";

describe("generateMediaQuery", () => {
  it("should generate a media query for a valid string", () => {
    expect(generateMediaQuery("768px")).toBe("(min-width: 768px)");
    expect(generateMediaQuery("1.5em")).toBe("(min-width: 1.5em)");
    expect(generateMediaQuery("100vh")).toBe("(min-width: 100vh)");
  });

  it("should throw an error for an invalid string", () => {
    expect(() => generateMediaQuery("768")).toThrow(MediaQueryError);
    expect(() => generateMediaQuery("")).toThrow(MediaQueryError);
    expect(() => generateMediaQuery("100pixels")).toThrow(MediaQueryError);
  });

  it("should generate a media query for a valid array of strings", () => {
    const screens = ["768px", "1024px"] as const;
    expect(generateMediaQuery(screens)).toBe(
      "(min-width: 768px), (min-width: 1024px)",
    );
  });

  it("should generate a media query for a valid array of Screen objects", () => {
    const screens: Screen[] = [
      { min: "768px" },
      { max: "1024px" },
      { min: "768px", max: "1024px" },
    ];
    expect(generateMediaQuery(screens)).toBe(
      "(min-width: 768px), (max-width: 1024px), (min-width: 768px) and (max-width: 1024px)",
    );
  });

  it("should throw an error for an empty array", () => {
    expect(() => generateMediaQuery([])).toThrow(MediaQueryError);
  });

  it("should throw an error if the array contains null or undefined", () => {
    // @ts-expect-error (function () => generateMediaQuery(["768px", null]) should throw an error)
    expect(() => generateMediaQuery(["768px", null])).toThrow(MediaQueryError);
    // @ts-expect-error (function () => generateMediaQuery([undefined, "1024px"]) should throw an error)
    expect(() => generateMediaQuery([undefined, "1024px"])).toThrow(
      MediaQueryError,
    );
  });

  it("should generate a media query for an object with raw property", () => {
    const screen: Screen = { raw: "screen and (min-width: 768px)" };
    expect(generateMediaQuery(screen)).toBe("screen and (min-width: 768px)");
  });

  it("should generate a media query for an object with min and max properties", () => {
    const screen: Screen = { min: "768px", max: "1024px" };
    expect(generateMediaQuery(screen)).toBe(
      "(min-width: 768px) and (max-width: 1024px)",
    );
  });

  it("should generate a media query for an object with min property only", () => {
    const screen: Screen = { min: "768px" };
    expect(generateMediaQuery(screen)).toBe("(min-width: 768px)");
  });

  it("should generate a media query for an object with max property only", () => {
    const screen: Screen = { max: "1024px" };
    expect(generateMediaQuery(screen)).toBe("(max-width: 1024px)");
  });

  it("should throw an error for an object with invalid properties", () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const screen: any = { foo: "bar" };
    expect(() => generateMediaQuery(screen)).toThrow(MediaQueryError);
  });

  it("should throw an error for an object with invalid min or max values", () => {
    const screen1: Screen = { min: "768" };
    const screen2: Screen = { max: "1024pixels" };
    expect(() => generateMediaQuery(screen1)).toThrow(MediaQueryError);
    expect(() => generateMediaQuery(screen2)).toThrow(MediaQueryError);
  });

  it("should throw an error for unsupported types", () => {
    // @ts-expect-error (function () => generateMediaQuery(123) should throw an error)
    expect(() => generateMediaQuery(123)).toThrow(MediaQueryError);
    // @ts-expect-error (function () => generateMediaQuery(null) should throw an error)
    expect(() => generateMediaQuery(null)).toThrow(MediaQueryError);
    // @ts-expect-error (function () => generateMediaQuery(undefined) should throw an error)
    expect(() => generateMediaQuery(undefined)).toThrow(MediaQueryError);
  });

  it("should throw a MediaQueryError if an unexpected error occurs", () => {
    const originalUnitRegex = RegExp.prototype.test;
    RegExp.prototype.test = () => {
      throw new Error("Unexpected error");
    };

    expect(() => generateMediaQuery("768px")).toThrow(MediaQueryError);
    RegExp.prototype.test = originalUnitRegex;
  });
});
