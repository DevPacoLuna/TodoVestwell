import * as Yup from "yup";

export interface signUpForm {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const signUpSchema: Yup.Schema<signUpForm> = Yup.object().shape({
  firstName: Yup.string(),
  lastName: Yup.string(),
  email: Yup.string().email("Type a valid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Both passwords has to be equals")
    .required("Password confirmation is required"),
});
