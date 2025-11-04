import { LayoutType, NavbarMenuItemProps } from "./types";

/**
 * Returns the appropriate Tailwind CSS class string for a navigation container
 * based on layout type and grid column count.
 *
 * - `"list"` → Vertical list layout using flexbox.
 * - `"grid"` or `"auto"` → Responsive grid with dynamic column widths.
 *
 * @param {LayoutType} layout - The chosen layout type ("grid", "list", or "auto").
 * @param {number} gridCols - Number of columns for the grid layout.
 * @returns {string} Tailwind class string defining layout behavior.
 */
const getContainerClass = (layout: LayoutType, gridCols: number): string => {
  if (layout === "list") {
    return "flex w-full list-none flex-col gap-0";
  }

  const colTemplate = Array(gridCols).fill("12rem").join("_");
  const gridColsClass = `sm:grid-cols-[${colTemplate}]` as const;

  return `grid w-full list-none grid-cols-1 gap-0 ${gridColsClass}`;
};

/**
 * Determines the layout type for a group of navigation links.
 *
 * - If `layout` is explicitly set (not `"auto"`), it returns that value.
 * - Otherwise, it infers layout based on the number of links:
 *   - 4 or fewer links → `"grid"`
 *   - More than 4 links → `"list"`
 *
 * @param {NavbarMenuItemProps["links"]} links - Array of navigation links.
 * @param {NavbarMenuItemProps["layout"]} layout - Desired layout or "auto" to infer.
 * @returns {LayoutType} The computed layout type.
 */
const determineLayout = (
  links: NavbarMenuItemProps["links"],
  layout: NavbarMenuItemProps["layout"]
): LayoutType => {
  if (layout && layout !== "auto") return layout;
  return (links?.length || 0) <= 4 ? "grid" : "list" as const;
};

/**
 * Computes a staggered animation delay for sequential motion effects.
 *
 * Useful for animating lists where each item enters with a slight delay.
 *
 * @param {number} index - Position of the element in the sequence.
 * @param {number} [baseDelay=0.15] - Starting delay before the first element animates.
 * @param {number} [increment=0.05] - Additional delay added per index step.
 * @returns {number} The computed delay in seconds.
 */
const getStaggerDelay = (
  index: number,
  baseDelay = 0.15,
  increment = 0.05
): number => {
  return baseDelay + index * increment;
};

/**
 * Generates a unique React key for a navigation link.
 *
 * Combines the link's `href` and its index to ensure deterministic uniqueness.
 *
 * @param {string} href - The link's destination URL.
 * @param {number} index - Index of the link in its list.
 * @returns {string} A unique key string.
 */
const generateLinkKey = (href: string, index: number): string =>
  `${href}-${index}` as const;

export { determineLayout, getStaggerDelay, generateLinkKey, getContainerClass };
