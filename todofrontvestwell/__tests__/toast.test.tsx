import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Toast } from "@/components/toast/toast";

describe("Success Toast", () => {
  const props: Toast = {
    type: "success",
    index: 1,
    children: "You were logged successfully",
  };

  beforeEach(() => {
    render(<Toast {...props} />);
  });

  it("renders a text", () => {
    const container = screen.getByTestId("toast");

    expect(container).toHaveTextContent(props.children);
  });
});

describe("Error Toast", () => {
  const props: Toast = {
    type: "error",
    index: 1,
    children: "It was a problem with your request",
  };

  beforeEach(() => {
    render(<Toast {...props} />);
  });

  it("renders a error message", () => {
    const container = screen.getByTestId("toast");

    expect(container).toHaveTextContent(`Error: ${props.children}`);
  });
});
