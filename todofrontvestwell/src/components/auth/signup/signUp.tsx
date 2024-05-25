import {
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";

export const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <div className="w-full flex flex-col gap-[20px]">
      <h1 className="text-[58px] font-semibold">Sign up</h1>
      <div className="flex w-full">
        <TextField
          required
          id="outlined-required"
          placeholder="First name"
          className="w-1/2"
        />
        <TextField
          required
          id="outlined-required"
          placeholder="Last name"
          className="w-1/2"
        />
      </div>
      <TextField required id="outlined-required" placeholder="Email" />
      <OutlinedInput
        placeholder="Password"
        type={showPassword ? "text" : "password"}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
      <button className="bg-[#FFD43B] h-[56px] rounded-[5px]">Sign In</button>
    </div>
  );
};
