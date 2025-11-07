import { act, renderHook } from "@testing-library/react";
import { useNavbarMobile } from "@/hooks/useNavbarMobile";

describe("useNavbarMobile", () => {
  it("manages open state and exposes the trigger ref", () => {
    const { result } = renderHook(() => useNavbarMobile());

    expect(result.current.isOpen).toBe(false);
    expect(result.current.triggerRef.current).toBeNull();

    act(() => {
      result.current.handleToggle();
    });

    expect(result.current.isOpen).toBe(true);

    act(() => {
      result.current.handleClose();
    });

    expect(result.current.isOpen).toBe(false);
    expect(typeof result.current.prefersReducedMotion).toBe("boolean");
  });
});
