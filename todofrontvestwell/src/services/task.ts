import {
  CreateTaskDTO,
  FiltersDTO,
  TaskDAO,
  TasksDAO,
  UpdateTaskDTO,
} from "@/models/task";
import { axiosService } from "./axios";
import { getToken } from "./localstorage";

export const getAllTasks = async ({ page, limit, status }: FiltersDTO) => {
  const result = await axiosService("client").get<TasksDAO>(
    `/tasks?limit=${limit}&page=${page}${status !== "All" ? "&status=" + status : ""}`,
    {
      headers: { Authorization: `Bearer ${getToken()}` },
    }
  );

  return result.data;
};

export const createTask = async (task: CreateTaskDTO) => {
  const result = await axiosService("client").post<TaskDAO>(`/tasks`, task, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });

  return result.data;
};

export const updateTask = async ({
  id,
  task,
}: {
  id: number;
  task: UpdateTaskDTO;
}) => {
  const result = await axiosService("client").patch<TaskDAO>(
    `/tasks/${id}`,
    task,
    {
      headers: { Authorization: `Bearer ${getToken()}` },
    }
  );

  return result.data;
};
