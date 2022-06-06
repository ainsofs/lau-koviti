<template>
  <q-page class="q-pa-md col">
    <div class="column">

      <!-- empty message -->
      <div v-if="showEmptyMessage">

        <q-card flat>
          <q-card-section>
            <q-list>
              <q-item>
                <q-item-section side top>
                  <q-icon color="primary" name="medication_liquid" size="lg" />
                </q-item-section>

                <q-item-section>
                  <q-item-label>
                    <p>Talofa lava! You can use this app to <strong>record your test results</strong>.</p>

                    <p>We'll make it easy for you to send them to the Samoa Ministry
                    of Health or you can do it manually using their
                    <a href="https://docs.google.com/forms/d/e/1FAIpQLSepjuDUzEza-YA0YUIr0bM8M4Jkn-tp6h1F1Cq6Zed1sBkRqQ/viewform" target="_blank"> Official form.</a></p>

                    <p v-if="!store2.loggedIn">You can also <q-btn flat dense label="Register" to="/user" color="primary" /> an account to access your tests from any device!</p>

                    <p @click="addTest" class="cursor-pointer">Press the <q-avatar icon="add" color="primary" class="text-white" size="xs" /> button to <strong>get started!</strong></p>
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </div>

      <!-- list container -->
      <div class="q-gutter-md" v-else>

        <!-- filter and sort -->
        <div class="filter-and-sort">
          <div class="">
            <div class="col">
              <p>Malo lava! You've recorded <strong>{{ totalTestResults }} {{ pluralText }}</strong>.</p>

              <q-linear-progress v-if="totalSubmitted" size="25px" :value="progress" :color="progressColour" rounded >
                <div class="absolute-full flex flex-center">
                  <q-badge color="white" text-color="primary" :label="progressLabel" />
                </div>
              </q-linear-progress>
            </div>
            <div class="col-auto">
              <q-btn color="grey-7" round flat icon="more_vert" class="absolute-top-right q-mt-sm">
                <q-menu cover auto-close>
                  <q-list>
                    <q-item clickable @click="toggleSort(true)" >
                      <q-item-section >Sort newest to oldest</q-item-section>
                    </q-item>
                    <q-item clickable @click="toggleSort(false)">
                      <q-item-section>Sort oldest to newest</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
            </div>
          </div>

        </div>

        <!-- list -->
        <q-card flat>
          <q-card-section>
            <q-list class="rounded-borders">

              <transition-group
                appear
                enter-active-class="animated fadeIn"
                leave-active-class="animated fadeOut">
                <q-item clickable v-ripple @click="editTest(key, t)"  v-for="(t, key) in store.testsFiltered" :key="key" >

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
                    <q-icon @click.stop="deleteTest(key)" name="delete" color="red" />
                  </q-item-section>

                  <q-item-section side>
                    <q-icon v-if="!t.isSubmitted" @click.stop="submitTest(key, t)" name="send" color="primary" />
                    <q-icon v-else name="task_alt" color="grey" />
                  </q-item-section>

                </q-item>
              </transition-group>

            </q-list>
          </q-card-section>
        </q-card>
      </div>

      <template v-if="!store.testsDownloaded && store2.loggedIn">
        <span class="absolute-center">
          <q-spinner
            color="primary"
            size="3em"
          />
        </span>
      </template>

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
        <add-results :testResult="testResult" :formMode="formMode" :resultId="resultId" @close="showAddModal = false" />
      </q-dialog>

      <!-- Submit Modal -->
      <q-dialog
        v-model="showSubmitModal"
        maximized>
        <submit-results :testResult="testResult" :resultId="resultId" @close="showSubmitModal = false" />
      </q-dialog>

      <!-- Delete Modal -->
      <q-dialog v-model="showDeleteModal">
        <delete-alert @delete="doDelete" />
      </q-dialog>

    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { date } from 'quasar'
import { useStoreResults } from 'stores/storeResults'
import { useStoreAuth } from 'stores/storeAuth'

export default defineComponent({
  name: 'IndexPage',
  setup() {
    const store = useStoreResults()
    const store2 = useStoreAuth()

    return {
      store,
      store2
    }
  },
  data() {
    return {
      showAddModal: false,
      showSubmitModal: false,
      showDeleteModal: false,
      testResult: {},
      formMode: 'add',
      resultId: 0,
      fabPos: [ 18, 18 ],
      draggingFab: false,
    }
  },
  computed: {
    pluralText() {
      if (this.totalTestResults === 1) {
        return "test result"
      }

      return "test results"
    },
    showEmptyMessage() {
      return this.totalTestResults === 0
    },
    progress() {
      let a = this.totalSubmitted
      let b = this.totalTestResults

      return a/b
    },
    progressLabel() {
      if (this.progress === 1) {
        return "Seki! All test results sent!"
      }

      let a = this.totalSubmitted
      let b = this.totalTestResults

      return a + " of " + b + " tests submitted"
    },
    progressColour() {
      if (this.progress === 1) {
        return "positive"
      }

      return "accent"
    },
    totalSubmitted() {
      return this.store.totalSubmitted
    },
    totalTestResults() {
      return this.store.totalTestResults
    }
  },
  methods: {
    toggleSort(sortDesc) {
      this.store.sortDesc = sortDesc
    },
    doDelete() {
      this.store.deleteResult(this.resultId)
      this.showDeleteModal = false
    },
    deleteTest(id) {
      this.resultId = id
      this.showDeleteModal = true
    },
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
      const someDate = date.extractDate(timeStamp, 'DD/MM/YYYY')
      return date.formatDate(someDate, 'D MMMM, YYYY')
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
    'delete-alert': require('components/TestResults/Modal/DeleteAlert.vue').default,
  }
})
</script>

