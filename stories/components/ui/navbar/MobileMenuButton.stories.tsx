import type { Meta, StoryObj } from "@storybook/nextjs";
import { fn } from "@storybook/test";
import { MobileMenuButton } from "@/components/ui/navbar";

const meta = {
  title: "UI/Navbar/MobileMenuButton",
  component: MobileMenuButton,
  tags: ["autodocs"],
  args: {
    isOpen: false,
    onToggle: fn(),
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof MobileMenuButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Closed: Story = {};

export const Open: Story = {
  args: {
    isOpen: true,
  },
};
