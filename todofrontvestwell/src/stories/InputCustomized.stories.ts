import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Button } from "../components/button/Button";
import { InputCustomized } from "@/components/inputCustomized/inputCustomized";

const meta = {
  title: "InputCustomized",
  component: InputCustomized,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: { handleChange: fn() },
} satisfies Meta<typeof InputCustomized>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
  args: {
    name: "firstName",
    placeholder: "First name",
    type: "normal",
    className: "w-1/2",
  },
};

export const Password: Story = {
  args: { name: "password", placeholder: "Password", type: "password" },
};
