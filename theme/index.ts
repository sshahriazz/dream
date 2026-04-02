"use client";

import {
  createTheme,
  virtualColor,
  rem,
  ActionIcon,
  Anchor,
  Button,
  Card,
  Menu,
  Modal,
  Paper,
  PasswordInput,
  Select,
  Textarea,
  TextInput,
  Tooltip,
  ThemeIcon,
  Title,
  Text,
  Skeleton,
  Burger,
  AppShell,
  Badge,
  Alert,
  Table,
  type CSSVariablesResolver,
  type MantineColorsTuple,
} from "@mantine/core";
import { Notifications } from "@mantine/notifications";

// ─────────────────────────────────────────────────────────────
// COLOR PALETTE
// ─────────────────────────────────────────────────────────────
//
// Designed in OKLCH for perceptual uniformity, stored as hex
// for Mantine's JS color engine compatibility (toRgba, alpha,
// lighten, autoContrast, variant resolvers all need parseable
// color strings).
//
// Shared lightness ramp across all chromatic palettes:
//   0: 0.970   1: 0.932   2: 0.880   3: 0.800   4: 0.720
//   5: 0.645   6: 0.570   7: 0.500   8: 0.435   9: 0.375
//
// Palette hues (OKLCH):
//   blue  (250)  Primary — trust, professionalism, focus
//   cyan  (210)  Info — clarity, communication, guidance
//   green (150)  Success — progress, completion, health
//   amber  (80)  Warning — caution, attention
//   red    (25)  Danger — error, critical, destructive
//   gray  (250)  Neutral — brand-tinted for cohesion
//   dark  (250)  Surfaces — blue-tinted dark mode
// ─────────────────────────────────────────────────────────────

const blue: MantineColorsTuple = [
  "#eef6fe", // oklch(0.970 0.014 250)
  "#d8ebff", // oklch(0.932 0.035 250)
  "#b8dcff", // oklch(0.880 0.065 250)
  "#87c3ff", // oklch(0.800 0.108 250)
  "#59aaf8", // oklch(0.720 0.140 250)
  "#2491ef", // oklch(0.645 0.168 250)
  "#0078e0", // oklch(0.570 0.188 250) ← light mode primary
  "#0062c8", // oklch(0.500 0.188 250) ← dark mode primary
  "#004faa", // oklch(0.435 0.172 250)
  "#003f8c", // oklch(0.375 0.150 250)
];

const cyan: MantineColorsTuple = [
  "#eaf8fb", // oklch(0.970 0.016 210)
  "#cfeff6", // oklch(0.932 0.035 210)
  "#aae3ed", // oklch(0.880 0.060 210)
  "#70cede", // oklch(0.800 0.092 210)
  "#2db8cc", // oklch(0.720 0.115 210)
  "#00a2b9", // oklch(0.645 0.130 210)
  "#008ba4", // oklch(0.570 0.138 210)
  "#00758c", // oklch(0.500 0.130 210)
  "#006074", // oklch(0.435 0.115 210)
  "#004e5d", // oklch(0.375 0.098 210)
];

const green: MantineColorsTuple = [
  "#edf9ef", // oklch(0.970 0.018 150)
  "#d7f1db", // oklch(0.932 0.040 150)
  "#b8e5c0", // oklch(0.880 0.068 150)
  "#8dd19b", // oklch(0.800 0.102 150)
  "#62bb78", // oklch(0.720 0.130 150)
  "#38a65a", // oklch(0.645 0.150 150)
  "#158f44", // oklch(0.570 0.150 150)
  "#007834", // oklch(0.500 0.140 150)
  "#006329", // oklch(0.435 0.122 150)
  "#004f20", // oklch(0.375 0.104 150)
];

const amber: MantineColorsTuple = [
  "#fdf4e5", // oklch(0.970 0.022 80)
  "#fbe5c2", // oklch(0.932 0.052 80)
  "#f8d191", // oklch(0.880 0.092 80)
  "#edb345", // oklch(0.800 0.140 80)
  "#da9600", // oklch(0.720 0.165 80)
  "#c47d00", // oklch(0.645 0.175 80)
  "#aa6700", // oklch(0.570 0.170 80)
  "#8f5500", // oklch(0.500 0.152 80)
  "#764500", // oklch(0.435 0.132 80)
  "#5f3700", // oklch(0.375 0.112 80)
];

const red: MantineColorsTuple = [
  "#fdf2f1", // oklch(0.970 0.012 25)
  "#fee1de", // oklch(0.932 0.032 25)
  "#fec8c3", // oklch(0.880 0.062 25)
  "#fca29a", // oklch(0.800 0.108 25)
  "#f47b74", // oklch(0.720 0.150 25)
  "#e75552", // oklch(0.645 0.182 25)
  "#d33135", // oklch(0.570 0.198 25)
  "#b71824", // oklch(0.500 0.190 25)
  "#9a0818", // oklch(0.435 0.172 25)
  "#7d0512", // oklch(0.375 0.148 25)
];

