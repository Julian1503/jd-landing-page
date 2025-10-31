import { motion } from "framer-motion";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";

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

  return (
    <motion.div 
      className="p-6 border-b border-[var(--border)] bg-gradient-to-br from-[var(--primary)]/10 to-transparent"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <div className="flex items-center gap-3">
        <div className="h-14 w-14 rounded-full overflow-hidden ring-2 ring-[var(--primary)]/20">
          <Image
            src={user?.imageUrl || "/images/avatar-default.svg"}
            alt="User avatar"
            width={56}
            height={56}
            className="object-cover"
          />
        </div>
        <div>
          <p className="font-semibold text-base">{user?.fullName || "User"}</p>
          <p className="text-sm text-[var(--muted-foreground)]">
            {user?.primaryEmailAddress?.emailAddress || user?.username}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default MobileMenuUserHeader;