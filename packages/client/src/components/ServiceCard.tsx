import { Title } from "@mantine/core";

import { Grid, Paper, Text, useMantineTheme } from "@mantine/core";
import type { Service } from "./ServiceContainer";

export const HowWeCanHelpCard = (props: { service: Service }) => {
    const theme = useMantineTheme();
    const { service } = props;
    return (
        <Grid.Col span={{ base: 12, md: 4 }} key={service.title}>
            <Paper
                shadow="sm"
                radius="md"
                p="xl"
                style={{
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                    textAlign: "center",
                    border: `1px solid ${theme.colors.earth[1]}`,
                    backgroundColor: "white",
                    height: "100%",
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-8px)";
                    e.currentTarget.style.boxShadow = `0 12px 40px ${theme.colors.earth[1]}`;
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0px)";
                    e.currentTarget.style.boxShadow = "none";
                }}
            >
                <Text
                    style={{
                        fontSize: "3rem",
                        marginBottom: "1rem",
                    }}
                >
                    {service.icon}
                </Text>
                <Title order={3} mb="md" style={{ color: theme.colors.brown[9] }}>
                    {service.title}
                </Title>
                <Text c="dimmed" style={{ lineHeight: 1.6 }}>
                    {service.description}
                </Text>
            </Paper>
        </Grid.Col>
    );
};