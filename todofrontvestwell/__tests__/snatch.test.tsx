import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { Snatch, SnatchProps } from "../src/components/snatch/Snatch";

describe("Snatch", () => {
  const props: SnatchProps = {
    label: "29",
    color: "#fff",
    backgroundColor: "#000",
    size: "large",
  };

  beforeEach(() => {
    render(<Snatch {...props} />);
  });

  it("renders a color and background", () => {
    const container = screen.getByTestId("snatch-container");

    expect(container).toHaveStyle(`background-color:${props.backgroundColor}`);
    expect(container).toHaveStyle(`color:${props.color}`);
  });
  it("renders a label", () => {
    const label = screen.getByTestId("snatch-label");

    expect(label).toHaveTextContent(props.label);
  });

  it("on click renders opposite color and background", () => {
    const container = screen.getByTestId("snatch-container");
    fireEvent.click(container);

    expect(container).toHaveStyle(`background-color:${props.color}`);
    expect(container).toHaveStyle(`color:${props.backgroundColor}`);
  });

  it("renders correct class for size", () => {
    const container = screen.getByTestId("snatch-container");

    expect(container).toHaveClass(`storybook-snatch--${props.size}`);
  });
});
