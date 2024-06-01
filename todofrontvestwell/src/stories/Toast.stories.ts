import { Toast } from "@/components/toast/toast";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Toast",
  component: Toast,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Error: Story = {
  args: {
    type: "error",
    index: 1,
    children: "There was an error in your request",
  },
};

export const Success: Story = {
  args: { type: "success", index: 1, children: "The request was successfull" },
};

export const Warning: Story = {
  args: { type: "warning", index: 1, children: "Something went wrong" },
};
