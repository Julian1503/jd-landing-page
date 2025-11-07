import { fireEvent, render, screen } from "@testing-library/react";
import MobileMenuAccountSection from "@/components/ui/navbar/NavbarMobile/MobileMenuAccountSection";
import { usePrefersReducedMotion } from "@/hooks";

jest.mock("@/hooks", () => {
  const actual = jest.requireActual("@/hooks");
  return {
    ...actual,
    usePrefersReducedMotion: jest.fn(() => false),
  };
});

describe("MobileMenuAccountSection", () => {
  const clerkModule = require("@clerk/nextjs");
  const mockUsePrefersReducedMotion = usePrefersReducedMotion as jest.Mock;

  afterEach(() => {
    mockUsePrefersReducedMotion.mockClear();
  });

  it("renders a sign-in call to action when signed out", () => {
    (globalThis as any).__setClerkSignedIn(false);

    render(<MobileMenuAccountSection onClose={jest.fn()} />);

    expect(screen.getByText("Sign in to your account")).toBeInTheDocument();
    expect(screen.getByText("Appearance")).toBeInTheDocument();
  });

  it("allows managing the account and signing out when signed in", () => {
    (globalThis as any).__setClerkSignedIn(true);
    const onClose = jest.fn();

    render(<MobileMenuAccountSection onClose={onClose} />);

    const manageButton = screen.getByRole("button", { name: "Manage account" });
    fireEvent.click(manageButton);
    expect(clerkModule.useClerk().openUserProfile).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);

    const signOutButton = screen.getByRole("button", { name: "Sign out" });
    fireEvent.click(signOutButton);
    expect(clerkModule.useClerk().signOut).toHaveBeenCalledTimes(1);
  });

  it("avoids hover animations when reduced motion is preferred", () => {
    mockUsePrefersReducedMotion.mockReturnValueOnce(true);
    (globalThis as any).__setClerkSignedIn(true);

    render(<MobileMenuAccountSection onClose={jest.fn()} />);

    const accountHeading = screen.getByText("Account");
    const animatedSection = accountHeading.closest("div[data-transition]");
    expect(animatedSection?.getAttribute("data-transition")).toContain("\"delay\":0");

    const signOutButton = screen.getByRole("button", { name: "Sign out" });
    expect(signOutButton.getAttribute("data-while-hover")).toBeNull();
  });
});
