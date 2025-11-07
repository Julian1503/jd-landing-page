import { render, screen } from "@testing-library/react";
import NavbarDesktop from "@/components/layout/navbar/NavbarDesktop";
import type { NavbarMenuItemProps } from "@/components/ui/navbar";

describe("NavbarDesktop", () => {
  const items: Readonly<NavbarMenuItemProps[]> = [
    {
      name: "Products",
      showSeparatorAfter: true,
      links: [
        { title: "Product A", href: "/products/a", description: "First" },
      ],
    },
    {
      name: "Company",
      href: "/company",
      showSeparatorAfter: true,
    },
  ];

  it("renders menu items and sign-in controls for guests", () => {
    (globalThis as any).__setClerkSignedIn(false);
    render(<NavbarDesktop items={items} className="custom" />);

    expect(screen.getByRole("link", { name: "Company" })).toHaveAttribute("href", "/company");
    expect(screen.getAllByRole("separator").length).toBeGreaterThanOrEqual(1);
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
  });

  it("shows the user button for authenticated users", () => {
    (globalThis as any).__setClerkSignedIn(true);
    render(<NavbarDesktop items={items} />);

    expect(screen.getByTestId("user-button")).toBeInTheDocument();
  });
});
