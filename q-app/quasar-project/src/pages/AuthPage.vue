<template>
  <q-page class="q-pa-md col">
    <div class="q-gutter-y-md" style="max-width: 600px">
      <q-card flat bordered>
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="accent"
          align="justify"
          narrow-indicator
        >
          <q-tab name="login" :label="$t('label.login')" />
          <q-tab name="register" :label="$t('label.register')"/>
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="login">
            <div class="q-gutter-md q-pb-md" >
              <q-card flat bordered v-show="store.totalTestResults">
                <q-card-section class="bg-secondary text-white">
                  <div class="text-h6">{{ $t('pages.user.p3Heading') }}</div>
                  <div class="q-py-md">
                    {{ $t('pages.user.p3', {tab: tabName.toLowerCase() }) }}.
                  </div>
                </q-card-section>
              </q-card>

              <div class="q-pb-md">{{ $t('pages.user.p1') }}
              </div>

              <login-register tab="login" :email="email" />
            </div>

          </q-tab-panel>

          <q-tab-panel name="register">
            <div class="q-gutter-md q-pb-md" >

              <q-card flat bordered v-show="store.totalTestResults">
                <q-card-section class="bg-secondary text-white">
                  <div class="text-h6">{{ $t('pages.user.p3Heading') }}</div>
                  <div class="q-py-md">
                    {{ $t('pages.user.p3', {tab: tabName.toLowerCase() }) }}.
                  </div>
                </q-card-section>
              </q-card>

              <div class="q-pb-md">{{ $t('pages.user.p2') }}
              </div>

              <login-register tab="register" />
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { useStoreResults } from 'stores/storeResults'

export default defineComponent({
  name: 'AuthPage',
  setup() {
    const store = useStoreResults()

    return {
      store
    }
  },
  data() {
    return {
      tab: "login",
      email: "",
    }
  },
  computed: {
    tabName() {
      if (this.isRegister) {
        return this.$t('label.register')
      }
      return this.$t('label.login')
    },
    isRegister() {
      return this.tab === 'register'
    },
  },
  components: {
    'login-register': require('components/Auth/LoginRegister.vue').default,
  },
  created() {
    this.email = this.$route.query.email || ""
  }
})
</script>
