import * as Yup from "yup";

export interface signInForm {
  email: string;
  password: string;
}

export const signInSchema: Yup.Schema<signInForm> = Yup.object().shape({
  email: Yup.string()
    .email("Type a valid email")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});
