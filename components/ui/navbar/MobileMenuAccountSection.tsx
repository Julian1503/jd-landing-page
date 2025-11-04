import { motion } from "framer-motion";
import { SignedIn, SignedOut, SignInButton, useClerk } from "@clerk/nextjs";
import { User, LogOut, Settings, ChevronRight } from "lucide-react";
import {
  MOBILE_SECTION_TITLE_CLASS,
  NAV_ICON_CLASS,
  NAV_BUTTON_BASE_CLASS,
  MobileMenuAccountSectionProps,
} from "@/components/ui/navbar";
import { usePrefersReducedMotion } from "@/hooks";

/**
 * Mobile account section for the navigation menu.
 * 
 * Displays user-related actions depending on authentication state:
 * - When signed in: shows "Manage account" and "Sign out" buttons.
 * - When signed out: shows a "Sign in" button that opens the Clerk modal.
 *
 * Includes smooth motion animations for better UX and integrates
 * Clerk's user profile and sign-out handling.
 *
 * @param {MobileMenuAccountSectionProps} props - Component props.
 * @param {() => void} props.onClose - Function to close the mobile menu after an action.
 * @returns {JSX.Element}
 */

const MobileMenuAccountSection = ({
  onClose,
}: MobileMenuAccountSectionProps) => {
  const { signOut, openUserProfile } = useClerk();
  const prefersReducedMotion = usePrefersReducedMotion();
  const delayTime = prefersReducedMotion ? 0 : 0.4;

  return (
    <>
      <SignedIn>
        <motion.div
          className="border-t border-[var(--border)] pt-4 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delayTime }}
        >
          <h3 className={MOBILE_SECTION_TITLE_CLASS}>Account</h3>
          <div className="space-y-1">
            <motion.button
              type="button"
              onClick={() => {
                openUserProfile();
                onClose();
              }}
              className={`${NAV_BUTTON_BASE_CLASS} hover:bg-[var(--muted)]`}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
            >
              <Settings
                size={18}
                aria-hidden="true"
                className={NAV_ICON_CLASS}
              />
              <span className="flex-1 text-left">Manage account</span>
              <ChevronRight
                size={16}
                aria-hidden="true"
                className={NAV_ICON_CLASS}
              />
            </motion.button>
            <motion.button
              type="button"
              onClick={() => signOut()}
              className={`${NAV_BUTTON_BASE_CLASS} hover:bg-red-500/10 text-red-600 hover:text-red-700`}
              whileHover={prefersReducedMotion ? undefined : { x: 4 }}
              whileTap={{ scale: 0.98 }}
            >
              <LogOut size={18}  aria-hidden="true" />
              <span className="flex-1 text-left">Sign out</span>
            </motion.button>
          </div>
        </motion.div>
      </SignedIn>

      <SignedOut>
        <motion.div
          className="border-t border-[var(--border)] pt-4 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delayTime }}
        >
          <SignInButton mode="modal">
            <motion.button
              type="button"
              className="flex items-center justify-center gap-3 w-full py-3 px-4 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[color-mix(in oklch, var(--primary) 90%, black 10%)] transition-colors font-medium"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <User size={18} />
              <span>Sign in to your account</span>
            </motion.button>
          </SignInButton>
        </motion.div>
      </SignedOut>
    </>
  );
};

export default MobileMenuAccountSection;
