import { renderHook } from "@testing-library/react";
import { useScrollLock } from "@/hooks";

describe("useScrollLock", () => {
  it("locks and unlocks body scrolling", () => {
    const { unmount } = renderHook(() => useScrollLock());
    expect(document.body.style.overflow).toBe("hidden");

    unmount();
    expect(document.body.style.overflow).toBe("");
  });
});
