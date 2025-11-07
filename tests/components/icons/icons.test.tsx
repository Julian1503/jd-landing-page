import { render } from "@testing-library/react";
import ArrowIcon from "@/components/icons/Arrow";
import ChevronDownIcon from "@/components/icons/ChevronDown";
import ChevronRightIcon from "@/components/icons/ChevronRight";

describe("Icon components", () => {
  it("render accessible SVG elements", () => {
    const { container: arrow } = render(<ArrowIcon data-testid="arrow" />);
    expect(arrow.querySelector("svg")).toHaveAttribute("width", "20");

    const { container: down } = render(<ChevronDownIcon />);
    expect(down.querySelector("svg")).toBeInTheDocument();

    const { container: right } = render(<ChevronRightIcon />);
    expect(right.querySelector("svg")).toBeInTheDocument();
  });
});
