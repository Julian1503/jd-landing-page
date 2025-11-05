import type { Meta, StoryObj } from "@storybook/nextjs";
import { data, Navbar, NavbarDesktop, NavbarMobile } from "@/components/layout/navbar";

const meta = {
  title: "Layout/Navbar",
  component: Navbar,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  args: {
    className: "",
  },
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Desktop: Story = {
  name: "Desktop navigation",
  render: (args) => (
    <div className="w-full max-w-5xl mx-auto">
      <NavbarDesktop items={data} className={args.className} />
    </div>
  ),
  parameters: {
    layout: "centered",
  },
};

export const Mobile: Story = {
  name: "Mobile navigation",
  render: (args) => (
    <div className="w-full max-w-sm">
      <NavbarMobile items={data} className={args.className} />
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
    layout: "centered",
  },
};
