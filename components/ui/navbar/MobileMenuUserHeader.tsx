import { motion } from "framer-motion";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { usePrefersReducedMotion } from "@/hooks";
import { ThemeToggle } from "../toogle";

/**
 * Header section of the mobile navigation menu displaying the current user's info.
 *
 * Fetches user data from Clerk using `useUser()` and renders:
 * - The user's profile image (or a default avatar if unavailable).
 * - The user's full name.
 * - The user's primary email or username.
 *
 * Includes a subtle fade-in and slide-down animation using Framer Motion,
 * and applies a soft gradient background to visually separate the section.
 *
 * @returns {JSX.Element} The animated user header section for the mobile menu.
 */

const MobileMenuUserHeader = () => {
  const { user } = useUser();
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <motion.div 
      role="group"
      aria-label="User account information"
      className="p-6 border-b border-border bg-linear-to-br from-primary/10 to-transparent"
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={prefersReducedMotion ? { duration: 0 } : { delay: 0.1 }}
    >
      <div className="flex items-center gap-3">
        <div className="h-14 w-14 rounded-full overflow-hidden 
        ring-2 ring-primary/20 shrink-0">
          <Image
            src={user?.imageUrl || "/images/avatar-default.svg"}
            alt={user?.fullName ? `${user.fullName}'s avatar` : "User avatar"}
            width={56}
            height={56}
            className="object-cover"
          />
        </div>
        <div className="flex-1 flex flex-col justify-center min-w-0">
          <p className="font-semibold text-base">{user?.fullName || "User"}</p>
          <p className="text-sm text-muted-foreground">
            {user?.primaryEmailAddress?.emailAddress || user?.username}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default MobileMenuUserHeader;