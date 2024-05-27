import { FiltersDTO, TasksDAO } from "@/models/task";
import { axiosService } from "./axios";
import { getToken } from "./localstorage";

export const getAllTasks = async ({ page, limit, status }: FiltersDTO) => {
  const result = await axiosService("client").get<TasksDAO>(
    `/tasks?limit=${limit}&page=${page}&status=${status}`,
    {
      headers: { Authorization: `Bearer ${getToken()}` },
    }
  );

  return result.data;
};
