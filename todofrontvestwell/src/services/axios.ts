"use client";
import axios from "axios";

export const axiosService = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API_URL,
});
