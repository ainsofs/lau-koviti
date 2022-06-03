<template>
  <form @submit.prevent="submitForm">
    <div class="q-gutter-md">
      <q-input
        ref="email"
        outlined
        lazy-rules
        v-model="formDetails.email"
        label="Email address"
        hint="I-meli"
        class="col q-pr-md"
        :rules="[ val => (val.length >= 6 && isValidEmailAddress(val)) || 'Please enter a valid email.']"
        type="email" />

      <q-input
        ref="password"
        outlined
        lazy-rules
        v-model="formDetails.password"
        label="Password"
        type="password"
        hint="Faalilolilo"
        class="col q-pr-md"
        :rules="[ val => val.length >= 6 || 'Please enter a password.']"
        />

      <!-- TODO add forgot password -->
      <div class="text-right">
        <q-btn type="submit" flat color="primary" :label="tab" class="btn-submit" />
      </div>
    </div>
  </form>
</template>


<script>
import { defineComponent } from 'vue'
import { useStoreAuth } from 'stores/storeAuth'

export default defineComponent({
  name: 'AuthPage',
  props: ['tab'],
  setup() {
    const store = useStoreAuth()

    return {
      store
    }
  },
  data() {
    return {
      formDetails: {
        email: '',
        password: '',
      }
    }
  },
  methods: {
    isValidEmailAddress(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(String(email).toLowerCase())
    },
    submitForm() {
      this.$refs.email.validate()
      this.$refs.password.validate()

      if (!this.$refs.email.hasError && !this.$refs.password.hasError) {
        if (this.tab === 'login') {
          this.store.loginUser(this.formDetails)
        }
        else {
          this.store.registerUser(this.formDetails)
        }
      }
    }
  }
})
</script>
