import { NavbarMenuItemProps } from "@/components/ui/navbar/types";

/**
 * Shared props for the root `Navbar` component.
 */
type NavbarProps = {
  /** Optional CSS class for the navbar container. */
  className?: string;
};

/**
 * Props for the desktop version of the navbar.
 */
type NavbarDesktopProps = {
  /** List of navigation items to display. */
  items: NavbarMenuItemProps[];
  /** Optional CSS class for custom styling. */
  className?: string;
};

/**
 * Props for the mobile version of the navbar.
 */
type NavbarMobileProps = {
  /** List of navigation items to display. */
  items: NavbarMenuItemProps[];
  /** Optional CSS class for custom styling. */
  className?: string;
};

export type {NavbarDesktopProps, NavbarMobileProps, NavbarProps};