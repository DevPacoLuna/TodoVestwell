import * as Yup from "yup";

export const subtaskSchema: Yup.Schema<{ title: string }> = Yup.object().shape({
  title: Yup.string().required(),
});
