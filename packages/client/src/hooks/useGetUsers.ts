import { useQuery } from "@tanstack/react-query";
import API_BASE_URL from "../config/apiConfig";

const fetchUsers = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_BASE_URL}/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const useGetUsers = () => {
  return useQuery({ queryKey: ["exampleData"], queryFn: fetchUsers });
};
