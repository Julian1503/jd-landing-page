import { LOGO_RING_STYLES, LOGO_SIZES, LOGO_SUBTEXT_STYLES, LOGO_TEXT_STYLES } from "./constants";

/**
 * Props for the reusable `Logo` component.
 *
 * Defines all configurable options for rendering a brand logo
 * with an image and optional text/subtext labels.
 *
 * @property {string} [href] - Optional link URL that wraps the logo.
 * @property {string} imageSrc - Path or URL to the logo image.
 * @property {string} imageAlt - Accessible alt text for the logo image.
 * @property {LogoSize} [size] - Controls overall logo size ("sm" | "md" | "lg").
 * @property {boolean} [showText] - Whether to display the text next to the logo image.
 * @property {string} [text] - Main text label (e.g., company or app name).
 * @property {string} [subtext] - Optional secondary text (e.g., tagline or version).
 * @property {string} [className] - Additional CSS classes for the wrapper element.
 * @property {string} [imageClassName] - Additional CSS classes for the image element.
 * @property {string} [textClassName] - Additional CSS classes for the text element.
 */
type LogoProps = {
  href?: string;
  imageSrc: string;
  imageAlt: string;
  size?: LogoSize;
  ringStyle?: LogoRingStyle;
  showText?: boolean;
  text?: string;
  textStyle?: LogoTextStyle;
  subtext?: string;
  subtextStyle?: LogoSubtextStyle;
  className?: string;
  imageClassName?: string;
  textClassName?: string;
};

/** Union of available logo size keys (e.g., "sm", "md", "lg"). */
type LogoSize = keyof typeof LOGO_SIZES;

/** Union of available ring style keys (e.g., "default", "primary", "none"). */
type LogoRingStyle = keyof typeof LOGO_RING_STYLES;

/** Union of available text style keys for the main label. */
type LogoTextStyle = keyof typeof LOGO_TEXT_STYLES;

/** Union of available subtext style keys for the tagline. */
type LogoSubtextStyle = keyof typeof LOGO_SUBTEXT_STYLES;

export type {
  LogoProps,
  LogoSize,
  LogoRingStyle,
  LogoTextStyle,
  LogoSubtextStyle
}