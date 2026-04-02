"use client";

import {
  Title,
  Text,
  Button,
  Container,
  Stack,
  Group,
  ThemeIcon,
  MantineProvider,
} from "@mantine/core";
import { theme } from "@/theme";

export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <MantineProvider theme={theme} defaultColorScheme="auto">
          <Container size="sm">
            <Stack align="center" justify="center" mih="100vh" gap="xl">
              <ThemeIcon variant="light" size={80} radius="xl" color="red">
                <Text fz={36} lh={1}>
                  !
                </Text>
              </ThemeIcon>

              <Stack align="center" gap="xs">
                <Text c="dimmed" fw={700} fz={120} lh={1}>
                  500
                </Text>
                <Title order={2} ta="center">
                  Something went wrong
                </Title>
                <Text c="dimmed" size="lg" ta="center" maw={460}>
                  A critical error occurred. Please try again or come back
                  later.
                </Text>
                {error.digest && (
                  <Text c="dimmed" size="xs" ta="center">
                    Error ID: {error.digest}
                  </Text>
                )}
              </Stack>

              <Group>
                <Button onClick={unstable_retry} size="md" variant="filled">
                  Try again
                </Button>
                <Button component="a" href="/" size="md" variant="default">
                  Back to home
                </Button>
              </Group>
            </Stack>
          </Container>
        </MantineProvider>
      </body>
    </html>
  );
}
