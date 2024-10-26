import { renderHook, act } from "@testing-library/react";
import { create } from "./create";
import { describe, it, expect, vi } from "vitest";
import BreakpointManager from "./BreakpointManager";

declare global {
  var setScreenWidth: (width: number) => void;
}

const screens = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  custom: { min: "640px", max: "768px" },
} as const;

const {
  useScreen,
  useScreenReverse,
  useScreenEffect,
  useScreenValue,
  useBreakpointManager,
} = create(screens);

afterEach(() => {
  BreakpointManager.instances.clear();
});

beforeEach(() => {
  setScreenWidth(1024);
});

describe("useScreen", () => {
  it("should return true when screen matches the breakpoint", async () => {
    setScreenWidth(800);

    const { result } = renderHook(() => useScreen("md"));

    expect(result.current).toBe(true);
  });

  it("should return false when screen does not match the breakpoint", async () => {
    setScreenWidth(700);

    const { result } = renderHook(() => useScreen("md"));

    expect(result.current).toBe(false);
  });
});

describe("useScreenReverse", () => {
  it("should return the reverse value of useScreen", () => {
    act(() => {
      setScreenWidth(1100);
    });

    const { result } = renderHook(() => useScreenReverse("lg"));

    expect(result.current).toBe(false);
  });

  it("should return true when screen does not match the breakpoint", async () => {
    setScreenWidth(900);

    const { result } = renderHook(() => useScreenReverse("lg"));

      expect(result.current).toBe(true);
  });
});

describe("useScreenEffect", () => {
  it("should call effect with correct match value when screen matches", () => {
    const effect = vi.fn();

    act(() => {
      setScreenWidth(800);
    });

    renderHook(() => useScreenEffect("md", effect));

    expect(effect).toHaveBeenCalledWith(true);
  });

  it("should call effect with correct match value when screen does not match", () => {
    const effect = vi.fn();

    act(() => {
      setScreenWidth(700);
    });

    renderHook(() => useScreenEffect("md", effect));

    expect(effect).toHaveBeenCalledWith(false);
  });
});

describe("useScreenValue", () => {
  it("should return valid value when screen matches", () => {
    act(() => {
      setScreenWidth(800);
    });

    const { result } = renderHook(() =>
      useScreenValue("md", "matched", "not matched")
    );

    expect(result.current).toBe("matched");
  });

  it("should return invalid value when screen does not match", async () => {
    setScreenWidth(700);

    const { result } = renderHook(() =>
      useScreenValue("md", "matched", "not matched")
    );

      expect(result.current).toBe("not matched");
  });
});

describe("useBreakpointManager", () => {
  it("should return the same instance of BreakpointManager", () => {
    const { result } = renderHook(() => useBreakpointManager());
    const manager = result.current;

    expect(manager).toBeInstanceOf(BreakpointManager);

    act(() => {
      setScreenWidth(800);
    });
    const states = manager.getAllBreakpointStates();
    expect(states["md"]).toBe(true);
  });
});

describe("Dynamic screen size changes", () => {
  it("should update the match value when screen size changes", async () => {
    setScreenWidth(700);
    const { result } = renderHook(() => useScreen("md"));

      expect(result.current).toBe(false);

    act(() => {
      setScreenWidth(800);
    });

      expect(result.current).toBe(true);
  });
});

describe("Dynamic screen size changes", () => {
  it("should update the match value when screen size changes", () => {
    act(() => {
      setScreenWidth(700);
    });

    const { result } = renderHook(() => useScreen("md"));

    expect(result.current).toBe(false);

    act(() => {
      setScreenWidth(800);
    });

    expect(result.current).toBe(true);
  });
});
