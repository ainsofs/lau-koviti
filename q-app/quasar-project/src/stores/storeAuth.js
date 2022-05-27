import { defineStore } from 'pinia'
import { firebaseAuth } from 'boot/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
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
          Notify.create({
            message: error.message,
            icon: "warning",
            color: "warning",
          })
        })
    },
    loginUser(userDetails) {
      console.log('loginUser: ', userDetails)
    }
  },
})
