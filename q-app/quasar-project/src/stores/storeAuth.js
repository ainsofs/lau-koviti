import { defineStore } from 'pinia'
import { firebaseAuth } from 'boot/firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth"
import { useStoreResults } from './storeResults'
import { Notify, Loading, LocalStorage } from "quasar"
import { handleFbErrors } from "src/functions/function-handle-fb-errors"
import { showSuccessMessage } from "src/functions/function-show-message"

export const useStoreAuth = defineStore("storeAuth", {
  state: () => ({
    loggedIn: false,
    email: "",
    isVerified: false,
  }),

  // getters: {
  //   doubleCount(state) {
  //     return state.counter * 2
  //   },
  // },

  actions: {
    registerUser(userDetails) {
      Loading.show()

      createUserWithEmailAndPassword(
        firebaseAuth,
        userDetails.email,
        userDetails.password
      )
        .then((response) => {
          showSuccessMessage("Registered")
        })
        .catch((error) => {
          Loading.hide()
          handleFbErrors(error)
        })
    },
    loginUser(userDetails) {
      Loading.show()

      signInWithEmailAndPassword(
        firebaseAuth,
        userDetails.email,
        userDetails.password
      )
        .then((response) => {
          // handled by onAuthStateChanged
        })
        .catch((error) => {
          Loading.hide()
          handleFbErrors(error)
        })
    },
    handleAuthStateChange() {
      onAuthStateChanged(firebaseAuth, (user) => {

        Loading.hide()

        // useful fields: email, emailVerified, isAnonymous, phoneNumber, displayName

        if (user) {
          //logged in
          this.loggedIn = true
          LocalStorage.set("loggedIn", true)
          this.email = user.email
          this.isVerified = user.emailVerified

          this.router.push("/")

          // if anon user has some tests. save them to fb before reading
          const storeResults = useStoreResults()
          if (storeResults.totalTestResults) {
            const keys = Object.keys(storeResults.tests)
            keys.forEach((key) => {
              storeResults.fbAddTestResult({id: key, testResult: storeResults.tests[key]})
            })
          }

          // read data from fb
          storeResults.fbReadData()
        }
        else {
          //logged out
          this.loggedIn = false
          LocalStorage.set("loggedIn", false)
          this.email = ""
          this.isVerified = false
          // this.router.push("user")
          const storeResults = useStoreResults()
          storeResults.testsDownloaded = false
        }
      })
    },
    logoutUser() {
      signOut(firebaseAuth)
      const storeResults = useStoreResults()
      storeResults.clearResults()
      this.router.replace("/user")

      // Notify.create({
      //   message: "Logged out",
      //   icon: "announcement",
      // })
    },
    forgotPassword(email) {
      const actionCodeSettings = {
        url: window.location.href + '?email=' + email,
        handleCodeInApp: true
      }

      sendPasswordResetEmail(firebaseAuth, email, actionCodeSettings)
        .then(() => {
          showSuccessMessage("Password reset link sent", { icon: 'send' })
        })
        .catch((error) => {
          handleFbErrors(error)
        })
    }
  },
})