// ── Gray — brand-tinted neutrals (h:250) ────────────────────
// Light mode: 0–3 backgrounds/borders, 4–6 secondary text, 7–9 foreground
const gray: MantineColorsTuple = [
  "#f4f7fa", // oklch(0.975 0.005 250)
  "#ebf0f4", // oklch(0.952 0.008 250)
  "#dee4ea", // oklch(0.915 0.011 250)
  "#ced5dd", // oklch(0.870 0.014 250)
  "#b0b8c1", // oklch(0.780 0.016 250)
  "#9099a3", // oklch(0.680 0.018 250)
  "#6d767f", // oklch(0.560 0.018 250)
  "#474e56", // oklch(0.420 0.016 250)
  "#262c32", // oklch(0.290 0.014 250)
  "#12171b", // oklch(0.200 0.012 250)
];

// ── Dark — blue-tinted surfaces (h:250) ─────────────────────
// 9 deepest → 8 sidebar → 7 body → 6 card → 5 popover
const dark: MantineColorsTuple = [
  "#d3dae1", // oklch(0.885 0.012 250)
  "#b1b8c0", // oklch(0.780 0.014 250)
  "#889099", // oklch(0.650 0.016 250)
  "#515962", // oklch(0.460 0.018 250)
  "#303942", // oklch(0.340 0.020 250)
  "#212830", // oklch(0.275 0.018 250)
  "#171e24", // oklch(0.230 0.016 250)
  "#0e1319", // oklch(0.185 0.014 250)
  "#070b10", // oklch(0.148 0.012 250)
  "#030508", // oklch(0.115 0.010 250)
];

// ─────────────────────────────────────────────────────────────
// CSS VARIABLES RESOLVER
// ─────────────────────────────────────────────────────────────

export const cssVariablesResolver: CSSVariablesResolver = (theme) => ({
  variables: {
    "--mantine-font-family-monospace": theme.fontFamilyMonospace,
  },
  light: {
    "--mantine-color-body": "#f1f5f8",
    "--mantine-color-default": "#ffffff",
    "--mantine-color-text": theme.colors.gray[8],
    "--mantine-color-dimmed": theme.colors.gray[5],
    "--mantine-color-anchor": theme.colors.blue[6],
    "--mantine-color-default-border": theme.colors.gray[2],
    "--mantine-color-default-hover": theme.colors.gray[0],
  },
  dark: {
    "--mantine-color-body": theme.colors.dark[7],
    "--mantine-color-default": theme.colors.dark[6],
    "--mantine-color-text": theme.colors.dark[0],
    "--mantine-color-dimmed": theme.colors.dark[2],
    "--mantine-color-anchor": theme.colors.blue[3],
    "--mantine-color-default-border": theme.colors.dark[4],
    "--mantine-color-default-hover": theme.colors.dark[5],
    // Shadows — stronger on dark backgrounds
    "--mantine-shadow-xs":
      "0 1px 3px rgba(0,0,0,0.24), 0 1px 2px rgba(0,0,0,0.16)",
    "--mantine-shadow-sm":
      "0 2px 8px rgba(0,0,0,0.28), 0 1px 3px rgba(0,0,0,0.20)",
    "--mantine-shadow-md":
      "0 4px 16px rgba(0,0,0,0.32), 0 2px 6px rgba(0,0,0,0.22), 0 0 0 1px rgba(255,255,255,0.03)",
    "--mantine-shadow-lg":
      "0 8px 32px rgba(0,0,0,0.38), 0 4px 12px rgba(0,0,0,0.26), 0 0 0 1px rgba(255,255,255,0.04)",
    "--mantine-shadow-xl":
      "0 20px 56px rgba(0,0,0,0.48), 0 8px 20px rgba(0,0,0,0.32), 0 0 0 1px rgba(255,255,255,0.05)",
  },
});

// ─────────────────────────────────────────────────────────────
// THEME
// ─────────────────────────────────────────────────────────────

