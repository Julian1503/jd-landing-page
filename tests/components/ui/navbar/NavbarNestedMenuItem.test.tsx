import { fireEvent, render, screen } from "@testing-library/react";
import NavbarNestedMenuItem from "@/components/ui/navbar/NavbarNestedMenuItem";
import { usePrefersReducedMotion } from "@/hooks";

jest.mock("@/hooks", () => {
  const actual = jest.requireActual("@/hooks");
  return {
    ...actual,
    usePrefersReducedMotion: jest.fn(() => false),
  };
});

describe("NavbarNestedMenuItem", () => {
  const mockUsePrefersReducedMotion = usePrefersReducedMotion as jest.Mock;

  afterEach(() => {
    mockUsePrefersReducedMotion.mockClear();
  });

  it("renders a simple link when there are no children", () => {
    render(
      <NavbarNestedMenuItem
        link={{ title: "Dashboard", href: "/dashboard", description: "Overview" }}
      />
    );

    const link = screen.getByRole("link", { name: /Dashboard/ });
    expect(link).toHaveAttribute("href", "/dashboard");
    expect(screen.getByText("Overview")).toBeInTheDocument();
  });

  it("renders nested navigation with accessible triggers", () => {
    mockUsePrefersReducedMotion.mockReturnValue(true);

    const nestedLink = {
      title: "Products",
      description: "All products",
      icon: <span data-testid="custom-icon">*</span>,
      children: [
        { title: "Analytics", href: "/analytics", description: "Insights" },
        { title: "Automation", href: "/automation", description: "Workflows" },
      ],
    };

    render(<NavbarNestedMenuItem link={nestedLink} />);

    const trigger = screen.getByRole("button", { name: /Products/ });
    expect(trigger).toHaveAttribute("aria-haspopup", "menu");
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    fireEvent.pointerEnter(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");

    fireEvent.pointerLeave(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    const nestedLinks = screen.getAllByRole("link");
    expect(nestedLinks).toHaveLength(2);
    expect(screen.getByText("Insights")).toBeInTheDocument();

    // Sanitisation removes scripts from the description
    expect(screen.queryByText(/<script>/i)).not.toBeInTheDocument();

    const positioner = screen.getByTestId("navigation-positioner");
    expect(positioner.getAttribute("style")).toContain("transition: none");
  });

  it("renders nested content correctly at deeper levels", () => {
    render(
      <NavbarNestedMenuItem
        depth={1}
        link={{
          title: "Parent",
          description: "Nested",
          children: [{ title: "Child", href: "/child" }],
        }}
      />
    );

    const wrapper = screen.getByRole("group");
    expect(wrapper.className).toContain("flex flex-col");
    expect(screen.getByRole("link", { name: "Child" })).toHaveAttribute("href", "/child");
  });
});
