import { notifications } from "@mantine/notifications";

interface NotifyOptions {
  title?: string;
  message: string;
  autoClose?: number | false;
}

export const notify = {
  success({ title = "Success", message, autoClose = 4000 }: NotifyOptions) {
    notifications.show({ title, message, color: "green", autoClose });
  },

  error({ title = "Error", message, autoClose = 6000 }: NotifyOptions) {
    notifications.show({ title, message, color: "red", autoClose });
  },

  warning({ title = "Warning", message, autoClose = 5000 }: NotifyOptions) {
    notifications.show({ title, message, color: "yellow", autoClose });
  },

  info({ title = "Info", message, autoClose = 4000 }: NotifyOptions) {
    notifications.show({ title, message, color: "blue", autoClose });
  },

  loading({ title = "Loading", message, id }: NotifyOptions & { id: string }) {
    notifications.show({
      id,
      title,
      message,
      loading: true,
      autoClose: false,
      withCloseButton: false,
    });
  },

  loaded({
    id,
    title = "Done",
    message,
    autoClose = 3000,
  }: NotifyOptions & { id: string }) {
    notifications.update({
      id,
      title,
      message,
      color: "green",
      loading: false,
      autoClose,
      withCloseButton: true,
    });
  },
};
