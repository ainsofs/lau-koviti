<template>
  <q-card class="col">
    <q-card-section class="row items-center">
      <div class="text-h6">{{ formHeading }}</div>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>

    <form @submit.prevent="submitForm">
      <q-card-section class="q-pt-none">
        <div class="q-gutter-md">

          <q-input
            ref="date"
            outlined
            v-model="test.date"
            :disable="test.isSubmitted"
            lazy-rules
            mask="##/##/####"
            :rules="[ val => /^([0]?[1-9]|[1|2][0-9]|[3][0|1])[./-]([0]?[1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/.test(val) || 'Please enter date in DD/MM/YYYY format.' ]"
            label="Date of the test"
            hint="Aso sa fa’atinoina ai le su’esu’ega">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date
                    v-model="test.date"
                    mask="DD/MM/YYYY"
                    :options="optionsFn"
                    :events="eventsFn"
                    event-color="accent"
                    navigation-min-year-month="2020/01"
                    :navigation-max-year-month="navMaxMonth">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup :label="$t('label.close')" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>

          <div>
            <span class="text-grey">Test result</span>
            <div>
              <q-option-group
                :options="options"
                type="radio"
                v-model="test.result"
                :disable="test.isSubmitted"
              />
            </div>
            <span class="q-field__bottom">Faaiuga ole suesuega</span>
          </div>

        </div>

      </q-card-section>

      <q-card-actions align="right">
        <q-btn type="submit" flat color="primary" :class="{ 'hidden': test.isSubmitted}" :label="$t('label.save')" class="btn-submit" />
      </q-card-actions>

    </form>
  </q-card>
</template>

<script>

import { defineComponent } from 'vue'
import { date } from 'quasar'
import { useStoreResults } from 'stores/storeResults'
import { testResultOptions } from 'src/options/personalOptions'

export default defineComponent({
  emits: ['close'],
  props: ['testResult', 'formMode', 'resultId'],
  setup() {
    const store = useStoreResults()

    return {
      store
    }
  },
  data() {
    return {
      options: testResultOptions,
      test: {},
    }
  },
  computed: {
    formHeading() {
      if (this.formMode === 'edit') {
        if(this.test.isSubmitted) {
          return this.$t('modals.addTest.view')
        }
        return this.$t('modals.addTest.edit')
      }
      else {
        return this.$t('modals.addTest.name')
      }

    },
    navMaxMonth() {
      return date.formatDate(Date.now(), 'YYYY/MM')
    }
  },
  methods: {
    submitForm() {
      this.$refs.date.validate()

      if (!this.$refs.date.hasError) {
        // validation passed!.
        if (this.formMode === 'edit') {
          this.store.updateResult(this.resultId, this.test)
        }
        else {
          this.test.profileId = this.store.profileId
          this.store.addResult(this.test)
        }

        this.$emit('close')
      }
      else {
        this.$q.notify({
          message: this.$t('modals.addTest.e1'),
          icon: 'warning',
          color: 'warning',
        })
      }
    },
    optionsFn (date1) {
      return date1 <= date.formatDate(Date.now(), 'YYYY/MM/DD')
    },
    eventsFn (date1) {
      const list = this.store.testsFiltered
      const keys = Object.keys(list)
      let isEvent = false

      keys.forEach((key) => {
        let someDate = date.extractDate(list[key].date, 'DD/MM/YYYY')
        someDate = date.formatDate(someDate, 'YYYY/MM/DD')
        if (someDate === date1) {
          isEvent = true
          return
        }
      })

      return isEvent
    }
  },
  created() {
    if (this.formMode === 'edit') {
      Object.assign(this.test, this.testResult)
		  this.test = Object.assign({}, this.testResult)
    }
    else {
      let defaultTest = {
        date: date.formatDate(Date.now(), 'DD/MM/YYYY'),
        result: 'Negative / E lei aafia',
        isSubmitted: false,
        dateSubmitted: '',
        personal: {},
        profileId: "",
      }
		  this.test = Object.assign({}, defaultTest)
    }
  },
})
</script>
