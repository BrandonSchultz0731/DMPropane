import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./root";
import {
  Box,
  Button,
  Grid,
  Stack,
  Text,
  Title,
  Paper,
  useMantineTheme,
} from "@mantine/core";
import { useUser } from "../../hooks/useGetUsers";

function HomePage() {
  const theme = useMantineTheme();
  const { data } = useUser();
  console.log(data);

  return (
    <Box bg="gray.0">
      {/* Hero Section */}
      <Box
        style={{
          padding: "6rem 1rem",
          backgroundImage: `linear-gradient(180deg, ${theme.colors.brand[0]}, #ffffff 100%)`,
        }}
      >
        <Grid justify="space-between" gutter={60}>
          {/* Left Side */}
          <Grid.Col span={{ base: 12, md: 5 }}>
            <Stack gap="xl" justify="center">
              <Title
                fw={900}
                style={{
                  fontSize: "clamp(3rem, 6vw, 4rem)",
                  lineHeight: 1.1,
                  textAlign: "left",
                }}
              >
                Got Gas?
              </Title>
              <Text size="lg" c="dimmed" maw={400}>
                Track your propane levels in real-time with our smart monitoring
                system. Reliable service for homes and businesses.
              </Text>
              <Button
                size="lg"
                radius="xl"
                style={{
                  backgroundImage: `linear-gradient(90deg, ${theme.colors.gradient[0]}, ${theme.colors.gradient[9]})`,
                  color: "white",
                  fontWeight: 700,
                  padding: "1rem 2rem",
                  maxWidth: 200,
                  border: "none", // ensure no border
                }}
              >
                Get Started
              </Button>
            </Stack>
          </Grid.Col>

          {/* Right Side */}
          <Grid.Col span={{ base: 12, md: 7 }}>
            <Box
              style={{
                position: "relative",
                width: "100%",
                height: 450,
                borderRadius: 32,
                overflow: "hidden",
                backgroundImage: `linear-gradient(135deg, ${theme.colors.lightRed[0]}, ${theme.colors.lightYellow[0]})`,
              }}
            >
              <Box
                style={{
                  position: "absolute",
                  top: -60,
                  left: -60,
                  width: 180,
                  height: 180,
                  borderRadius: "50%",
                  background: theme.colors.mediumRed[0],
                  transform: "rotate(25deg)",
                }}
              />
              <Box
                style={{
                  position: "absolute",
                  bottom: 20,
                  right: 20,
                  width: 260,
                  height: 300,
                  borderRadius: 130,
                  background: theme.colors.mediumYellow[0],
                }}
              />
            </Box>
          </Grid.Col>
        </Grid>
      </Box>

      {/* How We Can Help */}
      <Box mt={100} px="sm">
        <Title
          style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", textAlign: "center" }}
          mb="xl"
        >
          How We Can Help
        </Title>
        <Grid gutter={40} justify="center">
          {[
            {
              title: "Propane Delivery",
              desc: "Flexible delivery options to meet your needs.",
              color: theme.colors.mediumRed[0],
            },
            {
              title: "Tank Installation",
              desc: "Professional installation for homes and businesses.",
              color: theme.colors.mediumYellow[0],
            },
            {
              title: "Customer Support",
              desc: "24/7 support to assist with all your propane needs.",
              color: theme.colors.mediumGreen[0],
            },
          ].map((service) => (
            <Grid.Col span={{ base: 12, md: 4 }} key={service.title}>
              <Paper
                shadow="md"
                radius="lg"
                p="xl"
                style={{
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  textAlign: "center",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "translateY(-10px)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "translateY(0px)")
                }
              >
                <Box
                  w={80}
                  h={80}
                  mx="auto"
                  mb="md"
                  style={{
                    borderRadius: "50%",
                    background: service.color,
                  }}
                />
                <Text fw={700}>{service.title}</Text>
                <Text c="dimmed">{service.desc}</Text>
              </Paper>
            </Grid.Col>
          ))}
        </Grid>
      </Box>

      {/* CTA Section */}
      <Box
        mt={100}
        py={60}
        style={{
          backgroundImage: `linear-gradient(90deg, ${theme.colors.gradient[0]}, ${theme.colors.gradient[9]})`,
          textAlign: "center",
          color: "white",
        }}
      >
        <Title style={{ fontSize: "clamp(2.5rem, 6vw, 3.5rem)" }}>
          Ready to Get Started?
        </Title>
        <Text size="lg" mt="md">
          Join hundreds of satisfied customers who trust DMPropane.
        </Text>
        <Button
          size="lg"
          radius="xl"
          style={{
            marginTop: 24,
            backgroundColor: "white",
            color: theme.colors.gradient[0],
            fontWeight: 700,
          }}
        >
          Sign Up Now
        </Button>
      </Box>
    </Box>
  );
}

export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});
