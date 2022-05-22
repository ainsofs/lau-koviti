<template>
  <q-card>
    <q-card-section class="row items-center">
      <div class="text-h6">{{ formHeading }}</div>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>

    <form @submit.prevent="submitForm">
      <q-card-section class="q-pt-none">
        <div class="q-gutter-md">

          <q-input outlined autofocus v-model="test.date" :disable="test.isSubmitted" mask="date" :rules="['date']" label="Date of the test" hint="Aso sa fa’atinoina ai le su’esu’ega">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="test.date" >
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
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
        <q-btn type="submit" flat dense color="primary" :class="{ 'hidden': test.isSubmitted}" label="Save" class="btn-submit" v-close-popup />
      </q-card-actions>

    </form>
  </q-card>
</template>

<script>

import { defineComponent } from 'vue'
import { date } from 'quasar'
import { useStoreResults } from 'stores/storeResults'

export default defineComponent({
  setup() {
    const store = useStoreResults()

    return {
      store
    }
  },
  props: ['testResult', 'formMode', 'resultId'],
  data() {
    return {
      options: [
        { label: 'Positive / Ua aafia', value: 'Positive / Ua aafia' },
        { label: 'Negative / E lei aafia', value: 'Negative / E lei aafia' },
        { label: 'Inconclusive / Le mautinoa', value: 'Inconclusive / Le mautinoa' },
      ],
      test: {},
    }
  },
  computed: {
    formHeading() {
      if (this.formMode === 'edit') {
        if(this.test.isSubmitted) {
          return 'Test result'
        }
        return 'Edit test result'
      }
      else {
        return 'Add test result'
      }

    }
  },
  methods: {
    submitForm() {
      if (this.formMode === 'edit') {
        this.store.updateResult(this.resultId, this.test)
      }
      else {
        this.store.addResult(this.test)
      }
    }
  },
  created() {
    if (this.formMode === 'edit') {
      Object.assign(this.test, this.testResult)
		  this.test = Object.assign({}, this.testResult)
    }
    else {
      let defaultTest = {
        date: date.formatDate(Date.now(), 'YYYY/MM/DD'),
        result: 'Negative / E lei aafia',
        isSubmitted: false,
        dateSubmitted: '',
        personal: {},
      }
		  this.test = Object.assign({}, defaultTest)
    }
  }
})
</script>
