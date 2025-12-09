import { useQuery } from "@tanstack/react-query";
import { api } from "../api";

const fetchUsers = async () => {
  const res = await api.get("/users");
  return res.data;
};

export const useGetUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
};
