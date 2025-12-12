import { useMutation, useQuery, useQueryClient, queryOptions, QueryClient } from "@tanstack/react-query";
import { getLoggedInUser, postLogin } from "../api";
import { useNavigate } from "@tanstack/react-router";
import type { UserResponse } from "@brandon0731/types";
import { ROUTE_PATHS } from "../routes/routes";

interface LoginForm {
  email: string;
  password: string;
}

export const userQueryOptions = () => queryOptions({
  queryKey: ["currentUser"],
  queryFn: async (): Promise<UserResponse | null> => (await getLoggedInUser()),
  retry: false,
  refetchOnWindowFocus: false,
  placeholderData: (previousData: UserResponse | null | undefined) => previousData,
});

export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation<UserResponse, Error, LoginForm>({
    mutationFn: async (form) => postLogin(form.email, form.password),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      navigate({ to: ROUTE_PATHS.DASHBOARD });
    },
  });
};

export const useUser = () => {
  return useQuery(userQueryOptions());
};

export const invalidateUser = (queryClient: QueryClient) => {
  queryClient.invalidateQueries({ queryKey: ["currentUser"] });
  queryClient.setQueryData(["currentUser"], null);

};
