/**
 * Entry point for the site’s navigation system.
 * Exports a responsive Navbar that switches between desktop and mobile layouts.
 */
import {
  NavbarDesktop,
  NavbarMobile,
} from "@/components/layout/navbar";

import { data } from "@/components/layout/navbar/constants";
import { NavbarProps } from "@/components/layout/navbar/types";

/**
 * Root `Navbar` component that renders both desktop and mobile navigation.
 *
 * - Combines `NavbarDesktop` and `NavbarMobile` components, sharing the same data source.
 * - Automatically adjusts to screen size using responsive logic within each subcomponent.
 *
 * @param {NavbarProps} props - Component props.
 * @param {string} [props.className] - Optional custom CSS classes for the navbar wrapper.
 * @returns {JSX.Element} The responsive navigation bar component.
 */
const Navbar = ({ className }: NavbarProps) => {
  return (
    <>
      <NavbarDesktop items={data} className={className} />
      <NavbarMobile items={data} className={className} />
    </>
  );
};

export default Navbar;
