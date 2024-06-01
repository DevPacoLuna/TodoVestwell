import { Snatch } from "@/components/snatch/Snatch";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Snatch",
  component: Snatch,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    backgroundColor: { control: "color" },
  },
} satisfies Meta<typeof Snatch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ExtraSmall: Story = {
  args: {
    label: "1",
    size: "extra-small",
    backgroundColor: "#000",
    color: "#FFF",
  },
};

export const Small: Story = {
  args: {
    label: "19",
    size: "small",
    backgroundColor: "#000",
    color: "#FFF",
  },
};

export const Medium: Story = {
  args: { label: "25", size: "medium", backgroundColor: "#FFF", color: "#000" },
};

export const Large: Story = {
  args: { label: "29", size: "large", backgroundColor: "#FFF", color: "#000" },
};
