"use client";

import {
  ActionIcon,
  Anchor,
  Badge,
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Group,
  Menu,
  Paper,
  Progress,
  Select,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
  TextInput,
  Textarea,
  ThemeIcon,
  Title,
  Tooltip,
  Avatar,
  Switch,
  Checkbox,
  Radio,
  Slider,
  Alert,
  Kbd,
  Code,
  Table,
  RingProgress,
} from "@mantine/core";
import {
  MagnifyingGlass,
  Plus,
  DotsThree,
  Trash,
  PencilSimple,
  Lightning,
  CheckCircle,
  Warning,
  Bug,
  Rocket,
  Users,
  CalendarBlank,
  ChartBar,
  GitBranch,
  Timer,
  FunnelSimple,
  ArrowRight,
  Star,
  Bell,
  Gear,
  Info,
} from "@phosphor-icons/react";

export function ThemeShowcase() {
  return (
    <Stack gap="xl">
      {/* ── Hero Section ─────────────────────────── */}
      <Paper
        p="xl"
        radius="lg"
        withBorder={false}
        bg="var(--mantine-primary-color-light)"
      >
        <Stack gap="md" align="center" ta="center">
          <ThemeIcon size={64} radius="xl" variant="gradient">
            <Rocket size={32} weight="duotone" />
          </ThemeIcon>
          <Title order={1}>Theme Preview</Title>
          <Text c="dimmed" size="lg" maw={600}>
            A psychology-driven design system built for developer productivity.
            Every color, shadow, and spacing choice is intentional.
          </Text>
          <Group>
            <Button
              size="lg"
              leftSection={<Lightning size={18} weight="bold" />}
            >
              Get Started
            </Button>
            <Button size="lg" variant="default">
              Learn More
            </Button>
            <Button size="lg" variant="gradient">
              Gradient CTA
            </Button>
          </Group>
        </Stack>
      </Paper>

      {/* ── Color Palette ─────────────────────────── */}
      <div>
        <Title order={2} mb="md">
          Color Palette
        </Title>
        <SimpleGrid cols={{ base: 2, sm: 3, md: 6 }}>
          {(["blue", "cyan", "green", "amber", "red", "gray"] as const).map(
            (color) => (
              <Paper key={color} p="md" withBorder>
                <Stack gap="xs">
                  <Box
                    h={48}
                    bg={`var(--mantine-color-${color}-filled)`}
                    style={{ borderRadius: "var(--mantine-radius-md)" }}
                  />
                  <Text size="sm" fw={600} tt="capitalize">
                    {color}
                  </Text>
                  <Group gap={2}>
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((shade) => (
                      <Box
                        key={shade}
                        w={16}
                        h={16}
                        bg={`var(--mantine-color-${color}-${shade})`}
                        style={{ borderRadius: 4 }}
                      />
                    ))}
                  </Group>
                </Stack>
              </Paper>
            )
          )}
        </SimpleGrid>
      </div>

      {/* ── Typography ────────────────────────────── */}
      <Paper p="xl" withBorder>
        <Title order={2} mb="md">
          Typography
        </Title>
        <Stack gap="xs">
          <Title order={1}>Heading 1 — Project Dashboard</Title>
          <Title order={2}>Heading 2 — Sprint Overview</Title>
          <Title order={3}>Heading 3 — Task Details</Title>
          <Title order={4}>Heading 4 — Activity Feed</Title>
          <Title order={5}>Heading 5 — Metadata</Title>
          <Title order={6}>Heading 6 — Labels</Title>
          <Divider my="sm" />
          <Text size="xl">Extra large text — for emphasis</Text>
          <Text size="lg">Large text — section descriptions</Text>
          <Text size="md">Medium text — body content (default)</Text>
          <Text size="sm">Small text — secondary info</Text>
          <Text size="xs">Extra small — captions and timestamps</Text>
          <Divider my="sm" />
          <Text>
            Monospace:{" "}
            <Code>const sprint = await getActiveSprint(projectId);</Code>
          </Text>
          <Text>
            Keyboard shortcuts: <Kbd>Ctrl</Kbd> + <Kbd>K</Kbd> to open command
            palette
          </Text>
        </Stack>
      </Paper>

      {/* ── Buttons & Actions ─────────────────────── */}
      <Paper p="xl" withBorder>
        <Title order={2} mb="md">
          Buttons & Actions
        </Title>
        <Stack gap="md">
          <Group>
            <Button>Filled</Button>
            <Button variant="light">Light</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="subtle">Subtle</Button>
            <Button variant="default">Default</Button>
            <Button variant="transparent">Transparent</Button>
          </Group>
          <Group>
            <Button color="cyan">Info</Button>
            <Button color="green">Success</Button>
            <Button color="amber">Warning</Button>
            <Button color="red">Danger</Button>
            <Button color="gray">Neutral</Button>
          </Group>
          <Group>
            <Button size="xs">Extra Small</Button>
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Button size="xl">Extra Large</Button>
          </Group>
          <Group>
            <Button loading>Loading</Button>
            <Button disabled>Disabled</Button>
            <Button leftSection={<Plus size={16} weight="bold" />}>
              New Task
            </Button>
            <Button rightSection={<ArrowRight size={16} />} variant="light">
              Continue
            </Button>
          </Group>
          <Group>
            <Tooltip label="Edit task">
              <ActionIcon size="lg" variant="light">
                <PencilSimple />
              </ActionIcon>
            </Tooltip>
            <Tooltip label="Delete task">
              <ActionIcon size="lg" variant="light" color="red">
                <Trash />
              </ActionIcon>
            </Tooltip>
            <Tooltip label="More options">
              <ActionIcon size="lg" variant="default">
                <DotsThree size={18} weight="bold" />
              </ActionIcon>
            </Tooltip>
            <Tooltip label="Star">
              <ActionIcon size="lg" variant="subtle" color="amber">
                <Star size={18} weight="fill" />
              </ActionIcon>
            </Tooltip>
          </Group>
        </Stack>
      </Paper>

      {/* ── Badges ────────────────────────────────── */}
      <Paper p="xl" withBorder>
        <Title order={2} mb="md">
          Badges & Status
        </Title>
        <Group>
          <Badge color="blue" variant="filled">
            In Progress
          </Badge>
          <Badge color="green" variant="filled">
            Completed
          </Badge>
          <Badge color="amber" variant="filled">
            In Review
          </Badge>
          <Badge color="red" variant="filled">
            Blocked
          </Badge>
          <Badge color="gray" variant="filled">
            Backlog
          </Badge>
        </Group>
        <Group mt="md">
          <Badge color="blue" variant="light">
            Sprint 14
          </Badge>
          <Badge color="cyan" variant="light">
            Frontend
          </Badge>
          <Badge color="amber" variant="light">
            High Priority
          </Badge>
          <Badge color="red" variant="light" leftSection={<Bug size={12} />}>
            Bug
          </Badge>
          <Badge
            color="blue"
            variant="light"
            leftSection={<Lightning size={12} />}
          >
            Feature
          </Badge>
        </Group>
        <Group mt="md">
          <Badge variant="outline">Draft</Badge>
          <Badge variant="dot" color="green">
            Online
          </Badge>
          <Badge variant="dot" color="red">
            Offline
          </Badge>
          <Badge variant="dot" color="amber">
            Away
          </Badge>
        </Group>
      </Paper>

      {/* ── Cards — Project Management ────────────── */}
      <div>
        <Title order={2} mb="md">
          Project Cards
        </Title>
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }}>
          {/* Sprint Card */}
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Group justify="space-between" mb="sm">
              <Group gap="xs">
                <ThemeIcon color="blue" variant="light" size="sm">
                  <Rocket size={14} />
                </ThemeIcon>
                <Text fw={600}>Sprint 14</Text>
              </Group>
              <Badge color="blue" variant="light" size="sm">
                Active
              </Badge>
            </Group>
            <Text size="sm" c="dimmed" mb="md">
              Authentication flow redesign and API optimization
            </Text>
            <Progress value={68} color="blue" size="sm" radius="xl" mb="sm" />
            <Group justify="space-between">
              <Text size="xs" c="dimmed">
                68% complete
              </Text>
              <Group gap="xs">
                <Timer size={14} />
                <Text size="xs" c="dimmed">
                  3 days left
                </Text>
              </Group>
            </Group>
          </Card>

          {/* Task Card */}
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Group justify="space-between" mb="sm">
              <Group gap="xs">
                <ThemeIcon color="green" variant="light" size="sm">
                  <CheckCircle size={14} />
                </ThemeIcon>
                <Text fw={600}>API Rate Limiting</Text>
              </Group>
              <Badge color="green" variant="light" size="sm">
                Done
              </Badge>
            </Group>
            <Text size="sm" c="dimmed" mb="md">
              Implement token bucket rate limiter for public endpoints
            </Text>
            <Divider mb="sm" />
            <Group justify="space-between">
              <Group gap="xs">
                <Avatar size="sm" color="cyan" radius="xl">
                  JD
                </Avatar>
                <Text size="xs">John D.</Text>
              </Group>
              <Group gap={4}>
                <GitBranch size={14} />
                <Text size="xs" c="dimmed">
                  feat/rate-limit
                </Text>
              </Group>
            </Group>
          </Card>

          {/* Bug Card */}
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Group justify="space-between" mb="sm">
              <Group gap="xs">
                <ThemeIcon color="red" variant="light" size="sm">
                  <Bug size={14} />
                </ThemeIcon>
                <Text fw={600}>Memory Leak in WS</Text>
              </Group>
              <Badge color="red" variant="light" size="sm">
                Critical
              </Badge>
            </Group>
            <Text size="sm" c="dimmed" mb="md">
              WebSocket connections not cleaned up on client disconnect
            </Text>
            <Divider mb="sm" />
            <Group justify="space-between">
              <Group gap="xs">
                <Avatar size="sm" color="red" radius="xl">
                  AS
                </Avatar>
                <Text size="xs">Alice S.</Text>
              </Group>
              <Group gap={4}>
                <Warning size={14} />
                <Text size="xs" c="dimmed">
                  P0
                </Text>
              </Group>
            </Group>
          </Card>
        </SimpleGrid>
      </div>

      {/* ── Stats / Metrics ───────────────────────── */}
      <div>
        <Title order={2} mb="md">
          Dashboard Metrics
        </Title>
        <SimpleGrid cols={{ base: 2, md: 4 }}>
          {[
            {
              label: "Open Tasks",
              value: "142",
              icon: Lightning,
              color: "blue",
              change: "+12%",
            },
            {
              label: "Completed",
              value: "89",
              icon: CheckCircle,
              color: "green",
              change: "+23%",
            },
            {
              label: "Team Members",
              value: "16",
              icon: Users,
              color: "cyan",
              change: "+2",
            },
            {
              label: "Bugs Filed",
              value: "7",
              icon: Bug,
              color: "red",
              change: "-31%",
            },
          ].map((stat) => (
            <Paper key={stat.label} p="md" withBorder>
              <Group justify="space-between" mb="xs">
                <ThemeIcon color={stat.color} variant="light" radius="md">
                  <stat.icon />
                </ThemeIcon>
                <Badge
                  color={stat.color === "red" ? "green" : stat.color}
                  variant="light"
                  size="xs"
                >
                  {stat.change}
                </Badge>
              </Group>
              <Text size="xl" fw={700}>
                {stat.value}
              </Text>
              <Text size="xs" c="dimmed">
                {stat.label}
              </Text>
            </Paper>
          ))}
        </SimpleGrid>
      </div>

      {/* ── Ring Progress / Charts ────────────────── */}
      <Paper p="xl" withBorder>
        <Title order={2} mb="md">
          Sprint Health
        </Title>
        <Group justify="center" gap="xl">
          <Stack align="center" gap="xs">
            <RingProgress
              size={120}
              thickness={10}
              roundCaps
              sections={[
                { value: 45, color: "blue" },
                { value: 23, color: "green" },
                { value: 15, color: "amber" },
                { value: 8, color: "red" },
              ]}
              label={
                <Text ta="center" fw={700} size="lg">
                  91%
                </Text>
              }
            />
            <Text size="sm" fw={500}>
              Velocity
            </Text>
          </Stack>
          <Stack align="center" gap="xs">
            <RingProgress
              size={120}
              thickness={10}
              roundCaps
              sections={[{ value: 68, color: "cyan" }]}
              label={
                <Text ta="center" fw={700} size="lg">
                  68%
                </Text>
              }
            />
            <Text size="sm" fw={500}>
              Progress
            </Text>
          </Stack>
          <Stack align="center" gap="xs">
            <RingProgress
              size={120}
              thickness={10}
              roundCaps
              sections={[{ value: 92, color: "green" }]}
              label={
                <Text ta="center" fw={700} size="lg">
                  92%
                </Text>
              }
            />
            <Text size="sm" fw={500}>
              Quality
            </Text>
          </Stack>
        </Group>
      </Paper>

      {/* ── Form Elements ─────────────────────────── */}
      <Paper p="xl" withBorder>
        <Title order={2} mb="md">
          Form Elements
        </Title>
        <Grid>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Stack gap="md">
              <TextInput
                label="Task title"
                placeholder="Enter task title..."
                leftSection={<PencilSimple size={16} />}
              />
              <TextInput
                label="Search"
                placeholder="Search tasks, projects, people..."
                leftSection={<MagnifyingGlass size={16} />}
              />
              <Select
                label="Priority"
                placeholder="Select priority"
                data={["Critical", "High", "Medium", "Low"]}
              />
              <Select
                label="Assignee"
                placeholder="Choose team member"
                data={["Alice Smith", "John Doe", "Sarah Chen", "Mike Ross"]}
              />
              <Textarea
                label="Description"
                placeholder="Describe the task in detail..."
              />
            </Stack>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Stack gap="md">
              <div>
                <Text size="sm" fw={500} mb={4}>
                  Status
                </Text>
                <Radio.Group defaultValue="progress">
                  <Stack gap="xs">
                    <Radio value="backlog" label="Backlog" color="gray" />
                    <Radio value="progress" label="In Progress" color="blue" />
                    <Radio value="review" label="In Review" color="amber" />
                    <Radio value="done" label="Done" color="green" />
                  </Stack>
                </Radio.Group>
              </div>
              <div>
                <Text size="sm" fw={500} mb={4}>
                  Labels
                </Text>
                <Stack gap="xs">
                  <Checkbox label="Frontend" color="cyan" defaultChecked />
                  <Checkbox label="Backend" color="blue" />
                  <Checkbox label="DevOps" color="amber" defaultChecked />
                  <Checkbox label="Documentation" color="gray" />
                </Stack>
              </div>
              <div>
                <Text size="sm" fw={500} mb={4}>
                  Effort estimate
                </Text>
                <Slider
                  defaultValue={5}
                  min={1}
                  max={13}
                  marks={[
                    { value: 1, label: "1" },
                    { value: 3, label: "3" },
                    { value: 5, label: "5" },
                    { value: 8, label: "8" },
                    { value: 13, label: "13" },
                  ]}
                  color="blue"
                  mb="xl"
                />
              </div>
              <Switch label="Block other tasks" color="red" />
              <Switch
                label="Notify on completion"
                color="blue"
                defaultChecked
              />
            </Stack>
          </Grid.Col>
        </Grid>
      </Paper>

      {/* ── Alerts ────────────────────────────────── */}
      <div>
        <Title order={2} mb="md">
          Alerts & Notifications
        </Title>
        <Stack gap="sm">
          <Alert
            variant="light"
            color="cyan"
            title="Sprint Planning"
            icon={<Info />}
          >
            Sprint 15 planning meeting is scheduled for tomorrow at 10:00 AM.
          </Alert>
          <Alert
            variant="light"
            color="green"
            title="Deployment Successful"
            icon={<CheckCircle />}
          >
            v2.4.1 has been deployed to production successfully.
          </Alert>
          <Alert
            variant="light"
            color="amber"
            title="Deadline Approaching"
            icon={<Warning />}
          >
            3 tasks are due within the next 24 hours.
          </Alert>
          <Alert
            variant="light"
            color="red"
            title="Build Failed"
            icon={<Bug />}
          >
            CI pipeline failed on <Code>main</Code> branch. Check the logs for
            details.
          </Alert>
        </Stack>
      </div>

      {/* ── Table ─────────────────────────────────── */}
      <Paper p="xl" withBorder>
        <Group justify="space-between" mb="md">
          <Title order={2}>Task Board</Title>
          <Group>
            <TextInput
              placeholder="Filter tasks..."
              leftSection={<FunnelSimple size={16} />}
              size="sm"
            />
            <Button leftSection={<Plus size={16} weight="bold" />} size="sm">
              New Task
            </Button>
          </Group>
        </Group>
        <Table striped highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Task</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Priority</Table.Th>
              <Table.Th>Assignee</Table.Th>
              <Table.Th>Due</Table.Th>
              <Table.Th />
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {[
              {
                task: "Auth flow redesign",
                status: "In Progress",
                statusColor: "blue",
                priority: "High",
                priorityColor: "amber",
                assignee: "AS",
                due: "Apr 5",
              },
              {
                task: "API rate limiting",
                status: "Done",
                statusColor: "green",
                priority: "Medium",
                priorityColor: "blue",
                assignee: "JD",
                due: "Apr 2",
              },
              {
                task: "Fix memory leak",
                status: "Blocked",
                statusColor: "red",
                priority: "Critical",
                priorityColor: "red",
                assignee: "SC",
                due: "Apr 3",
              },
              {
                task: "Dashboard charts",
                status: "In Review",
                statusColor: "amber",
                priority: "Medium",
                priorityColor: "blue",
                assignee: "MR",
                due: "Apr 6",
              },
              {
                task: "Onboarding wizard",
                status: "Backlog",
                statusColor: "gray",
                priority: "Low",
                priorityColor: "gray",
                assignee: "JD",
                due: "Apr 10",
              },
            ].map((row) => (
              <Table.Tr key={row.task}>
                <Table.Td>
                  <Text size="sm" fw={500}>
                    {row.task}
                  </Text>
                </Table.Td>
                <Table.Td>
                  <Badge color={row.statusColor} variant="light" size="sm">
                    {row.status}
                  </Badge>
                </Table.Td>
                <Table.Td>
                  <Badge color={row.priorityColor} variant="dot" size="sm">
                    {row.priority}
                  </Badge>
                </Table.Td>
                <Table.Td>
                  <Avatar size="sm" radius="xl" color="blue">
                    {row.assignee}
                  </Avatar>
                </Table.Td>
                <Table.Td>
                  <Text size="xs" c="dimmed">
                    {row.due}
                  </Text>
                </Table.Td>
                <Table.Td>
                  <Menu>
                    <Menu.Target>
                      <ActionIcon variant="subtle" size="sm">
                        <DotsThree size={16} weight="bold" />
                      </ActionIcon>
                    </Menu.Target>
                    <Menu.Dropdown>
                      <Menu.Item leftSection={<PencilSimple size={14} />}>
                        Edit
                      </Menu.Item>
                      <Menu.Item leftSection={<Users size={14} />}>
                        Reassign
                      </Menu.Item>
                      <Menu.Item leftSection={<CalendarBlank size={14} />}>
                        Reschedule
                      </Menu.Item>
                      <Menu.Divider />
                      <Menu.Item color="red" leftSection={<Trash size={14} />}>
                        Delete
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Paper>

      {/* ── Menu Demo ─────────────────────────────── */}
      <Paper p="xl" withBorder>
        <Title order={2} mb="md">
          Menus & Tooltips
        </Title>
        <Group>
          <Menu>
            <Menu.Target>
              <Button
                variant="default"
                rightSection={<DotsThree size={16} weight="bold" />}
              >
                Actions
              </Button>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label>Project</Menu.Label>
              <Menu.Item leftSection={<Gear size={14} />}>Settings</Menu.Item>
              <Menu.Item leftSection={<Users size={14} />}>Team</Menu.Item>
              <Menu.Item leftSection={<ChartBar size={14} />}>
                Analytics
              </Menu.Item>
              <Menu.Divider />
              <Menu.Label>Danger zone</Menu.Label>
              <Menu.Item color="red" leftSection={<Trash size={14} />}>
                Archive project
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>

          <Tooltip label="Notifications (3 unread)">
            <ActionIcon size="lg" variant="default">
              <Bell />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Quick search (Ctrl+K)">
            <ActionIcon size="lg" variant="default">
              <MagnifyingGlass />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Paper>

      {/* ── Skeleton Loading ──────────────────────── */}
      <Paper p="xl" withBorder>
        <Title order={2} mb="md">
          Loading States
        </Title>
        <Stack gap="sm">
          <Skeleton height={16} width="70%" />
          <Skeleton height={12} width="50%" />
          <Skeleton height={12} width="85%" />
          <Group mt="sm">
            <Skeleton height={36} width={100} radius="md" />
            <Skeleton height={36} width={100} radius="md" />
          </Group>
        </Stack>
      </Paper>

      {/* ── Shadows / Elevation ───────────────────── */}
      <div>
        <Title order={2} mb="md">
          Elevation & Shadows
        </Title>
        <Group>
          {(["xs", "sm", "md", "lg", "xl"] as const).map((s) => (
            <Paper key={s} p="xl" shadow={s} radius="md" withBorder={false}>
              <Text size="sm" fw={500} ta="center">
                {s}
              </Text>
            </Paper>
          ))}
        </Group>
      </div>

      {/* ── Links ─────────────────────────────────── */}
      <Paper p="xl" withBorder>
        <Title order={2} mb="md">
          Links & Anchors
        </Title>
        <Group>
          <Anchor href="#">Default link</Anchor>
          <Anchor href="#" c="cyan">
            Info link
          </Anchor>
          <Anchor href="#" c="red">
            Danger link
          </Anchor>
          <Anchor href="#" fw={600}>
            Bold link
          </Anchor>
        </Group>
      </Paper>
    </Stack>
  );
}
