import { generateMediaQuery } from "./generateMediaQuery";
import type { Screen, ScreensConfig } from "./types";

type Callback = (matches: boolean) => void;

class BreakpointManager<Screens extends ScreensConfig> {
  static instances = new Map<string, BreakpointManager<any>>();
  private readonly breakpointsState: Record<string, boolean> = {};
  private readonly subscribers: Record<string, Set<Callback>> = {};
  private readonly mediaQueryLists: Record<string, MediaQueryList> = {};
  private readonly cleanupListeners: Record<string, () => void> = {};

  private constructor(private readonly screens: Screens) {
    this.init();
  }

  public static getInstance<Screens extends ScreensConfig>(
    screens: Screens
  ): BreakpointManager<Screens> {
    const key = JSON.stringify(screens);
    if (!this.instances.has(key)) {
      this.instances.set(key, new BreakpointManager(screens));
    }
    return this.instances.get(key)!;
  }

  public getBreakpointState(name: string): boolean {
    if (!(name in this.breakpointsState)) {
      throw new Error(`Breakpoint "${name}" is not defined`);
    }
    return this.breakpointsState[name];
  }

  public getAllBreakpointStates(): Readonly<Record<string, boolean>> {
    return { ...this.breakpointsState };
  }

  public subscribe(name: string, callback: Callback): () => void {
    const subscribers = this.subscribers[name];
    if (!subscribers) {
      throw new Error(`Breakpoint "${name}" is not defined`);
    }

    subscribers.add(callback);
    callback(this.breakpointsState[name]);

    return () => {
      subscribers.delete(callback);
    };
  }

  public cleanup(): void {
    Object.values(this.cleanupListeners).forEach((cleanup) => cleanup());
    Object.values(this.subscribers).forEach((set) => set.clear());
  }

  private init(): void {
    const breakpoints = Array.isArray(this.screens)
      ? this.screens.map((_, index) => String(index))
      : Object.keys(this.screens);

    breakpoints.forEach((name) => {
      const screenValue = Array.isArray(this.screens)
        ? this.screens[Number(name)]
        : (this.screens as Record<string, string | Screen | Screen[]>)[name];

      this.setupBreakpoint(name, screenValue);
    });
  }

  private setupBreakpoint(
    name: string,
    screenValue: string | Screen | Screen[]
  ): void {
    const mediaQuery = generateMediaQuery(screenValue);

    if (typeof window !== "undefined" && window.matchMedia) {
      const mql = window.matchMedia(mediaQuery);
      this.mediaQueryLists[name] = mql;
      this.breakpointsState[name] = mql.matches;
      this.subscribers[name] = new Set();

      const listener = (event: MediaQueryListEvent) => {
        this.breakpointsState[name] = event.matches;
        this.notifySubscribers(name, event.matches);
      };

      mql.addEventListener("change", listener);
      this.cleanupListeners[name] = () =>
        mql.removeEventListener("change", listener);
    } else {
      this.breakpointsState[name] = false;
      this.subscribers[name] = new Set();
      this.cleanupListeners[name] = () => {};
    }
  }

  private notifySubscribers(name: string, matches: boolean): void {
    this.subscribers[name]?.forEach((callback) => callback(matches));
  }

  public static reset(): void {
    this.instances.forEach((instance) => instance.cleanup());
    this.instances.clear();
  }
}

export default BreakpointManager;
