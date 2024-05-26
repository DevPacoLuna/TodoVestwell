import { FiltersDTO, TaskDAO } from "@/models/task";
import { axiosService } from "./axios";
import { getToken } from "./localstorage";

export const getAllTasks = async ({ page, limit }: FiltersDTO) => {
  const result = await axiosService("client").get<TaskDAO[]>(
    `/tasks?limit=${limit}&page=${page}`,
    {
      headers: { Authorization: `Bearer ${getToken()}` },
    }
  );

  return result.data;
};
