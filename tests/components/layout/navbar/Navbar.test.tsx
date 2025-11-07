import { render, screen } from "@testing-library/react";
import Navbar from "@/components/layout/navbar/Navbar";
import { data } from "@/components/layout/navbar/constants";

describe("Navbar", () => {
  it("renders both desktop and mobile variants with shared data", () => {
    render(<Navbar className="shadow" />);

    // Desktop navigation uses the seed data
    expect(screen.getByText(data[0].name)).toBeInTheDocument();
    expect(screen.getByText(data[1].name)).toBeInTheDocument();

    // Mobile navigation button is also rendered
    expect(screen.getByRole("button", { name: "Open navigation menu" })).toBeInTheDocument();
  });
});
