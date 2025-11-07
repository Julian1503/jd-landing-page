import { act, renderHook, waitFor } from "@testing-library/react";
import { useHeaderHeight } from "@/hooks";

describe("useHeaderHeight", () => {
  let resizeObserverInstance: ResizeObserver | null = null;

  beforeEach(() => {
    document.body.innerHTML = "";

    class MockResizeObserver implements ResizeObserver {
      observe = jest.fn();
      unobserve = jest.fn();
      disconnect = jest.fn();
      callback: ResizeObserverCallback;
      constructor(callback: ResizeObserverCallback) {
        this.callback = callback;
        resizeObserverInstance = this;
      }
    }

    // @ts-expect-error override for test environment
    global.ResizeObserver = MockResizeObserver;
  });

  it("returns fallback value when no element is found", () => {
    const { result } = renderHook(() => useHeaderHeight({ selector: "nav" }));
    expect(result.current).toBe(65);
  });

  it("measures the header height and responds to resize events", async () => {
    const header = document.createElement("header");
    header.getBoundingClientRect = () => ({
      width: 1024,
      height: 80,
      top: 0,
      left: 0,
      bottom: 80,
      right: 1024,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    });
    document.body.appendChild(header);

    const { result } = renderHook(() => useHeaderHeight());

    await waitFor(() => expect(result.current).toBe(80));

    header.getBoundingClientRect = () => ({
      width: 1024,
      height: 120,
      top: 0,
      left: 0,
      bottom: 120,
      right: 1024,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    });

    act(() => {
      resizeObserverInstance?.callback([], resizeObserverInstance as any);
    });

    await waitFor(() => expect(result.current).toBe(120));
  });

  it("supports custom selectors and fallback heights", async () => {
    const custom = document.createElement("div");
    custom.setAttribute("data-header", "true");
    custom.getBoundingClientRect = () => ({
      width: 1024,
      height: 140,
      top: 0,
      left: 0,
      bottom: 140,
      right: 1024,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    });
    document.body.appendChild(custom);

    const { result } = renderHook(() =>
      useHeaderHeight({ selector: '[data-header="true"]', fallback: 100 })
    );

    expect(result.current).toBe(100);
    await waitFor(() => expect(result.current).toBe(140));
  });
});
