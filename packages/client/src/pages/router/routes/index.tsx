import { createRoute, Link } from "@tanstack/react-router";
import { rootRoute } from "./root";
import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Text,
  Title,
  useMantineTheme,
  Group,
} from "@mantine/core";
import { ROUTES } from "../../routes/routes";
import { ServiceContainer, type Service } from "../../../components/ServiceContainer";

const SERVICES: Service[] = [
  {
    title: "Propane Delivery",
    description: "Flexible, reliable delivery schedules tailored to your needs. Never run out with our smart monitoring system.",
    icon: "🚚",
  },
  {
    title: "Tank Installation",
    description: "Professional installation and maintenance for residential and commercial properties.",
    icon: "🔧",
  },
  {
    title: "24/7 Support",
    description: "Round-the-clock customer service to assist with all your propane needs and emergencies.",
    icon: "📞",
  },
]

function HomePage() {
  const theme = useMantineTheme();

  return (
    <Box>
      {/* Hero Section */}
      <Box
        style={{
          padding: "8rem 1rem 6rem",
          background: `linear-gradient(135deg, ${theme.colors.brand[0]} 0%, ${theme.colors.earth[0]} 50%, ${theme.colors.sage[0]} 100%)`,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative organic shapes */}
        <Box
          style={{
            position: "absolute",
            top: -100,
            right: -100,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${theme.colors.brand[2]}40, transparent)`,
            filter: "blur(60px)",
          }}
        />
        <Box
          style={{
            position: "absolute",
            bottom: -80,
            left: -80,
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${theme.colors.forest[2]}30, transparent)`,
            filter: "blur(50px)",
          }}
        />

        <Container size="xl">
          <Grid gutter={60} align="center">
            {/* Left Side */}
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Stack gap="xl" justify="center">
                <Title
                  fw={900}
                  style={{
                    fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                    lineHeight: 1.1,
                    color: theme.colors.brown[9],
                  }}
                >
                  Reliable Propane
                  <br />
                  <Text
                    span
                    style={{
                      color: theme.colors.brand[6],
                      display: "block",
                    }}
                  >
                    Delivered to Your Door
                  </Text>
                </Title>
                <Text size="lg" c="dimmed" maw={500} style={{ lineHeight: 1.7 }}>
                  Trust D&M Propane for dependable propane delivery and service.
                  We keep your home warm and your business running with professional
                  installation, monitoring, and 24/7 support.
                </Text>
                <Group gap="md">
                  <Button
                    component={Link}
                    to={ROUTES.SIGNUP}
                    size="lg"
                    radius="md"
                    style={{
                      backgroundColor: theme.colors.brand[6],
                      color: "white",
                      fontWeight: 600,
                      padding: "0.875rem 2rem",
                    }}
                  >
                    Get Started
                  </Button>
                  <Button
                    component={Link}
                    to={ROUTES.CONTACT}
                    size="lg"
                    variant="outline"
                    radius="md"
                    style={{
                      borderColor: theme.colors.brand[6],
                      color: theme.colors.brand[6],
                      fontWeight: 600,
                    }}
                  >
                    Contact Us
                  </Button>
                </Group>
              </Stack>
            </Grid.Col>

            {/* Right Side - Visual */}
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Box
                style={{
                  position: "relative",
                  width: "100%",
                  height: 500,
                  borderRadius: 24,
                  overflow: "hidden",
                  background: `linear-gradient(135deg, ${theme.colors.brand[2]}, ${theme.colors.earth[2]})`,
                  boxShadow: `0 20px 60px ${theme.colors.brand[6]}20`,
                }}
              >
                {/* Propane tank illustration */}
                <Box
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 200,
                    height: 300,
                    background: `linear-gradient(180deg, ${theme.colors.brand[5]}, ${theme.colors.brand[7]})`,
                    borderRadius: "100px 100px 20px 20px",
                    border: `4px solid ${theme.colors.brand[8]}`,
                  }}
                />
                {/* Tank top */}
                <Box
                  style={{
                    position: "absolute",
                    top: 80,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 60,
                    height: 40,
                    background: theme.colors.brown[7],
                    borderRadius: "8px 8px 4px 4px",
                  }}
                />
              </Box>
            </Grid.Col>
          </Grid>
        </Container>
      </Box>

      {/* Services Section */}
      <Container size="xl" py={100}>
        <Box mb={60}>
          <Text
            ta="center"
            size="sm"
            fw={600}
            tt="uppercase"
            c="brand.6"
            mb="md"
          >
            Our Services
          </Text>
          <Title
            ta="center"
            style={{ fontSize: "clamp(2rem, 5vw, 3rem)", color: theme.colors.brown[9] }}
            mb="xl"
          >
            How We Can Help
          </Title>
        </Box>
        <ServiceContainer services={SERVICES} />
      </Container>

      {/* CTA Section */}
      <Box
        py={80}
        style={{
          background: `linear-gradient(135deg, ${theme.colors.brand[6]}, ${theme.colors.brand[7]})`,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `radial-gradient(circle at 30% 50%, ${theme.colors.brand[5]}40, transparent 50%)`,
          }}
        />
        <Container size="md" style={{ position: "relative", zIndex: 1 }}>
          <Stack align="center" gap="lg">
            <Title
              ta="center"
              style={{
                fontSize: "clamp(2rem, 5vw, 3rem)",
                color: "white",
              }}
            >
              Ready to Get Started?
            </Title>
            <Text size="lg" ta="center" c="white" maw={600} style={{ opacity: 0.95 }}>
              Join hundreds of satisfied customers who trust D&M Propane for
              reliable, professional propane services.
            </Text>
            <Group gap="md" mt="md">
              <Button
                component={Link}
                to={ROUTES.SIGNUP}
                size="lg"
                radius="md"
                style={{
                  backgroundColor: "white",
                  color: theme.colors.brand[6],
                  fontWeight: 600,
                }}
              >
                Sign Up Now
              </Button>
              <Button
                component={Link}
                to={ROUTES.PRICING}
                size="lg"
                variant="outline"
                radius="md"
                style={{
                  borderColor: "white",
                  color: "white",
                  fontWeight: 600,
                }}
              >
                View Pricing
              </Button>
            </Group>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}

export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTES.HOME,
  component: HomePage,
});
