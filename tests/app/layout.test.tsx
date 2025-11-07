import { render, screen } from "@testing-library/react";
import RootLayout, { metadata } from "@/app/layout";

// Evita warnings de <html> como hijo de <div> en Jest
const originalError = console.error;
beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation((msg, ...args) => {
    if (typeof msg === "string" && msg.includes("validateDOMNesting")) return;
    originalError(msg, ...args);
  });
});

afterAll(() => {
  (console.error as jest.Mock).mockRestore();
});

describe("RootLayout", () => {
  it("exports page metadata", () => {
    expect(metadata.title).toBe("Julian Delgado | Software Developer");
    expect(metadata.description).toContain("updates");
  });

  it("renders expected structure with html and body tags", () => {
    const { container } = render(
      <RootLayout>
        <main data-testid="content">Hello</main>
      </RootLayout>
    );

    // Verifica que el contenido se renderiza
    expect(screen.getByTestId("content")).toBeInTheDocument();

    // Verifica etiquetas html y body sin causar warnings
    const html = container.querySelector("html");
    expect(html).toHaveAttribute("lang", "en");

    const body = container.querySelector("body");
    expect(body?.className).toContain("geist-sans");
    expect(body?.className).toContain("geist-mono");
  });
});
