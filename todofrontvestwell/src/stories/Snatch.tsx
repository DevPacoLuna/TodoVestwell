"use client";
import { useState } from "react";
import "./snatch.css";

interface SnatchProps {
  /**
   * What background color to use
   */
  backgroundColor?: string;
  /**
   * What text color to use
   */
  color?: string;
  /**
   * How large should the snatch be?
   */
  size?: "extra-small" | "small" | "medium" | "large";
  /**
   * Snatch contents
   */
  label: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

export const Snatch = ({
  size = "medium",
  backgroundColor,
  color,
  label,
  ...props
}: SnatchProps) => {
  const [click, setClick] = useState<boolean>(false);
  return (
    <div
      style={{
        backgroundColor: click ? color : backgroundColor,
        color: click ? backgroundColor : color,
      }}
      className={["storybook-snatch", `storybook-snatch--${size}`].join(" ")}
      onClick={() => setClick((prev) => !prev)}
      {...props}
    >
      <p>{label}</p>
    </div>
  );
};
