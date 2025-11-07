import { fireEvent, render, screen } from "@testing-library/react";
import NavbarMenuItem from "@/components/ui/navbar/NavbarMenuItem";
import type { NavbarMenuItemProps } from "@/components/ui/navbar";
import { usePrefersReducedMotion } from "@/hooks";

jest.mock("@/hooks", () => {
  const actual = jest.requireActual("@/hooks");
  return {
    ...actual,
    usePrefersReducedMotion: jest.fn(() => false),
  };
});

describe("NavbarMenuItem", () => {
  const mockUsePrefersReducedMotion = usePrefersReducedMotion as jest.Mock;

  afterEach(() => {
    mockUsePrefersReducedMotion.mockClear();
  });

  it("renders a simple navigation link when no nested links are provided", () => {
    render(<NavbarMenuItem name="Docs" href="/docs" />);

    const link = screen.getByRole("link", { name: "Docs" });
    expect(link).toHaveAttribute("href", "/docs");
  });

  it("falls back to a placeholder href when no destination is supplied", () => {
    render(<NavbarMenuItem name="Docs" />);

    const link = screen.getByRole("link", { name: "Docs" });
    expect(link).toHaveAttribute("href", "#");
  });

  it("renders nested links inside a dropdown and sanitizes descriptions", () => {
    const links: NavbarMenuItemProps["links"] = [
      {
        title: "Overview",
        href: "/overview",
        description: "<strong>Start</strong><script>window.bad()</script>",
      },
      {
        title: "Tutorials",
        href: "/tutorials",
        description: "Guided lessons",
      },
    ];

    const { getByTestId, getByText, rerender } = render(
      <NavbarMenuItem name="Resources" links={links} layout="grid" gridCols={3} />
    );

    const trigger = screen.getByRole("button", { name: /Resources/ });
    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    fireEvent.pointerEnter(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");

    fireEvent.pointerLeave(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    const sanitized = getByText("Start");
    expect(sanitized.innerHTML).toContain("Start");
    expect(screen.queryByText("window.bad()")).toBeNull();

    // Trigger the memoized layout recalculation by changing the props
    const updatedLinks = [...links!, { title: "API", href: "/api" }];
    rerender(<NavbarMenuItem name="Resources" links={updatedLinks} layout="auto" gridCols={4} />);

    // Each nested item renders inside an li element
    const nestedItems = getByTestId("navigation-content").querySelectorAll("div[data-testid='navbar-nested-menu-item']");
    expect(nestedItems.length).toBe(updatedLinks.length);
  });

  it("disables motion styles when the user prefers reduced motion", () => {
    mockUsePrefersReducedMotion.mockReturnValueOnce(true);

    const links: NavbarMenuItemProps["links"] = [
      { title: "Item", href: undefined },
    ];

    render(<NavbarMenuItem name="Settings" links={links} />);

    const content = screen.getByTestId("navigation-content");
    expect(content).toHaveStyle({ transition: "none" });
    expect(content.querySelector("div[data-testid='navbar-nested-menu-item']")?.textContent).toContain("Item");
  });
});
