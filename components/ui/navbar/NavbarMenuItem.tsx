"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { NavigationMenu } from "@base-ui-components/react/navigation-menu";
import { ChevronDownIcon } from "@/components/icons";

import { NavbarMenuItemProps } from "./types";
import NavbarNestedMenuItem from "./NavbarNestedMenuItem";
import {
  NAV_TRIGGER_CLASS,
  NAV_CONTENT_MAIN_CLASS,
} from "./constants";
import {
  determineLayout,
  getContainerClass,
  generateLinkKey,
} from "./utils";
import { usePrefersReducedMotion } from "@/hooks";

/**
 * Primary menu item component for the desktop navigation bar.
 *
 * Handles both direct links and nested dropdown menus:
 * - If `links` is empty or undefined, renders a simple navigation link.
 * - If `links` exist, renders a dropdown menu using Base UI’s `NavigationMenu`.
 *
 * The layout of nested items is automatically determined or customized
 * using the `layout` and `gridCols` props, which control how sublinks
 * are arranged (e.g., grid or column layout).
 *
 * Utilizes memoization (`useMemo`) to compute layout and container classes efficiently.
 *
 * @param {NavbarMenuItemProps} props - Component props.
 * @param {string} props.name - The visible label of the navigation item.
 * @param {string} [props.href] - The URL for direct navigation when no sublinks exist.
 * @param {Array} [props.links] - Optional array of nested link objects for dropdowns.
 * @param {"auto" | "grid" | "column"} [props.layout="auto"] - Defines how sublinks are arranged.
 * @param {number} [props.gridCols=2] - Number of columns when using grid layout.
 * @returns {JSX.Element} The rendered navigation menu item with optional dropdown.
 */
const NavbarMenuItem = ({
  name,
  href,
  links,
  layout = "auto",
  gridCols = 2,
}: NavbarMenuItemProps) => {
  const linksRef = useRef(links);
  
  if (!links || links.length === 0) {
    return (
      <NavigationMenu.Item>
        <Link className={NAV_TRIGGER_CLASS} href={href || "#"}>
          {name}
        </Link>
      </NavigationMenu.Item>
    );
  }

  useEffect(() => {
    if (JSON.stringify(links) !== JSON.stringify(linksRef.current)) {
      linksRef.current = links;
    }
  }, [links]);

  const prefersReducedMotion = usePrefersReducedMotion();
  const [isOpen, setIsOpen] = useState(false);
  const finalLayout = useMemo(
    () => determineLayout(links, layout),
    [linksRef.current, layout]
  );
  const containerClass = useMemo(
    () => getContainerClass(finalLayout, gridCols),
    [finalLayout, gridCols]
  );
  

  return (
    <NavigationMenu.Item>
      <NavigationMenu.Trigger
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onPointerEnter={() => setIsOpen(true)}
        onPointerLeave={() => setIsOpen(false)}
        className={NAV_TRIGGER_CLASS}
      >
        {name}
        <NavigationMenu.Icon className="transition-transform duration-200 ease-in-out data-[popup-open]:rotate-180">
          <ChevronDownIcon aria-hidden="true" />
        </NavigationMenu.Icon>
      </NavigationMenu.Trigger>

      <NavigationMenu.Content
        style={prefersReducedMotion ? { transition: "none" } : undefined}
        className={NAV_CONTENT_MAIN_CLASS}
      >
        <ul className={containerClass}>
          {links.map((item, idx) => (
            <li key={`${generateLinkKey(item.href ?? "", idx)}`}>
              <NavbarNestedMenuItem link={item} />
            </li>
          ))}
        </ul>
      </NavigationMenu.Content>
    </NavigationMenu.Item>
  );
};

export default NavbarMenuItem;
