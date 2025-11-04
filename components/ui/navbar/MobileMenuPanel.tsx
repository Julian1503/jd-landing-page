"use client";

import { motion } from "framer-motion";
import { SignedIn } from "@clerk/nextjs";
import {
  MobileMenuNavigation,
  MobileMenuPanelProps,
  MobileMenuUserHeader,
  MobileMenuAccountSection,
} from "@/components/ui/navbar";
import { useEscapeKey, useFocusTrap, useHeaderHeight } from "@/hooks";

/**
 * Sliding panel component for the mobile navigation menu.
 *
 * This component represents the main animated sidebar that appears
 * when the mobile menu is opened. It contains the user's profile header,
 * navigation links, and account management actions.
 *
 * - Uses `Framer Motion` for smooth slide-in and slide-out transitions.
 * - Adjusts its top position dynamically based on the header height via `useHeaderHeight()`.
 * - Displays different content depending on authentication state (via Clerk’s `SignedIn`).
 *
 * @param {MobileMenuPanelProps} props - Component props.
 * @param {Array} props.items - List of navigation sections and their links.
 * @param {() => void} props.onClose - Function to close the panel when an item is clicked.
 * @returns {JSX.Element} The animated mobile menu panel.
 */
const MobileMenuPanel = ({ items = [], onClose, triggerRef }: MobileMenuPanelProps) => {
  const headerHeight = useHeaderHeight();
  
  const panelRef = useFocusTrap(true, triggerRef);
  useEscapeKey(onClose);

  return (
    <motion.div
      ref={triggerRef}
      id="mobile-menu-panel"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation menu"
      aria-labelledby="mobile-menu-heading"
      aria-describedby="mobile-menu-desc"
      className="fixed right-0 z-50 w-[85vw] max-w-sm bg-[var(--background)] shadow-xl overflow-y-auto border-l border-[var(--border)]"
      style={{
        top: `${headerHeight}px`,
        height: `calc(100vh - ${headerHeight}px)`,
      }}
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{
        type: "spring",
        damping: 25,
        stiffness: 200,
      }}
    >
      <p id="mobile-menu-desc" className="sr-only">
        Use the Escape key or tap outside to close the mobile menu.
      </p>
      <SignedIn>
        <MobileMenuUserHeader />
      </SignedIn>

      <nav className="p-6">
        <MobileMenuNavigation items={items} onItemClick={onClose} />
        <MobileMenuAccountSection onClose={onClose} />
      </nav>
    </motion.div>
  );
};

export default MobileMenuPanel;
