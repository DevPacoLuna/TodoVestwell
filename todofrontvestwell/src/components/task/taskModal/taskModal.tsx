"use client";
import { Button } from "@/stories/Button";
import CloseIcon from "@mui/icons-material/Close";
import { TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { CreateTaskDTO, TaskDAO, UpdateTaskDTO } from "@/models/task";
import { useFormik } from "formik";
import { taskSchema } from "./form";
import dayjs from "dayjs";
import AddIcon from "@mui/icons-material/Add";
import { Dispatch, SetStateAction, useContext, useEffect } from "react";
import { createTask, updateTask } from "@/services/task";
import { ErrorsContext } from "@/providers/handleErrorsProvider";
import { AxiosError } from "axios";

const TaskModal = ({
  task,
  setTaskSelected,
  setPage,
}: {
  task: TaskDAO | CreateTaskDTO;
  setTaskSelected: Dispatch<
    SetStateAction<TaskDAO | CreateTaskDTO | undefined>
  >;
  setPage: Dispatch<SetStateAction<number>>;
}) => {
  const { setErrors } = useContext(ErrorsContext);

  const fetchTask = (values: CreateTaskDTO) => {
    if (task.id) {
      updateTaskFlow(task.id, values);
      return;
    }

    createTaskFlow(values);
  };

  const createTaskFlow = (values: CreateTaskDTO) => {
    try {
      const result = createTask(values);

      setErrors((prev) => [
        ...prev,
        {
          message: "Task was created successfully",
          type: "success",
        },
      ]);
      setPage(0);
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

  const updateTaskFlow = (id: number, task: UpdateTaskDTO) => {
    try {
      const result = updateTask({ id, task });

      setErrors((prev) => [
        ...prev,
        {
          message: "Task was updated successfully",
          type: "success",
        },
      ]);
      setPage(0);
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

  const formikTask = useFormik<CreateTaskDTO>({
    initialValues: {
      title: "",
      description: "",
      dueDate: dayjs().format("DD/MM/YYYY"),
    },
    validationSchema: taskSchema,
    onSubmit: fetchTask,
  });

  useEffect(() => {
    if (task) {
      formikTask.setFieldValue("title", task.title);
      formikTask.setFieldValue("description", task.description);
      formikTask.setFieldValue("dueDate", task.dueDate);
    }
  }, [task]);

  return (
    <div className="flex flex-col justify-between rounded-[16px] bg-[#f4f4f4] w-[448px] h-[852px] p-[20px] mt-[40px]">
      <div className="flex flex-col">
        <div className="flex justify-between pb-[30px]">
          <h2 className="text-[24px] font-semibold">Task:</h2>
          <button
            className="bg-transparent"
            onClick={() => setTaskSelected(undefined)}
          >
            <CloseIcon className="text-[#7C7C7C]" />
          </button>
        </div>
        <div className="flex flex-col gap-[20px]">
          <TextField
            id="title"
            label="title"
            value={formikTask.values.title}
            onChange={formikTask.handleChange}
          />
          <TextField
            id="description"
            label="Description"
            multiline
            rows={4}
            value={formikTask.values.description}
            onChange={formikTask.handleChange}
          />
          <div className="flex items-center gap-[10px]">
            <span>Due date:</span>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                format="DD/MM/YYYY"
                value={dayjs(formikTask.values.dueDate, "DD/MM/YYYY")}
                onChange={(date) => {
                  if (date) {
                    formikTask.setFieldValue(
                      "dueDate",
                      date.format("DD/MM/YYYY")
                    );
                  }
                }}
              />
            </LocalizationProvider>
          </div>
          <div>
            <h2 className="text-[24px] font-semibold">Subtasks:</h2>
            <button className="w-full h-[46px] border-b-[1px] border-[#EBEBEB] flex items-center pl-[10px] pb-[5px] text-[#7c7c7cff] gap-[10px]">
              <AddIcon />
              Add new subtask
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-around">
        <Button>Delete task</Button>
        <Button backgroundColor="#FFD43B" onClick={formikTask.handleSubmit}>
          Save changes
        </Button>
      </div>
    </div>
  );
};

export default TaskModal;
