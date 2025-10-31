"use client";

import { useEffect, useState } from "react";
import {Switch} from "@base-ui-components/react/switch";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const apply = (isDark: boolean) => setTheme(isDark ? "dark" : "light");
    apply(mq.matches);
    const onChange = (e: MediaQueryListEvent) => apply(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <div className="flex items-center gap-2">
      {theme === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
      <Switch.Root
        checked={theme === "dark"}
        onCheckedChange={(checked: boolean) => setTheme(checked ? "dark" : "light")}
        className="
        relative h-5 w-10 cursor-pointer rounded-full border border-[var(--border)]
        bg-[var(--muted)] data-[checked]:bg-[var(--primary)] transition-colors
        "
      >
        <Switch.Thumb
          className="
            absolute top-1/2 left-0.5 h-4 w-4 -translate-y-1/2
            rounded-full bg-[var(--card)] shadow
            transition-transform duration-200
            data-[checked]:translate-x-5
          "
        />
        <span className="sr-only">Toggle dark mode</span>
      </Switch.Root>
    </div>
  );
}
