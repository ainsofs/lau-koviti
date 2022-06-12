import { Notify } from "quasar"

export function showErrorMessage(errorMessage) {
  Notify.create({
    message: errorMessage,
    color: "warning",
    icon: "warning",
  })
}

export function showOnlineMessage(errorMessage) {
  Notify.create({
    message: errorMessage,
    icon: "cloud_done",
  });
}
export function showOfflineMessage(errorMessage) {
  Notify.create({
    message: errorMessage,
    icon: "cloud_off",
  });
}

export function showSuccessMessage(errorMessage, options = { icon: check }) {
  Notify.create({
    message: errorMessage,
    color: "positive",
    icon: options.icon,
  });
}
