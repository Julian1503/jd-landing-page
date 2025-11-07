import { fireEvent, render, screen } from "@testing-library/react";
import MobileMenuNavigation from "@/components/ui/navbar/NavbarMobile/MobileMenuNavigation";
import type { MobileMenuNavigationProps } from "@/components/ui/navbar/NavbarMobile/types";
import { usePrefersReducedMotion } from "@/hooks";

jest.mock("@/hooks", () => {
  const actual = jest.requireActual("@/hooks");
  return {
    ...actual,
    usePrefersReducedMotion: jest.fn(() => false),
  };
});

describe("MobileMenuNavigation", () => {
  const mockUsePrefersReducedMotion = usePrefersReducedMotion as jest.Mock;

  const baseItems: MobileMenuNavigationProps["items"] = [
    { name: "Home", href: "/home", description: "Go home" },
    {
      name: "Products",
      links: [
        { title: "Product A", href: "/products/a", description: "First" },
        { title: "Product B", href: "/products/b", description: "Second" },
      ],
    },
    { name: "Placeholder", href: "", description: "Coming soon" },
  ];

  afterEach(() => {
    mockUsePrefersReducedMotion.mockClear();
  });

  it("renders root navigation state and handles interactions", () => {
    const onItemClick = jest.fn();
    const onNavigateToSubmenu = jest.fn();
    const onNavigateBack = jest.fn();

    render(
      <MobileMenuNavigation
        items={baseItems}
        onItemClick={onItemClick}
        navigationState={{ currentItem: null, history: [] }}
        onNavigateToSubmenu={onNavigateToSubmenu}
        onNavigateBack={onNavigateBack}
      />
    );

    expect(screen.getByRole("heading", { name: "Navigation" })).toBeInTheDocument();

    fireEvent.click(screen.getByText("Home"));
    expect(onItemClick).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByText("Products"));
    expect(onNavigateToSubmenu).toHaveBeenCalledTimes(1);
    expect(onNavigateToSubmenu.mock.calls[0][0]).toMatchObject({ title: "Products" });

    const submenuTrigger = screen.getByRole("button", { name: "Products" });
    expect(submenuTrigger.getAttribute("data-while-hover")).toContain("\"x\":4");

    // Items without href or children are rendered as disabled entries
    const fallbackWrapper = screen.getByText("Placeholder").parentElement?.parentElement;
    expect(fallbackWrapper?.className).toContain("cursor-not-allowed");
  });

  it("renders submenu view with back navigation and reduced motion", () => {
    mockUsePrefersReducedMotion.mockReturnValueOnce(true);
    const onNavigateBack = jest.fn();

    render(
      <MobileMenuNavigation
        items={baseItems}
        onItemClick={jest.fn()}
        navigationState={{
          currentItem: {
            title: "Products",
            children: [
              { title: "Nested A", href: "/nested/a" },
              { title: "Nested B", href: "/nested/b" },
            ],
          },
          history: [{ title: "Root", children: baseItems as any }],
        }}
        onNavigateToSubmenu={jest.fn()}
        onNavigateBack={onNavigateBack}
      />
    );

    const backButton = screen.getByRole("button", { name: "Back" });
    fireEvent.click(backButton);
    expect(onNavigateBack).toHaveBeenCalledTimes(1);

    const nestedLink = screen.getByText("Nested A");
    expect(nestedLink).toBeInTheDocument();

    const animatedRow = nestedLink.closest("div[data-transition]");
    expect(animatedRow?.getAttribute("data-transition")).toBe(JSON.stringify({ delay: 0, duration: 0 }));
    expect(backButton.getAttribute("data-while-hover")).toBeNull();
  });
});
