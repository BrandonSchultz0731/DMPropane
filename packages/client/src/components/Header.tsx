import { AppShell, Container, Group, Button, Text, Box, Menu, Burger, Drawer, Stack } from "@mantine/core";
import { appConfig } from "../config/appConfig";
import { COLORS } from "../config/designTokens";
import { Link, useNavigate } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api";
import { useUser } from "../hooks/useGetUsers";
import { useState } from "react";
import { ROUTE_PATHS } from "../routes/routes";

export function Header() {
  const { data: user, isLoading } = useUser();
  const [mobileMenuOpened, setMobileMenuOpened] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await api.post(
        "/auth/logout",
        {}
      );
    },
    onSuccess: () => {
      queryClient.setQueryData(["currentUser"], null);
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      navigate({ to: "/" });
    },
  });

  if (isLoading && !user) {
    return (
      <AppShell.Header>
        <Container size="lg" h="100%">
          <Group justify="space-between" align="center" h="100%">
            <Group gap="xs">
              <Box
                w={40}
                h={40}
                bg={COLORS.primary}
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
          </Group>
        </Container>
      </AppShell.Header>
    );
  }

  if (user) {
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

            {/* Nav for authenticated users */}
            <Group gap="md" visibleFrom="sm">
              <Text component={Link} to="/dashboard" style={{ cursor: "pointer" }}>
                Dashboard
              </Text>
            </Group>

            {/* User menu */}
            <Group gap="sm">
              <Menu shadow="md" width={200}>
                <Menu.Target>
                  <Button variant="subtle">
                    {user.name}
                  </Button>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Label>Account</Menu.Label>
                  <Menu.Item component={Link} to="/dashboard">
                    Dashboard
                  </Menu.Item>
                  <Menu.Divider />
                  <Menu.Item
                    color="red"
                    onClick={() => logoutMutation.mutate()}
                  >
                    Log out
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Group>
          </Group>
        </Container>
      </AppShell.Header>
    );
  }

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

            <Text size="lg" fw={700} visibleFrom="xs">
              {appConfig.name}
            </Text>
          </Group>

          {/* Desktop Nav */}
          <Group gap="md" visibleFrom="sm">
            <Text component={Link} to={ROUTE_PATHS.HOME} style={{ cursor: "pointer" }}>
              Home
            </Text>
            <Text component={Link} to={ROUTE_PATHS.FEATURES} style={{ cursor: "pointer" }}>
              Features
            </Text>
            <Text component={Link} to={ROUTE_PATHS.PRICING} style={{ cursor: "pointer" }}>
              Pricing
            </Text>
            <Text component={Link} to={ROUTE_PATHS.CONTACT} style={{ cursor: "pointer" }}>
              Contact
            </Text>
          </Group>

          {/* Desktop CTA */}
          <Group gap="sm" visibleFrom="sm">
            <Button variant="subtle" component={Link} to={ROUTE_PATHS.LOGIN}>
              Log in
            </Button>
            <Button component={Link} to={ROUTE_PATHS.SIGNUP}>
              Get Started
            </Button>
          </Group>

          {/* Mobile Menu Button */}
          <Burger
            opened={mobileMenuOpened}
            onClick={() => setMobileMenuOpened((o) => !o)}
            hiddenFrom="sm"
            size="sm"
          />
        </Group>
      </Container>
      <Drawer
        opened={mobileMenuOpened}
        onClose={() => setMobileMenuOpened(false)}
        title={appConfig.name}
        padding="md"
        hiddenFrom="sm"
        position="right"
        withinPortal={false}
      >
        <Stack gap="md">
          <Text
            component={Link}
            to={ROUTE_PATHS.HOME}
            onClick={() => setMobileMenuOpened(false)}
            style={{ cursor: "pointer", fontSize: "1.1rem", fontWeight: 500 }}
          >
            Home
          </Text>
          <Text
            component={Link}
            to={ROUTE_PATHS.FEATURES}
            onClick={() => setMobileMenuOpened(false)}
            style={{ cursor: "pointer", fontSize: "1.1rem", fontWeight: 500 }}
          >
            Features
          </Text>
          <Text
            component={Link}
            to={ROUTE_PATHS.PRICING}
            onClick={() => setMobileMenuOpened(false)}
            style={{ cursor: "pointer", fontSize: "1.1rem", fontWeight: 500 }}
          >
            Pricing
          </Text>
          <Text
            component={Link}
            to={ROUTE_PATHS.CONTACT}
            onClick={() => setMobileMenuOpened(false)}
            style={{ cursor: "pointer", fontSize: "1.1rem", fontWeight: 500 }}
          >
            Contact
          </Text>

          <Stack gap="sm" mt="xl">
            <Button
              fullWidth
              variant="subtle"
              component={Link}
              to={ROUTE_PATHS.LOGIN}
              onClick={() => setMobileMenuOpened(false)}
            >
              Log in
            </Button>
            <Button
              fullWidth
              component={Link}
              to={ROUTE_PATHS.SIGNUP}
              onClick={() => setMobileMenuOpened(false)}
            >
              Get Started
            </Button>
          </Stack>
        </Stack>
      </Drawer>
    </AppShell.Header>
  );
}
