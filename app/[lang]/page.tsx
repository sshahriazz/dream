import { Title, Text, Stack } from "@mantine/core";
import { getPageLocale } from "@/i18n/server";
import { ThemeShowcase } from "./ThemeShowcase";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { dict } = await getPageLocale(params);

  return (
    <Stack gap="xl" py="md">
      <div>
        <Title order={1}>{dict.home.title}</Title>
        <Text c="dimmed" size="lg">
          {dict.home.description}
        </Text>
      </div>
      <ThemeShowcase />
    </Stack>
  );
}
