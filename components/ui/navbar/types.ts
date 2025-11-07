import { ReactNode } from "react";

/**
 * Basic structure for a single navigation link.
 */
type BaseLink = {
  /** Main text label displayed for the link. */
  title: string;
  /** Optional secondary text shown under the title. */
  description?: string;
  /** URL or path the link points to. */
  href?: string;
  /** Optional icon element rendered beside the text. */
  icon?: ReactNode;
};

/**
 * Props for the desktop version of the navbar.
 */
type NavbarDesktopProps = {
  /** List of navigation items to display. */
  items: Readonly<NavbarMenuItemProps[]>;
  /** Optional CSS class for custom styling. */
  className?: string;
};

/**
 * Props for the mobile version of the navbar.
 */
type NavbarMobileProps = {
  /** List of navigation items to display. */
  items: Readonly<NavbarMenuItemProps[]>;
  /** Optional CSS class for custom styling. */
  className?: string;
};

/**
 * Recursive structure for links that can contain child links.
 */
type NestedLink = BaseLink & {
  /** Optional array of sublinks (for multi-level navigation). */
  children?: NestedLink[];
};

/**
 * Props for nested menu item
 */
type NavbarNestedMenuItemProps = {
  link: NestedLink;
  depth?: number;
};

/**
 * Available layout options for menu sections.
 */
type LayoutType = "grid" | "list" | "auto";

/**
 * Props for a top-level navigation menu item in the desktop navbar.
 */
type NavbarMenuItemProps = {
  /** Display name of the menu item. */
  name: string;
  /** Optional direct link if the item has no dropdown. */
  href?: string;
  /** Optional nested links for dropdown menus. */
  links?: NestedLink[];
  /** Defines the visual layout type for nested links. */
  layout?: LayoutType;
  /** Number of grid columns when layout is `"grid"`. */
  gridCols?: number;
  /** Whether to show a separator after this menu item. */
  showSeparatorAfter?: boolean;
};

/**
 * Props for the reusable link content block (icon, title, description).
 */
type NavbarLinkContentProps = Pick<BaseLink, "title" | "description" | "icon">;


export type {
  BaseLink,
  NestedLink,
  NavbarMenuItemProps,
  NavbarLinkContentProps,
  NavbarDesktopProps,
  NavbarMobileProps,
  NavbarNestedMenuItemProps,
  LayoutType,
};