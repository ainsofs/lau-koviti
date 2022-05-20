<template>
  <q-page class="q-pa-md absolute full-width full-height column">
    <template class="column">
      <!-- list -->
      <div class="q-gutter-md">
        <q-list v-for="(t, key) in store.tests" :key="key" bordered class="rounded-borders">

          <q-item clickable v-ripple @click="editTest(key, t)">

            <q-item-section>
              <q-item-label>{{ t.result }}</q-item-label>
              <q-item-label>{{ formatDate(t.date) }}</q-item-label>
            </q-item-section>

            <q-item-section side>
              <div v-if="!t.isSubmitted">
                <q-btn @click.stop="submitTest(key, t)" outline round color="primary" icon="send" />
              </div>
              <span v-else>
                <q-icon name="check_circle" color="green" size="3rem" />
              </span>
            </q-item-section>
          </q-item>

        </q-list>

      </div>

      <!-- button -->
      <div class="q-pa-md"></div>
      <q-btn @click="addTest" rounded  icon="add" color="primary" label="Add Test Result" />

      <!-- Add Modal -->
      <q-dialog v-model="showAddModal">
        <add-results :testResult="testResult" :formMode="formMode" :resultId="resultId" />
      </q-dialog>

      <!-- Submit Modal -->
      <q-dialog v-model="showSubmitModal">
        <submit-results :testResult="testResult" :resultId="resultId" />
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
      // you can return the whole store instance to use it in the template
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
      return date.formatDate(timeStamp, 'D MMMM')
    }
  },
  components: {
    'add-results': require('components/TestResults/Modal/AddTestResult.vue').default,
    'submit-results': require('components/TestResults/Modal/SubmitTestResult.vue').default,
  }
})
</script>
