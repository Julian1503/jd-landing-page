import type { Meta, StoryObj } from "@storybook/nextjs";
import { NavigationMenu } from "@base-ui-components/react/navigation-menu";
import { NavbarMenuItem } from "@/components/ui/navbar";
import { data } from "@/components/layout/navbar";

const menuItems = data.map((item) => ({
  ...item,
  links: item.links?.map((link) => ({ ...link })),
}));

const meta = {
  title: "UI/Navbar/NavbarMenuItem",
  component: NavbarMenuItem,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <NavigationMenu.Root className="w-full max-w-4xl mx-auto border border-dashed border-[var(--border)] rounded-lg p-4">
        <NavigationMenu.List className="flex items-center gap-4">
          <Story />
        </NavigationMenu.List>
      </NavigationMenu.Root>
    ),
  ],
  args: {
    name: menuItems[0].name,
    links: menuItems[0].links,
    layout: menuItems[0].layout,
  },
} satisfies Meta<typeof NavbarMenuItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DropdownList: Story = {};

export const DropdownGrid: Story = {
  args: {
    name: menuItems[1].name,
    links: menuItems[1].links,
    layout: menuItems[1].layout,
    gridCols: menuItems[1].gridCols,
  },
};

export const SimpleLink: Story = {
  args: {
    name: menuItems[2].name,
    href: menuItems[2].href,
    links: undefined,
  },
};
