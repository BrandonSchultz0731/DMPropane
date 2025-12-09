import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../api";
import { useNavigate } from "@tanstack/react-router";
import type { UserResponse } from "@brandon0731/types";

interface LoginForm {
  email: string;
  password: string;
}

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

export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation<UserResponse, Error, LoginForm>({
    mutationFn: async (form) => {
      const res = await api.post("/auth/login", form, {
        withCredentials: true,
      });
      return res.data.user;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      navigate({ to: "/" });
    },
  });
};

export const useUser = () => {
  return useQuery<UserResponse>({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const res = await api.get("/auth/me", { withCredentials: true });
      return res.data;
    },
    staleTime: 5 * 60 * 1000, // cache for 5 minutes
    retry: false, // don't retry if 401
  });
};
