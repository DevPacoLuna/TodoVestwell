import axios from "axios";

export const axiosService = (type: "client" | "server") =>
  axios.create({
    baseURL:
      type === "client"
        ? process.env.NEXT_PUBLIC_BACKEND_API_URL
        : process.env.NEXT_PUBLIC_SERVER_BACKEND_API_URL,
  });
