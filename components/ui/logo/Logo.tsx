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
      className={cn("flex items-center gap-3", className)}
    >
      <div
        className={cn(
          "relative rounded-full overflow-hidden transition-all shrink-0",
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
        <figcaption className={cn("flex flex-col gap-0.5", textClassName)}>
          {text && (
            <span className={cn(LOGO_TEXT_STYLES[textStyle], "block")}>
              {text}
            </span>
          )}
          {subtext && (
            <span className={cn(LOGO_SUBTEXT_STYLES[subtextStyle], "block")}>
              {subtext}
            </span>
          )}
        </figcaption>
      )}
    </figure>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="inline-flex transition-transform hover:scale-105 active:scale-95"
        aria-label={showText ? undefined : `Navigate to ${text || imageAlt}`}
      >
        {content}
      </Link>
    );
  }

  return content;
};

export default Logo;