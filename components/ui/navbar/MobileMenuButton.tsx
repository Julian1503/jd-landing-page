import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { MobileMenuButtonProps } from "@/components/ui/navbar";
import { memo } from "react";

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
const MobileMenuButton = memo(({ isOpen, onToggle }: MobileMenuButtonProps) => {
  return (
    <motion.button
      onClick={onToggle}
      className="p-2 hover:bg-[var(--muted)] rounded-lg transition-colors"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle menu"
    >
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.div
            key="close"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <X size={24} />
          </motion.div>
        ) : (
          <motion.div
            key="menu"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.2 }}
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
