import { Skeleton, Stack } from "@mantine/core";

export default function Loading() {
  return (
    <Stack gap="md">
      <Skeleton height={32} width="40%" />
      <Skeleton height={16} width="70%" />
      <Skeleton height={200} />
      <Skeleton height={16} />
      <Skeleton height={16} width="80%" />
    </Stack>
  );
}
