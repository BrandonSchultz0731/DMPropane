import { Box, Container, Stack, Title, Text, Paper, Grid, useMantineTheme } from "@mantine/core";
import { useUser } from "../../hooks/useGetUsers";
import { createProtectedRoute } from "../utils/createProtectedRoute";
import { ROUTE_PATHS } from "../../routes/routes";

function DashboardPage() {
  const { data: user, isLoading } = useUser();
  const theme = useMantineTheme();

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
    <Box
      style={{
        minHeight: "calc(100vh - 70px)",
        background: `linear-gradient(180deg, ${theme.colors.brand[0]}, ${theme.colors.earth[0]})`,
        padding: "3rem 1rem",
      }}
    >
      <Container size="xl">
        <Stack gap="xl">
          <Box>
            <Title
              order={1}
              style={{
                fontSize: "clamp(2rem, 5vw, 3rem)",
                color: theme.colors.brown[9],
                marginBottom: "0.5rem",
              }}
            >
              Welcome back, {user.name}!
            </Title>
            <Text size="lg" c="dimmed">
              Manage your propane account and services
            </Text>
          </Box>

          <Grid gutter="md">
            <Grid.Col span={{ base: 12, md: 8 }}>
              <Paper
                shadow="sm"
                p="xl"
                radius="md"
                style={{
                  backgroundColor: "white",
                  border: `1px solid ${theme.colors.earth[1]}`,
                  height: "100%",
                }}
              >
                <Stack gap="md">
                  <Title order={3} style={{ color: theme.colors.brand[6] }}>
                    Account Overview
                  </Title>
                  <Stack gap="sm">
                    <Box>
                      <Text size="sm" fw={600} c="dimmed" mb={4}>
                        Full Name
                      </Text>
                      <Text size="md">{user.name}</Text>
                    </Box>
                    <Box>
                      <Text size="sm" fw={600} c="dimmed" mb={4}>
                        Email Address
                      </Text>
                      <Text size="md">{user.email}</Text>
                    </Box>
                    <Box>
                      <Text size="sm" fw={600} c="dimmed" mb={4}>
                        User ID
                      </Text>
                      <Text size="md" style={{ fontFamily: "monospace" }}>
                        {user.id}
                      </Text>
                    </Box>
                  </Stack>
                </Stack>
              </Paper>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 4 }}>
              <Paper
                shadow="sm"
                p="xl"
                radius="md"
                style={{
                  backgroundColor: theme.colors.brand[6],
                  color: "white",
                  height: "100%",
                }}
              >
                <Stack gap="md">
                  <Title order={3} c="white">
                    Quick Actions
                  </Title>
                  <Text size="sm" c="white" style={{ opacity: 0.9 }}>
                    Manage your propane services, view delivery history, and update your account settings.
                  </Text>
                </Stack>
              </Paper>
            </Grid.Col>
          </Grid>

          <Paper
            shadow="sm"
            p="xl"
            radius="md"
            style={{
              backgroundColor: "white",
              border: `1px solid ${theme.colors.earth[1]}`,
            }}
          >
            <Stack gap="md">
              <Title order={3} style={{ color: theme.colors.brown[9] }}>
                Your Services
              </Title>
              <Text c="dimmed">
                Your propane service information will appear here. Contact us to set up delivery or installation services.
              </Text>
            </Stack>
          </Paper>
        </Stack>
      </Container>
    </Box>
  );
}

export const dashboardRoute = createProtectedRoute({
  path: ROUTE_PATHS.DASHBOARD,
  component: DashboardPage,
});

