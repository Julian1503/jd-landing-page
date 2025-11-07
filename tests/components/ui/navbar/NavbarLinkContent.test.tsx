import { render, screen } from "@testing-library/react";
import NavbarLinkContent from "@/components/ui/navbar/NavbarLinkContent";

describe("NavbarLinkContent", () => {
  it("renders icon, title and sanitized description", () => {
    const { container } = render(
      <NavbarLinkContent
        title="Design"
        description="<em>Beautiful</em> <script>alert('xss')</script>"
        icon={<span data-testid="icon">🌟</span>}
      />
    );

    expect(screen.getByTestId("icon")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Design" })).toBeInTheDocument();
    expect(container.querySelector("p")?.innerHTML).toContain("<em>Beautiful</em>");
    expect(container.querySelector("p")?.innerHTML).not.toContain("script");
  });

  it("omits optional sections gracefully", () => {
    const { container } = render(<NavbarLinkContent title="Support" />);
    expect(container.querySelector("p")).toBeNull();
  });

  it("exposes a stable display name", () => {
    expect(NavbarLinkContent.displayName).toBe("NavbarLinkContent");
  });
});
