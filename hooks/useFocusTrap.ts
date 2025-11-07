"use client";
import { useEffect, useRef, RefObject } from "react";

/**
 * Trap focus inside a container (e.g., mobile menu or modal)
 * and restore it to the trigger element when closed.
 */
export function useFocusTrap<T extends HTMLElement = HTMLElement>(
  isActive: boolean,
  triggerRef?: RefObject<T | null>
) {
  const containerRef = useRef<T>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!isActive || !container) return;

    const timeoutId = setTimeout(() => {
      const focusable = container.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'
      );

      const previouslyFocused = document.activeElement;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      
      if (first && typeof first.focus === "function") {
        first.focus();
      }

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

        if (
          previouslyFocused &&
          previouslyFocused instanceof HTMLElement &&
          typeof previouslyFocused.focus === "function" &&
          document.body.contains(previouslyFocused) &&
          previouslyFocused !== document.body
        ) {
          requestAnimationFrame(() => {
            try {
              (previouslyFocused as HTMLElement).focus({ preventScroll: true });
            } catch (error) {
              // Silenciar errores de focus
              console.debug("Could not restore focus:", error);
            }
          });
        } else if (
          triggerRef?.current &&
          typeof triggerRef.current.focus === "function" &&
          document.body.contains(triggerRef.current)
        ) {
          requestAnimationFrame(() => {
            try {
              triggerRef.current?.focus({ preventScroll: true });
            } catch (error) {
              console.debug("Could not focus trigger:", error);
            }
          });
        }
      };
    }, 100); 

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isActive, triggerRef]);

  return containerRef;
}