import { createRoute } from "@tanstack/react-router";
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
} from "@mantine/core";

function ContactPage() {
  const theme = useMantineTheme();

  return (
    <Box
      style={{
        minHeight: "calc(100vh - 70px)",
        background: `linear-gradient(180deg, ${theme.colors.brand[0]}, ${theme.colors.earth[0]})`,
        padding: "4rem 1rem",
      }}
    >
      <Container size="lg">
        <Stack gap="xl">
          <Box ta="center" mb="xl">
            <Title
              style={{
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                color: theme.colors.brown[9],
                marginBottom: "1rem",
              }}
            >
              Get in Touch
            </Title>
            <Text size="lg" c="dimmed" maw={600} mx="auto">
              Have questions? We're here to help. Reach out to our team for
              propane delivery, installation, or any other inquiries.
            </Text>
          </Box>

          <Grid gutter="xl">
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Paper
                shadow="sm"
                p="xl"
                radius="md"
                style={{
                  backgroundColor: "white",
                  border: `1px solid ${theme.colors.earth[1]}`,
                  height: "100%",
                }}
              >
                <Stack gap="lg">
                  <Title order={3} style={{ color: theme.colors.brand[6] }}>
                    Contact Information
                  </Title>

                  <Stack gap="md">
                    <Box>
                      <Text fw={600} mb={4} style={{ color: theme.colors.brown[7] }}>
                        Phone
                      </Text>
                      <Text size="lg">(555) 123-4567</Text>
                    </Box>

                    <Box>
                      <Text fw={600} mb={4} style={{ color: theme.colors.brown[7] }}>
                        Email
                      </Text>
                      <Text size="lg">info@dmpropane.com</Text>
                    </Box>

                    <Box>
                      <Text fw={600} mb={4} style={{ color: theme.colors.brown[7] }}>
                        Business Hours
                      </Text>
                      <Text>Monday - Friday: 8:00 AM - 6:00 PM</Text>
                      <Text>Saturday: 9:00 AM - 4:00 PM</Text>
                      <Text>Sunday: Closed</Text>
                    </Box>

                    <Box>
                      <Text fw={600} mb={4} style={{ color: theme.colors.brown[7] }}>
                        Emergency Service
                      </Text>
                      <Text size="lg" c="brand.6" fw={600}>
                        24/7 Emergency Line: (555) 123-HELP
                      </Text>
                    </Box>
                  </Stack>
                </Stack>
              </Paper>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6 }}>
              <Paper
                shadow="sm"
                p="xl"
                radius="md"
                style={{
                  backgroundColor: "white",
                  border: `1px solid ${theme.colors.earth[1]}`,
                  height: "100%",
                }}
              >
                <Stack gap="lg">
                  <Title order={3} style={{ color: theme.colors.brand[6] }}>
                    Office Location
                  </Title>

                  <Stack gap="md">
                    <Box>
                      <Text fw={600} mb={4} style={{ color: theme.colors.brown[7] }}>
                        Address
                      </Text>
                      <Text>
                        123 Propane Way
                        <br />
                        City, State 12345
                      </Text>
                    </Box>

                    <Box>
                      <Text fw={600} mb={4} style={{ color: theme.colors.brown[7] }}>
                        Service Area
                      </Text>
                      <Text>
                        We proudly serve the greater metropolitan area and surrounding
                        communities. Contact us to see if we deliver to your location.
                      </Text>
                    </Box>
                  </Stack>
                </Stack>
              </Paper>
            </Grid.Col>
          </Grid>

          <Paper
            shadow="sm"
            p="xl"
            radius="md"
            style={{
              backgroundColor: theme.colors.forest[5],
              color: "white",
            }}
          >
            <Stack gap="md" align="center" ta="center">
              <Title order={3} c="white">
                Need Immediate Assistance?
              </Title>
              <Text c="white" style={{ opacity: 0.95 }}>
                Our emergency service team is available 24/7 to handle urgent propane
                needs. Don't hesitate to call if you have an emergency.
              </Text>
              <Text size="xl" fw={700} c="white">
                (555) 123-HELP
              </Text>
            </Stack>
          </Paper>
        </Stack>
      </Container>
    </Box>
  );
}

export const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTES.CONTACT,
  component: ContactPage,
});
