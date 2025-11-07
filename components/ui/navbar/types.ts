import { ReactNode, RefObject } from "react";

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
 * Recursive structure for links that can contain child links.
 */
type NestedLink = BaseLink & {
  /** Optional array of sublinks (for multi-level navigation). */
  children?: NestedLink[];
};

/**
 * Navigation item for mobile menu (unified structure)
 */
type MobileNavigationItem = {
  /** Display label */
  title: string;
  /** Optional link destination */
  href?: string;
  /** Optional description */
  description?: string;
  /** Optional icon */
  icon?: ReactNode;
  /** Optional children for drill-down */
  children?: MobileNavigationItem[];
};

/**
 * Navigation state for mobile menu drill-down
 */
type NavigationState = {
  /** Current active item being displayed */
  currentItem: MobileNavigationItem | null;
  /** History stack for breadcrumb navigation */
  history: MobileNavigationItem[];
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

/**
 * Props for the account management section in the mobile menu.
 */
type MobileMenuAccountSectionProps = {
  /** Callback triggered when closing the mobile menu. */
  onClose: () => void;
};

/**
 * Props for the hamburger toggle button in mobile view.
 */
type MobileMenuButtonProps = {
  /** Indicates whether the mobile menu is currently open. */
  isOpen: boolean;
  /** Toggles the mobile menu open or closed. */
  onToggle: () => void;
  /** Reference from parent */
  triggerRef?: RefObject<HTMLDivElement | null>;
};

/**
 * Props for the navigation list section in the mobile menu.
 */
type MobileMenuNavigationProps = {
  /** Array of navigation items displayed in the mobile menu. */
  items: Readonly<NavbarMenuItemProps[]>;
  /** Callback fired when a navigation item is clicked. */
  onItemClick: () => void;
  /** Current navigation state for drill-down */
  navigationState: NavigationState;
  /** Function to navigate into a submenu */
  onNavigateToSubmenu: (item: MobileNavigationItem) => void;
  /** Function to navigate back */
  onNavigateBack: () => void;
};

/**
 * Props for the semi-transparent overlay behind the mobile menu.
 */
type MobileMenuOverlayProps = {
  /** Function to close the menu when overlay is clicked. */
  onClose: () => void;
};

/**
 * Props for the main mobile menu panel (sliding drawer).
 */
type MobileMenuPanelProps = {
  /** Navigation items displayed inside the mobile menu. */
  items: Readonly<NavbarMenuItemProps[]>;
  /** Reference from parent */
  triggerRef?: RefObject<HTMLDivElement | null>;
  /** Callback triggered to close the menu panel. */
  onClose: () => void;
};

export type {
  BaseLink,
  NestedLink,
  NavbarMenuItemProps,
  NavbarLinkContentProps,
  MobileMenuPanelProps,
  LayoutType,
  MobileMenuAccountSectionProps,
  MobileMenuButtonProps,
  MobileMenuNavigationProps,
  MobileMenuOverlayProps,
  NavbarNestedMenuItemProps,
  NavigationState,
  MobileNavigationItem,
};