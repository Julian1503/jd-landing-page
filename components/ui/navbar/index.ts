// ========== Desktop Components ==========
export { default as NavbarMenuItem } from "@/components/ui/navbar/NavbarMenuItem";
export { default as NavbarNestedMenuItem } from "@/components/ui/navbar/NavbarNestedMenuItem";
export { default as NavbarLinkContent } from "@/components/ui/navbar/NavbarLinkContent";

// ========== Mobile Components ==========
export { default as MobileMenuButton } from "@/components/ui/navbar/MobileMenuButton";
export { default as MobileMenuPanel } from "@/components/ui/navbar/MobileMenuPanel";
export { default as MobileMenuOverlay } from "@/components/ui/navbar/MobileMenuOverlay";
export { default as MobileMenuNavigation } from "@/components/ui/navbar/MobileMenuNavigation";
export { default as MobileMenuUserHeader } from "@/components/ui/navbar/MobileMenuUserHeader";
export { default as MobileMenuAccountSection } from "@/components/ui/navbar/MobileMenuAccountSection"

// ========== Types ==========
export type {
  BaseLink,
  NestedLink,
  NavbarLinkContentProps,
  MobileMenuButtonProps,
  MobileMenuNavigationProps,
  MobileMenuOverlayProps,
  MobileMenuPanelProps,
  MobileMenuAccountSectionProps,
  NavbarMenuItemProps
} from "@/components/ui/navbar/types";

// ========== Constants ==========
export {
  NAV_TRIGGER_CLASS,
  NAV_LINK_CARD_CLASS,
  NAV_CONTENT_CLASS,
  NAV_CONTENT_MAIN_CLASS,
  NAV_POSITIONER_CLASS,
  NAV_POPUP_CLASS,
  NAV_ARROW_CLASS,
  NAV_BUTTON_BASE_CLASS,
  NAV_ICON_CLASS,
  MOBILE_NAV_ITEM_CLASS,
  MOBILE_SECTION_TITLE_CLASS,
  NAV_ANIMATION_STYLE,
} from "@/components/ui/navbar/constants";

// ========== Utils ==========
export {
  getContainerClass,
  determineLayout,
  getStaggerDelay,
  generateLinkKey,
} from "@/components/ui/navbar/utils";