import { AppShell, Container, Group, Button, Text, Box, Menu, Burger, Drawer, Stack, useMantineTheme } from "@mantine/core";
import { appConfig } from "../config/appConfig";
import { Link, useNavigate, useLocation } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postLogout } from "../api";
import { invalidateUser, useUser } from "../hooks/useGetUsers";
import { useState } from "react";
import { ROUTE_PATHS } from "../routes/routes";

export function Header() {
  const { data: user, isLoading } = useUser();
  const [mobileMenuOpened, setMobileMenuOpened] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const theme = useMantineTheme();
  const location = useLocation();

  // Helper function to check if a path is active
  const isActive = (path: ROUTE_PATHS) => {
    if (path === ROUTE_PATHS.HOME) {
      return location.pathname === ROUTE_PATHS.HOME;
    }
    return location.pathname.startsWith(path);
  };

  const logoutMutation = useMutation({
    mutationFn: async () => postLogout(),
    onSuccess: () => {
      invalidateUser(queryClient);
      navigate({ to: "/" });
    },
  });

  if (isLoading && !user) {
    return (
      <AppShell.Header
        style={{
          backgroundColor: "white",
          borderBottom: `1px solid ${theme.colors.earth[1]}`,
        }}
      >
        <Container size="lg" h="100%">
          <Group justify="space-between" align="center" h="100%">
            <Link to={ROUTE_PATHS.HOME} style={{ textDecoration: "none" }}>
              <Group gap="xs" style={{ cursor: "pointer" }}>
                <Box
                  w={40}
                  h={40}
                  style={{
                    backgroundColor: theme.colors.brand[6],
                    borderRadius: 8,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    color: "white",
                    transition: "transform 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  P
                </Box>
                <Text size="lg" fw={700} style={{ color: theme.colors.brown[9] }}>
                  {appConfig.name}
                </Text>
              </Group>
            </Link>
          </Group>
        </Container>
      </AppShell.Header>
    );
  }

  if (user) {
    return (
      <AppShell.Header
        style={{
          backgroundColor: "white",
          borderBottom: `1px solid ${theme.colors.earth[1]}`,
        }}
      >
        <Container size="lg" h="100%">
          <Group justify="space-between" align="center" h="100%">
            {/* Logo */}
            <Link to={ROUTE_PATHS.HOME} style={{ textDecoration: "none" }}>
              <Group gap="xs" style={{ cursor: "pointer" }}>
                <Box
                  w={40}
                  h={40}
                  style={{
                    backgroundColor: theme.colors.brand[6],
                    borderRadius: 8,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    color: "white",
                    transition: "transform 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  P
                </Box>

                <Text size="lg" fw={700} style={{ color: theme.colors.brown[9] }}>
                  {appConfig.name}
                </Text>
              </Group>
            </Link>

            {/* Nav for authenticated users */}
            <Group gap="md" visibleFrom="sm">
              <Link to={ROUTE_PATHS.DASHBOARD} style={{ textDecoration: "none" }}>
                <Box
                  style={{
                    cursor: "pointer",
                    position: "relative",
                    padding: "0.5rem 0",
                  }}
                >
                  <Text
                    style={{
                      color: isActive(ROUTE_PATHS.DASHBOARD) ? theme.colors.brand[6] : theme.colors.brown[7],
                      fontWeight: isActive(ROUTE_PATHS.DASHBOARD) ? 600 : 500,
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive(ROUTE_PATHS.DASHBOARD)) {
                        e.currentTarget.style.color = theme.colors.brand[6];
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive(ROUTE_PATHS.DASHBOARD)) {
                        e.currentTarget.style.color = theme.colors.brown[7];
                      }
                    }}
                  >
                    Dashboard
                  </Text>
                  {isActive(ROUTE_PATHS.DASHBOARD) && (
                    <Box
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: 3,
                        backgroundColor: theme.colors.brand[6],
                        borderRadius: "2px 2px 0 0",
                      }}
                    />
                  )}
                </Box>
              </Link>
            </Group>

            {/* User menu */}
            <Group gap="sm">
              <Menu shadow="md" width={200}>
                <Menu.Target>
                  <Button
                    variant="subtle"
                    style={{
                      color: theme.colors.brown[7],
                      fontWeight: 500,
                    }}
                  >
                    {user.name}
                  </Button>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Label>Account</Menu.Label>
                  <Menu.Item
                    component={Link}
                    to={ROUTE_PATHS.DASHBOARD}
                    style={{
                      backgroundColor: isActive(ROUTE_PATHS.DASHBOARD) ? `${theme.colors.brand[6]}15` : undefined,
                      fontWeight: isActive(ROUTE_PATHS.DASHBOARD) ? 600 : undefined,
                    }}
                  >
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
    <AppShell.Header
      style={{
        backgroundColor: "white",
        borderBottom: `1px solid ${theme.colors.earth[1]}`,
      }}
    >
      <Container size="lg" h="100%">
        <Group justify="space-between" align="center" h="100%">
          {/* Logo */}
          <Link to={ROUTE_PATHS.HOME} style={{ textDecoration: "none" }}>
            <Group gap="xs" style={{ cursor: "pointer" }}>
              <Box
                w={40}
                h={40}
                style={{
                  backgroundColor: theme.colors.brand[6],
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  color: "white",
                  transition: "transform 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                P
              </Box>

              <Text size="lg" fw={700} visibleFrom="xs" style={{ color: theme.colors.brown[9] }}>
                {appConfig.name}
              </Text>
            </Group>
          </Link>

          {/* Desktop Nav */}
          <Group gap="md" visibleFrom="sm">
            {[
              { label: "Home", path: ROUTE_PATHS.HOME },
              { label: "Features", path: ROUTE_PATHS.FEATURES },
              { label: "Pricing", path: ROUTE_PATHS.PRICING },
              { label: "Contact", path: ROUTE_PATHS.CONTACT },
            ].map((item) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  style={{ textDecoration: "none" }}
                >
                  <Box
                    style={{
                      cursor: "pointer",
                      position: "relative",
                      padding: "0.5rem 0",
                    }}
                  >
                    <Text
                      style={{
                        color: active ? theme.colors.brand[6] : theme.colors.brown[7],
                        fontWeight: active ? 600 : 500,
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        if (!active) {
                          e.currentTarget.style.color = theme.colors.brand[6];
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!active) {
                          e.currentTarget.style.color = theme.colors.brown[7];
                        }
                      }}
                    >
                      {item.label}
                    </Text>
                    {active && (
                      <Box
                        style={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          right: 0,
                          height: 3,
                          backgroundColor: theme.colors.brand[6],
                          borderRadius: "2px 2px 0 0",
                        }}
                      />
                    )}
                  </Box>
                </Link>
              );
            })}
          </Group>

          {/* Desktop CTA */}
          <Group gap="sm" visibleFrom="sm">
            <Button
              variant="subtle"
              component={Link}
              to={ROUTE_PATHS.LOGIN}
              style={{
                color: theme.colors.brown[7],
                fontWeight: 500,
              }}
            >
              Log in
            </Button>
            <Button
              component={Link}
              to={ROUTE_PATHS.SIGNUP}
              style={{
                backgroundColor: theme.colors.brand[6],
                color: "white",
                fontWeight: 600,
              }}
            >
              Get Started
            </Button>
          </Group>

          {/* Mobile Menu Button */}
          <Burger
            opened={mobileMenuOpened}
            onClick={() => setMobileMenuOpened((o) => !o)}
            hiddenFrom="sm"
            size="sm"
            color={theme.colors.brown[7]}
          />
        </Group>
      </Container>
      <Drawer
        opened={mobileMenuOpened}
        onClose={() => setMobileMenuOpened(false)}
        title={
          <Text fw={700} style={{ color: theme.colors.brown[9] }}>
            {appConfig.name}
          </Text>
        }
        padding="md"
        hiddenFrom="sm"
        position="right"
        withinPortal={false}
      >
        <Stack gap="md">
          {[
            { label: "Home", path: ROUTE_PATHS.HOME },
            { label: "Features", path: ROUTE_PATHS.FEATURES },
            { label: "Pricing", path: ROUTE_PATHS.PRICING },
            { label: "Contact", path: ROUTE_PATHS.CONTACT },
          ].map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpened(false)}
                style={{ textDecoration: "none" }}
              >
                <Box
                  style={{
                    cursor: "pointer",
                    padding: "0.5rem 0.75rem",
                    borderRadius: 6,
                    backgroundColor: active ? `${theme.colors.brand[6]}15` : "transparent",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    if (!active) {
                      e.currentTarget.style.backgroundColor = `${theme.colors.brand[6]}08`;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }
                  }}
                >
                  <Text
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: active ? 600 : 500,
                      color: active ? theme.colors.brand[6] : theme.colors.brown[7],
                    }}
                  >
                    {item.label}
                  </Text>
                </Box>
              </Link>
            );
          })}

          <Stack gap="sm" mt="xl">
            <Button
              fullWidth
              variant="subtle"
              component={Link}
              to={ROUTE_PATHS.LOGIN}
              onClick={() => setMobileMenuOpened(false)}
              style={{
                color: theme.colors.brown[7],
              }}
            >
              Log in
            </Button>
            <Button
              fullWidth
              component={Link}
              to={ROUTE_PATHS.SIGNUP}
              onClick={() => setMobileMenuOpened(false)}
              style={{
                backgroundColor: theme.colors.brand[6],
                color: "white",
                fontWeight: 600,
              }}
            >
              Get Started
            </Button>
          </Stack>
        </Stack>
      </Drawer>
    </AppShell.Header>
  );
}
