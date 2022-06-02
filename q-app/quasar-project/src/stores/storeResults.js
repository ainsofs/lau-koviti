import { defineStore } from 'pinia'
import { uid, Notify } from 'quasar'
import { firebaseAuth, firebaseDb } from "boot/firebase"
import {
  ref,
  set,
  update,
  remove,
  onChildAdded,
  onChildChanged,
  onChildRemoved,
  onValue,
} from "firebase/database"
import { useStoreAuth } from "./storeAuth"

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
    testsDownloaded: false,
    profileId: "-1",
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
    testsFiltered(state) {
      let testsSorted = this.sortedTestResults,
        testsFiltered = {}
      if (state.profileId) {
        Object.keys(testsSorted).forEach(function (key) {
          let test = testsSorted[key]
          if (test.profileId == state.profileId) {
            testsFiltered[key] = test
          }
        })
        return testsFiltered
      }
      return testsSorted
    },
    totalSubmitted(state) {
      let tests = this.testsFiltered
      let keys = Object.keys(tests),
        count = 0
      keys.forEach((key) => {
        let status = tests[key].isSubmitted
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
      return Object.keys(state.testsFiltered).length
    },
    totalProfiles(state) {
      return Object.keys(state.profiles).length
    },
    firstProfileId(state) {
      if (state.totalProfiles) {
        let keys = Object.keys(state.profiles)
        return keys[0]
      }
      return "-1"
    }
  },

  actions: {
    clearResults() {
      // clear test restuls
      this.tests = {}

      // clear personal information
      let keys = Object.keys(this.personal)
      keys.forEach((key) => {
        if (key === "conditions") {
          this.personal[key] = []
        } else {
          this.personal[key] = ""
        }
      })

      // clear profiles
      this.profiles = {}
      this.profileId = "-1"
    },

    // test results
    addResult(testResult) {
      let id = uid()
      this.tests[id] = testResult

      const storeAuth = useStoreAuth()
      if (storeAuth.loggedIn) {
        this.fbAddTestResult({ id: id, testResult: testResult })
      } else {
        Notify.create({ message: "Added", icon: "announcement" })
      }
    },
    updateResult(id, testResult) {
      if (id in Object.keys(this.tests)) {
        Object.assign(this.tests[id], testResult)
      } else {
        this.tests[id] = testResult
      }

      const storeAuth = useStoreAuth()
      if (storeAuth.loggedIn) {
        this.fbUpdateTestResult({ id: id, updates: testResult })
      } else {
        Notify.create({ message: "Updated", icon: "announcement" })
      }
    },
    deleteResult(id) {
      delete this.tests[id]

      const storeAuth = useStoreAuth()
      if (storeAuth.loggedIn) {
        this.fbDeleteTestResult(id)
      } else {
        Notify.create({ message: "Deleted", icon: "announcement" })
      }
    },

    // personal details.
    addResult(testResult) {
      let id = uid()
      this.tests[id] = testResult

      const storeAuth = useStoreAuth()
      if (storeAuth.loggedIn) {
        this.fbAddTestResult({ id: id, testResult: testResult })
      } else {
        Notify.create({ message: "Added", icon: "announcement" })
      }
    },
    updatePersonal(personalDetails) {
      this.personal = Object.assign({}, personalDetails)

      // set initial personal details as first profile
      if (this.totalProfiles === 0) {
        this.addProfile(personalDetails)
        let id = this.firstProfileId
        this.setProfileId(id)

        // also link to any existing tests
        let keys = Object.keys(this.tests)
        keys.forEach((key) => {
          if (this.tests[key].profileId === "-1") {
            this.tests[key].profileId = id
          }
        })
      }
    },

    // profiles
    addProfile(profile) {
      let id = uid()
      let payload = Object.assign({}, profile)
      this.profiles[id] = payload

      const storeAuth = useStoreAuth()
      if (storeAuth.loggedIn) {
        this.fbAddProfile({ id: id, profile: payload })
      } else {
        Notify.create({ message: "Profile Added", icon: "announcement" })
      }
    },
    updateProfile(id, profile) {
      let payload = Object.assign({}, profile)
      if (id in Object.keys(this.profiles)) {
        Object.assign(this.profiles[id], payload)
      } else {
        this.profiles[id] = payload
      }

      const storeAuth = useStoreAuth()
      if (storeAuth.loggedIn) {
        this.fbUpdateProfile({ id: id, updates: payload })
      } else {
        Notify.create({ message: "Profile Updated", icon: "announcement" })
      }
    },
    deleteProfile(id) {
      delete this.profiles[id]

      const storeAuth = useStoreAuth()
      if (storeAuth.loggedIn) {
        this.fbDeleteProfile(id)
      } else {
        Notify.create({ message: "Profile Deleted", icon: "announcement" })
      }

      let newId = this.firstProfileId
      this.setProfileId(newId)
    },
    setProfileId(id) {
      this.profileId = id

      if (id in this.profiles) {
        this.updatePersonal(this.profiles[id])
      }
    },

    fbReadData() {
      let userId = firebaseAuth.currentUser.uid
      let userDataRef = ref(firebaseDb, userId)

      // initial check for data
      onValue(
        userDataRef,
        (snapshot) => {
          this.testsDownloaded = true

          // set profile Id
          if (this.profileId === "-1") {
            if (this.totalProfiles) {
              let firstKey = this.firstProfileId
              this.setProfileId(firstKey)
            } else {
              this.updatePersonal({ firstName: "", lastName: "" })
            }
          }
        },
        (error) => {
          if (error) {
            // showErrorMessage(error.message)
            console.log(error)
            this.router.replace("/")
          }
        },
        {
          onlyOnce: true,
        }
      )

      let testRef = ref(firebaseDb, userId + "/tests")
      let profileRef = ref(firebaseDb, userId + "/profiles")

      // data added
      onChildAdded(testRef, (snapshot) => {
        let key = snapshot.key
        let payload = snapshot.val()
        this.updateResult(key, payload)
      })
      onChildAdded(profileRef, (snapshot) => {
        let key = snapshot.key
        let payload = snapshot.val()
        this.updateProfile(key, payload)
      })

      // data updated
      onChildChanged(testRef, (snapshot) => {
        let key = snapshot.key
        let testResult = snapshot.val()

        this.updateResult(key, testResult)
      })

      onChildChanged(profileRef, (snapshot) => {
        let key = snapshot.key
        let profile = snapshot.val()

        this.updateProfile(key, profile)
      })

      // data deleted
      onChildRemoved(testRef, (snapshot) => {
        let key = snapshot.key
        this.deleteResult(key)
      })
      onChildRemoved(profileRef, (snapshot) => {
        let key = snapshot.key
        this.deleteProfile(key)
      })
    },

    // Test Results
    fbAddTestResult(payload) {
      let userId = firebaseAuth.currentUser.uid
      let testRef = ref(firebaseDb, userId + "/tests/" + payload.id)

      set(testRef, payload.testResult)
        .then(() => {
          Notify.create({ message: "Added", icon: "announcement" })
        })
        .catch((error) => {
          console.log(error)
        })
    },
    fbUpdateTestResult(payload) {
      let userId = firebaseAuth.currentUser.uid
      let testRef = ref(firebaseDb, userId + "/tests/" + payload.id)

      update(testRef, payload.updates)
        .then(() => {
          // let keys = Object.keys(payload.updates)
          // if (!(keys.includes("completed") && keys.length === 1)) {
          //   Notify.create("Task updated!")
          // }
          Notify.create({ message: "Updated", icon: "announcement" })
        })
        .catch((error) => {
          console.log(error)
        })
    },
    fbDeleteTestResult(id) {
      let userId = firebaseAuth.currentUser.uid
      let testRef = ref(firebaseDb, userId + "/tests/" + id)
      remove(testRef)
        .then(() => {
          // Notify.create("Task deleted!")
          Notify.create({ message: "Deleted", icon: "announcement" })
        })
        .catch((error) => {
          console.log(error)
        })
    },

    // Profiles
    fbAddProfile(payload) {
      let userId = firebaseAuth.currentUser.uid
      let profileRef = ref(firebaseDb, userId + "/profiles/" + payload.id)

      set(profileRef, payload.profile)
        .then(() => {
          Notify.create({ message: "Added", icon: "announcement" })
        })
        .catch((error) => {
          console.log(error)
        })
    },
    fbUpdateProfile(payload) {
      let userId = firebaseAuth.currentUser.uid
      let profileRef = ref(firebaseDb, userId + "/profiles/" + payload.id)

      update(profileRef, payload.updates)
        .then(() => {
          // let keys = Object.keys(payload.updates)
          // if (!(keys.includes("completed") && keys.length === 1)) {
          //   Notify.create("Task updated!")
          // }
          Notify.create({ message: "Updated", icon: "announcement" })
        })
        .catch((error) => {
          console.log(error)
        })
    },
    fbDeleteProfile(id) {
      let userId = firebaseAuth.currentUser.uid
      let profileRef = ref(firebaseDb, userId + "/profiles/" + id)
      remove(profileRef)
        .then(() => {
          // Notify.create("Task deleted!")
          Notify.create({ message: "Deleted", icon: "announcement" })
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
})
