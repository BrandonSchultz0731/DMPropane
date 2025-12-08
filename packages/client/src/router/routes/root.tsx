import { createRootRoute, Outlet } from "@tanstack/react-router";
import { AppShell } from "@mantine/core";
import { Header } from "../../components/Header";

export const rootRoute = createRootRoute({
  component: () => (
    <AppShell w="100vw" header={{ height: 70 }}>
      <Header />
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  ),
});
