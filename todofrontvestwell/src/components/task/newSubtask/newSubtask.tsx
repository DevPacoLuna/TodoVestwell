import { InputCustomized } from "@/components/inputCustomized/inputCustomized";
import { subtaskSchema } from "./form";
import { useFormik } from "formik";
import { Button } from "@/components/button/Button";
import { createTask } from "@/services/task";
import { useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { ErrorsContext } from "@/providers/handleErrorsProvider";
import { AxiosError } from "axios";
import { ErrorResponse } from "../taskModal/taskModal";
import dayjs from "dayjs";

export const NewSubtask = ({ taskId }: { taskId: number }) => {
  const queryClient = useQueryClient();
  const { setErrors } = useContext(ErrorsContext);

  const fetchSubtask = async (values: { title: string }) => {
    try {
      await createTask({
        ...values,
        description: "",
        dueDate: dayjs().format("DD/MM/YYYY"),
        parentTask: taskId,
      });

      setErrors((prev) => [
        ...prev,
        {
          message: "Task was created successfully",
          type: "success",
        },
      ]);
      await queryClient.invalidateQueries({ queryKey: ["allTasks"] });
    } catch (error: any) {
      const axiosError = error as AxiosError;
      setErrors((prev) => [
        ...prev,
        {
          message:
            (axiosError.response?.data as ErrorResponse).message ??
            "It was a problem with your request",
          type: "error",
        },
      ]);
    }
  };

  const formikSubtask = useFormik<{ title: string }>({
    initialValues: {
      title: "",
    },
    validationSchema: subtaskSchema,
    onSubmit: fetchSubtask,
  });

  return (
    <div className="flex">
      <InputCustomized
        type="normal"
        placeholder="Subtask"
        name="title"
        className="w-full"
        handleChange={formikSubtask.handleChange}
      />
      <Button onClick={formikSubtask.handleSubmit} backgroundColor="#B6D0E2">
        Create
      </Button>
    </div>
  );
};
