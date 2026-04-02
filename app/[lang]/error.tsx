"use client";

import {
  Title,
  Text,
  Button,
  Container,
  Stack,
  Group,
  ThemeIcon,
} from "@mantine/core";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <Container size="sm">
      <Stack align="center" justify="center" mih="70vh" gap="xl">
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
            An unexpected error occurred. Our team has been notified. Please try
            again or return to the home page.
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
          <Button
            component="a"
            href="/"
            size="md"
            variant="default"
          >
            Back to home
          </Button>
        </Group>
      </Stack>
    </Container>
  );
}
