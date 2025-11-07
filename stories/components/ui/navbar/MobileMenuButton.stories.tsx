import type { Meta, StoryObj } from "@storybook/nextjs";
import { useRef, useState } from "react";
import MobileMenuButton from "@/components/ui/navbar/MobileMenuButton";
import { StoryAnnotations } from "storybook/internal/types";

const meta = {
  title: "UI/Navbar/MobileMenuButton",
  component: MobileMenuButton,
  tags: ["autodocs"],
  args: {

  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof MobileMenuButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Closed: Story = {
  args: {
    isOpen: false,
    onToggle: () => console.log("Toggle clicked"),
  },
};

export const Open: Story = {
  args: {
    isOpen: true,
    onToggle: () => console.log("Toggle clicked"),
  },
};

// Historia interactiva
export const Interactive: StoryAnnotations = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const triggerRef = useRef<HTMLDivElement>(null);
    return (
      <div ref={triggerRef}>
        <MobileMenuButton 
          isOpen={isOpen} 
          onToggle={() => setIsOpen(!isOpen)}
          triggerRef={triggerRef}
        />
      </div>
    );
  },
};