import { AppShell, Container, Group, Button, Text, Box } from "@mantine/core";
import { appConfig } from "../config/appConfig";
import { COLORS } from "../config/designTokens";
import { Link } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { api } from "../api";

export function Header() {
  const loginMutation = useMutation({
    mutationFn: async () => {
      await api.post(
        "/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );
    },
  });
  return (
    <AppShell.Header>
      <Container size="lg" h="100%">
        <Group justify="space-between" align="center" h="100%">
          {/* Logo */}
          <Group gap="xs">
            <Box
              w={40}
              h={40}
              bg={COLORS.primary}
              color="white"
              style={{
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                color: "white",
              }}
            >
              P
            </Box>

            <Text size="lg" fw={700}>
              {appConfig.name}
            </Text>
          </Group>

          {/* Nav */}
          <Group gap="md" visibleFrom="sm">
            <Text component={Link} to="/" style={{ cursor: "pointer" }}>
              Home
            </Text>
            <Text component={Link} to="/features" style={{ cursor: "pointer" }}>
              Features
            </Text>
            <Text component={Link} to="/pricing" style={{ cursor: "pointer" }}>
              Pricing
            </Text>
            <Text component={Link} to="/contact" style={{ cursor: "pointer" }}>
              Contact
            </Text>
          </Group>

          {/* CTA */}
          <Group gap="sm">
            <Button onClick={() => loginMutation.mutate()} variant="subtle">
              Log out
            </Button>
            <Button variant="subtle" component={Link} to="/login">
              Log in
            </Button>
            <Button component={Link} to="/signup">
              Get Started
            </Button>
          </Group>
        </Group>
      </Container>
    </AppShell.Header>
  );
}
