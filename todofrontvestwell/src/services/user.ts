import { UserDAO, UserDTO } from "@/models/user";
import { axiosService } from "./axios";

export const createUser = async (userDTO: UserDTO) => {
  const result = await axiosService.post<UserDAO>("/users", userDTO);

  return result;
};
