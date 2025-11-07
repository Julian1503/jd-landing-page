import { act, renderHook } from "@testing-library/react";
import { usePrefersReducedMotion } from "@/hooks";

describe("usePrefersReducedMotion", () => {
  let originalMatchMedia: typeof window.matchMedia;

  beforeEach(() => {
    originalMatchMedia = window.matchMedia;
  });

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
  });

  it("should not throw or execute matchMedia when window is undefined", () => {
    const originalWindow = global.window;
    // @ts-ignore
    delete global.window;
    expect(() => renderHook(() => usePrefersReducedMotion())).not.toThrow();
    global.window = originalWindow;
  });

  it("responds to prefers-reduced-motion changes", () => {
    const listeners: Array<(event: MediaQueryListEvent) => void> = [];

    window.matchMedia = jest.fn().mockImplementation(() => ({
      matches: false,
      media: "(prefers-reduced-motion: reduce)",
      addEventListener: (
        _event: string,
        handler: (event: MediaQueryListEvent) => void
      ) => {
        listeners.push(handler);
      },
      removeEventListener: jest.fn(),
      addListener: jest.fn(),
      removeListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

    const { result } = renderHook(() => usePrefersReducedMotion());
    expect(result.current).toBe(false);

    act(() =>
      listeners.forEach((handler) =>
        handler({ matches: true } as MediaQueryListEvent)
      )
    );
    expect(result.current).toBe(true);
  });
});
