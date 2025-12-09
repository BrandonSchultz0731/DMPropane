import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./root";
import { Box, Button, Grid, Stack, Text, Title } from "@mantine/core";
import { useGetUsers } from "../../hooks/useGetUsers";

function HomePage() {
  const { data } = useGetUsers();
  console.log(data);
  return (
    <Box
      bg="gray.0"
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box w="100%" px="lg">
        <Grid align="center" gutter={60}>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Stack gap="xl">
              <Title fw={900} style={{ fontSize: "clamp(3rem, 8vw, 4.5rem)" }}>
                Got Gas?
              </Title>

              <Text size="lg" c="dimmed" lh={1.6} maw={480}>
                Monitor your propane levels in real time and never run out
                again. Smart tracking for homes and businesses.
              </Text>

              <Button size="lg" radius="xl" w="fit-content">
                Get Started
              </Button>
            </Stack>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Box
              w="100%"
              h={420}
              bg="brand.1"
              style={{
                borderRadius: 32,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <Box
                w={200}
                h={200}
                bg="brand.3"
                style={{
                  borderRadius: "50%",
                  position: "absolute",
                  top: -40,
                  left: -40,
                }}
              />

              <Box
                w={240}
                h={320}
                bg="brand.6"
                style={{
                  borderRadius: "120px",
                  position: "absolute",
                  right: 40,
                  bottom: 20,
                }}
              />
            </Box>
          </Grid.Col>
        </Grid>
        <Box mt={80}>
          <Title
            mb="md"
            style={{
              fontSize: "clamp(3rem, 8vw, 4.5rem)",
              textAlign: "center",
            }}
          >
            About Us
          </Title>
          <Text maw={600} mx="auto" c="dimmed" style={{ textAlign: "center" }}>
            At DMPropane, we are committed to providing reliable propane
            services to homes and businesses. Our mission is to ensure you never
            run out of propane when you need it most.
          </Text>
        </Box>
        <Box mt={80}>
          <Title
            mb="md"
            style={{
              textAlign: "center",
              fontSize: "clamp(3rem, 8vw, 4.5rem)",
            }}
          >
            How We Can Help
          </Title>
          <Grid gutter={40} justify="center">
            <Grid.Col span={4}>
              <Stack align="center">
                <Box
                  w={80}
                  h={80}
                  bg="brand.3"
                  style={{ borderRadius: "50%" }}
                />
                <Text fw={700}>Propane Delivery</Text>
                <Text c="dimmed" style={{ textAlign: "center" }}>
                  Flexible delivery options to meet your needs.
                </Text>
              </Stack>
            </Grid.Col>
            <Grid.Col span={4}>
              <Stack align="center">
                <Box
                  w={80}
                  h={80}
                  bg="brand.3"
                  style={{ borderRadius: "50%" }}
                />
                <Text fw={700}>Tank Installation</Text>
                <Text c="dimmed" style={{ textAlign: "center" }}>
                  Professional installation for homes and businesses.
                </Text>
              </Stack>
            </Grid.Col>
            <Grid.Col span={4}>
              <Stack align="center">
                <Box
                  w={80}
                  h={80}
                  bg="brand.3"
                  style={{ borderRadius: "50%" }}
                />
                <Text fw={700}>Customer Support</Text>
                <Text c="dimmed" style={{ textAlign: "center" }}>
                  24/7 support to assist with all your propane needs.
                </Text>
              </Stack>
            </Grid.Col>
          </Grid>
        </Box>
        <Box mt={80}>
          <Title
            mb="md"
            style={{
              textAlign: "center",
              fontSize: "clamp(3rem, 8vw, 4.5rem)",
            }}
          >
            Our Services
          </Title>
          <Text maw={600} mx="auto" c="dimmed" style={{ textAlign: "center" }}>
            From propane delivery to tank installation, we offer a wide range of
            services to keep your home or business running smoothly.
          </Text>
        </Box>
        <Box mt={80}>
          <Title
            mb="md"
            style={{
              textAlign: "center",
              fontSize: "clamp(3rem, 8vw, 4.5rem)",
            }}
          >
            Why Choose Us
          </Title>
          <Grid gutter={40} justify="center">
            <Grid.Col span={4}>
              <Stack align="center">
                <Text fw={700}>Reliable Service</Text>
                <Text c="dimmed" style={{ textAlign: "center" }}>
                  Count on us to deliver propane when you need it most.
                </Text>
              </Stack>
            </Grid.Col>
            <Grid.Col span={4}>
              <Stack align="center">
                <Text fw={700}>Safety First</Text>
                <Text c="dimmed" style={{ textAlign: "center" }}>
                  Your safety is our top priority.
                </Text>
              </Stack>
            </Grid.Col>
            <Grid.Col span={4}>
              <Stack align="center">
                <Text fw={700}>Digital Tools</Text>
                <Text c="dimmed" style={{ textAlign: "center" }}>
                  Manage your propane services online with ease.
                </Text>
              </Stack>
            </Grid.Col>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});
