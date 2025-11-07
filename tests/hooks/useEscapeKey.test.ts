import { fireEvent, renderHook } from "@testing-library/react";
import { useEscapeKey } from "@/hooks";

describe("useEscapeKey", () => {
  it("invokes the callback when Escape is pressed", () => {
    const callback = jest.fn();
    const { unmount } = renderHook(() => useEscapeKey(callback));

    fireEvent.keyDown(window, { key: "Escape" });
    expect(callback).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(window, { key: "Enter" });
    expect(callback).toHaveBeenCalledTimes(1);

    unmount();
    fireEvent.keyDown(window, { key: "Escape" });
    expect(callback).toHaveBeenCalledTimes(1);
  });
});
