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
  Button,
  Group,
  List,
} from "@mantine/core";

function PricingPage() {
  const theme = useMantineTheme();

  const plans = [
    {
      name: "Residential",
      price: "Starting at",
      priceAmount: "$2.50",
      period: "per gallon",
      description: "Perfect for homeowners",
      features: [
        "Flexible delivery schedules",
        "Tank monitoring included",
        "Priority customer support",
        "Automatic refill options",
        "No long-term contracts",
      ],
      color: theme.colors.brand[6],
      popular: false,
    },
    {
      name: "Commercial",
      price: "Starting at",
      priceAmount: "$2.25",
      period: "per gallon",
      description: "For businesses and commercial properties",
      features: [
        "Volume discounts available",
        "Dedicated account manager",
        "24/7 emergency service",
        "Custom delivery schedules",
        "Bulk pricing options",
      ],
      color: theme.colors.earth[6],
      popular: true,
    },
    {
      name: "Agricultural",
      price: "Starting at",
      priceAmount: "$2.15",
      period: "per gallon",
      description: "Farm and agricultural operations",
      features: [
        "Seasonal pricing programs",
        "Large tank installations",
        "Flexible payment terms",
        "Rural delivery service",
        "Expert agricultural support",
      ],
      color: theme.colors.forest[5],
      popular: false,
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
              Transparent Pricing
            </Title>
            <Text size="lg" c="dimmed" maw={700} mx="auto">
              Competitive rates with no hidden fees. Our pricing is straightforward
              and designed to fit your needs, whether you're a homeowner or business owner.
            </Text>
          </Box>

          <Grid gutter="xl">
            {plans.map((plan) => (
              <Grid.Col span={{ base: 12, md: 4 }} key={plan.name}>
                <Paper
                  shadow={plan.popular ? "lg" : "sm"}
                  p="xl"
                  radius="md"
                  style={{
                    backgroundColor: plan.popular ? plan.color : "white",
                    border: plan.popular
                      ? `2px solid ${plan.color}`
                      : `1px solid ${theme.colors.earth[1]}`,
                    height: "100%",
                    position: "relative",
                    transform: plan.popular ? "scale(1.05)" : "scale(1)",
                    transition: "transform 0.3s ease",
                  }}
                >
                  {plan.popular && (
                    <Box
                      style={{
                        position: "absolute",
                        top: -12,
                        right: 20,
                        backgroundColor: theme.colors.amber[5],
                        color: "white",
                        padding: "4px 12px",
                        borderRadius: 12,
                        fontSize: "0.75rem",
                        fontWeight: 600,
                      }}
                    >
                      POPULAR
                    </Box>
                  )}

                  <Stack gap="lg">
                    <Box>
                      <Title
                        order={3}
                        style={{
                          color: plan.popular ? "white" : theme.colors.brown[9],
                          marginBottom: "0.5rem",
                        }}
                      >
                        {plan.name}
                      </Title>
                      <Text
                        size="sm"
                        style={{
                          color: plan.popular ? "rgba(255,255,255,0.9)" : "dimmed",
                        }}
                      >
                        {plan.description}
                      </Text>
                    </Box>

                    <Box>
                      <Text
                        size="sm"
                        style={{
                          color: plan.popular ? "rgba(255,255,255,0.8)" : "dimmed",
                        }}
                      >
                        {plan.price}
                      </Text>
                      <Group gap={4} align="baseline">
                        <Text
                          size="2.5rem"
                          fw={700}
                          style={{
                            color: plan.popular ? "white" : plan.color,
                          }}
                        >
                          {plan.priceAmount}
                        </Text>
                        <Text
                          size="sm"
                          style={{
                            color: plan.popular ? "rgba(255,255,255,0.8)" : "dimmed",
                          }}
                        >
                          {plan.period}
                        </Text>
                      </Group>
                    </Box>

                    <List
                      spacing="sm"
                      style={{
                        color: plan.popular ? "rgba(255,255,255,0.95)" : theme.colors.brown[7],
                      }}
                    >
                      {plan.features.map((feature, idx) => (
                        <List.Item key={idx}>{feature}</List.Item>
                      ))}
                    </List>

                    <Button
                      component={Link}
                      to={ROUTES.CONTACT}
                      fullWidth
                      size="md"
                      radius="md"
                      style={{
                        backgroundColor: plan.popular
                          ? "white"
                          : plan.color,
                        color: plan.popular
                          ? plan.color
                          : "white",
                        fontWeight: 600,
                        marginTop: "auto",
                      }}
                    >
                      Get Started
                    </Button>
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
              backgroundColor: "white",
              border: `1px solid ${theme.colors.earth[1]}`,
            }}
          >
            <Stack gap="md" ta="center">
              <Title order={3} style={{ color: theme.colors.brown[9] }}>
                Additional Information
              </Title>
              <Text c="dimmed" maw={800} mx="auto">
                Pricing may vary based on delivery location, tank size, and volume.
                Installation fees, tank rental, and other service charges may apply.
                Contact us for a personalized quote tailored to your specific needs.
              </Text>
              <Button
                component={Link}
                to={ROUTES.CONTACT}
                size="md"
                radius="md"
                style={{
                  backgroundColor: theme.colors.brand[6],
                  fontWeight: 600,
                }}
              >
                Request a Quote
              </Button>
            </Stack>
          </Paper>
        </Stack>
      </Container>
    </Box>
  );
}

export const pricingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTES.PRICING,
  component: PricingPage,
});
