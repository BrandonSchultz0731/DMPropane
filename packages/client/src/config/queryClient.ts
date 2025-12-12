import { QueryClient } from "@tanstack/react-query";

// Create a single QueryClient instance that can be shared across the app
// This allows route loaders to access the same cache as React components
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Global defaults for all queries
      staleTime: 0, // Individual queries can override this
      retry: 1,
    },
  },
});
