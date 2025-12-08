import { createRoute, Link } from "@tanstack/react-router";
import { rootRoute } from "./root";
import {
  Box,
  Button,
  Group,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";

function LoginPage() {
  return (
    <Box
      w="100vw"
      h="100vh"
      bg="gray.0"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        w={400}
        p="lg"
        bg="white"
        style={{
          borderRadius: 16,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Stack gap="md">
          <Title
            order={2}
            style={{
              textAlign: "center",
              color: "var(--mantine-color-brand-6)",
            }}
          >
            Login
          </Title>

          <TextInput
            label="Email"
            placeholder="Enter your email"
            size="md"
            required
          />

          <TextInput
            label="Password"
            placeholder="Enter your password"
            type="password"
            size="md"
            required
          />

          <Button size="md" radius="xl" fullWidth>
            Log In
          </Button>

          <Group justify="center">
            <Text size="sm" color="dimmed">
              Don’t have an account?
            </Text>
            <Text
              component={Link}
              to="/signup"
              size="sm"
              color="brand.6"
              style={{ cursor: "pointer" }}
            >
              Sign Up
            </Text>
          </Group>
        </Stack>
      </Box>
    </Box>
  );
}

export const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "login",
  component: LoginPage,
});
