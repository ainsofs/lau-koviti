import { defineStore } from 'pinia'
import { firebaseAuth } from 'boot/firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "firebase/auth"
import { Notify } from "quasar"

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
      createUserWithEmailAndPassword(
        firebaseAuth,
        userDetails.email,
        userDetails.password
      )
        .then((response) => {
          console.log(response)

          Notify.create({
            message: "Registered",
            icon: "announcement" })
        })
        .catch((error) => {
          var errorCode = error.code
          var errorMessage = error.message
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
      signInWithEmailAndPassword(
        firebaseAuth,
        userDetails.email,
        userDetails.password
      )
        .then((response) => {
          console.log(response)

          Notify.create({
            message: "Logged in",
            icon: "announcement",
          })
        })
        .catch((error) => {
          var errorCode = error.code
          var errorMessage = error.message
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
        if (user) {
          //logged in
          this.loggedIn = true
          this.router.push("/")
        }
        else {
          //logged out
          this.loggedIn = false
        }
      })
    },
    logoutUser() {
      signOut(firebaseAuth)

      Notify.create({
        message: "Logged out",
        icon: "announcement",
      })
    }
  },
})
