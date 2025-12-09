import { useQuery } from "@tanstack/react-query";
import API_BASE_URL from "../config/apiConfig";

const fetchUsers = async () => {
  const response = await fetch(`${API_BASE_URL}/users`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const useGetUsers = () => {
  return useQuery({ queryKey: ["exampleData"], queryFn: fetchUsers });
};
