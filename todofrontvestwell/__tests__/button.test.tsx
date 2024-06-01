import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Button, ButtonProps } from "@/components/button/Button";

describe("Button", () => {
  const props: ButtonProps = {
    children: "Sign in",
    size: "small",
  };

  beforeEach(() => {
    render(<Button {...props} />);
  });

  it("renders a label", () => {
    const container = screen.getByTestId("button-container");

    expect(container).toHaveTextContent(props.children);
  });

  it("renders correct class for size", () => {
    const container = screen.getByTestId("button-container");

    expect(container).toHaveClass(`storybook-button--${props.size}`);
  });
});
