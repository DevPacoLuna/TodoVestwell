import { SignInDAO, SignInDTO } from "@/models/auth";
import { axiosService } from "./axios";
import { setTokens } from "./localstorage";

export const login = async (signInDto: SignInDTO) => {
  const { status, data } = await axiosService("client").post<SignInDAO>(
    "/auth/login",
    signInDto
  );

  if (status === 200) {
    setTokens(data.accessToken);
    return true;
  } else {
    return false;
  }
};
