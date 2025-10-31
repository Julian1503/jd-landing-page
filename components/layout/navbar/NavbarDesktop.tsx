/**
 * Desktop navigation bar implementation.
 * Combines navigation items, authentication controls, and Base UI animations.
 */

import NavbarMenuItem from "@/components/ui/navbar/NavbarMenuItem";
import { cn } from "@/lib/utils";
import { Separator } from "@base-ui-components/react";
import { NavigationMenu } from "@base-ui-components/react/navigation-menu";
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";
import React from "react";
import { NavbarDesktopProps } from "./types";
import { NAV_ANIMATION_STYLE, NAV_ARROW_CLASS, NAV_POPUP_CLASS, NAV_POSITIONER_CLASS } from "@/components/ui/navbar/constants";

/**
 * Desktop version of the main navigation bar.
 *
 * - Renders a responsive horizontal navigation menu using Base UI’s `NavigationMenu`.
 * - Displays menu items, optional separators, and user authentication controls (via Clerk).
 * - Supports dropdowns, hover-triggered submenus, and animated transitions.
 *
 * ### Features:
 * - Uses `NavbarMenuItem` for structured dropdowns.
 * - Integrates `SignInButton` and `UserButton` from Clerk for authentication state handling.
 * - Smooth open/close animations and collision handling via Base UI.
 * - Customizable styling through shared constants (`NAV_POSITIONER_CLASS`, etc.).
 *
 * @param {NavbarDesktopProps} props - Component props.
 * @param {Array} props.items - Array of navigation sections and links.
 * @param {string} [props.className] - Optional custom class for the root container.
 * @returns {JSX.Element} The rendered desktop navigation bar.
 */
const NavbarDesktop = ({ items, className }: NavbarDesktopProps) => {
  return (
    <NavigationMenu.Root
      className={cn(
        "hidden md:flex h-full items-center justify-center rounded-md p-3",
        "bg-[var(--background)] text-[var(--foreground)] border-[var(--border)]",
        className
      )}
    >
      <NavigationMenu.List className="relative h-full flex items-center justify-center gap-2">
        {items.map((item) => (
          <React.Fragment key={item.name}>
            {item.showSeparatorAfter && (
              <Separator
                orientation="vertical"
                className="h-[80%] w-px mx-1 bg-[var(--border)]"
              />
            )}
            <NavbarMenuItem
              name={item.name}
              href={item.href}
              links={item.links}
              layout={item.layout}
              gridCols={item.gridCols}
            />
          </React.Fragment>
        ))}

        <div className="ml-auto h-full flex items-center gap-3">
          <Separator orientation="vertical" className="h-6 w-px bg-[var(--border)]" />

          <SignedOut>
            <SignInButton mode="modal">
              <button className="flex items-center justify-center h-10 px-4 text-sm font-medium text-[var(--primary-foreground)] bg-[var(--primary)] hover:bg-[color-mix(in oklch, var(--primary) 90%, black 10%)] rounded-md transition-colors cursor-pointer">
                Login
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "h-8 w-8",
                },
              }}
            />
          </SignedIn>
        </div>
      </NavigationMenu.List>

      <NavigationMenu.Portal>
        <NavigationMenu.Backdrop />
        <NavigationMenu.Positioner
          sideOffset={10}
          collisionPadding={{ top: 5, bottom: 5, left: 20, right: 20 }}
          collisionAvoidance={{ side: "none" }}
          className={cn(NAV_POSITIONER_CLASS)}
          style={NAV_ANIMATION_STYLE}
        >
          <NavigationMenu.Popup className={cn(NAV_POPUP_CLASS)}>
            <NavigationMenu.Arrow className={cn(NAV_ARROW_CLASS)} />
            <NavigationMenu.Viewport className="relative h-full w-full overflow-hidden" />
          </NavigationMenu.Popup>
        </NavigationMenu.Positioner>
      </NavigationMenu.Portal>
    </NavigationMenu.Root>
  );
};

export default NavbarDesktop;