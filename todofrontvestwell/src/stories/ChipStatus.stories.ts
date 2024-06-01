import { ChipStatus } from "@/components/chipStatus/ChipStatus";
import { TaskStatus } from "@/models/task";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "ChipStatus",
  component: ChipStatus,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ChipStatus>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ExtraSmall: Story = {
  args: {
    size: "extra-small",
    status: TaskStatus.TODO,
  },
};

export const Large: Story = {
  args: { size: "large", status: TaskStatus.DONE },
};
