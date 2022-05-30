import { defineStore } from 'pinia'
import { firebaseAuth } from 'boot/firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "firebase/auth"
import { useStoreResults } from './storeResults'
import { Notify, Loading } from "quasar"

export const useStoreAuth = defineStore("storeAuth", {
  state: () => ({
    loggedIn: false,
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
          Notify.create({
            message: "Registered",
            icon: "announcement" })
        })
        .catch((error) => {
          Loading.hide()

          let errorCode = error.code
          let errorMessage = error.message
          if (errorCode === "auth/email-already-in-use") {
            errorMessage = "Email already in use."
          }

          Notify.create({
            message: errorMessage,
            icon: "warning",
            color: "warning",
          })
          console.log(error)
          console.log(errorCode)
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
          Notify.create({
            message: "Logged in",
            icon: "announcement",
          })
        })
        .catch((error) => {

          Loading.hide()

          let errorCode = error.code
          let errorMessage = error.message
          if (errorCode === "auth/wrong-password") {
            errorMessage = "Wrong password."
          }
          else if (errorCode === "auth/user not found") {
            errorMessage = "User not found."
          }

          Notify.create({
            message: errorMessage,
            icon: "warning",
            color: "warning",
          })
          console.log(error)
          console.log(errorCode)
        })
    },
    handleAuthStateChange() {
      onAuthStateChanged(firebaseAuth, (user) => {

        Loading.hide()

        if (user) {
          //logged in
          this.loggedIn = true
          this.router.push("/")

          // if user has some tests. send them to the fb before reading
          const storeResults = useStoreResults()
          if (storeResults.totalTestResults) {
            const keys = Object.keys(storeResults.tests)
            keys.forEach((key) => {
              storeResults.fbAddTask({id: key, testResult: storeResults.tests[key]})
            })
          }

          // read data from fb
          storeResults.fbReadData()
        }
        else {
          //logged out
          this.loggedIn = false
          // this.router.push("user")
        }
      })
    },
    logoutUser() {
      signOut(firebaseAuth)
      const storeResults = useStoreResults()
      storeResults.clearResults()

      Notify.create({
        message: "Logged out",
        icon: "announcement",
      })
    }
  },
})
