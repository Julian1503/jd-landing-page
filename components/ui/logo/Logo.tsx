import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  LOGO_SIZES,
  LOGO_RING_STYLES,
  LOGO_TEXT_STYLES,
  LOGO_SUBTEXT_STYLES,
  LOGO_DEFAULTS,
  LogoProps,
} from "@/components/ui/logo";

/**
 * Reusable `Logo` component that displays a brand image with optional text and subtext.
 *
 * - Supports dynamic sizing, ring styles, and typography presets via constants.
 * - Can optionally wrap the logo in a clickable `Link` when `href` is provided.
 * - Uses Next.js `Image` for optimized image loading.
 *
 * ### Features:
 * - Adjustable size (`sm`, `md`, `lg`) via `LOGO_SIZES`.
 * - Customizable ring borders, text, and subtext styles.
 * - Optional hover scaling animation when wrapped in a link.
 *
 * @param {LogoProps} props - Component properties.
 * @param {string} [props.href] - Optional URL that wraps the logo in a Next.js `Link`.
 * @param {string} props.imageSrc - Path or URL to the logo image.
 * @param {string} props.imageAlt - Accessible description for the image.
 * @param {LogoSize} [props.size] - Predefined size key controlling logo dimensions.
 * @param {LogoRingStyle} [props.ringStyle] - Visual ring style around the logo image.
 * @param {boolean} [props.showText] - Whether to display text and/or subtext next to the image.
 * @param {string} [props.text] - Primary label (e.g., brand or product name).
 * @param {LogoTextStyle} [props.textStyle] - Preset typography style for the main text.
 * @param {string} [props.subtext] - Secondary label (e.g., tagline).
 * @param {LogoSubtextStyle} [props.subtextStyle] - Preset typography style for the subtext.
 * @param {string} [props.className] - Optional custom classes for the wrapper element.
 * @param {string} [props.imageClassName] - Optional custom classes for the image container.
 * @param {string} [props.textClassName] - Optional custom classes for the text container.
 *
 * @returns {JSX.Element} The rendered logo element, optionally wrapped in a link.
 */

const Logo = ({
  href = LOGO_DEFAULTS.href,
  imageSrc,
  imageAlt,
  size = LOGO_DEFAULTS.size,
  ringStyle = LOGO_DEFAULTS.ringStyle,
  showText = LOGO_DEFAULTS.showText,
  text,
  textStyle = LOGO_DEFAULTS.textStyle,
  subtext,
  subtextStyle = LOGO_DEFAULTS.subtextStyle,
  className,
  imageClassName,
  textClassName,
}: LogoProps) => {
  if (!imageSrc || typeof imageSrc !== "string") {
    console.error("Logo: imageSrc is required and must be a string");
    return null;
  }

  if (!imageAlt) {
    console.warn("Logo: imageAlt is recommended for accessibility");
  }
  const content = (
    <figure
      role="group"
      className={cn("flex items-center p-3 gap-3", className)}
    >
      <div
        className={cn(
          "relative rounded-full overflow-hidden transition-all flex-shrink-0",
          LOGO_SIZES[size],
          LOGO_RING_STYLES[ringStyle],
          imageClassName
        )}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover"
          priority={href === "/"} 
        />
      </div>

      {showText && (text || subtext) && (
        <figcaption className={cn("flex flex-col", textClassName)}>
          {text && <span className={LOGO_TEXT_STYLES[textStyle]}>{text}</span>}
          {subtext && (
            <span className={LOGO_SUBTEXT_STYLES[subtextStyle]}>{subtext}</span>
          )}
        </figcaption>
      )}
    </figure>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="transition-transform hover:scale-105 active:scale-95 inline-block"
        aria-label={showText ? undefined : `Navigate to ${text || imageAlt}`}
      >
        {content}
      </Link>
    );
  }

  return content;
};

export default Logo;
