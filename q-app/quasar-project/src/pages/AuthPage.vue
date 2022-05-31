<template>
  <q-page class="q-pa-md col">
    <div class="q-gutter-y-md" style="max-width: 600px">
      <q-card>
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="accent"
          align="justify"
          narrow-indicator
        >
          <q-tab name="login" label="Login" />
          <q-tab name="register" label="Register" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="login">
            <div class="q-gutter-md q-pb-md" >
              <q-card flat bordered v-show="store.totalTestResults">
                <q-card-section class="bg-secondary text-white">
                  <div class="text-h6">Psst...</div>
                  <div class="q-py-md">
                    Looks like you have some tests results recorded. We'll save them to your account when you {{ tab }}.
                  </div>
                </q-card-section>
              </q-card>

              <div class="q-pb-md">Login to download your test results!
              </div>

              <login-register tab="login" />
            </div>

          </q-tab-panel>

          <q-tab-panel name="register">
            <div class="q-gutter-md q-pb-md" >

              <q-card flat bordered v-show="store.totalTestResults">
                <q-card-section class="bg-secondary text-white">
                  <div class="text-h6">Psst...</div>
                  <div class="q-py-md">
                    Looks like you have some tests results recorded. We'll save them to your account when you {{ tab }}.
                  </div>
                </q-card-section>
              </q-card>

              <div class="q-pb-md">Register to access your test results from any device!
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
      tab: "login"
    }
  },
  components: {
    'login-register': require('components/Auth/LoginRegister.vue').default,
  }
})
</script>
