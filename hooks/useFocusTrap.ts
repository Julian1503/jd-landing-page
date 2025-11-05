"use client";
import { useEffect, useRef, RefObject } from "react";

/**
 * Trap focus inside a container (e.g., mobile menu or modal)
 * and restore it to the trigger element when closed.
 */
export function useFocusTrap<T extends HTMLElement = HTMLElement>(
  isActive: boolean,
  triggerRef?: RefObject<T  | null>
) {
  const containerRef = useRef<T>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!isActive || !container) return;

    const focusable = container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );

    const previouslyFocused = document.activeElement as HTMLElement;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    
    if (first) first.focus();
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || focusable.length === 0) return;

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };

    container.addEventListener("keydown", handleKeyDown);
    return () => {
      container.removeEventListener("keydown", handleKeyDown);
      if (previouslyFocused && previouslyFocused.focus) {
        previouslyFocused.focus();
      } else if (triggerRef?.current?.focus) {
        triggerRef.current.focus();
      }
    };
  }, [isActive, triggerRef]);

  return containerRef;
}
