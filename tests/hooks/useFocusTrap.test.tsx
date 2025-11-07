import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { useFocusTrap } from "@/hooks";

describe("useFocusTrap", () => {
  const originalFocus = HTMLElement.prototype.focus;
  let focusCalls: HTMLElement[] = [];
  let cleanupFn: (() => void) | undefined;
  let setTimeoutSpy: jest.SpyInstance;

  beforeAll(() => {
    HTMLElement.prototype.focus = function focus(this: HTMLElement) {
      focusCalls.push(this);
      return originalFocus.call(this);
    };
  });

  afterAll(() => {
    HTMLElement.prototype.focus = originalFocus;
  });

  const TestTrap = ({ active }: { active: boolean }) => {
    const triggerRef = React.useRef<HTMLButtonElement>(null);
    const trapRef = useFocusTrap<HTMLDivElement>(active, triggerRef);

    return (
      <div>
        <button ref={triggerRef}>Trigger</button>
        <div ref={trapRef} tabIndex={-1}>
          <button>First</button>
          <button>Last</button>
        </div>
      </div>
    );
  };

  beforeEach(() => {
    focusCalls = [];
    cleanupFn = undefined;
    jest.useFakeTimers();
    const original = global.setTimeout;
    setTimeoutSpy = jest
      .spyOn(global, "setTimeout")
      .mockImplementation(((cb: TimerHandler, delay?: number, ...args: any[]) => {
        if (typeof cb === "function") {
          const wrapped = (...wrappedArgs: any[]) => {
            const result = (cb as any)(...wrappedArgs);
            if (typeof result === "function") {
              cleanupFn = result;
            }
          };
          return (original as any)(wrapped, delay ?? 0, ...args);
        }
        return (original as any)(cb, delay ?? 0, ...args);
      }) as any);
  });

  afterEach(() => {
    setTimeoutSpy.mockRestore();
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("traps focus, loops with Tab, and restores focus on cleanup", async () => {
    const rafSpy = jest
      .spyOn(window, "requestAnimationFrame")
      .mockImplementation((cb: FrameRequestCallback) => {
        cb(0);
        return 1;
      });

    const { rerender } = render(<TestTrap active={false} />);
    const getTrigger = () => screen.getByText("Trigger") as HTMLButtonElement;

    act(() => {
      getTrigger().focus();
    });

    act(() => {
      rerender(<TestTrap active />);
    });

    act(() => {
      jest.advanceTimersByTime(150);
    });

    const firstButton = screen.getByText("First");
    expect(document.activeElement).toBe(firstButton);

    const lastButton = screen.getByText("Last");
    act(() => {
      lastButton.focus();
    });
    fireEvent.keyDown(lastButton, { key: "Tab" });
    expect(document.activeElement).toBe(firstButton);

    act(() => {
      firstButton.focus();
    });
    fireEvent.keyDown(firstButton, { key: "Tab", shiftKey: true });
    expect(document.activeElement).toBe(lastButton);

    fireEvent.keyDown(firstButton, { key: "Enter" });

    act(() => {
      rerender(<TestTrap active={false} />);
    });

    const triggerElement = getTrigger();
    const debugSpy = jest.spyOn(console, "debug").mockImplementation(() => {});
    const focusMock = jest
      .spyOn(triggerElement, "focus")
      .mockImplementation(function (this: HTMLButtonElement) {
        throw new Error("focus failure");
      });

    act(() => {
      cleanupFn?.();
    });

    await waitFor(() => {
      expect(debugSpy).toHaveBeenCalledWith(
        "Could not restore focus:",
        expect.any(Error)
      );
    });

    expect(focusMock).toHaveBeenCalled();
    focusMock.mockRestore();
    debugSpy.mockRestore();
    rafSpy.mockRestore();
  });

  it("falls back to focusing the trigger when no element was previously focused", async () => {
    const rafSpy = jest
      .spyOn(window, "requestAnimationFrame")
      .mockImplementation((cb: FrameRequestCallback) => {
        cb(0);
        return 1;
      });

    const { rerender } = render(<TestTrap active={false} />);
    const getTrigger = () => screen.getByText("Trigger") as HTMLButtonElement;

    act(() => {
      rerender(<TestTrap active />);
    });

    act(() => {
      getTrigger().blur();
      jest.advanceTimersByTime(150);
    });

    const firstButton = screen.getByText("First");
    expect(document.activeElement).toBe(firstButton);

    fireEvent.keyDown(firstButton, { key: "Escape" });

    act(() => {
      rerender(<TestTrap active={false} />);
    });

    const triggerElement = getTrigger();
    const debugSpy = jest.spyOn(console, "debug").mockImplementation(() => {});
    const focusMock = jest
      .spyOn(triggerElement, "focus")
      .mockImplementation(function (this: HTMLButtonElement) {
        throw new Error("trigger failure");
      });

    act(() => {
      cleanupFn?.();
    });

    await waitFor(() => {
      expect(debugSpy).toHaveBeenCalledWith(
        "Could not focus trigger:",
        expect.any(Error)
      );
    });

    expect(focusMock).toHaveBeenCalled();
    focusMock.mockRestore();
    debugSpy.mockRestore();
    rafSpy.mockRestore();
  });
});
