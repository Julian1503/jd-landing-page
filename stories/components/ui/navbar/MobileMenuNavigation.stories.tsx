import type { Meta, StoryObj } from "@storybook/nextjs";
import { fn } from "storybook/test";
import MobileMenuNavigation from "@/components/ui/navbar/MobileMenuNavigation";
import { data } from "@/components/layout/navbar/constants";
import { NavigationState } from "@/components/ui/navbar/types";

const items = data.map((item) => ({
  ...item,
  links: item.links?.map((link) => ({ ...link })),
}));

// Estado de navegación por defecto (menú principal)
const defaultNavigationState: NavigationState = {
  currentItem: null,
  history: [],
};

// Estado de navegación en submenú
const submenuNavigationState: NavigationState = {
  currentItem: {
    title: items[0].name,
    href: items[0].href,
    children: items[0].links?.map((link) => ({
      title: link.title,
      href: link.href,
      description: link.description,
      icon: link.icon,
    })),
  },
  history: [],
};

const meta = {
  title: "UI/Navbar/MobileMenuNavigation",
  component: MobileMenuNavigation,
  tags: ["autodocs"],
  args: {
    items,
    onItemClick: fn(),
    navigationState: defaultNavigationState,
    onNavigateToSubmenu: fn(),
    onNavigateBack: fn(),
  },
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof MobileMenuNavigation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SingleSection: Story = {
  args: {
    items: [items[0]],
  },
};

export const InSubmenu: Story = {
  args: {
    navigationState: submenuNavigationState,
  },
};

export const WithHistory: Story = {
  args: {
    navigationState: {
      currentItem: {
        title: "Level 2",
        href: "#",
        children: [
          { title: "Link 2-1", href: "#2-1", description: "Description 2-1" },
          { title: "Link 2-2", href: "#2-2", description: "Description 2-2" },
        ],
      },
      history: [
        {
          title: "Level 1",
          href: "#",
          children: [
            { title: "Level 2", href: "#level2" },
          ],
        },
      ],
    },
  },
};