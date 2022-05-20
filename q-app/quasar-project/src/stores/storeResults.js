import { defineStore } from 'pinia';
import { uid } from 'quasar'

export const useStoreResults = defineStore('storeResults', {
  state: () => ({
    tests: {
      'ID1': {
        date: '2022-05-13',
        result: 'Negative / E lei aafia',
        isSubmitted: false,
        dateSubmitted: '',
        personal: {}
      },
      'ID2': {
        date: '2022-05-10',
        result: 'Negative / E lei aafia',
        isSubmitted: true,
        dateSubmitted: '',
        personal: {}
      },
    },
    personal: {
      firstName: 'Ainsof',
      lastName: "So'o",
      vaccinationId: 'ABCDE',
      dob: '2022/05/01',
      gender: 'm',
      village: 'Siusega',
      conditions: [],
      phone: '2222',
      email: 'ainsofs@test.com',
    }
  }),

  // getters: {
  //   doubleCount (state) {
  //     return state.counter * 2
  //   }
  // },

  actions: {
    addResult(testResult) {
      console.log(testResult)
      let id = uid()
      this.tests[id] = testResult
    },
    updateResult(id, testResult) {
      Object.assign(this.tests[id], testResult)
    },
    updatePersonal(payload) {
      Object.assign(this.personal, payload)
    }
  }
})
