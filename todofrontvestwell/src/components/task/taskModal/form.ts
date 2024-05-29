import { CreateTaskDTO, TaskDAO, TaskStatus } from "@/models/task";
import * as Yup from "yup";

export const taskSchema: Yup.Schema<CreateTaskDTO> = Yup.object().shape({
  title: Yup.string().required(),
  description: Yup.string().required(),
  dueDate: Yup.string().required(),
  childTasks: Yup.array().of(Yup.number().required()),
  status: Yup.mixed<TaskStatus>().oneOf(Object.values(TaskStatus)),
});
