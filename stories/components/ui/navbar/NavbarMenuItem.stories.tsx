import type { Meta, StoryObj } from "@storybook/nextjs";
import { NavigationMenu } from "@base-ui-components/react/navigation-menu";
import NavbarMenuItem from "@/components/ui/navbar/NavbarMenuItem";

const mockMenuItems = [
  {
    name: "Item one",
    layout: "list" as const,
    links: [
      {
        title: "Link 1",
        href: "#1",
        description: "Description for link 1",
      },
      {
        title: "Link 2",
        href: "#2",
        description: "Description for link 2",
      },
    ],
  },
  {
    name: "Item two",
    layout: "grid" as const,
    gridCols: 2,
    links: [
      {
        title: "Link 1",
        href: "#1",
        description: "Description for link 1",
      },
      {
        title: "Link 2",
        href: "#2",
        description: "Description for link 2",
      },
      {
        title: "Link 3",
        href: "#3",
        description: "Description for link 3",
      },
      {
        title: "Link 4",
        href: "#4",
        description: "Description for link 4",
      },
    ],
  },
  {
    name: "Item three",
    href: "#",
  },
];

const meta = {
  title: "UI/Navbar/NavbarMenuItem",
  component: NavbarMenuItem,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  decorators: [
    (Story) => (
      <NavigationMenu.Root>
        <NavigationMenu.List className="flex gap-4 p-6 bg-gray-50">
          <Story />
        </NavigationMenu.List>
      </NavigationMenu.Root>
    ),
  ],
  args: {
    name: "Default Item",
    links: mockMenuItems[0].links,
    layout: "list",
  },
} satisfies Meta<typeof NavbarMenuItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DropdownList: Story = {
  args: {
    name: mockMenuItems[0].name,
    links: mockMenuItems[0].links,
    layout: "list",
  },
};

export const DropdownGrid: Story = {
  args: {
    name: mockMenuItems[1].name,
    links: mockMenuItems[1].links,
    layout: "grid",
    gridCols: 2,
  },
};

export const SimpleLink: Story = {
  args: {
    name: mockMenuItems[2].name,
    href: mockMenuItems[2].href,
    links: undefined,
  },
};

export const AutoLayoutFew: Story = {
  args: {
    name: "Auto Layout (4 items → Grid)",
    layout: "auto",
    links: [
      { title: "Link 1", href: "#1", description: "Description 1" },
      { title: "Link 2", href: "#2", description: "Description 2" },
      { title: "Link 3", href: "#3", description: "Description 3" },
      { title: "Link 4", href: "#4", description: "Description 4" },
    ],
  },
};

export const AutoLayoutMany: Story = {
  args: {
    name: "Auto Layout (6 items → List)",
    layout: "auto",
    links: [
      { title: "Link 1", href: "#1", description: "Description 1" },
      { title: "Link 2", href: "#2", description: "Description 2" },
      { title: "Link 3", href: "#3", description: "Description 3" },
      { title: "Link 4", href: "#4", description: "Description 4" },
      { title: "Link 5", href: "#5", description: "Description 5" },
      { title: "Link 6", href: "#6", description: "Description 6" },
    ],
  },
};