import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

if (typeof window.MediaQueryListEvent === "undefined") {
  class MediaQueryListEvent extends Event {
    matches: boolean;
    media: string;

    constructor(type: string, initDict: MediaQueryListEventInit) {
      super(type, initDict);
      this.matches = initDict.matches ?? false;
      this.media = initDict.media ?? "";
    }
  }


  (window as any).MediaQueryListEvent = MediaQueryListEvent;
}


globalThis.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));


let currentWidth = 1024;

interface MediaQueryListMock {
  matches: boolean;
  media: string;
  onchange: ((this: MediaQueryList, ev: MediaQueryListEvent) => any) | null;
  addListener: (listener: (ev: MediaQueryListEvent) => any) => void;
  removeListener: (listener: (ev: MediaQueryListEvent) => any) => void;
  addEventListener: (
    type: string,
    listener: (ev: MediaQueryListEvent) => any
  ) => void;
  removeEventListener: (
    type: string,
    listener: (ev: MediaQueryListEvent) => any
  ) => void;
  dispatchEvent: (event: MediaQueryListEvent) => boolean;
  listeners: Array<(e: MediaQueryListEvent) => void>;
}

const mediaQueryLists = new Map<string, MediaQueryListMock>();
(globalThis as any).mediaQueryLists = mediaQueryLists;

function evalMediaQuery(query: string, width: number): boolean {
  const minMatch = query.match(/\(min-width:\s*(\d+)px\)/);
  const maxMatch = query.match(/\(max-width:\s*(\d+)px\)/);

  let minWidth = 0;
  let maxWidth = Infinity;

  if (minMatch) {
    minWidth = parseInt(minMatch[1], 10);
  }
  if (maxMatch) {
    maxWidth = parseInt(maxMatch[1], 10);
  }

  return width >= minWidth && width <= maxWidth;
}

// @ts-expect-error This is an incomplete Mock implementation.
window.matchMedia = (query: string): MediaQueryListMock => {
  if (mediaQueryLists.has(query)) return mediaQueryLists.get(query)!;

  const mql: MediaQueryListMock = {
    matches: evalMediaQuery(query, currentWidth),
    media: query,
    listeners: [],
    onchange: null,
    addListener(listener) {
      if (listener) this.listeners.push(listener);
    },
    removeListener(listener) {
      if (listener)
        this.listeners = this.listeners.filter((l) => l !== listener);
    },
    addEventListener(type, listener) {
      if (type === "change" && listener) this.listeners.push(listener);
    },
    removeEventListener(type, listener) {
      if (type === "change" && listener) {
        this.listeners = this.listeners.filter((l) => l !== listener);
      }
    },
    dispatchEvent(event: MediaQueryListEvent): boolean {
      this.listeners.forEach((listener) => listener.call(this, event));
      return true;
    },
  };

  mediaQueryLists.set(query, mql);
  return mql;
};

globalThis.setScreenWidth = (width: number) => {
  currentWidth = width;

  mediaQueryLists.forEach((mql) => {
    const matches = evalMediaQuery(mql.media, currentWidth);
    if (mql.matches !== matches) {
      mql.matches = matches;
      const event = new MediaQueryListEvent("change", {
        matches,
        media: mql.media,
      });
      mql.dispatchEvent(event);
    }
  });
};