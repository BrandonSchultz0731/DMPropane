import { useMutation, useQuery, useQueryClient, queryOptions } from "@tanstack/react-query";
import { api } from "../api";
import { useNavigate } from "@tanstack/react-router";
import type { UserResponse } from "@brandon0731/types";
import { ROUTE_PATHS } from "../routes/routes";

interface LoginForm {
  email: string;
  password: string;
}

export const userQueryOptions = () => queryOptions({
  queryKey: ["currentUser"],
  queryFn: async (): Promise<UserResponse | null> => {
    const res = await api.get("/auth/me");
    return res.data;
  },
  retry: false,
  refetchOnWindowFocus: false,
  placeholderData: (previousData: UserResponse | null | undefined) => previousData,
});

export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation<UserResponse, Error, LoginForm>({
    mutationFn: async (form) => {
      const res = await api.post("/auth/login", form);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      navigate({ to: ROUTE_PATHS.DASHBOARD });
    },
  });
};

export const useUser = () => {
  return useQuery(userQueryOptions());
};
