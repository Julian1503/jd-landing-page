import { render, screen } from "@testing-library/react";
import Header from "@/components/layout/Header";

describe("Header", () => {
  it("renders the logo and the navbar", () => {
    render(<Header />);

    const header = screen.getByRole("banner");
    expect(header).toBeInTheDocument();

    expect(screen.getByText("Julian Delgado")).toBeInTheDocument();
    expect(screen.getByText("Software Engineer")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Open navigation menu" })).toBeInTheDocument();
  });
});
