import { renderHook } from "@testing-library/react";
import { useBreakpoint, useBreakpointReverse } from "../src/hooks";
import { describe, it, expect, vi, afterEach } from "vitest";

declare global {
  // eslint-disable-next-line
  var setScreenWidth: (width: number) => void;
}

describe("useBreakpoint", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should return true when breakpoint matches", () => {
    setScreenWidth(1200);

    const { result } = renderHook(() => useBreakpoint("1024px"));
    expect(result.current).toBe(true);
  });

  it("should return false when breakpoint does not match", () => {
    setScreenWidth(800);

    const { result } = renderHook(() => useBreakpoint("1024px"));
    expect(result.current).toBe(false);
  });

  it("should return false when reverse is true and breakpoint matches", () => {
    setScreenWidth(1200);

    const { result } = renderHook(() =>
      useBreakpoint("1024px", { reverse: true })
    );
    expect(result.current).toBe(false);
  });

  it("should return true when reverse is true and breakpoint does not match", () => {
    setScreenWidth(800);

    const { result } = renderHook(() =>
      useBreakpoint("1024px", { reverse: true })
    );
    expect(result.current).toBe(true);
  });

  it("should return true when screen width is within min and max range", () => {
    setScreenWidth(900);

    const { result } = renderHook(() =>
      useBreakpoint({ min: "768px", max: "1024px" })
    );
    expect(result.current).toBe(true);
  });

  it("should return false when screen width is outside min and max range", () => {
    setScreenWidth(1100);

    const { result } = renderHook(() =>
      useBreakpoint({ min: "768px", max: "1024px" })
    );
    expect(result.current).toBe(false);
  });

  it("should handle raw media query correctly", () => {
    setScreenWidth(768);

    const { result } = renderHook(() =>
      useBreakpoint({ raw: "(min-width: 768px)" })
    );
    expect(result.current).toBe(true);
  });

  it("should return false for raw media query that does not match", () => {
    setScreenWidth(500);

    const { result } = renderHook(() =>
      useBreakpoint({ raw: "(min-width: 768px)" })
    );
    expect(result.current).toBe(false);
  });
});

describe("useBreakpointReverse", () => {
  it("should return false when breakpoint matches", () => {
    setScreenWidth(1200);

    const { result } = renderHook(() => useBreakpointReverse("1024px"));
    expect(result.current).toBe(false);
  });

  it("should return true when breakpoint does not match", () => {
    setScreenWidth(800);

    const { result } = renderHook(() => useBreakpointReverse("1024px"));
    expect(result.current).toBe(true);
  });

  it("should return false when screen width is within min and max range", () => {
    setScreenWidth(900);

    const { result } = renderHook(() =>
      useBreakpointReverse({ min: "768px", max: "1024px" })
    );
    expect(result.current).toBe(false);
  });

  it("should return true when screen width is outside min and max range", () => {
    setScreenWidth(1100);

    const { result } = renderHook(() =>
      useBreakpointReverse({ min: "768px", max: "1024px" })
    );
    expect(result.current).toBe(true);
  });

  it("should handle raw media query correctly and return reverse value", () => {
    setScreenWidth(768);

    const { result } = renderHook(() =>
      useBreakpointReverse({ raw: "(min-width: 768px)" })
    );
    expect(result.current).toBe(false);
  });

  it("should return true for raw media query that does not match (reversed)", () => {
    setScreenWidth(500);

    const { result } = renderHook(() =>
      useBreakpointReverse({ raw: "(min-width: 768px)" })
    );
    expect(result.current).toBe(true);
  });
});

describe("Lifecycle and event listener cleanup", () => {
  it("should add event listener on mount and remove it on unmount", () => {
    const addEventListenerMock = vi.fn();
    const removeEventListenerMock = vi.fn();

    const matchMediaMock = vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      addEventListener: addEventListenerMock,
      removeEventListener: removeEventListenerMock,
    }));
    window.matchMedia = matchMediaMock;

    const { unmount } = renderHook(() => useBreakpoint("1024px"));

    expect(addEventListenerMock).toHaveBeenCalledWith(
      "change",
      expect.any(Function)
    );

    unmount();
    expect(removeEventListenerMock).toHaveBeenCalledWith(
      "change",
      expect.any(Function)
    );

    vi.restoreAllMocks();
  });
});
