"use client";
import {
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { signInForm, signInSchema } from "./form";
import { login } from "@/services/auth";
import { ErrorsContext } from "@/providers/handleErrorsProvider";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

export const SignIn = () => {
  const { setErrors } = useContext(ErrorsContext);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const fetchSignIn = async (values: signInForm) => {
    try {
      const logged = await login(values);

      if (logged) {
        setErrors((prev) => [
          ...prev,
          {
            message: "You were logged successfully",
            type: "success",
          },
        ]);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        router.push("/");
      }
    } catch (error: any) {
      const axiosError = error as AxiosError;
      setErrors((prev) => [
        ...prev,
        {
          message: axiosError.message ?? "It was a problem with your request",
          type: "error",
        },
      ]);
    }
  };

  const formikSignIn = useFormik<signInForm>({
    initialValues: { email: "", password: "" },
    validationSchema: signInSchema,
    onSubmit: fetchSignIn,
  });

  return (
    <div className="w-full flex flex-col gap-[20px]">
      <h1 className="text-[58px] font-semibold">Sign in</h1>
      <TextField
        required
        id="email"
        placeholder="Email"
        onChange={formikSignIn.handleChange}
      />
      <OutlinedInput
        id="password"
        placeholder="Password"
        type={showPassword ? "text" : "password"}
        onChange={formikSignIn.handleChange}
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
      <button
        className="bg-[#FFD43B] h-[56px] rounded-[5px]"
        type="submit"
        disabled={formikSignIn.isSubmitting}
        onClick={() => formikSignIn.handleSubmit()}
      >
        Sign In
      </button>
    </div>
  );
};
