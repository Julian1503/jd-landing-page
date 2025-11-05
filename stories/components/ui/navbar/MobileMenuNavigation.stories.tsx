import type { Meta, StoryObj } from "@storybook/nextjs";
import { fn } from "@storybook/test";
import { MobileMenuNavigation } from "@/components/ui/navbar";
import { data } from "@/components/layout/navbar";

const items = data.map((item) => ({
  ...item,
  links: item.links?.map((link) => ({ ...link })),
}));

const meta = {
  title: "UI/Navbar/MobileMenuNavigation",
  component: MobileMenuNavigation,
  tags: ["autodocs"],
  args: {
    items,
    onItemClick: fn(),
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
