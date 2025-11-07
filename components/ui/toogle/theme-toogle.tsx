"use client";

import { useEffect, useState } from "react";
import { Switch } from "@base-ui-components/react/switch";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggleProps } from "./types";
import { SIZES } from "./constants";

const ThemeToggle = ({
  className,
  showLabel = false,
  size = "md",
}: ThemeToggleProps) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);
  const [hasUserPreference, setHasUserPreference] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");

    if (stored === "dark" || stored === "light") {
      setTheme(stored);
      setHasUserPreference(true);
    } else {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      setTheme(mq.matches ? "dark" : "light");
    }

    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || hasUserPreference) return;

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (event: MediaQueryListEvent) => {
      setTheme(event.matches ? "dark" : "light");
    };

    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [mounted, hasUserPreference]);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.classList.toggle("dark", theme === "dark");
    if (hasUserPreference) {
      localStorage.setItem("theme", theme);
    } else {
      localStorage.removeItem("theme");
    }
  }, [theme, mounted, hasUserPreference]);

  if (!mounted) {
    return (
      <div className={cn("flex items-center", SIZES[size].wrapper, className)}>
        <div className={cn(SIZES[size].icon, "animate-pulse bg-muted rounded")} />
        <div className={cn(SIZES[size].switch, "animate-pulse bg-muted rounded-full")} />
      </div>
    );
  }

  const isDark = theme === "dark";

  return (
    <div
      role="group"
      aria-labelledby="theme-toggle-label"
      className={cn("flex items-center", SIZES[size].wrapper, className)}
    >
      <span id="theme-toggle-label" className="sr-only">
        Theme
      </span>

      <div className="text-muted-foreground transition-colors">
        {isDark ? (
          <Moon className={SIZES[size].icon} aria-hidden="true" />
        ) : (
          <Sun className={SIZES[size].icon} aria-hidden="true" />
        )}
      </div>

      <Switch.Root
        checked={isDark}
        onCheckedChange={(checked: boolean) => {
          setHasUserPreference(true);
          setTheme(checked ? "dark" : "light");
        }}
        aria-label={showLabel ? undefined : "Toggle dark mode"}
        className={cn(
          "relative cursor-pointer rounded-full border border-border",
          "bg-muted data-checked:bg-secondary transition-colors",
          "focus-visible:outline-2 focus-visible:outline-offset-2",
          "focus-visible:outline-ring",
          SIZES[size].switch
        )}
      >
        <Switch.Thumb
          className={cn(
            "absolute top-1/2 -translate-y-1/2 rounded-full bg-foreground",
            "shadow-md transition-transform duration-200 ease-in-out",
            SIZES[size].thumb
          )}
        />
      </Switch.Root>

      {showLabel && (
        <span className="text-sm font-medium text-foreground">
          {isDark ? "Dark" : "Light"}
        </span>
      )}
    </div>
  );
};

export default ThemeToggle;
