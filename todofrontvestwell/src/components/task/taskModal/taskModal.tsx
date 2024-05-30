"use client";
import { Button } from "@/components/button/Button";
import CloseIcon from "@mui/icons-material/Close";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  CreateTaskDTO,
  TaskDAO,
  TaskStatus,
  UpdateTaskDTO,
} from "@/models/task";
import { useFormik } from "formik";
import { taskSchema } from "./form";
import dayjs from "dayjs";
import AddIcon from "@mui/icons-material/Add";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { createTask, deleteTask, updateTask } from "@/services/task";
import { ErrorsContext } from "@/providers/handleErrorsProvider";
import { AxiosError } from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { TaskDeleteModal } from "../taskDeleteModal/taskDeleteModal";

const TaskModal = ({
  task,
  setTaskSelected,
}: {
  task: TaskDAO | CreateTaskDTO;
  setTaskSelected: Dispatch<
    SetStateAction<TaskDAO | CreateTaskDTO | undefined>
  >;
}) => {
  const queryClient = useQueryClient();
  const { setErrors } = useContext(ErrorsContext);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchTask = (values: CreateTaskDTO) => {
    if (task.id) {
      updateTaskFlow(task.id, values);
      return;
    }

    createTaskFlow(values);
  };

  const createTaskFlow = async (values: CreateTaskDTO) => {
    try {
      const result = await createTask(values);

      setErrors((prev) => [
        ...prev,
        {
          message: "Task was created successfully",
          type: "success",
        },
      ]);
      await queryClient.invalidateQueries({ queryKey: ["allTasks"] });
      setTaskSelected(undefined);
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

  const updateTaskFlow = async (id: number, task: UpdateTaskDTO) => {
    try {
      await updateTask({ id, task });

      setErrors((prev) => [
        ...prev,
        {
          message: "Task was updated successfully",
          type: "success",
        },
      ]);
      await queryClient.invalidateQueries({ queryKey: ["allTasks"] });
      setTaskSelected(undefined);
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
      formikTask.setFieldValue("status", task.status);
    }
  }, [task]);

  const handleDeleteTask = async () => {
    if (!task.id) return;
    try {
      await deleteTask(task.id);

      setErrors((prev) => [
        ...prev,
        {
          message: "Task was deleted successfully",
          type: "success",
        },
      ]);
      await queryClient.invalidateQueries({ queryKey: ["allTasks"] });
      setTaskSelected(undefined);
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

  return (
    <>
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
            <div className="flex items-center gap-[10px] justify-between">
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
            <div className="flex items-center justify-between gap-[10px]">
              <span>Status:</span>
              {formikTask.values.status && (
                <FormControl>
                  <InputLabel id="demo-simple-select-helper-label">
                    Status
                  </InputLabel>
                  <Select
                    id="status"
                    value={formikTask.values.status}
                    label="Status"
                    className="w-[200px]"
                    onChange={(e) =>
                      formikTask.setFieldValue(
                        "status",
                        e.target.value as TaskStatus
                      )
                    }
                  >
                    <MenuItem value={"To Do"}>To Do</MenuItem>
                    <MenuItem value={"In progress"}>In progress</MenuItem>
                    <MenuItem value={"Done"}>Done</MenuItem>
                  </Select>
                </FormControl>
              )}
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
          {task.id && <Button onClick={handleOpen}>Delete task</Button>}
          <Button backgroundColor="#FFD43B" onClick={formikTask.handleSubmit}>
            {task.id ? "Update changes" : "Save changes"}
          </Button>
        </div>
      </div>
      <TaskDeleteModal
        handleDeleteTask={handleDeleteTask}
        handleClose={handleClose}
        open={open}
      />
    </>
  );
};

export default TaskModal;