export const theme = createTheme({
  colors: {
    blue,
    cyan,
    green,
    amber,
    red,
    gray,
    dark,
    primary: virtualColor({ name: "primary", light: "blue", dark: "blue" }),
    info: virtualColor({ name: "info", light: "cyan", dark: "cyan" }),
    success: virtualColor({ name: "success", light: "green", dark: "green" }),
    warning: virtualColor({ name: "warning", light: "amber", dark: "amber" }),
    danger: virtualColor({ name: "danger", light: "red", dark: "red" }),
  },

  primaryColor: "blue",
  primaryShade: { light: 6, dark: 7 },

  white: "#ffffff",
  black: "#12171b",

  autoContrast: true,
  luminanceThreshold: 0.33,

  fontFamily:
    "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  fontFamilyMonospace:
    "'JetBrains Mono', 'Fira Code', 'SF Mono', 'Cascadia Code', monospace",

  fontSizes: {
    xs: rem(12),
    sm: rem(13),
    md: rem(14),
    lg: rem(16),
    xl: rem(18),
  },

  fontWeights: {
    regular: "400",
    medium: "500",
    bold: "700",
  },

  lineHeights: {
    xs: "1.4",
    sm: "1.45",
    md: "1.55",
    lg: "1.6",
    xl: "1.65",
  },

  headings: {
    fontFamily:
      "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    fontWeight: "700",
    textWrap: "balance",
    sizes: {
      h1: { fontSize: rem(32), lineHeight: "1.2" },
      h2: { fontSize: rem(26), lineHeight: "1.25" },
      h3: { fontSize: rem(21), lineHeight: "1.3" },
      h4: { fontSize: rem(17), lineHeight: "1.35" },
      h5: { fontSize: rem(15), lineHeight: "1.4" },
      h6: { fontSize: rem(13), lineHeight: "1.45" },
    },
  },

  spacing: {
    xs: rem(8),
    sm: rem(12),
    md: rem(16),
    lg: rem(24),
    xl: rem(32),
  },

  radius: {
    xs: rem(4),
    sm: rem(6),
    md: rem(8),
    lg: rem(12),
    xl: rem(16),
  },
  defaultRadius: "md",

  shadows: {
    xs: "0 1px 2px rgba(0,0,0,0.06), 0 1px 1px rgba(0,0,0,0.04)",
    sm: "0 2px 4px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)",
    md: "0 4px 12px rgba(0,0,0,0.10), 0 2px 4px rgba(0,0,0,0.07), 0 0 0 1px rgba(0,0,0,0.02)",
    lg: "0 8px 24px rgba(0,0,0,0.12), 0 4px 8px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.03)",
    xl: "0 20px 48px rgba(0,0,0,0.16), 0 8px 16px rgba(0,0,0,0.10), 0 0 0 1px rgba(0,0,0,0.04)",
  },

  defaultGradient: { from: "blue", to: "cyan", deg: 135 },

  cursorType: "pointer",
  focusRing: "auto",
  respectReducedMotion: true,
  fontSmoothing: true,

  breakpoints: {
    xs: "36em",
    sm: "48em",
    md: "62em",
    lg: "75em",
    xl: "88em",
  },

  components: {
    Button: Button.extend({
      defaultProps: {
        variant: "filled",
        loaderProps: { type: "dots" },
      },
    }),

    ActionIcon: ActionIcon.extend({
      defaultProps: {
        variant: "subtle",
        color: "gray",
      },
    }),

    TextInput: TextInput.extend({
      defaultProps: {
        variant: "default",
      },
    }),

    PasswordInput: PasswordInput.extend({
      defaultProps: {
        variant: "default",
      },
    }),

    Textarea: Textarea.extend({
      defaultProps: {
        variant: "default",
        autosize: true,
        minRows: 3,
      },
    }),

    Select: Select.extend({
      defaultProps: {
        variant: "default",
        checkIconPosition: "right",
      },
    }),

    Paper: Paper.extend({
      defaultProps: {
        shadow: "xs",
        radius: "md",
        withBorder: true,
      },
    }),

    Card: Card.extend({
      defaultProps: {
        shadow: "sm",
        radius: "md",
        withBorder: true,
      },
    }),

    Modal: Modal.extend({
      defaultProps: {
        centered: true,
        radius: "lg",
        shadow: "xl",
        overlayProps: { backgroundOpacity: 0.45, blur: 10 },
        transitionProps: { transition: "pop", duration: 200 },
      },
    }),

    Tooltip: Tooltip.extend({
      defaultProps: {
        withArrow: true,
        arrowSize: 6,
        openDelay: 400,
        transitionProps: { transition: "fade", duration: 120 },
      },
    }),

    Anchor: Anchor.extend({
      defaultProps: {
        underline: "hover",
      },
    }),

    Menu: Menu.extend({
      defaultProps: {
        shadow: "md",
        radius: "md",
        transitionProps: { transition: "pop-top-right", duration: 120 },
      },
    }),

    ThemeIcon: ThemeIcon.extend({
      defaultProps: {
        variant: "light",
        radius: "md",
      },
    }),

    Title: Title.extend({
      defaultProps: {
        textWrap: "balance",
      },
    }),

    Text: Text.extend({
      defaultProps: {
        size: "md",
      },
    }),

    Badge: Badge.extend({
      defaultProps: {
        radius: "sm",
      },
    }),

    Alert: Alert.extend({
      defaultProps: {
        radius: "md",
      },
    }),

    Table: Table.extend({
      defaultProps: {
        verticalSpacing: "sm",
        horizontalSpacing: "md",
      },
    }),

    Skeleton: Skeleton.extend({
      defaultProps: {
        radius: "md",
      },
    }),

    Burger: Burger.extend({
      defaultProps: {
        color: "gray.6",
      },
    }),

    AppShell: AppShell.extend({
      defaultProps: {
        transitionDuration: 300,
        transitionTimingFunction: "ease",
      },
    }),

    Notifications: Notifications.extend({
      defaultProps: {
        position: "top-right",
        autoClose: 5000,
      },
    }),
  },

  other: {
    headerHeight: rem(60),
    navbarWidth: rem(260),
    sidebarWidth: rem(300),
  },
});
