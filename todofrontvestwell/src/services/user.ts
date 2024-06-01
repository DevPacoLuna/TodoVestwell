import { UserDAO, UserDTO } from "@/models/user";
import { axiosService } from "./axios";
import { getToken } from "./localstorage";

export const createUser = async (userDTO: UserDTO) => {
  const result = await axiosService("client").post<UserDAO>("/users", userDTO);

  return result;
};

export const getUser = async () => {
  const result = await axiosService("client").get<UserDAO>("/users", {
    headers: { Authorization: `Bearer ${getToken()}` },
  });

  return result;
};
