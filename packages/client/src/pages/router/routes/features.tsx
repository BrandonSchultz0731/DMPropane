import { createRoute, Link } from "@tanstack/react-router";
import { rootRoute } from "./root";
import { ROUTES } from "../../routes/routes";
import {
  Box,
  Container,
  Title,
  Text,
  Paper,
  Stack,
  useMantineTheme,
  Group,
  Button,
} from "@mantine/core";
import { ServiceContainer, type Service } from "../../../components/ServiceContainer";

const features: Service[] = [
  {
    title: "Smart Tank Monitoring",
    description:
      "Real-time monitoring of your propane levels with automated alerts when it's time for a refill.",
    icon: "📊",
  },
  {
    title: "Flexible Delivery",
    description:
      "Schedule deliveries on your terms. Automatic refills or on-demand service - you choose.",
    icon: "🚚",
  },
  {
    title: "Professional Installation",
    description:
      "Expert installation and maintenance services for residential and commercial properties.",
    icon: "🔧",
  },
  {
    title: "24/7 Emergency Service",
    description:
      "Round-the-clock emergency support to ensure you're never left without propane when you need it.",
    icon: "🚨",
  },
  {
    title: "Competitive Pricing",
    description:
      "Transparent, competitive rates with no hidden fees. Volume discounts available for businesses.",
    icon: "💰",
  },
  {
    title: "Expert Support",
    description:
      "Knowledgeable customer service team ready to help with all your propane needs and questions.",
    icon: "👥",
  },
];

function FeaturesPage() {
  const theme = useMantineTheme();

  return (
    <Box
      style={{
        minHeight: "calc(100vh - 70px)",
        background: `linear-gradient(180deg, ${theme.colors.brand[0]}, ${theme.colors.earth[0]})`,
        padding: "4rem 1rem",
      }}
    >
      <Container size="xl">
        <Stack gap="xl">
          <Box ta="center" mb="xl">
            <Title
              style={{
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                color: theme.colors.brown[9],
                marginBottom: "1rem",
              }}
            >
              Why Choose D&M Propane?
            </Title>
            <Text size="lg" c="dimmed" maw={700} mx="auto">
              We provide reliable propane services with a focus on customer satisfaction,
              safety, and convenience. Here's what sets us apart.
            </Text>
          </Box>
          <ServiceContainer
            services={features}
            containerProps={{
              gutter: "xl",
            }}
          />
          <Paper
            shadow="sm"
            p="xl"
            radius="md"
            style={{
              background: `linear-gradient(135deg, ${theme.colors.brand[6]}, ${theme.colors.brand[7]})`,
              color: "white",
            }}
          >
            <Stack gap="md" align="center" ta="center">
              <Title order={3} c="white">
                Ready to Experience the Difference?
              </Title>
              <Text c="white" style={{ opacity: 0.95 }} maw={600}>
                Join our satisfied customers who trust D&M Propane for reliable,
                professional propane services. Get started today.
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
                  to={ROUTES.CONTACT}
                  size="lg"
                  variant="outline"
                  radius="md"
                  style={{
                    borderColor: "white",
                    color: "white",
                    fontWeight: 600,
                  }}
                >
                  Contact Us
                </Button>
              </Group>
            </Stack>
          </Paper>
        </Stack>
      </Container>
    </Box>
  );
}

export const featuresRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTES.FEATURES,
  component: FeaturesPage,
});
