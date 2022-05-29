import { defineStore } from 'pinia'
import { uid, Notify } from 'quasar'
import { firebaseAuth, firebaseDb } from "boot/firebase"
import {
  ref,
  onChildAdded,
  onChildChanged,
  onChildRemoved,
} from "firebase/database"

export const useStoreResults = defineStore("storeResults", {
  state: () => ({
    tests: {
      // ID1: {
      //   date: "2022/05/13",
      //   result: "Negative / E lei aafia",
      //   isSubmitted: false,
      //   dateSubmitted: "",
      //   personal: {},
      // },
      // ID2: {
      //   date: "2022/05/10",
      //   result: "Negative / E lei aafia",
      //   isSubmitted: true,
      //   dateSubmitted: "",
      //   personal: {},
      // },
      // ID3: {
      //   date: "2022/03/30",
      //   result: "Positive / Ua aafia",
      //   isSubmitted: false,
      //   dateSubmitted: "",
      //   personal: {},
      // },
      // ID4: {
      //   date: "2022/04/11",
      //   result: "Inconclusive / Le mautinoa",
      //   isSubmitted: false,
      //   dateSubmitted: "",
      //   personal: {},
      // },
    },
    personal: {
      firstName: "",
      lastName: "",
      vaccinationId: "",
      dob: "",
      gender: "",
      village: "",
      conditions: [],
      phone: "",
      email: "",
    },
    profiles: {
      // 1234: {
      //   personal: {
      //     firstName: "",
      //     lastName: "",
      //     vaccinationId: "",
      //     dob: "",
      //     gender: "",
      //     village: "",
      //     conditions: [],
      //     phone: "",
      //     email: "",
      //   },
      // },
    },
    sort: "date",
    sortDesc: true,
  }),

  getters: {
    sortedTestResults(state) {
      let testsSorted = {},
        keysOrdered = Object.keys(state.tests)

      keysOrdered.sort((a, b) => {
        let taskAProp = state.tests[a][state.sort].toLowerCase(),
          taskBProp = state.tests[b][state.sort].toLowerCase()

        if (state.sortDesc) {
          if (taskAProp < taskBProp) return 1
          else if (taskAProp > taskBProp) return -1
          else return 0
        } else {
          if (taskAProp > taskBProp) return 1
          else if (taskAProp < taskBProp) return -1
          else return 0
        }
      })

      keysOrdered.forEach((key) => {
        testsSorted[key] = state.tests[key]
      })

      return testsSorted
    },
    totalSubmitted(state) {
      let keys = Object.keys(state.tests),
        count = 0
      keys.forEach((key) => {
        let status = state.tests[key].isSubmitted
        if (status) {
          count++
        }
      })

      return count
    },
    totalNotSubmitted(state) {
      return state.totalTestResults - this.totalSubmitted
    },
    totalTestResults(state) {
      return Object.keys(state.sortedTestResults).length
    },
  },

  actions: {
    addResult(testResult) {
      let id = uid()
      this.tests[id] = testResult
      Notify.create({ message: "Added", icon: "announcement" })
      return id
    },
    updateResult(id, testResult) {
      if (id in Object.keys(this.tests)) {
        Object.assign(this.tests[id], testResult)
      } else {
        this.tests[id] = testResult
      }
      Notify.create({ message: "Updated", icon: "announcement" })
    },
    deleteResult(id) {
      delete this.tests[id]
      Notify.create({ message: "Deleted", icon: "announcement" })
    },
    updatePersonal(personalDetails) {
      Object.assign(this.personal, personalDetails)
      // Notify.create('Personal details updated')
    },
    updateProfile(id, profile) {
      if (id in Object.keys(this.profiles)) {
        Object.assign(this.profiles[id], testResult)
      } else {
        this.profiles[id] = profile
      }
      // Notify.create({ message: "Updated", icon: "announcement" })
    },
    fbReadDate() {
      let userId = firebaseAuth.currentUser.uid
      let userDataRef = ref(firebaseDb, userId)

      // data added
      onChildAdded(userDataRef, (snapshot) => {
        let key = snapshot.key

        if (key === "personal") {
          //load personal details
          let personal = snapshot.val()
          this.updatePersonal(personal)
        } else if (key === "profiles") {
          //load profiles
          let profiles = snapshot.val()
          const keys = Object.keys(profiles)
          keys.forEach((testKey) => {
            this.updateProfile(testKey, profiles[testKey])
          })
        } else if (key === "tests") {
          //load test results
          let testResults = snapshot.val()
          const keys = Object.keys(testResults)
          keys.forEach((testKey) => {
            this.updateResult(testKey, testResults[testKey])
          })
        } else {
          console.log("unhandled: ", snapshot)
        }
      })

      // data updated
      onChildChanged(userDataRef, (snapshot) => {
        let key = snapshot.key

        if (key === "personal") {
          //load personal details
          let personal = snapshot.val()
          this.updatePersonal(personal)
        } else if (key === "profiles") {
          //load profiles
          let profiles = snapshot.val()
          const keys = Object.keys(profiles)
          keys.forEach((testKey) => {
            this.updateProfile(testKey, profiles[testKey])
          })
        } else if (key === "tests") {
          //load test results
          let testResults = snapshot.val()
          const keys = Object.keys(testResults)
          keys.forEach((testKey) => {
            this.updateResult(testKey, testResults[testKey])
          })
        } else {
          console.log("unhandled: ", snapshot)
        }
      })

      // data deleted

      let testRef = ref(firebaseDb, userId + '/tests')
      onChildRemoved(testRef, (snapshot) => {
        let key = snapshot.key
        // console.log(key)
        this.deleteResult(key)
      })
    },
  },
})
