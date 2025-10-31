import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import {
  MOBILE_SECTION_TITLE_CLASS,
  MOBILE_NAV_ITEM_CLASS, 
  NAV_ICON_CLASS,
  MobileMenuNavigationProps,
  getStaggerDelay,
} from "@/components/ui/navbar";

/**
 * Mobile navigation section with animated links.
 * Renders navigation items and sub-links using Framer Motion.
 *
 * @param {MobileMenuNavigationProps} props
 * @returns {JSX.Element}
 */

const MobileMenuNavigation = ({
  items,
  onItemClick,
}: MobileMenuNavigationProps) => {
  return (
    <div className="mb-4">
      <h3 className={MOBILE_SECTION_TITLE_CLASS}>Navigation</h3>
      <div className="space-y-1">
        {items.map((item, idx) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: getStaggerDelay(idx),
              duration: 0.3,
            }}
          >
            {item.href && !item.links ? (
              <motion.a
                href={item.href}
                onClick={onItemClick}
                className={MOBILE_NAV_ITEM_CLASS}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>{item.name}</span>
                <ChevronRight
                  size={16}
                  className={NAV_ICON_CLASS}
                />
              </motion.a>
            ) : (
              <div className="py-2">
                <div className="font-semibold px-4 py-2 text-[var(--foreground)]">
                  {item.name}
                </div>
                {item.links?.map((link, linkIdx) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={onItemClick}
                    className="block py-2.5 px-4 ml-2 rounded-lg hover:bg-[var(--muted)] transition-colors group"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: getStaggerDelay(idx) + linkIdx * 0.03,
                      duration: 0.3,
                    }}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="font-medium text-sm flex items-center justify-between">
                      {link.title}
                      <ChevronRight
                        size={14}
                        className={NAV_ICON_CLASS}
                      />
                    </div>
                    <div className="text-xs text-[var(--muted-foreground)] mt-1">
                      {link.description}
                    </div>
                  </motion.a>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MobileMenuNavigation;
