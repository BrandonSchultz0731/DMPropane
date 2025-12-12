import { createRootRoute, Outlet, useLocation } from "@tanstack/react-router";
import { AppShell, Box } from "@mantine/core";
import { Header } from "../../../components/Header";
import { LoadingSpinner } from "../../../components/LoadingSpinner";
import { useUser } from "../../../hooks/useGetUsers";

export const rootRoute = createRootRoute({
  component: () => {
    const { isLoading } = useUser();
    const location = useLocation();

    return (
      <AppShell w="100vw" header={{ height: 70 }} style={{ position: "relative" }}>
        <Header />
        <AppShell.Main>
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <Box
              key={location.pathname}
              style={{
                animation: "fadeIn 0.4s ease-out",
                minHeight: "calc(100vh - 70px)",
              }}
            >
              <Outlet />
            </Box>
          )}
        </AppShell.Main>
      </AppShell>
    );
  },
});
