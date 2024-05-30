"use client";
import { CircularProgress } from "@mui/material";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { signInForm, signInSchema } from "./form";
import { login } from "@/services/auth";
import { ErrorsContext } from "@/providers/handleErrorsProvider";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { InputCustomized } from "@/components/inputCustomized/inputCustomized";

export const SignIn = () => {
  const { setErrors } = useContext(ErrorsContext);
  const router = useRouter();

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
      <InputCustomized
        name="email"
        placeholder="Email"
        type="normal"
        handleChange={formikSignIn.handleChange}
      />
      <InputCustomized
        name="password"
        placeholder="Password"
        type="password"
        handleChange={formikSignIn.handleChange}
      />
      <button
        className="bg-[#FFD43B] h-[56px] rounded-[5px]"
        type="submit"
        disabled={formikSignIn.isSubmitting}
        onClick={() => formikSignIn.handleSubmit()}
      >
        {formikSignIn.isSubmitting ? <CircularProgress /> : "Sign In"}
      </button>
    </div>
  );
};
