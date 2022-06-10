<template>
  <q-page class="q-pa-md col">
    <div class="column">

      <!-- empty message -->
      <div v-if="showEmptyMessage">

        <q-card flat bordered>
          <q-card-section>
            <q-list>
              <q-item>
                <q-item-section side top>
                  <q-icon color="primary" name="medication_liquid" size="lg" />
                </q-item-section>

                <q-item-section>
                  <q-item-label>
                    <i18n-t keypath="pages.home.p1" tag="p">
                      <strong>{{ $t('pages.home.p1Bold') }}.</strong>
                    </i18n-t>

                    <i18n-t keypath="pages.home.p2" tag="p">
                      <a href="https://docs.google.com/forms/d/e/1FAIpQLSepjuDUzEza-YA0YUIr0bM8M4Jkn-tp6h1F1Cq6Zed1sBkRqQ/viewform" target="_blank"> {{ $t('label.officialForm')}}.</a>
                    </i18n-t>

                    <i18n-t keypath="pages.home.p3" tag="p" v-if="!storeAuth.loggedIn">
                      <q-btn flat dense :label="$t('label.register')" to="/user" color="primary" />
                    </i18n-t>

                    <i18n-t keypath="pages.home.p4" tag="p" @click="addTest" class="cursor-pointer">
                      <q-avatar icon="add" color="primary" class="text-white" size="xs" />
                      <strong>{{ $t('pages.home.p4GetStarted') }}</strong>
                    </i18n-t>

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
          <div class="col q-pr-md">

            <i18n-t keypath="pages.home.resultsFound" tag="p" >
              <template #count>
                <strong class="text-lowercase" >
                  {{ totalTestResults }}
                </strong>
              </template>
              <template #pluralText>
                <strong class="text-lowercase" >
                  {{ pluralText }}
                </strong>
              </template>
            </i18n-t>

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
                    <q-item-section >{{ $t('pages.home.sortDesc') }}</q-item-section>
                  </q-item>
                  <q-item clickable @click="toggleSort(false)">
                    <q-item-section>{{ $t('pages.home.sortAsc') }}</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </div>

        </div>

        <!-- list -->
        <q-card flat bordered>
          <q-card-section>
            <q-list class="rounded-borders test-result-list">

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

      <template v-if="!store.testsDownloaded && storeAuth.loggedIn">
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

      <!-- install prompt -->
      <transition
        appear
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
      >
        <q-banner v-if="showInstallBanner" inline-actions class="bg-secondary text-white absolute-bottom" dense>
          <q-avatar color="primary" size="md" class="q-mr-xs">
            <q-icon color="white" name="medication_liquid" size="xs" />
          </q-avatar>
          {{ $t('pages.home.installApp') }}

          <template v-slot:action>
            <q-btn flat :label="$t('label.yes')" dense class="q-px-sm" @click="installApp" />
            <q-btn flat :label="$t('label.later')" dense class="q-px-sm" @click="showInstallBanner = false" />
            <q-btn flat :label="$t('label.dismiss')" dense class="q-px-sm" @click="dismissAppInstall" />
          </template>
        </q-banner>
      </transition>

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
import { date,useQuasar } from 'quasar'
import { useStoreResults } from 'stores/storeResults'
import { useStoreAuth } from 'stores/storeAuth'

// This variable will save the event for later use.
let deferredPrompt

export default defineComponent({
  name: 'IndexPage',
  setup() {
    const store = useStoreResults()
    const storeAuth = useStoreAuth()
    const $q = useQuasar()

    return {
      store,
      storeAuth,
      $q
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
      showInstallBanner: false,
    }
  },
  computed: {
    pluralText() {
      if (this.totalTestResults === 1) {
        return this.$t('label.testResult')
      }

      return this.$t('label.testResultPlural')
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
        return this.$t('label.completeText')
      }

      let a = this.totalSubmitted
      let b = this.totalTestResults

      // return a + " of " + b + " tests submitted"
      return this.$t('label.progressText', {count: a, total: b})
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
    },
    installApp() {
      // deferredPrompt is a global variable we've been using in the sample to capture the `beforeinstallevent`
      deferredPrompt.prompt()
      // Find out whether the user confirmed the installation or not
      const { outcome } = deferredPrompt.userChoice
      // The deferredPrompt can only be used once.
      deferredPrompt = null
      // Act on the user's choice
      if (outcome === 'accepted') {
        this.showInstallBanner = false
      } else if (outcome === 'dismissed') {
      }
    },
    dismissAppInstall() {
      this.$q.localStorage.set("dismissAppInstall", true)
      this.showInstallBanner = false
    }
  },
  mounted() {
    const dismissAppInstall = this.$q.localStorage.getItem("dismissAppInstall")

    if (!dismissAppInstall) {
      window.addEventListener('beforeinstallprompt', (e) => {
        // Prevents the default mini-infobar or install dialog from appearing on mobile
        e.preventDefault()
        // Save the event because you'll need to trigger it later.
        deferredPrompt = e
        // Show your customized install prompt for your PWA
        setTimeout(() => {
          this.showInstallBanner = true
        }, 3000)
      })
    }
  },
  created() {
    // i18n for pinia
    this.store.t = this.$t
    this.storeAuth.t = this.$t
  },
  components: {
    'add-results': require('components/TestResults/Modal/AddTestResult.vue').default,
    'submit-results': require('components/TestResults/Modal/SubmitTestResult.vue').default,
    'delete-alert': require('components/TestResults/Modal/DeleteAlert.vue').default,
  }
})
</script>

<style lang="scss" scoped>
.test-result-list {
  .q-item {
    padding: .4rem 0
  }
}
</style>
