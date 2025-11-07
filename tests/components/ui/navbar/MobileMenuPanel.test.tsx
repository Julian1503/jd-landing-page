import { fireEvent, render, screen } from "@testing-library/react";
import MobileMenuPanel from "@/components/ui/navbar/NavbarMobile/MobileMenuPanel";
import { NavbarMenuItemProps } from "@/components/ui/navbar";

describe("MobileMenuPanel", () => {
  const items = [
    {
      name: "Products",
      links: [
        { title: "Product A", href: "/products/a", description: "First" },
        { title: "Product B", href: "/products/b", description: "Second" },
      ],
    },
    { name: "Contact", href: "/contact", description: "Reach us" },
  ] as Readonly<NavbarMenuItemProps[]>;

  it("renders navigation content and resets state on close", () => {
    (globalThis as any).__setClerkSignedIn(true);
    const onClose = jest.fn();

    render(<MobileMenuPanel items={items} onClose={onClose} />);

    const panel = screen.getByRole("dialog", { name: "Mobile navigation menu" });
    expect(panel).toHaveAttribute("aria-modal", "true");
    expect(panel).toHaveStyle({ top: "65px" });
    expect(panel).toHaveAttribute(
      "data-transition",
      JSON.stringify({ type: "spring", damping: 25, stiffness: 200 })
    );

    // Navigate into a submenu
    fireEvent.click(screen.getByText("Products"));
    expect(screen.getByRole("heading", { name: "Products" })).toBeInTheDocument();

    // Trigger account action to close the panel
    const manageAccount = screen.getByRole("button", { name: "Manage account" });
    fireEvent.click(manageAccount);

    expect(onClose).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("heading", { name: "Navigation" })).toBeInTheDocument();

    // Direct link triggers the supplied onClose callback too
    const contactLink = screen.getByRole("link", { name: /Contact/ });
    fireEvent.click(contactLink);
    expect(onClose).toHaveBeenCalledTimes(2);
  });
});
