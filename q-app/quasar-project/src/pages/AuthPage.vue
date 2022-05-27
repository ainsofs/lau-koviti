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
              <q-input outlined label="Email address" hint="I-meli" class="col q-pr-md" :rules="[ val => val.length || 'Please enter your email.' ]" />

              <q-input outlined label="Password" type="password" hint="Faalilolilo" class="col q-pr-md" :rules="[ val => val.length || 'Please enter your password.' ]" />

              <!-- TODO add forgot password -->
              <div class="text-right">
                <q-btn type="submit" flat color="primary" label="Login" class="btn-submit" />
              </div>
            </div>

          </q-tab-panel>

          <q-tab-panel name="register">
            <div class="q-gutter-md q-pb-md" >

              <p>Register to access your test results from any device!
              </p>
              <q-input outlined label="Email address" hint="I-meli" class="col q-pr-md" :rules="[ val => val.length || 'Please enter your email.' ]" />

              <q-input outlined label="Password" type="password" hint="Faalilolilo" class="col q-pr-md" :rules="[ val => val.length || 'Please enter your password.' ]" />

              <div class="text-right">
                <q-btn type="submit" flat color="primary" label="Register" class="btn-submit" />
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
import { useStoreSettings } from 'stores/storeSettings'

export default defineComponent({
  name: 'SettingsPage',
  setup() {
    const store = useStoreSettings()

    return {
      store
    }
  },
  data() {
    return {
      tab: "login"
    }
  }
})
</script>
