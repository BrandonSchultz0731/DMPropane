import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../api";
import { useNavigate } from "@tanstack/react-router";
import type { UserResponse } from "@brandon0731/types";
import { ROUTE_PATHS } from "../routes/routes";

interface LoginForm {
  email: string;
  password: string;
}

export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation<UserResponse, Error, LoginForm>({
    mutationFn: async (form) => {
      const res = await api.post("/auth/login", form);
      // Token is now stored in httpOnly cookie automatically by the server
      // No need to manually store it in localStorage
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      navigate({ to: ROUTE_PATHS.DASHBOARD });
    },
  });
};

export const useUser = () => {
  return useQuery<UserResponse | null>({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const res = await api.get("/auth/me");
      return res.data;
    },
    staleTime: 5 * 60 * 1000, // cache for 5 minutes
    retry: false, // don't retry if 401
  });
};
