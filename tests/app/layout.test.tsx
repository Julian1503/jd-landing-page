import { render, screen } from "@testing-library/react";
import RootLayout, { metadata } from "@/app/layout";

describe("RootLayout", () => {
  it("exports page metadata", () => {
    expect(metadata.title).toBe("Julian Delgado | Software Developer");
    expect(metadata.description).toContain("updates");
  });

  it("wraps children with the Clerk provider and global fonts", () => {
    const { container } = render(
      <RootLayout>
        <main data-testid="content">Hello</main>
      </RootLayout>
    );

    expect(screen.getByTestId("content")).toBeInTheDocument();
    const html = container.querySelector("html");
    expect(html).toHaveAttribute("lang", "en");
    const body = container.querySelector("body");
    expect(body?.className).toContain("geist-sans");
    expect(body?.className).toContain("geist-mono");
  });
});
