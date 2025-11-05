import type { Meta, StoryObj } from "@storybook/nextjs";
import { Logo } from "@/components/ui/logo";

const meta = {
  title: "UI/Logo/Logo",
  component: Logo,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    imageSrc: "/images/logo.png",
    imageAlt: "JD Product Studio logo",
    text: "JD Product Studio",
    subtext: "Design & Development",
    showText: true,
  },
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithPrimaryRing: Story = {
  args: {
    ringStyle: "primary",
  },
};

export const Compact: Story = {
  args: {
    size: "sm",
    text: "JD Studio",
    subtext: "Product",
  },
};

export const IconOnly: Story = {
  args: {
    showText: false,
  },
};
