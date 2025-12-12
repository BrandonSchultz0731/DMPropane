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
  Grid,
  useMantineTheme,
  Group,
  Button,
} from "@mantine/core";

function FeaturesPage() {
  const theme = useMantineTheme();

  const features = [
    {
      title: "Smart Tank Monitoring",
      description:
        "Real-time monitoring of your propane levels with automated alerts when it's time for a refill.",
      icon: "📊",
      color: theme.colors.brand[6],
    },
    {
      title: "Flexible Delivery",
      description:
        "Schedule deliveries on your terms. Automatic refills or on-demand service - you choose.",
      icon: "🚚",
      color: theme.colors.earth[6],
    },
    {
      title: "Professional Installation",
      description:
        "Expert installation and maintenance services for residential and commercial properties.",
      icon: "🔧",
      color: theme.colors.forest[5],
    },
    {
      title: "24/7 Emergency Service",
      description:
        "Round-the-clock emergency support to ensure you're never left without propane when you need it.",
      icon: "🚨",
      color: theme.colors.amber[6],
    },
    {
      title: "Competitive Pricing",
      description:
        "Transparent, competitive rates with no hidden fees. Volume discounts available for businesses.",
      icon: "💰",
      color: theme.colors.brand[6],
    },
    {
      title: "Expert Support",
      description:
        "Knowledgeable customer service team ready to help with all your propane needs and questions.",
      icon: "👥",
      color: theme.colors.forest[5],
    },
  ];

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

          <Grid gutter="xl">
            {features.map((feature, idx) => (
              <Grid.Col span={{ base: 12, md: 6, lg: 4 }} key={idx}>
                <Paper
                  shadow="sm"
                  p="xl"
                  radius="md"
                  style={{
                    backgroundColor: "white",
                    border: `1px solid ${theme.colors.earth[1]}`,
                    height: "100%",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-8px)";
                    e.currentTarget.style.boxShadow = `0 12px 40px ${feature.color}15`;
                    e.currentTarget.style.borderColor = feature.color;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0px)";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.borderColor = theme.colors.earth[1];
                  }}
                >
                  <Stack gap="md">
                    <Text
                      style={{
                        fontSize: "3rem",
                        lineHeight: 1,
                      }}
                    >
                      {feature.icon}
                    </Text>
                    <Title order={4} style={{ color: theme.colors.brown[9] }}>
                      {feature.title}
                    </Title>
                    <Text c="dimmed" style={{ lineHeight: 1.6 }}>
                      {feature.description}
                    </Text>
                  </Stack>
                </Paper>
              </Grid.Col>
            ))}
          </Grid>

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
