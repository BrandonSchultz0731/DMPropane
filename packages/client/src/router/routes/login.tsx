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
import { useState } from "react";
import { useLogin } from "../../hooks/useGetUsers";

function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });

  const loginMutation = useLogin();

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    loginMutation.mutate(form);
  };

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
        style={{ borderRadius: 16, boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}
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
            value={form.email}
            onChange={(e) => handleChange("email", e.currentTarget.value)}
          />

          <TextInput
            label="Password"
            placeholder="Enter your password"
            type="password"
            size="md"
            required
            value={form.password}
            onChange={(e) => handleChange("password", e.currentTarget.value)}
          />

          <Button
            size="md"
            radius="xl"
            fullWidth
            loading={loginMutation.isPending}
            onClick={handleSubmit}
          >
            Log In
          </Button>

          {loginMutation.isError && (
            <Text size="sm" c="red" ta="center">
              Invalid email or password
            </Text>
          )}

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
