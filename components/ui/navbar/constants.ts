/**
 * Base class for top-level navigation triggers (menu buttons or links).
 * 
 * Defines layout, spacing, typography, and hover/focus states
 * for navigation items in the main desktop navbar.
 */
const NAV_TRIGGER_CLASS =
  "box-border flex items-center justify-center gap-1.5 h-10 " +
  "px-2 xs:px-3.5 m-0 rounded-md " +
  "bg-[var(--background)] text-[var(--foreground)] font-medium " +
  "text-[0.925rem] xs:text-base leading-6 select-none no-underline " +
  "hover:bg-[var(--muted)] active:bg-[var(--muted)] data-[popup-open]:bg-[var(--muted)] " +
  "focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 " +
  "focus-visible:outline-[var(--ring)] focus-visible:relative sm:w-auto sm:justify-center text-sm";

/**
 * Card-style class for nested navigation links (dropdown content items).
 */
const NAV_LINK_CARD_CLASS =
  "w-full text-left relative block rounded-md p-2 xs:p-3 no-underline text-inherit " +
  "hover:bg-[var(--muted)] focus-visible:relative focus-visible:outline focus-visible:outline-2 " +
  "focus-visible:-outline-offset-1 focus-visible:outline-[var(--ring)] " +
  "data-[popup-open]:bg-[var(--muted)]";

/**
 * Shared animation and padding styles for popup content containers.
 */
const NAV_CONTENT_CLASS =
  "h-full p-6 " +
  "transition-[opacity,transform,translate] duration-[var(--duration)] ease-[var(--easing)] " +
  "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0 will-change[opacity,transform,translate]";

/**
 * Styles for the main dropdown content container in desktop navigation.
 * Includes directional transitions for left/right activation.
 */
const NAV_CONTENT_MAIN_CLASS =
  "h-full p-6 xs:w-max xs:min-w-[400px] " +
  "transition-[opacity,transform,translate] duration-[var(--duration)] ease-[var(--easing)] " +
  "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0 " +
  "data-[starting-style]:data-[activation-direction=left]:translate-x-[-50%] " +
  "data-[starting-style]:data-[activation-direction=right]:translate-x-[50%] " +
  "data-[ending-style]:data-[activation-direction=left]:translate-x-[50%] " +
  "data-[ending-style]:data-[activation-direction=right]:translate-x-[-50%] will-change[transform,opacity,translate]";

/**
 * Base class for the positioning wrapper of navigation popups.
 * Handles positioning transitions and interaction boundaries.
 */
const NAV_POSITIONER_CLASS =
  "box-border h-[var(--positioner-height)] w-[var(--positioner-width)] " +
  "max-w-[var(--available-width)] transition-[top,left,right,bottom] " +
  "duration-[var(--duration)] ease-[var(--easing)] before:absolute before:content-[''] " +
  "data-[instant]:transition-none " +
  "data-[side=bottom]:before:top-[-10px] data-[side=bottom]:before:right-0 " +
  "data-[side=bottom]:before:left-0 data-[side=bottom]:before:h-2.5 " +
  "data-[side=left]:before:top-0 data-[side=left]:right-[-10px] " +
  "data-[side=left]:before:bottom-0 data-[side=left]:before:w-2.5 " +
  "data-[side=right]:before:top-0 data-[side=right]:before:bottom-0 " +
  "data-[side=right]:before:left-[-10px] data-[side=right]:before:w-2.5 " +
  "data-[side=top]:before:right-0 data-[side=top]:before:bottom-[-10px] " +
  "data-[side=top]:before:left-0 data-[side=top]:before:h-2.5 will-change-[top,left,right,bottom]";

/**
 * Popup container style for dropdown menus and nested navigation.
 * Controls background, outline, and open/close animation states.
 */
const NAV_POPUP_CLASS =
  "relative h-[var(--popup-height)] origin-[var(--transform-origin)] " +
  "rounded-lg bg-[var(--popover)] text-[var(--foreground)] " +
  "shadow-lg shadow-[var(--muted)] outline outline-1 outline-[var(--border)] " +
  "transition-[opacity,transform,width,height,scale,translate] " +
  "duration-[var(--duration)] ease-[var(--easing)] " +
  "data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[ending-style]:duration-150 " +
  "data-[starting-style]:scale-90 data-[starting-style]:opacity-0 " +
  "dark:shadow-none dark:-outline-offset-1 dark:outline-[var(--border)] will-change-[transform, opacity]";

/**
 * Arrow element styles for popup components, controlling side alignment and rotation.
 */
const NAV_ARROW_CLASS =
  "flex transition-[left] duration-[var(--duration)] ease-[var(--easing)] " +
  "data-[side=bottom]:top-[-8px] data-[side=left]:right-[-13px] " +
  "data-[side=left]:rotate-90 data-[side=right]:left-[-13px] " +
  "data-[side=right]:-rotate-90 data-[side=top]:bottom-[-8px] " +
  "data-[side=top]:rotate-180 will-change[left]";

/**
 * Shared icon style for navigation items (gray by default, foreground on hover).
 */
const NAV_ICON_CLASS =
  "text-[var(--muted-foreground)] group-hover:text-[var(--foreground)] transition-colors";

/**
 * Base button style used in mobile and account menu items.
 */
const NAV_BUTTON_BASE_CLASS =
  "flex items-center gap-3 w-full py-3 px-4 rounded-lg transition-colors group";

/**
 * Section title styling for mobile menu sections (uppercase, small text).
 */
const MOBILE_SECTION_TITLE_CLASS =
  "text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wider mb-3 px-2";

/**
 * Default mobile navigation item style for individual links.
 */
const MOBILE_NAV_ITEM_CLASS =
  "flex items-center justify-between py-3 px-4 rounded-lg hover:bg-[var(--muted)] transition-colors font-medium group";

/**
 * Shared animation timing configuration for all navbar transitions.
 */
const NAV_ANIMATION_STYLE = {
  ["--duration" as string]: "0.35s",
  ["--easing" as string]: "cubic-bezier(0.22, 1, 0.36, 1)",
} as const;

export {
  NAV_ANIMATION_STYLE,
  NAV_ARROW_CLASS,
  NAV_CONTENT_CLASS,
  NAV_LINK_CARD_CLASS,
  NAV_CONTENT_MAIN_CLASS,
  NAV_ICON_CLASS,
  NAV_BUTTON_BASE_CLASS,
  MOBILE_NAV_ITEM_CLASS,
  MOBILE_SECTION_TITLE_CLASS,
  NAV_POPUP_CLASS,
  NAV_POSITIONER_CLASS,
  NAV_TRIGGER_CLASS,
};
