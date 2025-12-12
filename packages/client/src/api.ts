import axios from "axios";
import API_BASE_URL from "./config/apiConfig";

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    ME: "/auth/me",
  }
}

export const getLoggedInUser = async () => {
  const res = await api.get(API_ENDPOINTS.AUTH.ME);
  return res.data;
}

export const postLogin = async (email: string, password: string) => {
  const res = await api.post(API_ENDPOINTS.AUTH.LOGIN, { email, password });
  return res.data;
}

export const postLogout = async () => {
  const res = await api.post(API_ENDPOINTS.AUTH.LOGOUT);
  return res.data;
}