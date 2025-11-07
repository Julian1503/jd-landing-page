import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { NavbarMenuItemProps, NavbarMobile } from "@/components/ui/navbar";
import { usePrefersReducedMotion } from "@/hooks";

jest.mock("@/hooks", () => {
  const actual = jest.requireActual("@/hooks");
  return {
    ...actual,
    usePrefersReducedMotion: jest.fn(() => false),
  };
});

describe("NavbarMobile", () => {
  const items: Readonly<NavbarMenuItemProps[]> = [
    {
      name: "Docs",
      href: "/docs",
    },
    {
      name: "Community",
      links: [
        { title: "Forums", href: "/community/forums" },
      ],
    },
  ];

  it("lazy-loads the overlay and panel when opened", async () => {
    render(<NavbarMobile items={items} />);

    const toggle = screen.getByRole("button", { name: "Open navigation menu" });
    const wrapper = toggle.closest("div")?.parentElement as HTMLElement;
    fireEvent.pointerEnter(wrapper);
    await act(async () => {
      await Promise.resolve();
    });

    fireEvent.click(toggle);

    await waitFor(() => {
      expect(screen.getByRole("dialog", { name: "Mobile navigation menu" })).toBeInTheDocument();
    });

    const overlay = screen.getByRole("presentation", { hidden: true });
    fireEvent.click(overlay);

    await waitFor(() => {
      expect(screen.queryByRole("dialog", { name: "Mobile navigation menu" })).not.toBeInTheDocument();
    });
  });

  it("disables motion when the user prefers reduced motion", () => {
    const mockUsePrefersReducedMotion = usePrefersReducedMotion as jest.Mock;
    mockUsePrefersReducedMotion.mockReturnValueOnce(true);

    render(<NavbarMobile items={items} />);

    const trigger = screen.getByRole("button", { name: "Open navigation menu" });
    const animatedWrapper = trigger.parentElement as HTMLElement;
    expect(animatedWrapper.getAttribute("data-transition")).toContain("\"duration\":0");
  });
});
