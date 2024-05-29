import dayjs from "dayjs";

export interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  parentTask: number;
  status: TaskStatus;
}

export interface TasksDAO {
  countTasks: number;
  tasks: TaskDAO[];
}

export interface TaskDAO {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  parentTask: number;
  childTasks: TaskDAO[];
  status: TaskStatus;
}

export interface CreateTaskDTO {
  id?: number;
  title: string;
  description: string;
  dueDate: string;
  parentTask?: number;
  status?: TaskStatus;
}

export interface UpdateTaskDTO {
  title: string;
  description: string;
  dueDate: string;
  parentTask?: number;
  status?: TaskStatus;
}

export interface FiltersDTO {
  limit: number;
  page: number;
  status: TaskStatus | "All";
}

export enum TaskStatus {
  TODO = "To Do",
  INPROGRESS = "In progress",
  DONE = "Done",
}

export const mockTask: CreateTaskDTO = {
  title: "",
  description: "",
  dueDate: dayjs().format("DD/MM/YYYY"),
};
