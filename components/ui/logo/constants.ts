/**
 * Predefined responsive size classes for the logo image container.
 *
 * Used to control the logo’s width and height at different breakpoints.
 */
const LOGO_SIZES = {
  sm: "w-8 h-8 md:w-10 md:h-10",
  md: "w-10 h-10 md:w-12 md:h-12",
  lg: "w-12 h-12 md:w-16 md:h-16",
  xl: "w-16 h-16 md:w-20 md:h-20",
} as const;

/**
 * Ring/border visual styles applied to the logo image.
 * Controls color and hover states.
 */
const LOGO_RING_STYLES = {
  default: "ring-2 ring-gray-200 hover:ring-gray-300",
  primary: "ring-2 ring-blue-200 hover:ring-blue-300",
  secondary: "ring-2 ring-purple-200 hover:ring-purple-300",
  none: "ring-0",
} as const;

/**
 * Typography presets for the main logo text.
 * Each style defines weight, size, and color intensity.
 */
const LOGO_TEXT_STYLES = {
  primary: "font-bold text-lg leading-tight text-gray-900",
  secondary: "font-semibold text-base leading-tight text-gray-800",
  light: "font-medium text-sm leading-tight text-gray-700",
} as const;

/**
 * Typography presets for the logo subtext (tagline or version).
 */
const LOGO_SUBTEXT_STYLES = {
  default: "text-xs text-gray-600 leading-tight",
  muted: "text-xs text-gray-500 leading-tight",
  primary: "text-xs text-blue-600 leading-tight",
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
}