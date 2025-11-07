
/**
 * Shared icon style for navigation items (gray by default, foreground on hover).
 */
const MOBILE_ICON_CLASS =
  "text-[var(--muted-foreground)] group-hover:text-foreground transition-colors";

/**
 * Base button style used in mobile and account menu items.
 */
const MOBILE_BUTTON_BASE_CLASS =
  "flex items-center gap-3 w-full py-3 px-4 rounded-lg transition-colors group";

/**
 * Section title styling for mobile menu sections (uppercase, small text).
 */
const MOBILE_SECTION_TITLE_CLASS =
  "text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wider mb-3 px-2";

/**
 * Default mobile navigation item style for individual links.
 */
const MOBILE_NAV_ITEM_CLASS =
  "flex items-center justify-between py-3 px-4 rounded-lg hover:bg-muted transition-colors font-medium group";


export {
  MOBILE_ICON_CLASS,
  MOBILE_BUTTON_BASE_CLASS,
  MOBILE_NAV_ITEM_CLASS,
  MOBILE_SECTION_TITLE_CLASS,
};