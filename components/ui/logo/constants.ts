/**
 * Predefined responsive size classes for the logo image container.
 *
 * Used to control the logo's width and height at different breakpoints.
 */
const LOGO_SIZES = {
  sm: "w-8 h-8 md:w-9 md:h-9",
  md: "w-10 h-10 md:w-11 md:h-11",
  lg: "w-12 h-12 md:w-14 md:h-14",
  xl: "w-16 h-16 md:w-20 md:h-20",
} as const;

/**
 * Ring/border visual styles applied to the logo image.
 * Controls color and hover states using design system variables.
 */
const LOGO_RING_STYLES = {
  default: "ring-2 ring-[var(--border)] hover:ring-[var(--ring)]",
  primary: "ring-2 ring-[var(--primary)]/20 hover:ring-[var(--primary)]/40",
  accent: "ring-2 ring-[var(--accent)]/30 hover:ring-[var(--accent)]/50",
  none: "ring-0",
} as const;

/**
 * Typography presets for the main logo text.
 * Each style defines weight, size, and color using design system variables.
 */
const LOGO_TEXT_STYLES = {
  primary: "font-bold text-base md:text-lg leading-none text-foreground",
  secondary: "font-semibold text-sm md:text-base leading-none text-[var(--muted-foreground)]",
  accent: "font-bold text-base md:text-lg leading-none text-[var(--accent)]",
} as const;

/**
 * Typography presets for the logo subtext (tagline or version).
 * Uses design system variables for consistent theming.
 */
const LOGO_SUBTEXT_STYLES = {
  default: "text-xs md:text-sm leading-none text-[var(--muted-foreground)]",
  muted: "text-xs md:text-sm leading-none text-[var(--muted-foreground)]/70",
  accent: "text-xs md:text-sm leading-none text-[var(--accent)]",
} as const;

/**
 * Default configuration for the `Logo` component.
 * Used as fallback values when props are not provided.
 */
const LOGO_DEFAULTS = {
  href: "/",
  size: "md" as const,
  showText: false,
  ringStyle: "default" as const,
  textStyle: "primary" as const,
  subtextStyle: "default" as const,
} as const;

export {
  LOGO_DEFAULTS,
  LOGO_RING_STYLES,
  LOGO_SIZES,
  LOGO_SUBTEXT_STYLES,
  LOGO_TEXT_STYLES,
};