import { createRoute, Link } from "@tanstack/react-router";
import { rootRoute } from "./root";
import {
  Box,
  Button,
  Container,
  Group,
  Stack,
  Text,
  TextInput,
  Title,
  Paper,
  useMantineTheme,
} from "@mantine/core";
import { ROUTES } from "../../routes/routes";

function SignUpPage() {
  const theme = useMantineTheme();

  return (
    <Box
      style={{
        minHeight: "calc(100vh - 70px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: `linear-gradient(135deg, ${theme.colors.brand[0]} 0%, ${theme.colors.earth[0]} 50%, ${theme.colors.sage[0]} 100%)`,
        padding: "2rem 1rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative background elements */}
      <Box
        style={{
          position: "absolute",
          top: -50,
          right: -50,
          width: 200,
          height: 200,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${theme.colors.brand[2]}30, transparent)`,
          filter: "blur(40px)",
        }}
      />
      <Box
        style={{
          position: "absolute",
          bottom: -30,
          left: -30,
          width: 150,
          height: 150,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${theme.colors.forest[2]}25, transparent)`,
          filter: "blur(35px)",
        }}
      />

      <Container size="xs" style={{ position: "relative", zIndex: 1 }}>
        <Paper
          shadow="lg"
          radius="md"
          p="xl"
          style={{
            backgroundColor: "white",
            border: `1px solid ${theme.colors.earth[1]}`,
          }}
        >
          <Stack gap="lg">
            <Box ta="center" mb="md">
              <Title
                order={2}
                style={{
                  color: theme.colors.brand[6],
                  marginBottom: "0.5rem",
                }}
              >
                Create Account
              </Title>
              <Text size="sm" c="dimmed">
                Join D&M Propane today
              </Text>
            </Box>

            <Stack gap="md">
              <TextInput
                label="Full Name"
                placeholder="Enter your full name"
                size="md"
                required
                styles={{
                  label: { fontWeight: 600, color: theme.colors.brown[7] },
                }}
              />

              <TextInput
                label="Email"
                placeholder="Enter your email"
                size="md"
                required
                styles={{
                  label: { fontWeight: 600, color: theme.colors.brown[7] },
                }}
              />

              <TextInput
                label="Password"
                placeholder="Enter your password"
                type="password"
                size="md"
                required
                styles={{
                  label: { fontWeight: 600, color: theme.colors.brown[7] },
                }}
              />

              <Button
                size="md"
                radius="md"
                fullWidth
                style={{
                  backgroundColor: theme.colors.brand[6],
                  marginTop: "0.5rem",
                  fontWeight: 600,
                }}
              >
                Sign Up
              </Button>
            </Stack>

            <Group justify="center" mt="md">
              <Text size="sm" c="dimmed">
                Already have an account?{" "}
              </Text>
              <Text
                component={Link}
                to={ROUTES.LOGIN}
                size="sm"
                c="brand.6"
                fw={600}
                style={{ cursor: "pointer" }}
              >
                Log In
              </Text>
            </Group>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}

export const signupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTES.SIGNUP,
  component: SignUpPage,
});
