"use client";
import { useCallback, useRef, useState } from "react";
import { usePrefersReducedMotion } from "./usePrefersReduceMotion";

export function useNavbarMobile() {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const handleClose = useCallback(() => setIsOpen(false), []);
  const handleToggle = useCallback(() => setIsOpen(prev => !prev), []);

  return {
    isOpen,
    triggerRef,
    prefersReducedMotion,
    handleClose,
    handleToggle
  };
}