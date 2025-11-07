import { render, screen } from "@testing-library/react";
import MobileMenuUserHeader from "@/components/ui/navbar/MobileMenuUserHeader";
import { usePrefersReducedMotion } from "@/hooks";

jest.mock("@/hooks", () => {
  const actual = jest.requireActual("@/hooks");
  return {
    ...actual,
    usePrefersReducedMotion: jest.fn(() => false),
  };
});

const mockUsePrefersReducedMotion = usePrefersReducedMotion as jest.Mock;

afterEach(() => {
  mockUsePrefersReducedMotion.mockReset();
});

describe("MobileMenuUserHeader", () => {
  it("displays the authenticated user's information", () => {
    (globalThis as any).__setClerkSignedIn(true);
    mockUsePrefersReducedMotion.mockReturnValueOnce(true);
    render(<MobileMenuUserHeader />);

    const container = screen.getByRole("group", { name: "User account information" });
    expect(container.getAttribute("data-initial")).toContain('"y":0');
    expect(container.getAttribute("data-transition")).toContain('"duration":0');
    expect(container).toBeInTheDocument();
    expect(screen.getByText("Test User")).toBeInTheDocument();
    expect(screen.getByText("user@test.com")).toBeInTheDocument();
    expect(screen.getByAltText("Test User's avatar")).toBeInTheDocument();
  });

  it("falls back to generic labels when no user is available", () => {
    (globalThis as any).__setClerkSignedIn(false);
    render(<MobileMenuUserHeader />);

    expect(screen.getByText("User")).toBeInTheDocument();
    expect(screen.getByAltText("User avatar")).toBeInTheDocument();
  });

  it("shows the username when an email is not available", () => {
    const clerkModule = require("@clerk/nextjs");
    (globalThis as any).__setClerkSignedIn(true);
    jest
      .spyOn(clerkModule, "useUser")
      .mockReturnValueOnce({ user: { fullName: "Tester", username: "tester" } });

    render(<MobileMenuUserHeader />);

    expect(screen.getByText("tester")).toBeInTheDocument();
  });
});
