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
  size = "md" 
}: ThemeToggleProps) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  // Detect system preference on mount
  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const apply = (isDark: boolean) => setTheme(isDark ? "dark" : "light");
    apply(mq.matches);
    const onChange = (e: MediaQueryListEvent) => apply(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Apply theme to document
  useEffect(() => {
    if (!mounted) return;
    document.documentElement.classList.toggle("dark", theme === "dark");
    // Store preference in localStorage
    localStorage.setItem("theme", theme);
  }, [theme, mounted]);

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className={cn("flex items-center", SIZES[size].wrapper, className)}>
        <div className={cn(SIZES[size].icon, "animate-pulse bg-[var(--muted)] rounded")} />
        <div className={cn(SIZES[size].switch, "animate-pulse bg-[var(--muted)] rounded-full")} />
      </div>
    );
  }

  const isDark = theme === "dark";

  return (
    <div className={cn("flex items-center", SIZES[size].wrapper, className)}>
      {/* Icon indicator */}
      <div className="text-[var(--muted-foreground)] transition-colors">
        {isDark ? (
          <Moon className={SIZES[size].icon} aria-hidden="true" />
        ) : (
          <Sun className={SIZES[size].icon} aria-hidden="true" />
        )}
      </div>

      {/* Switch */}
      <Switch.Root
        checked={isDark}
        onCheckedChange={(checked: boolean) => setTheme(checked ? "dark" : "light")}
        aria-label="Toggle dark mode"
        className={cn(
          "relative cursor-pointer rounded-full border border-[var(--border)]",
          "bg-[var(--muted)] data-[checked]:bg-[var(--primary)] transition-colors",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
          "focus-visible:outline-[var(--ring)]",
          SIZES[size].switch
        )}
      >
        <Switch.Thumb
          className={cn(
            "absolute top-1/2 -translate-y-1/2 rounded-full bg-[var(--card)]",
            "shadow-md transition-transform duration-200 ease-in-out",
            SIZES[size].thumb
          )}
        />
      </Switch.Root>

      {/* Optional label */}
      {showLabel && (
        <span className="text-sm font-medium text-[var(--foreground)]">
          {isDark ? "Dark" : "Light"}
        </span>
      )}
    </div>
  );
}

export default ThemeToggle;