import { Box, Stack, Title, Text, Paper } from "@mantine/core";
import { useUser } from "../../hooks/useGetUsers";
import { createProtectedRoute } from "../utils/createProtectedRoute";

function DashboardPage() {
  const { data: user, isLoading } = useUser();

  if (isLoading) {
    return (
      <Box p="xl">
        <Text>Loading...</Text>
      </Box>
    );
  }

  if (!user) {
    return null; // Should not reach here due to beforeLoad, but just in case
  }

  return (
    <Box p="xl" maw={1200} mx="auto">
      <Stack gap="lg">
        <Title order={1}>Dashboard</Title>

        <Paper shadow="sm" p="lg" radius="md">
          <Stack gap="md">
            <Text size="lg" fw={600}>
              Welcome, {user.name}!
            </Text>
            <Text c="dimmed">Email: {user.email}</Text>
            <Text size="sm" c="dimmed">
              This is your protected dashboard. Only authenticated users can access this page.
            </Text>
          </Stack>
        </Paper>

        <Paper shadow="sm" p="lg" radius="md">
          <Title order={3} mb="md">
            Your Account
          </Title>
          <Stack gap="xs">
            <Text>
              <strong>User ID:</strong> {user.id}
            </Text>
            <Text>
              <strong>Name:</strong> {user.name}
            </Text>
            <Text>
              <strong>Email:</strong> {user.email}
            </Text>
          </Stack>
        </Paper>
      </Stack>
    </Box>
  );
}

export const dashboardRoute = createProtectedRoute({
  path: "dashboard",
  component: DashboardPage,
});

