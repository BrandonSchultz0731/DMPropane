import { createRoute, redirect } from "@tanstack/react-router";
import { rootRoute } from "../routes/root";
import { queryClient } from "../../../config/queryClient";
import { userQueryOptions } from "../../../hooks/useGetUsers";
import { ROUTE_PATHS } from "../../routes/routes";
import type { UserResponse } from "@brandon0731/types";

interface ProtectedRouteOptions {
  path: string;
  component: any; // Route component type
  redirectTo?: string;
  [key: string]: unknown;
}

/**
 * Creates a protected route that requires authentication.
 * Automatically redirects to login if user is not authenticated.
 * 
 * @param options - Route configuration options
 * @param options.path - The route path
 * @param options.redirectTo - Optional redirect path after login (defaults to the route path)
 * @param options.component - The component to render
 * @param options - Other route options
 * @returns A configured protected route
 */
export function createProtectedRoute(options: ProtectedRouteOptions) {
  const { path, redirectTo, component, ...restOptions } = options;
  const redirectPath = redirectTo || path;

  return createRoute({
    getParentRoute: () => rootRoute,
    path,
    component,
    beforeLoad: async () => {
      try {
        // First check if we have cached data
        const cachedUser = queryClient.getQueryData<UserResponse | null>(userQueryOptions().queryKey);

        // If we have cached data, use it (component's useQuery will also use it)
        // Otherwise, fetch it (and component's useQuery will use the same fetch)
        let user: UserResponse | null;
        if (cachedUser !== undefined) {
          user = cachedUser;
        } else {
          user = await queryClient.fetchQuery(userQueryOptions());
        }

        if (!user) {
          throw redirect({
            to: ROUTE_PATHS.LOGIN,
            search: {
              redirect: redirectPath,
            },
          });
        }

        return { user };
      } catch (error: any) {
        // If authentication fails (401, network error, etc.), redirect to login
        if (error?.to) {
          // Already a redirect, re-throw it
          throw error;
        }
        throw redirect({
          to: ROUTE_PATHS.LOGIN,
          search: {
            redirect: redirectPath,
          },
        });
      }
    },
    ...restOptions,
  });
}

