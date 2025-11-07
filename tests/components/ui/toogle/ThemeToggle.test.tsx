import { act, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import ThemeToggle from "@/components/ui/toogle/theme-toogle";

describe("ThemeToggle", () => {
  let originalMatchMedia: typeof window.matchMedia;

  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove("dark");
    originalMatchMedia = window.matchMedia;
  });

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
  });

  it("toggles between light and dark themes and persists the preference", async () => {
  const listeners: Array<(event: MediaQueryListEvent) => void> = [];
  window.matchMedia = jest.fn().mockImplementation(() => ({
    matches: false,
    media: "(prefers-color-scheme: dark)",
    addEventListener: (_event: string, handler: (event: MediaQueryListEvent) => void) => {
      listeners.push(handler);
    },
    removeEventListener: jest.fn(),
    addListener: jest.fn(),
    removeListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }));

  render(<ThemeToggle showLabel />);

  await waitFor(() => {
    expect(screen.getByText("Light")).toBeInTheDocument();
  });

  const group = screen.getByRole("group", { name: "Theme" });
  const toggleButton = within(group).getByRole("button");
  fireEvent.click(toggleButton);

  expect(localStorage.getItem("theme")).toBe("dark");
  expect(document.documentElement.classList.contains("dark")).toBe(true);
  expect(screen.getByText("Dark")).toBeInTheDocument();

  fireEvent.click(toggleButton);
  expect(localStorage.getItem("theme")).toBe("light");
  expect(document.documentElement.classList.contains("dark")).toBe(false);

  act(() => listeners.forEach((handler) => handler({ matches: true } as MediaQueryListEvent)));
  await waitFor(() => expect(screen.getByText("Dark")).toBeInTheDocument());
  act(() => listeners.forEach((handler) => handler({ matches: false } as MediaQueryListEvent)));
  await waitFor(() => expect(screen.getByText("Light")).toBeInTheDocument());
});


  it("honours a stored user preference without querying system settings", async () => {
    localStorage.setItem("theme", "dark");

    window.matchMedia = jest.fn(() => {
      throw new Error("matchMedia should not be called when a theme is stored");
    });

    render(<ThemeToggle showLabel />);

    await waitFor(() => {
      expect(screen.getByText("Dark")).toBeInTheDocument();
    });

    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(window.matchMedia).not.toHaveBeenCalled();
  });

  it("defaults to the system preference when no stored theme exists", async () => {
    window.matchMedia = jest.fn().mockImplementation(() => ({
      matches: true,
      media: "(prefers-color-scheme: dark)",
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      addListener: jest.fn(),
      removeListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

    render(<ThemeToggle />);

    await waitFor(() => {
      expect(document.documentElement.classList.contains("dark")).toBe(true);
    });
  });

  it("shows a loading skeleton on the initial render", () => {
    window.matchMedia = jest.fn().mockImplementation(() => ({
      matches: false,
      media: "(prefers-color-scheme: dark)",
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      addListener: jest.fn(),
      removeListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

    const markup = renderToString(<ThemeToggle />);
    expect(markup).toContain("animate-pulse");
  });
  
});
