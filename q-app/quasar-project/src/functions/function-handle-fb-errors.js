import { showErrorMessage } from "./function-show-message"

export function handleFbErrors(error, $t) {
  const errorCode = error.code
  let errorMessage = ""

  switch (errorCode) {
    case "auth/network-request-failed":
      errorMessage = $t('label.noInternet')
      break
    case "auth/wrong-password":
      errorMessage = $t("label.wrongPassword")
      break
    case "auth/user-not-found":
      errorMessage = $t("label.userNotFound")
      break
    case "auth/email-already-in-use":
      errorMessage = $t("label.emailInUse")
      break
    case "auth/user-disabled":
      errorMessage = $t("label.userDisabled")
      break
    case 'auth/weak-password':
      errorMessage = $t("label.weakPassword")
      break
    case 'auth/invalid-email':
      errorMessage = $t("label.invalidEmail")
      break
    default:
      console.log(error.code)
      errorMessage = error.message
  }

  showErrorMessage(errorMessage)
}
