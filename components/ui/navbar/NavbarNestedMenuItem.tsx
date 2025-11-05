import { NavigationMenu } from "@base-ui-components/react/navigation-menu";
import Link from "next/link";
import { ArrowIcon, ChevronRightIcon } from "@/components/icons";
import {
  NAV_LINK_CARD_CLASS,
  NAV_CONTENT_CLASS,
  NAV_POSITIONER_CLASS,
  NAV_POPUP_CLASS,
  NAV_ARROW_CLASS,
  NAV_ANIMATION_STYLE,
  NestedLink,
  NavbarLinkContent,
} from "@/components/ui/navbar";
import { usePrefersReducedMotion } from "@/hooks";
import { NavbarNestedMenuItemProps } from "./types";
import { useState } from "react";
import DOMPurify from 'isomorphic-dompurify';

/**
 * Recursive component that renders nested navigation menu items.
 *
 * Handles both simple links and multi-level dropdown structures:
 * - If the `link` has no children, it renders a simple `Link` with title, description, and icon.
 * - If the `link` has children, it renders a nested `NavigationMenu` that expands horizontally.
 *
 * Uses Base UI’s `NavigationMenu` primitives for accessible, animated submenus,
 * and supports recursive rendering of arbitrarily deep menu hierarchies.
 *
 * Includes visual cues such as:
 * - Chevron rotation when a submenu is expanded.
 * - Submenu popup with a right-side slide animation.
 *
 * @param {{ link: NestedLink }} props - Component props.
 * @param {NestedLink} props.link - The navigation link data, potentially containing child links.
 * @returns {JSX.Element} The rendered nested navigation item with optional submenu.
 */
const NavbarNestedMenuItem = ({ link, depth = 0 }: NavbarNestedMenuItemProps) => {
  const hasChildren = link.children && link.children.length > 0;
  const [isOpen, setIsOpen] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const Wrapper = depth === 0 ? NavigationMenu.Root : "div";
  if (!hasChildren) {
    return (
      <Link href={link.href ?? "#"} className={NAV_LINK_CARD_CLASS}>
        <NavbarLinkContent
          title={link.title}
          description={link.description}
          icon={link.icon}
        />
      </Link>
    );
  }

  return (
    <Wrapper
      {...(depth === 0
        ? { className: "list-none", orientation: "vertical" }
        : { role: "group", className: "flex flex-col" })}
    >
      <NavigationMenu.Item>
        <NavigationMenu.Trigger
          aria-haspopup="menu"
          aria-expanded={isOpen}
          onPointerEnter={() => setIsOpen(true)}
          onPointerLeave={() => setIsOpen(false)}
          className={NAV_LINK_CARD_CLASS}
        >
          <div className="flex items-start gap-3 w-full pr-8 cursor-pointer">
            {link.icon && (
              <div className="mt-0.5" aria-hidden="true">
                {link.icon}
              </div>
            )}
            <div className="flex-1 min-w-0 w-full">
              <span className="m-0 mb-1 text-base leading-5 font-medium block">
                {link.title}
              </span>
              {link.description && (
                <p
                  className="m-0 text-sm leading-5 text-gray-500"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(link.description || ""),
                  }}
                />
              )}
            </div>
            <div className="flex flex-1 items-center justify-end w-5">
              <NavigationMenu.Icon className="absolute top-1/2 right-2.5 flex h-2.5 w-2.5 -translate-y-1/2 items-center justify-center transition-transform duration-200 ease-in-out data-[popup-open]:rotate-180">
                <ChevronRightIcon aria-hidden="true" />
              </NavigationMenu.Icon>
            </div>
          </div>
        </NavigationMenu.Trigger>

        <NavigationMenu.Content className={NAV_CONTENT_CLASS}>
          <div className="flex flex-col justify-center gap-0">
            {link.children?.map((child, idx) => (
              <NavbarNestedMenuItem
                key={`${child.href}-${idx}`}
                link={child}
                depth={depth + 1}
              />
            ))}
          </div>
        </NavigationMenu.Content>
      </NavigationMenu.Item>

      {depth === 0 && (
        <NavigationMenu.Portal>
          <NavigationMenu.Positioner
            sideOffset={24}
            alignOffset={-24}
            align="end"
            side="right"
            className={NAV_POSITIONER_CLASS}
            style={
              prefersReducedMotion
                ? { transition: "none", animation: "none" }
                : NAV_ANIMATION_STYLE
            }
          >
            <NavigationMenu.Popup className={`${NAV_POPUP_CLASS} w-[300px]`}>
              <NavigationMenu.Arrow className={NAV_ARROW_CLASS}>
                <ArrowIcon aria-hidden="true" />
              </NavigationMenu.Arrow>
              <NavigationMenu.Viewport className="relative h-full w-full overflow-hidden" />
            </NavigationMenu.Popup>
          </NavigationMenu.Positioner>
        </NavigationMenu.Portal>
      )}
    </Wrapper>
  );
};

export default NavbarNestedMenuItem;
