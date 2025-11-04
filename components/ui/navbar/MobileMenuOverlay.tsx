"use client";

import { motion } from "framer-motion";
import { MobileMenuOverlayProps } from "@/components/ui/navbar";
import { useHeaderHeight, useEscapeKey, useScrollLock, usePrefersReducedMotion } from "@/hooks";

/**
 * Semi-transparent animated overlay displayed behind the mobile navigation menu.
 *
 * Adjusts its position dynamically based on the current header height,
 * ensuring it starts below the fixed header and covers the remaining viewport area.
 *
 * - Fades in/out using Framer Motion transitions.
 * - Closes the menu when clicked anywhere on the overlay.
 *
 * @param {MobileMenuOverlayProps} props - Component props.
 * @param {() => void} props.onClose - Function triggered when the overlay is clicked.
 * @returns {JSX.Element} The animated overlay element.
 */
const MobileMenuOverlay = ({ onClose }: MobileMenuOverlayProps) => {
  const headerHeight = useHeaderHeight();
  const prefersReducedMotion = usePrefersReducedMotion();

  useEscapeKey(onClose);
  useScrollLock();
  

  return (
    <motion.div
      className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
      style={{
        top: `${headerHeight}px`,
        height: `calc(100vh - ${headerHeight}px)`,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
      onClick={onClose}
      aria-hidden="true"
      role="presentation"
    />
  );
};

export default MobileMenuOverlay;
