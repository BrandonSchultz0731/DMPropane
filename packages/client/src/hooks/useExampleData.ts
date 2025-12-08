import { useQuery } from "@tanstack/react-query";
import API_BASE_URL from "../config/apiConfig";

const fetchExampleData = async () => {
  const response = await fetch(`${API_BASE_URL}/example/hello`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const useExampleData = () => {
  return useQuery({ queryKey: ["exampleData"], queryFn: fetchExampleData });
};
