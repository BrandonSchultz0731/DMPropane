import { createRoute, redirect } from "@tanstack/react-router";
import { rootRoute } from "../routes/root";
import { api } from "../../api";

interface ProtectedRouteOptions {
  path: string;
  component: any; // Route component type
  redirectTo?: string;
  [key: string]: any; // Allow other route options
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
      // Check if user is authenticated before loading the route
      try {
        const res = await api.get("/auth/me");
        if (!res.data) {
          throw redirect({
            to: "/login",
            search: {
              redirect: redirectPath,
            },
          });
        }
        return { user: res.data };
      } catch (error: any) {
        // If authentication fails (401, network error, etc.), redirect to login
        if (error?.to) {
          // Already a redirect, re-throw it
          throw error;
        }
        throw redirect({
          to: "/login",
          search: {
            redirect: redirectPath,
          },
        });
      }
    },
    ...restOptions,
  });
}

