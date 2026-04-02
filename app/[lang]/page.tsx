import { Title, Text, Stack } from "@mantine/core";
import { getPageLocale } from "@/i18n/server";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { dict } = await getPageLocale(params);

  return (
    <Stack gap="lg">
      <Title order={1}>{dict.home.title}</Title>
      <Text c="dimmed" size="lg">
        {dict.home.description}
      </Text>
    </Stack>
  );
}
