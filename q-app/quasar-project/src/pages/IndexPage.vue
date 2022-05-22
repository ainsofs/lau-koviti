<template>
  <q-page class="q-pa-md absolute full-width full-height column">
    <template class="column">
      <!-- empty message -->
      <q-card v-if="showEmptyMessage">
        <q-card-section>
          <a @click="addTest">
            <q-list>
              <q-item clickable>
                <q-item-section avatar>
                  <q-icon color="primary" name="medication_liquid" />
                </q-item-section>

                <q-item-section>
                  <q-item-label>Record your COVID-19 test results. <span class="font-weight-bold">Click to begin!</span></q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </a>
        </q-card-section>
      </q-card>

      <!-- list -->
      <div class="q-gutter-md" v-if="!showEmptyMessage">
        <q-list bordered padding class="rounded-borders q-card">

          <q-item clickable v-ripple @click="editTest(key, t)"  v-for="(t, key) in store.sortedTestResults" :key="key" >

            <q-item-section avatar top>
              <q-avatar v-if="t.result === 'Positive / Ua aafia'" color="negative" text-color="white">
                {{ firstLetter(t.result) }}
              </q-avatar>
              <q-avatar v-if="t.result === 'Negative / E lei aafia'" color="positive" text-color="white" >
                {{ firstLetter(t.result) }}
              </q-avatar>
              <q-avatar v-if="t.result === 'Inconclusive / Le mautinoa'" color="grey" text-color="white" >
                {{ firstLetter(t.result) }}
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label lines="1">{{ t.result }}</q-item-label>
              <q-item-label caption>{{ formatDate(t.date) }}</q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-icon v-if="!t.isSubmitted" @click.stop="submitTest(key, t)" name="send" color="primary" />
              <q-icon v-else name="task_alt" color="grey" />
            </q-item-section>

          </q-item>

        </q-list>

      </div>

      <!-- button -->
      <q-page-sticky position="bottom-right" :offset="fabPos">
        <q-btn
          fab
          icon="add"
          color="primary"
          :disable="draggingFab"
          v-touch-pan.prevent.mouse="moveFab"
          @click="addTest" />
      </q-page-sticky>
      <!-- Add Modal -->
      <q-dialog v-model="showAddModal">
        <add-results :testResult="testResult" :formMode="formMode" :resultId="resultId" />
      </q-dialog>

      <!-- Submit Modal -->
      <q-dialog v-model="showSubmitModal">
        <submit-results :testResult="testResult" :resultId="resultId" @close="showSubmitModal = false" />
      </q-dialog>

    </template>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { date } from 'quasar'
import { useStoreResults } from 'stores/storeResults'

export default defineComponent({
  name: 'IndexPage',
  setup() {
    const store = useStoreResults()

    return {
      store
    }
  },
  data() {
    return {
      showAddModal: false,
      showSubmitModal: false,
      testResult: {},
      formMode: 'add',
      resultId: 0,
      fabPos: [ 18, 18 ],
      draggingFab: false,
    }
  },
  computed: {
    showEmptyMessage() {
      return Object.keys(this.store.sortedTestResults).length === 0
    }
  },
  methods: {
    editTest(id, testResult) {
      this.resultId = id
      this.testResult = testResult
      this.formMode = 'edit'
      this.showAddModal = true
    },
    addTest() {
      this.formMode = 'add'
      this.showAddModal = true
    },
    submitTest(id, testResult) {
      this.resultId = id
      this.testResult = testResult
      this.showSubmitModal = true
    },
    formatDate(timeStamp) {
      return date.formatDate(timeStamp, 'D MMMM, YYYY')
    },
    firstLetter(stVal) {
      return stVal.substr(0,1)
    },
    moveFab (ev) {
      this.draggingFab = ev.isFirst !== true && ev.isFinal !== true

      this.fabPos = [
        this.fabPos[ 0 ] - ev.delta.x,
        this.fabPos[ 1 ] - ev.delta.y
      ]
    }
  },
  components: {
    'add-results': require('components/TestResults/Modal/AddTestResult.vue').default,
    'submit-results': require('components/TestResults/Modal/SubmitTestResult.vue').default,
  }
})
</script>

