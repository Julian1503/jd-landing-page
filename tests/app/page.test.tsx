import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

describe("Home page", () => {
  it("renders the site header", () => {
    render(<Home />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });
});
