import { NavbarLinkContentProps } from "@/components/ui/navbar";
import { memo } from "react";
import DOMPurify from 'isomorphic-dompurify';

/**
 * Reusable content layout for navigation links in the navbar.
 *
 * Displays an optional icon next to a title and description, maintaining
 * consistent spacing and typography for all link items.
 *
 * - If `icon` is provided, it renders on the left with a slight vertical offset.
 * - The `title` is styled prominently as the main label.
 * - The optional `description` is shown below in a muted smaller font.
 *
 * @param {NavbarLinkContentProps} props - Component props.
 * @param {string} props.title - The main label of the navigation link.
 * @param {string} [props.description] - Optional secondary text below the title.
 * @param {React.ReactNode} [props.icon] - Optional icon element displayed before the text.
 * @returns {JSX.Element} The formatted link content block.
 */

const NavbarLinkContent = memo(
  ({ title, description, icon }: NavbarLinkContentProps) => (
    <div className="flex items-start gap-3">
      {icon && (
        <div className="mt-0.5" aria-hidden="true">
          {icon}
        </div>
      )}
      <div>
        <span className="block mb-1 text-base leading-5 font-medium">
          {title}
        </span>
        {description && (
          <p
            className="m-0 text-sm leading-5 text-gray-500"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(description || ""),
            }}
          />
        )}
      </div>
    </div>
  )
);

NavbarLinkContent.displayName = "NavbarLinkContent";
export default NavbarLinkContent;
