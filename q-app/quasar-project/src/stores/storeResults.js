import { defineStore } from 'pinia';
import { uid, Notify } from 'quasar'

export const useStoreResults = defineStore('storeResults', {
  state: () => ({
    tests: {
      'ID1': {
        date: '2022/05/13',
        result: 'Negative / E lei aafia',
        isSubmitted: false,
        dateSubmitted: '',
        personal: {}
      },
      'ID2': {
        date: '2022/05/10',
        result: 'Negative / E lei aafia',
        isSubmitted: true,
        dateSubmitted: '',
        personal: {}
      },
    },
    personal: {
      firstName: '',
      lastName: "",
      vaccinationId: '',
      dob: '',
      gender: '',
      village: '',
      conditions: [],
      phone: '',
      email: '',
    },
    sort: 'date',
    sortDesc: true,
  }),

  getters: {
    sortedTestResults (state) {
      let testsSorted = {},
          keysOrdered = Object.keys(state.tests)

      keysOrdered.sort((a, b) => {
        let taskAProp = state.tests[a][state.sort].toLowerCase(),
            taskBProp = state.tests[b][state.sort].toLowerCase()

        if (state.sortDesc) {
          if (taskAProp < taskBProp) return 1
          else if (taskAProp > taskBProp) return -1
          else return 0
        }
        else {
          if (taskAProp > taskBProp) return 1
          else if (taskAProp < taskBProp) return -1
          else return 0
        }
      })

      keysOrdered.forEach((key) => {
        testsSorted[key] = state.tests[key]
      })

      return testsSorted
    }
  },

  actions: {
    addResult(testResult) {
      let id = uid()
      this.tests[id] = testResult
      Notify.create('Test Result added')
    },
    updateResult(id, testResult) {
      Object.assign(this.tests[id], testResult)
      // Notify.create('Test Result updated')
    },
    updatePersonal(personalDetails) {
      Object.assign(this.personal, personalDetails)
      // Notify.create('Personal details updated')
    }
  }
})
