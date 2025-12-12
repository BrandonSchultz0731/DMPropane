import axios from "axios";
import API_BASE_URL from "./config/apiConfig";

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Send cookies with requests
});

// Note: Token is now stored in httpOnly cookie, so we don't need to manually
// add it to headers. The browser will automatically send the cookie with each request.
// Removed localStorage token handling for better security.