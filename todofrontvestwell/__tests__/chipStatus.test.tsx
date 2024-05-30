import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { SnatchProps } from "../src/components/snatch/Snatch";
import {
  ChipStatus,
  ChipStatusProps,
} from "@/components/chipStatus/ChipStatus";
import { TaskStatus } from "@/models/task";

describe("ChipStatus", () => {
  const props: ChipStatusProps = {
    size: "large",
    status: TaskStatus.DONE,
  };

  beforeEach(() => {
    render(<ChipStatus {...props} />);
  });

  it("renders a color and background depends status", () => {
    const container = screen.getByTestId("chipstatus-container");

    expect(container).toHaveStyle(`background-color: #FFF`);
    expect(container).toHaveStyle(`color: #33A069`);
  });
  it("renders correct class for size", () => {
    const container = screen.getByTestId("chipstatus-container");

    expect(container).toHaveClass(`storybook-chipstatus--${props.size}`);
  });

  it("renders a label", () => {
    const label = screen.getByTestId("chipstatus-label");

    expect(label).toHaveTextContent(props.status || TaskStatus.TODO);
  });

  it("on click renders opposite color and background", () => {
    const container = screen.getByTestId("chipstatus-container");
    fireEvent.click(container);

    expect(container).toHaveStyle("background-color: #33A069");
    expect(container).toHaveStyle("color: #FFF");
  });
});
