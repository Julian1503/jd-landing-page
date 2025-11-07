import { fireEvent, render, screen } from "@testing-library/react";
import MobileMenuButton from "@/components/ui/navbar/MobileMenuButton";
import { usePrefersReducedMotion } from "@/hooks";

jest.mock("@/hooks", () => {
  const actual = jest.requireActual("@/hooks");
  return {
    ...actual,
    usePrefersReducedMotion: jest.fn(() => false),
  };
});

describe("MobileMenuButton", () => {
  const mockUsePrefersReducedMotion = usePrefersReducedMotion as jest.Mock;

  afterEach(() => {
    mockUsePrefersReducedMotion.mockClear();
  });

  it("toggles aria attributes and icons based on state", () => {
    const onToggle = jest.fn();
    const { rerender } = render(
      <MobileMenuButton isOpen={false} onToggle={onToggle} />
    );

    const button = screen.getByRole("button", { name: "Open navigation menu" });
    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByLabelText("menu-icon")).toBeInTheDocument();

    fireEvent.click(button);
    expect(onToggle).toHaveBeenCalledTimes(1);

    rerender(<MobileMenuButton isOpen triggerRef={{ current: null }} onToggle={onToggle} />);

    const closeButton = screen.getByRole("button", { name: "Close navigation menu" });
    expect(closeButton).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByLabelText("close-icon")).toBeInTheDocument();
  });

  it("removes animations when reduced motion is preferred", () => {
    const mockUsePrefersReducedMotion = usePrefersReducedMotion as jest.Mock;
    mockUsePrefersReducedMotion.mockReturnValueOnce(true);

    render(<MobileMenuButton isOpen={false} onToggle={jest.fn()} />);

    const button = screen.getByRole("button", { name: "Open navigation menu" });
    const iconWrapper = button.querySelector("[data-transition]");
    expect(iconWrapper?.getAttribute("data-transition")).toContain("\"duration\":0");
  });
});
