import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import {
  InputCustomized,
  PropsType,
} from "@/components/inputCustomized/inputCustomized";

describe("InputCustomized normal", () => {
  const props: PropsType = {
    type: "normal",
    placeholder: "Name",
    name: "Name",
    handleChange: () => {},
  };

  beforeEach(() => {
    render(<InputCustomized {...props} />);
  });

  it("renders a input name", () => {
    const container = screen.getByTestId("normal-input") as HTMLInputElement;

    expect(container.placeholder).toEqual(props.placeholder);
  });
});

describe("InputCustomized password", () => {
  const props: PropsType = {
    type: "password",
    placeholder: "Password",
    name: "password",
    handleChange: () => {},
  };

  beforeEach(() => {
    render(<InputCustomized {...props} />);
  });

  it("renders a input placeholder", () => {
    const container = screen.queryByTestId(
      "password-input"
    ) as HTMLInputElement;

    expect(container.placeholder).toEqual(props.placeholder);
  });
});
