import { defineStore } from 'pinia'
import { firebaseAuth } from 'boot/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'

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
          console.log("response: ", response);
        })
        .catch((error) => {
          console.log("error.message: ", error.message);
        });
    },
    increment() {
      this.counter++
    },
  },
})
