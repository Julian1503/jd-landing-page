import { fireEvent, render, screen } from "@testing-library/react";
import MobileMenuOverlay from "@/components/ui/navbar/NavbarMobile/MobileMenuOverlay";
import { usePrefersReducedMotion } from "@/hooks";

jest.mock("@/hooks", () => {
  const actual = jest.requireActual("@/hooks");
  return {
    ...actual,
    usePrefersReducedMotion: jest.fn(() => false),
  };
});

describe("MobileMenuOverlay", () => {
  const mockUsePrefersReducedMotion = usePrefersReducedMotion as jest.Mock;

  afterEach(() => {
    document.body.style.overflow = "";
    mockUsePrefersReducedMotion.mockClear();
  });

  it("positions itself below the header and closes on interactions", () => {
    const onClose = jest.fn();
    const { unmount } = render(<MobileMenuOverlay onClose={onClose} />);

    const overlay = screen.getByRole("presentation", { hidden: true });
    expect(overlay).toHaveStyle({ top: "65px" });
    expect(overlay).toHaveStyle({ height: "calc(100vh - 65px)" });

    // Scroll lock is applied via the hook
    expect(document.body.style.overflow).toBe("hidden");

    fireEvent.click(overlay);
    expect(onClose).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(window, { key: "Escape" });
    expect(onClose).toHaveBeenCalledTimes(2);

    unmount();
    expect(document.body.style.overflow).toBe("");
  });

  it("disables animation duration when prefers-reduced-motion is enabled", () => {
    mockUsePrefersReducedMotion.mockReturnValueOnce(true);

    render(<MobileMenuOverlay onClose={jest.fn()} />);
    const overlay = screen.getByRole("presentation", { hidden: true });
    expect(overlay.getAttribute("data-transition")).toBe(JSON.stringify({ duration: 0 }));
  });
});
