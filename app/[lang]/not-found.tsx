import {
  Title,
  Text,
  Button,
  Container,
  Stack,
  Group,
  ThemeIcon,
} from "@mantine/core";

export default function NotFound() {
  return (
    <Container size="sm">
      <Stack align="center" justify="center" mih="70vh" gap="xl">
        <ThemeIcon variant="light" size={80} radius="xl" color="blue">
          <Text fz={36} lh={1}>
            ?
          </Text>
        </ThemeIcon>

        <Stack align="center" gap="xs">
          <Text c="dimmed" fw={700} fz={120} lh={1}>
            404
          </Text>
          <Title order={2} ta="center">
            Page not found
          </Title>
          <Text c="dimmed" size="lg" ta="center" maw={460}>
            The page you are looking for does not exist. It might have been
            moved, deleted, or you may have mistyped the URL.
          </Text>
        </Stack>

        <Group>
          <Button component="a" href="/" size="md" variant="filled">
            Back to home
          </Button>
        </Group>
      </Stack>
    </Container>
  );
}
