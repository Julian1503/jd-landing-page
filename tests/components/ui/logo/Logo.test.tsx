import { render, screen } from "@testing-library/react";
import Logo from "@/components/ui/logo/Logo";

describe("Logo", () => {
  const consoleError = jest
    .spyOn(console, "error")
    .mockImplementation(() => {});
  const consoleWarn = jest.spyOn(console, "warn").mockImplementation(() => {});

  afterEach(() => {
    consoleError.mockClear();
    consoleWarn.mockClear();
  });

  afterAll(() => {
    consoleError.mockRestore();
    consoleWarn.mockRestore();
  });

  it("renders an interactive logo when href is provided", () => {
    render(
      <Logo
        href="/home"
        imageSrc="/logo.png"
        imageAlt="Main logo"
        text="Brand"
        subtext="Tagline"
        showText
      />
    );

    const link = screen.getByRole("link", { name: /Brand/ });
    expect(link).toHaveAttribute("href", "/home");
    expect(screen.getByText("Tagline")).toBeInTheDocument();
  });

  it("warns when no alt text is supplied", () => {
    render(<Logo href="/" imageSrc="/logo.png" imageAlt="" />);

    expect(consoleWarn).toHaveBeenCalled();
  });

  it("returns null when the image source is invalid", () => {
    const { container } = render(
      <Logo
        imageSrc={"" as unknown as string}
        imageAlt="alt"
        showText
        text="Brand"
      />
    );

    expect(container.firstChild).toBeNull();
    expect(consoleError).toHaveBeenCalled();
  });

  it("does not render figcaption when showText is true but text/subtext are missing", () => {
    const { container } = render(
      <Logo imageSrc="/logo.png" imageAlt="Logo" showText />
    );
    expect(container.querySelector("figcaption")).toBeNull();
  });
  
  it("renders static content when no href is provided", () => {
    const { container } = render(
      <Logo
        href=""
        imageSrc="/logo.png"
        imageAlt="Static logo"
        text="Brand"
        showText
      />
    );

    const figure = container.querySelector("figure");
    expect(figure).not.toBeNull();
    expect(screen.getByText("Brand")).toBeInTheDocument();
  });
});
