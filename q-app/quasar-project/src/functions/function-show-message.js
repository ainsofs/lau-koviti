import { Notify } from "quasar"

export function showErrorMessage(errorMessage) {
  Notify.create({
    message: errorMessage,
    color: "warning",
    icon: "warning",
  })
}

export function showOnlineMessage(message) {
  Notify.create({
    message: message,
    icon: "cloud_done",
  });
}
export function showOfflineMessage(message) {
  Notify.create({
    message: message,
    icon: "cloud_off",
  });
}

export function showSuccessMessage(message, options = { icon: check }) {
  Notify.create({
    message: message,
    color: "positive",
    icon: options.icon,
  });
}
