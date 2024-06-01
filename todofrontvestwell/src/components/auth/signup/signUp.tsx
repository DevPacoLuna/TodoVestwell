"use client";
import { CircularProgress } from "@mui/material";
import { useContext } from "react";
import { useFormik } from "formik";
import { signUpForm, signUpSchema } from "./form";
import { ErrorsContext } from "@/providers/handleErrorsProvider";
import { createUser } from "@/services/user";
import { AxiosError } from "axios";
import { login } from "@/services/auth";
import { useRouter } from "next/navigation";
import { InputCustomized } from "@/components/inputCustomized/inputCustomized";
import { useQueryClient } from "@tanstack/react-query";

export const SignUp = () => {
  const { setErrors } = useContext(ErrorsContext);
  const queryClient = useQueryClient();
  const router = useRouter();

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
        await queryClient.invalidateQueries({ queryKey: ["user"] });
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
        <InputCustomized
          name="firstName"
          placeholder="First name"
          type="normal"
          className="w-1/2"
          handleChange={formikSignUp.handleChange}
        />
        <InputCustomized
          name="lastName"
          placeholder="Last name"
          type="normal"
          className="w-1/2"
          handleChange={formikSignUp.handleChange}
        />
      </div>
      <InputCustomized
        name="email"
        placeholder="Email"
        type="normal"
        handleChange={formikSignUp.handleChange}
      />
      <InputCustomized
        name="password"
        placeholder="Password"
        type="password"
        handleChange={formikSignUp.handleChange}
      />
      <InputCustomized
        name="confirmPassword"
        placeholder="Confirm Password"
        type="password"
        handleChange={formikSignUp.handleChange}
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
