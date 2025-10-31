import { NavbarMenuItemProps } from "@/components/ui/navbar/types";

/**
 * Mock navigation data for the `Navbar` component.
 *
 * Defines sample menu items for both desktop and mobile views,
 * including a mix of list- and grid-based dropdowns.
 *
 * Each item can:
 * - Contain sublinks (with title, href, and description).
 * - Specify layout type ("list" or "grid").
 * - Optionally display a vertical separator after it.
 *
 * This dataset is mainly used for development, testing, or demo purposes.
 */
const data: NavbarMenuItemProps[] = [
  {
    name: "Item one",
    showSeparatorAfter: true,
    layout: "list",
    links: [
      {
        title: "Link",
        href: "https://localhost:3000#1",
        description: "Description for link 1",
      },
      {
        title: "Link 2",
        href: "https://localhost:3000#2",
        description: "Description for link 2",
      },
    ],
  },
  {
    name: "Item two",
    showSeparatorAfter: true,
    layout: "grid",
    gridCols: 2,
    links: [
      {
        title: "Link",
        href: "https://localhost:3000#1",
        description: "Description for link 1",
      },
      {
        title: "Link 2",
        href: "https://localhost:3000#2",
        description: "Description for link 2",
      },
      {
        title: "Link 3",
        href: "https://localhost:3000#3",
        description: "Description for link 3",
      },
      {
        title: "Link 4",
        href: "https://localhost:3000#4",
        description: "Description for link 4",
      },
    ],
  },
  {
    name: "Item three",
    showSeparatorAfter: true,
    href: "https://localhost:3000",
  },
  {
    name: "Item four",
    href: "https://localhost:3000",
    showSeparatorAfter: true,
  },
  {
    name: "Item five",
    href: "https://localhost:3000",
    showSeparatorAfter: true,
  },
];

export {data}