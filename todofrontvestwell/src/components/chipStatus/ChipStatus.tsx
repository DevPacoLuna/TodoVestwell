"use client";
import { useState } from "react";
import "./chipStatus.css";
import { TaskStatus } from "@/models/task";

export interface ChipStatusProps {
  /**
   * What status is going to have
   */
  status?: TaskStatus;
  /**
   * How large should the chip status be?
   */
  size?: "extra-small" | "small" | "medium" | "large";
  /**
   * Optional click handler
   */
  onClick?: () => void;
  /**
   * Pass extra classes
   */
  className?: string;
}

export const ChipStatus = ({
  size = "medium",
  status = TaskStatus.TODO,
  className,
  ...props
}: ChipStatusProps) => {
  const [click, setClick] = useState<boolean>(false);

  const statusOption = {
    "To Do": {
      backgroundColor: click ? "#87909E" : "#FFF",
      color: click ? "#FFF" : "#87909E",
    },
    "In progress": {
      backgroundColor: click ? "#F9BE33" : "#FFF",
      color: click ? "#FFF" : "#F9BE33",
    },
    Done: {
      backgroundColor: click ? "#33A069" : "#FFF",
      color: click ? "#FFF" : "#33a069",
    },
  };

  return (
    <div
      data-testid="chipstatus-container"
      style={statusOption[status]}
      className={[
        "storybook-chipstatus",
        `storybook-chipstatus--${size}`,
        className,
      ].join(" ")}
      onClick={() => setClick((prev) => !prev)}
      {...props}
    >
      <p data-testid="chipstatus-label">{status}</p>
    </div>
  );
};
