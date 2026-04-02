"use client";

import {
  createTheme,
  Button,
  ActionIcon,
  TextInput,
  PasswordInput,
  Textarea,
  Select,
  Paper,
  Modal,
  Tooltip,
  Anchor,
} from "@mantine/core";

export const theme = createTheme({
  primaryColor: "blue",
  fontFamily: "var(--font-inter), sans-serif",
  headings: {
    fontFamily: "var(--font-inter), sans-serif",
  },
  defaultRadius: "md",
  cursorType: "pointer",
  focusRing: "auto",
  respectReducedMotion: true,
  fontSmoothing: true,
  components: {
    Button: Button.extend({
      defaultProps: {
        variant: "filled",
      },
    }),

    ActionIcon: ActionIcon.extend({
      defaultProps: {
        variant: "default",
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
      },
    }),

    Modal: Modal.extend({
      defaultProps: {
        centered: true,
        overlayProps: { backgroundOpacity: 0.55, blur: 3 },
      },
    }),

    Tooltip: Tooltip.extend({
      defaultProps: {
        withArrow: true,
        transitionProps: { transition: "fade", duration: 200 },
      },
    }),

    Anchor: Anchor.extend({
      defaultProps: {
        underline: "hover",
      },
    }),
  },
});
