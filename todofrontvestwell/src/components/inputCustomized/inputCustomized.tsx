import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
} from "@mui/material";
import React, { ChangeEvent, ReactNode, useState } from "react";

interface GeneralInput {
  name: string;
  placeholder: string;
  handleChange: (e: ChangeEvent<any>) => void;
  className?: string;
}

interface Normal extends GeneralInput {
  type: "normal";
}

interface Password extends GeneralInput {
  type: "password";
  icon?: { visible: ReactNode; hide: ReactNode };
}

export type PropsType = Normal | Password;

export const InputCustomized = (props: PropsType) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  if (props.type === "normal") {
    const { name, placeholder, handleChange, className } = props;
    return (
      <TextField
        id={name}
        inputProps={{ "data-testid": "normal-input" }}
        placeholder={placeholder}
        onChange={handleChange}
        className={className}
      />
    );
  }

  const {
    name,
    placeholder,
    handleChange,
    icon = { hide: <VisibilityOff />, visible: <Visibility /> },
    className,
  } = props;

  return (
    <OutlinedInput
      id={name}
      placeholder={placeholder}
      type={showPassword ? "text" : "password"}
      onChange={handleChange}
      inputProps={{ "data-testid": "password-input" }}
      className={className}
      endAdornment={
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={handleClickShowPassword}
            edge="end"
          >
            {showPassword ? icon.hide : icon.visible}
          </IconButton>
        </InputAdornment>
      }
    />
  );
};
