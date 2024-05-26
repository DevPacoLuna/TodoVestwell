import { UserDAO, UserDTO } from "@/models/user";
import { axiosService } from "./axios";

export const createUser = async (userDTO: UserDTO) => {
  const result = await axiosService("client").post<UserDAO>("/users", userDTO);

  return result;
};
