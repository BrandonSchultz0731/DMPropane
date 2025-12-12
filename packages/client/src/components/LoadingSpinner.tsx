import { Box, Loader, useMantineTheme, Text, Stack } from "@mantine/core";

export function LoadingSpinner() {
  const theme = useMantineTheme();

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "calc(100vh - 70px)",
        background: `linear-gradient(135deg, ${theme.colors.brand[0]} 0%, ${theme.colors.earth[0]} 50%, ${theme.colors.sage[0]} 100%)`,
        animation: "fadeIn 0.3s ease-in",
      }}
    >
      <Stack align="center" gap="xl">
        <Box
          style={{
            position: "relative",
            width: 80,
            height: 80,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Loader
            size="xl"
            type="bars"
            color={theme.colors.brand[6]}
          />
        </Box>
        <Text
          size="md"
          fw={500}
          style={{
            color: theme.colors.brown[7],
            animation: "pulse 2s ease-in-out infinite",
          }}
        >
          Loading...
        </Text>
      </Stack>
    </Box>
  );
}
