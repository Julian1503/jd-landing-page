import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { memo } from "react";
import {
  MOBILE_SECTION_TITLE_CLASS,
  MOBILE_NAV_ITEM_CLASS,
  NAV_ICON_CLASS,
} from "@/components/ui/navbar/constants";
import { MobileMenuNavigationProps, MobileNavigationItem } from "@/components/ui/navbar/types";
import { getStaggerDelay } from "@/components/ui/navbar/utils";
import { usePrefersReducedMotion } from "@/hooks";

/**
 * Convert NavbarMenuItemProps to MobileNavigationItem
 */
const convertToMobileItem = (item: any): MobileNavigationItem => ({
  title: item.name || item.title,
  href: item.href,
  description: item.description,
  icon: item.icon,
  children: item.links?.map(convertToMobileItem) || item.children,
});

/**
 * Mobile navigation section with animated links and drill-down support.
 */
const MobileMenuNavigation = memo(({
  items,
  onItemClick,
  navigationState,
  onNavigateToSubmenu,
  onNavigateBack,
}: MobileMenuNavigationProps) => {
  const prefersReducedMotion = usePrefersReducedMotion();

  // Convert items to unified format
  const convertedItems = items.map(convertToMobileItem);

  // Determine which items to display
  const displayItems: MobileNavigationItem[] = navigationState.currentItem
    ? navigationState.currentItem.children || []
    : convertedItems;

  const isInSubmenu = navigationState.currentItem !== null;

  return (
    <section aria-labelledby="mobile-nav-heading">
      <AnimatePresence mode="wait">
        <motion.div
          key={navigationState.currentItem?.title || "root"}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
        >
          {/* Back button when in submenu */}
          {isInSubmenu && (
            <motion.button
              onClick={onNavigateBack}
              className="flex items-center gap-2 py-3 px-4 mb-4 rounded-lg hover:bg-muted transition-colors font-medium w-full text-left"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: prefersReducedMotion ? 0 : 0.1 }}
              whileHover={prefersReducedMotion ? undefined : { x: -4 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
            >
              <ChevronLeft
                size={20}
                aria-hidden="true"
                className={NAV_ICON_CLASS}
              />
              <span>Back</span>
            </motion.button>
          )}

          {/* Section title */}
          <h3 id="mobile-nav-heading" className={MOBILE_SECTION_TITLE_CLASS}>
            {navigationState.currentItem?.title || "Navigation"}
          </h3>

          <div className="space-y-1">
            {displayItems.map((item, idx) => {
              const hasChildren = item.children && item.children.length > 0;
              const hasHref = item.href && item.href.trim() !== "";

              return (
                <motion.div
                  key={`${item.title}-${idx}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: prefersReducedMotion ? 0 : getStaggerDelay(idx),
                    duration: prefersReducedMotion ? 0 : 0.3,
                  }}
                >
                  {!hasChildren && hasHref ? (
                    // Direct link without submenu
                    <motion.a
                      href={item.href}
                      onClick={onItemClick}
                      className={`${MOBILE_NAV_ITEM_CLASS} block`}
                      whileHover={prefersReducedMotion ? undefined : { x: 4 }}
                      whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex-1">
                          <span className="font-medium text-sm">{item.title}</span>
                          {item.description && (
                            <p className="text-xs text-muted-foreground mt-1">
                              {item.description}
                            </p>
                          )}
                        </div>
                        <ChevronRight
                          size={16}
                          aria-hidden="true"
                          className={NAV_ICON_CLASS}
                        />
                      </div>
                    </motion.a>
                  ) : hasChildren ? (
                    // Item with submenu - navigate to it
                    <motion.button
                      onClick={() => onNavigateToSubmenu(item)}
                      className={`${MOBILE_NAV_ITEM_CLASS} w-full text-left`}
                      whileHover={prefersReducedMotion ? undefined : { x: 4 }}
                      whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex-1">
                          <span className="font-medium text-sm">{item.title}</span>
                          {item.description && (
                            <p className="text-xs text-muted-foreground mt-1">
                              {item.description}
                            </p>
                          )}
                        </div>
                        <ChevronRight
                          size={16}
                          aria-hidden="true"
                          className={NAV_ICON_CLASS}
                        />
                      </div>
                    </motion.button>
                  ) : (
                    // Item without href and without children (shouldn't happen, but handle it)
                    <div className={`${MOBILE_NAV_ITEM_CLASS} opacity-50 cursor-not-allowed`}>
                      <div className="flex-1">
                        <span className="font-medium text-sm">{item.title}</span>
                        {item.description && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
});

MobileMenuNavigation.displayName = "MobileMenuNavigation";

export default MobileMenuNavigation;