import { defineStore } from 'pinia'
import { firebaseAuth } from 'boot/firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth"
import { Notify } from "quasar"

export const useStoreAuth = defineStore("storeAuth", {
  state: () => ({
    counter: 0,
  }),

  getters: {
    doubleCount(state) {
      return state.counter * 2
    },
  },

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

          Notify.create({
            message: errorMessage,
            icon: "warning",
            color: "warning",
          })
          console.log(error)
        })
    }
  },
})
