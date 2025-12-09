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
import { ROUTES } from "../../routes/routes";

function SignUpPage() {
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
            Sign Up
          </Title>

          <TextInput
            label="Full Name"
            placeholder="Enter your full name"
            size="md"
            required
          />

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
            Sign Up
          </Button>

          <Group justify="center">
            <Text size="sm" color="dimmed">
              Already have an account?
            </Text>
            <Text
              component={Link}
              to="/login"
              size="sm"
              color="brand.6"
              style={{ cursor: "pointer" }}
            >
              Log In
            </Text>
          </Group>
        </Stack>
      </Box>
    </Box>
  );
}

export const signupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTES.SIGNUP,
  component: SignUpPage,
});
