import { showErrorMessage } from "./function-show-message"

export function handleFbErrors(error) {
  const errorCode = error.code
  let errorMessage = ""

  switch (errorCode) {
    case "auth/network-request-failed":
      errorMessage = "No internet detected."
      break
    case "auth/wrong-password":
      errorMessage = "Wrong password."
      break
    case "auth/user-not-found":
      errorMessage = "Email not found."
      break
    case "auth/email-already-in-use":
      errorMessage = "Email already in use."
      break
    case "auth/user-disabled":
      errorMessage = "Email is disabled."
      break
    default:
      console.log(error.code)
      errorMessage = error.message
  }

  showErrorMessage(errorMessage)
}
