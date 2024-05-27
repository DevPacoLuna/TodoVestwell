"use client";
import {
  CircularProgress,
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useContext, useState } from "react";
import { useFormik } from "formik";
import { signUpForm, signUpSchema } from "./form";
import { ErrorsContext } from "@/providers/handleErrorsProvider";
import { createUser } from "@/services/user";
import { AxiosError } from "axios";
import { login } from "@/services/auth";
import { useRouter } from "next/navigation";

export const SignUp = () => {
  const { setErrors } = useContext(ErrorsContext);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const fetchSignUp = async (values: signUpForm) => {
    const { confirmPassword, ...user } = values;
    try {
      const { status, data } = await createUser(user);

      if (status === 201) {
        await login({
          email: data.email,
          password: values.password,
        });
        setErrors((prev) => [
          ...prev,
          {
            message: "User was created successfully",
            type: "success",
          },
        ]);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        router.push("/");
      }
    } catch (error) {
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

  const formikSignUp = useFormik<signUpForm>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signUpSchema,
    onSubmit: fetchSignUp,
  });

  return (
    <div className="w-full flex flex-col gap-[20px]">
      <h1 className="text-[58px] font-semibold">Sign up</h1>
      <div className="flex w-full">
        <TextField
          id="firstName"
          placeholder="First name"
          onChange={formikSignUp.handleChange}
          className="w-1/2"
        />
        <TextField
          id="lastName"
          placeholder="Last name"
          onChange={formikSignUp.handleChange}
          className="w-1/2"
        />
      </div>
      <TextField
        id="email"
        placeholder="Email"
        onChange={formikSignUp.handleChange}
      />
      <OutlinedInput
        id="password"
        placeholder="Password"
        onChange={formikSignUp.handleChange}
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
      <OutlinedInput
        id="confirmPassword"
        placeholder="Confirm Password"
        onChange={formikSignUp.handleChange}
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
      <button
        className="bg-[#FFD43B] h-[56px] rounded-[5px]"
        type="submit"
        disabled={formikSignUp.isSubmitting}
        onClick={() => formikSignUp.handleSubmit()}
      >
        {formikSignUp.isSubmitting ? <CircularProgress /> : "Sign Up"}
      </button>
    </div>
  );
};
