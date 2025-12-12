import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";
import { theme } from "./config/theme.ts";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./pages/router/router.ts";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./config/queryClient.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        <RouterProvider router={router} />
      </MantineProvider>
    </QueryClientProvider>
  </StrictMode>
);
