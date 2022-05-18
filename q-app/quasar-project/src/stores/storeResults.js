import { defineStore } from 'pinia';
import { uid } from 'quasar'

export const useStoreResults = defineStore('storeResults', {
  state: () => ({
    tests: [
      {
        id: 'ID1',
        date: '2022-05-13',
        result: 'Negative / E lei aafia',
        isSubmitted: false,
      },
      {
        id: 'ID2',
        date: '2022-05-10',
        result: 'Negative / E lei aafia',
        isSubmitted: true,
      },
    ]
  }),

  // getters: {
  //   doubleCount (state) {
  //     return state.counter * 2
  //   }
  // },

  actions: {
    addResult(testResult) {
      testResult.id = uid()

      this.tests.unshift(testResult)
    }
  }
})
