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
              <q-card flat bordered v-show="store2.totalTestResults">
                <q-card-section class="bg-secondary text-white">
                  <div class="text-h6">Psst...</div>
                  <div class="q-py-md">
                    Looks like you have some tests results recorded. We'll save them to your account when you {{ tab }}.
                  </div>
                </q-card-section>
              </q-card>

              <p>Login to download your test results!
              </p>

              <q-input outlined v-model="formDetails.email" label="Email address" hint="I-meli" class="col q-pr-md" :rules="[ val => val.length || 'Please enter your email.' ]" />

              <q-input outlined v-model="formDetails.password" label="Password" type="password" hint="Faalilolilo" class="col q-pr-md" :rules="[ val => val.length || 'Please enter your password.' ]" />

              <!-- TODO add forgot password -->
              <div class="text-right">
                <q-btn type="submit" @click.prevent="loginUser" flat color="primary" label="Login" class="btn-submit" />
              </div>
            </div>

          </q-tab-panel>

          <q-tab-panel name="register">
            <div class="q-gutter-md q-pb-md" >

              <q-card flat bordered v-show="store2.totalTestResults">
                <q-card-section class="bg-secondary text-white">
                  <div class="text-h6">Psst...</div>
                  <div class="q-py-md">
                    Looks like you have some tests results recorded. We'll save them to your account when you {{ tab }}.
                  </div>
                </q-card-section>
              </q-card>

              <p>Register to access your test results from any device!
              </p>
              <q-input outlined v-model="formDetails.email" label="Email address" hint="I-meli" class="col q-pr-md" :rules="[ val => val.length || 'Please enter your email.' ]" />

              <q-input outlined v-model="formDetails.password" label="Password" type="password" hint="Faalilolilo" class="col q-pr-md" :rules="[ val => val.length || 'Please enter your password.' ]" />

              <div class="text-right">
                <q-btn type="submit" @click.prevent="registerUser" flat color="primary" label="Register" class="btn-submit" />
              </div>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { useStoreAuth } from 'stores/storeAuth'
import { useStoreResults } from 'stores/storeResults'

export default defineComponent({
  name: 'AuthPage',
  setup() {
    const store = useStoreAuth()
    const store2 = useStoreResults()

    return {
      store,
      store2
    }
  },
  data() {
    return {
      tab: "login",
      formDetails: {
        email: '',
        password: '',
      }
    }
  },
  methods: {
    loginUser() {
      // TODO: check if there are any tests. warn user that tests
      //    will be sent to fb
      this.store.loginUser(this.formDetails)
    },
    registerUser() {
      // TODO: check if there are any tests. warn user that tests
      //    will be sent to fb

      // Require email verification
      this.store.registerUser(this.formDetails)
    }
  }
})
</script>
