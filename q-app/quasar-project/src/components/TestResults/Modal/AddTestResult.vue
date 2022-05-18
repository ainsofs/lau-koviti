<template>
  <q-card>
    <q-card-section class="row items-center">
      <div class="text-h6">Add Result Result</div>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>

    <form @submit.prevent="submitForm">
      <q-card-section class="q-pt-none">
        <div class="q-gutter-md">

          <q-input outlined v-model="test.date" mask="date" :rules="['date']" label="Date of the test" hint="Aso sa fa’atinoina ai le su’esu’ega">
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

          <div class="q-pa-sm rounded-borders">
            Test result / Faaiuga ole suesuega
            <div>
              <q-option-group
                :options="options"
                type="radio"
                v-model="test.result"
              />
            </div>
          </div>

        </div>

      </q-card-section>

      <q-card-actions align="right">
        <q-btn icon="save" type="submit" outline color="primary" label="Save" class="q-ma-md" v-close-popup />
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
      // you can return the whole store instance to use it in the template
      store
    }
  },
  data() {
    return {
      options: [
        { label: 'Positive / Ua aafia', value: 'Positive / Ua aafia' },
        { label: 'Negative / E lei aafia', value: 'Negative / E lei aafia' },
        { label: 'Inconclusive / Le mautinoa', value: 'Inconclusive / Le mautinoa' },
      ],
      test: {
        date: date.formatDate(Date.now(), 'YYYY/MM/DD'),
        result: 'Negative / E lei aafia',
        isSubmitted: false,
      },
    }
  },
  methods: {
    submitForm() {
      this.store.addResult(this.test)
    }
  }
})
</script>
