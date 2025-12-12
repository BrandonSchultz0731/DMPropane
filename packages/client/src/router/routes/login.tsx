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
import { useState } from "react";
import { useLogin } from "../../hooks/useGetUsers";
import { ROUTES } from "../../routes/routes";

function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const theme = useMantineTheme();
  const loginMutation = useLogin();

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    loginMutation.mutate(form);
  };

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
                Welcome Back
              </Title>
              <Text size="sm" c="dimmed">
                Sign in to your D&M Propane account
              </Text>
            </Box>

            <Stack gap="md">
              <TextInput
                label="Email"
                placeholder="Enter your email"
                size="md"
                required
                value={form.email}
                onChange={(e) => handleChange("email", e.currentTarget.value)}
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
                value={form.password}
                onChange={(e) => handleChange("password", e.currentTarget.value)}
                styles={{
                  label: { fontWeight: 600, color: theme.colors.brown[7] },
                }}
              />

              <Button
                size="md"
                radius="md"
                fullWidth
                loading={loginMutation.isPending}
                onClick={handleSubmit}
                style={{
                  backgroundColor: theme.colors.brand[6],
                  marginTop: "0.5rem",
                  fontWeight: 600,
                }}
              >
                Log In
              </Button>

              {loginMutation.isError && (
                <Text size="sm" c="red" ta="center" style={{ marginTop: "-0.5rem" }}>
                  Invalid email or password
                </Text>
              )}
            </Stack>

            <Group justify="center" mt="md">
              <Text size="sm" c="dimmed">
                Don't have an account?{" "}
              </Text>
              <Text
                component={Link}
                to={ROUTES.SIGNUP}
                size="sm"
                c="brand.6"
                fw={600}
                style={{ cursor: "pointer" }}
              >
                Sign Up
              </Text>
            </Group>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}

export const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTES.LOGIN,
  component: LoginPage,
});
