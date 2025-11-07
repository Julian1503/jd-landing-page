import { ReactNode, RefObject } from "react";
import { NavbarMenuItemProps } from "@/components/ui/navbar/types";

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
  navigationState: MobileNavigationState;
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
/**
 * Navigation state for mobile menu drill-down
 */
type MobileNavigationState = {
  /** Current active item being displayed */
  currentItem: MobileNavigationItem | null;
  /** History stack for breadcrumb navigation */
  history: MobileNavigationItem[];
};

export type {
  MobileMenuPanelProps,
  MobileMenuAccountSectionProps,
  MobileMenuButtonProps,
  MobileMenuNavigationProps,
  MobileMenuOverlayProps,
  MobileNavigationItem,
  MobileNavigationState,
}