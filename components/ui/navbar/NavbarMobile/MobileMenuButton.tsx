import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { MobileMenuButtonProps } from "@/components/ui/navbar";
import { memo, RefObject } from "react";
import { usePrefersReducedMotion } from "@/hooks";

/**
 * Animated button that toggles the mobile navigation menu.
 *
 * Uses Framer Motion for smooth icon transitions between the "Menu" and "Close" states.
 * 
 * - When `isOpen` is true → shows the `X` (close) icon.
 * - When `isOpen` is false → shows the `Menu` icon.
 * 
 * Includes scale and rotation animations for better tactile feedback.
 *
 * @param {MobileMenuButtonProps} props - Component props.
 * @param {boolean} props.isOpen - Whether the mobile menu is currently open.
 * @param {() => void} props.onToggle - Function to toggle the menu state.
 * @returns {JSX.Element} The animated toggle button.
 */
const MobileMenuButton = memo(({ isOpen, onToggle, triggerRef }: MobileMenuButtonProps) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const durationTime = prefersReducedMotion ? 0 : 0.2;
  const buttonRef = triggerRef as RefObject<HTMLButtonElement | null>;
  
  return (
    <motion.button
      ref={buttonRef}
      onClick={onToggle}
      aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
      aria-expanded={isOpen}
      aria-controls="mobile-menu-panel"
      aria-haspopup="dialog"
      className="p-2 hover:bg-muted rounded-lg transition-colors"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      type="button"
    >
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.div
            key="close"
            aria-hidden="true"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: durationTime }}
          >
            <X size={24} />
          </motion.div>
        ) : (
          <motion.div
            key="menu"
            aria-hidden="true"  
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: durationTime }}
            style={{ willChange: "transform" }}
          >
            <Menu size={24} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
});
MobileMenuButton.displayName = "MobileMenuButton";
export default MobileMenuButton;
