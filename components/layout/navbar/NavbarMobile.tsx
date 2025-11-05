"use client";

import { cn } from "@/lib/utils";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MobileMenuButton from "@/components/ui/navbar/MobileMenuButton";
import { NavbarMobileProps } from "./types";
import { usePrefersReducedMotion } from "@/hooks";
import { useNavbarMobile } from "@/hooks/useNavbarMobile";

const MobileMenuOverlay = lazy(
  () => import("@/components/ui/navbar/MobileMenuOverlay")
);
const MobileMenuPanel = lazy(
  () => import("@/components/ui/navbar/MobileMenuPanel")
);

/**
 * Mobile version of the main navigation bar.
 *
 * - Renders a responsive mobile header with a toggleable slide-in menu.
 * - Uses `Framer Motion` for smooth animations and `React.lazy` with `Suspense`
 *   for on-demand loading of the overlay and panel components.
 * - Manages open/close state locally with React’s `useState`.
 *
 * ### Features:
 * - Lazy-loads `MobileMenuOverlay` and `MobileMenuPanel` for performance optimization.
 * - Uses `MobileMenuButton` to toggle menu visibility.
 * - Includes fade-in and slide transitions for a polished UX.
 *
 * @param {NavbarMobileProps} props - Component props.
 * @param {Array} props.items - Navigation items displayed inside the mobile menu.
 * @param {string} [props.className] - Optional custom class for the root container.
 * @returns {JSX.Element} The responsive mobile navigation bar.
 */
const NavbarMobile = ({ items, className }: NavbarMobileProps) => {
  const { isOpen, triggerRef, handleClose, handleToggle } = useNavbarMobile();
  const prefersReducedMotion = usePrefersReducedMotion();
  const duration = prefersReducedMotion ? 0 : 0.2;
  const [shouldPreload, setShouldPreload] = useState(false);

  useEffect(() => {
    if (shouldPreload) {
      import("@/components/ui/navbar/MobileMenuOverlay");
      import("@/components/ui/navbar/MobileMenuPanel");
    }
  }, [shouldPreload]);

  return (
    <div
      className="md:hidden h-full w-full"
      onPointerEnter={() => setShouldPreload(true)}
    >
      <motion.div
        ref={triggerRef}
        className={cn(
          "flex items-center justify-end rounded-md p-2 ",
          "bg-background text-[var(--foreground)] border-[var(--border)]",
          className
        )}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: duration }}
      >
        <MobileMenuButton
          isOpen={isOpen}
          triggerRef={triggerRef}
          onToggle={handleToggle}
          aria-controls="mobile-menu-panel"
          aria-expanded={isOpen}
        />
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <Suspense fallback={null}>
            <>
              <MobileMenuOverlay onClose={handleClose} />
              <MobileMenuPanel
                triggerRef={triggerRef}
                items={items}
                onClose={handleClose}
              />
            </>
          </Suspense>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NavbarMobile;
