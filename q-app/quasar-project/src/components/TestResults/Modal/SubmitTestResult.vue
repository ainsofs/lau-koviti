<template>
  <q-card >
    <q-card-section class="row items-center">
      <div class="text-h6">Send test result</div>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>

    <form @submit.prevent="submitForm">

      <q-card-section class="q-pt-none">
        <p v-if="isPersonalEmpty">Fill in the details below and press send to send your reuslts to
            Samoa MOH.</p>
        <p v-else>Review your details and press send to send your reuslts to
            Samoa MOH.</p>

        <q-list bordered>
          <q-expansion-item :default-opened="isPersonalEmpty" icon="person" label="Personal details" >
            <q-separator />
            <q-card>
              <q-card-section>

                <div class="q-gutter-md q-pb-md" >
                  <div class="row">

                      <q-input ref="firstName" autofocus outlined v-model="personal.firstName" label="First name" hint="Igoa Muamua" class="col q-pr-md" :rules="[ val => val.length || 'Please enter your name.' ]" />

                      <q-input ref="lastName" outlined v-model="personal.lastName" label="Last name" hint="Fa'ai'u" class="col" :rules="[ val => val.length || 'Please enter your name.' ]" />
                  </div>

                  <q-input outlined v-model="personal.vaccinationId" label="Vaccination ID (Patient ID in Tamanu system)" hint="Numera o le pepa tui" placeholder="e.g. ABCD654321" />

                  <q-input outlined v-model="personal.dob" mask="date" :rules="['date']" label="Date of Birth" hint="Aso Fanau" >
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                          <q-date v-model="personal.dob">
                            <div class="row items-center justify-end">
                              <q-btn v-close-popup label="Close" color="primary" flat />
                            </div>
                          </q-date>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>

                  <div class="q-pa-sm rounded-borders">
                    <span class="text-grey">Gender</span>
                    <q-option-group
                      :options="gender_opt"
                      type="radio"
                      v-model="personal.gender"
                    />
                    <span class="q-field__bottom">Ituaiga</span>
                  </div>

                  <div>
                    <q-select
                      outlined
                      v-model="personal.village"
                      use-input
                      hide-selected
                      fill-input
                      input-debounce="0"
                      :options="village_opt"
                      hint="Nuu / Afioaga"
                      label="Village"
                    >
                      <template v-slot:no-option>
                        <q-item>
                          <q-item-section class="text-grey">
                            No results
                          </q-item-section>
                        </q-item>
                      </template>
                    </q-select>
                  </div>

                  <div class="q-pa-sm rounded-borders">
                    <span class="text-grey">Do you have any underlying conditions?</span>
                    <div class="q-pa-md">
                      <q-option-group
                        :options="condition_opt"
                        type="checkbox"
                        v-model="personal.conditions"
                      />
                    </div>
                    <span class="q-field__bottom">O e a’afia i fa’amai o lo’o taua i lalo?</span>
                  </div>

                  <q-input outlined v-model="personal.phone" label="Phone number" hint="Numera telefogi" />

                  <q-input outlined v-model="personal.email" type="email" label="Email" hint="Imeli" />

                </div>
              </q-card-section>
            </q-card>
          </q-expansion-item>

          <q-separator />

          <q-expansion-item :default-opened="!isPersonalEmpty" icon="medication_liquid" label="Test result" >
            <q-separator />
            <q-card>
              <q-card-section>
                <div class="row">
                  <div class="col-5">Date:</div>
                  <div class="col">{{ formatDate(test.date) }}</div>
                </div>
                <div class="row">
                  <div class="col-5">Test Result:</div>
                  <div class="col">{{ test.result }}</div>
                </div>
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </q-list>
      </q-card-section>

      <q-card-actions align="right">
      <!--
        <q-btn @click="markSubmitted" flat color="primary" label="Mark Submitted" v-close-popup />
        <q-btn @click="submitLater" flat color="primary" label="Submit Later" v-close-popup />
        -->
        <q-btn type="submit" flat dense color="primary" label="Send" class="btn-submit" />
      </q-card-actions>

    </form>
  </q-card>
</template>

<script>

import { defineComponent } from 'vue'
import { date } from 'quasar'
import { useStoreResults } from 'stores/storeResults'

export default defineComponent({
  props: ['testResult', 'resultId'],
  setup() {
    const store = useStoreResults()

    return {
      store
    }
  },
  data() {
    return {
      gender_opt: [
        { label: "Male/ Ali'i", value: 'm' },
        { label: "Female/ Tama'ita'i", value: 'f' },
      ],
      village_opt: [
        { label: 'Siusega', value: '1' },
        { label: 'Moamoa', value: '2' },
        { label: 'Apia', value: '3' },
      ],
      condition_opt: [
        { label: "Diabetes / Ma'i Suka", value: 'p' },
        { label: "Hypertension / Toto Maualuga", value: 'n' },
        { label: "Cardiac disease / Ma'i Fatu", value: 'i' },
      ],
      personal: {
        firstName: this.store.personal.firstName,
        lastName: this.store.personal.lastName,
        vaccinationId: this.store.personal.vaccinationId,
        dob: this.store.personal.dob,
        gender: this.store.personal.gender,
        village: this.store.personal.village,
        conditions: [],
        phone: this.store.personal.phone,
        email: this.store.personal.email,
      },
      test: {},
    }
  },
  methods: {
    submitForm() {
      this.$refs.firstName.validate()
      this.$refs.lastName.validate()
      if (!this.$refs.firstName.hasError &&
          !this.$refs.lastName.hasError) {
        // no error
        this.store.updatePersonal(this.personal)
        this.test.isSubmitted = true
        this.test.dateSubmitted = date.formatDate(Date.now(), 'YYYY/MM/DD')

        Object.assign(this.test.personal, this.personal)
        this.store.updateResult(this.resultId, this.test)

        // TODO - post results to Google Form
        console.log('TODO submit to MOH now....')

        fetch('')




        this.$emit('close')

        let alert = {
          message: 'Sent! Not really...',
          icon: 'send',
        }
        this.$q.notify(alert)
      }
      else {
        let alert = {
          message: 'Please check your form and re-submit',
          icon: 'warning',
          color: 'amber-10',
        }
        this.$q.notify(alert)
      }
    },
    submitLater() {
      this.store.updatePersonal(this.personal)
    },
    markSubmitted() {
      this.store.updatePersonal(this.personal)
      this.test.isSubmitted = true
      this.store.updateResult(this.resultId, this.test)
    },
    formatDate(timeStamp) {
      return date.formatDate(timeStamp, 'D MMMM')
    }
  },
  computed: {
    isPersonalEmpty() {
      let personal = this.store.personal
      let firstName = personal.firstName
      let lastName = personal.lastName
      return firstName === '' && lastName === ''
    }
  },
  created() {
    Object.assign(this.test, this.testResult)
  },
  // emits: ['close'],
})
</script>
