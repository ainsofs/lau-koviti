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
        hint="Fa'alilolilo"
        class="col q-pr-md"
        :rules="[ val => val.length >= 6 || 'Please enter a password.']"
        />

      <div v-if="isRegister">
        <q-input
          ref="password2"
          outlined
          lazy-rules
          v-model="password2"
          label="Re-enter Password"
          type="password"
          hint="Toe tusi le fa'alilolilo"
          class="col q-pr-md"
          :rules="[ val => val.length >= 6 || 'Please enter a password.']"
          />
      </div>

      <!-- TODO add forgot password -->
      <div class="text-right">
        <q-btn flat color="secondary" label="Forgot password" class="btn-submit" @click="forgotPassword" />
        <q-btn type="submit" flat color="primary" :label="tabName" class="btn-submit" />
      </div>
    </div>
  </form>
</template>


<script>
import { defineComponent } from 'vue'
import { useStoreAuth } from 'stores/storeAuth'

export default defineComponent({
  name: 'AuthPage',
  props: ['tab', 'email'],
  setup() {
    const store = useStoreAuth()

    return {
      store
    }
  },
  data() {
    return {
      formDetails: {
        email: this.email,
        password: '',
      },
      password2: '',
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
  methods: {
    isValidEmailAddress(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(String(email).toLowerCase())
    },
    forgotPassword() {
      this.$refs.password.resetValidation()
      this.$refs.email.validate()

      if (!this.$refs.email.hasError) {
        const email = this.formDetails.email
        this.store.forgotPassword(email)
      }
    },
    submitForm() {
      this.$refs.email.validate()
      this.$refs.password.validate()
      if (this.isRegister) {
        this.$refs.password2.validate()
      }

      if (!this.$refs.email.hasError && !this.$refs.password.hasError) {
        if (!this.isRegister) {
          this.store.loginUser(this.formDetails)
        }
        else {
          // check that passwords match
          if (this.$refs.email.hasError) {
            return
          }
          if (this.password2 === this.formDetails.password) {
            this.store.registerUser(this.formDetails)
          }
          else {
            this.$q.notify({
              message: this.$t('modals.loginRegister.e1'),
              icon: 'warning',
              color: 'warning',
            })
          }
        }
      }
    },
  }
})
</script>
