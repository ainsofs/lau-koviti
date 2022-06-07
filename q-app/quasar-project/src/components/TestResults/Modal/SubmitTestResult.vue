<template>
  <q-card >
    <q-card-section class="row items-center">
      <div class="text-h6">{{ $t('modals.submitTest.name') }}</div>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>

    <form @submit.prevent="submitForm">

      <q-card-section class="q-pt-none">
        <p v-if="isPersonalEmpty">{{ $t('modals.submitTest.p1') }}.</p>
        <p v-else>{{ $t('modals.submitTest.p2') }}.</p>

        <q-list bordered>
          <q-expansion-item
            :default-opened="isPersonalEmpty"
            icon="person"
            :label="$t('label.personalDetails')"
            header-class="text-primary">
            <q-separator />
            <q-card>
              <q-card-section>

                <div class="q-gutter-md q-pb-md" >
                  <div class="row">

                      <q-input ref="firstName" autofocus outlined v-model="personal.firstName" label="First name" hint="Igoa Muamua" class="col q-pr-md" :rules="[ val => val.length || 'Please enter your name.' ]" />

                      <q-input ref="lastName" outlined v-model="personal.lastName" label="Last name" hint="Fa'ai'u" class="col" :rules="[ val => val.length || 'Please enter your name.' ]" />
                  </div>

                  <q-input outlined v-model="personal.vaccinationId" label="Vaccination ID (Patient ID in Tamanu system)" hint="Numera o le pepa tui" placeholder="e.g. ABCD654321" />

                  <q-input
                    outlined
                    v-model="personal.dob"
                    mask="##/##/####"
                    label="Date of Birth"
                    hint="Aso Fanau">
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                          <q-date
                            v-model="personal.dob"
                            mask="DD/MM/YYYY"
                            :options="optionsFn"
                            :navigation-min-year-month="navMin"
                            :navigation-max-year-month="navMax"
                            >
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
                      emit-value
                    />
                    <span class="q-field__bottom">Ituaiga</span>
                  </div>

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
                    emit-value
                    @filter="filterFn"
                  >
                    <template v-slot:no-option>
                      <q-item>
                        <q-item-section class="text-grey">
                          No results
                        </q-item-section>
                      </q-item>
                    </template>
                  </q-select>

                  <div class="q-pa-sm rounded-borders">
                    <span class="text-grey">Do you have any underlying conditions?</span>
                    <div class="q-pa-md">
                      <q-option-group
                        :options="sortedConditions"
                        type="checkbox"
                        v-model="personal.conditions"
                        emit-value
                      />
                    </div>
                    <span class="q-field__bottom">O e a’afia i fa’amai o lo’o taua i lalo?</span>
                  </div>

                  <q-input outlined v-model="personal.phone" label="Phone number" hint="Numera telefogi" />

                  <q-input
                    outlined
                    v-model="personal.email"
                    type="email"
                    label="Email"
                    hint="Imeli" />

                </div>
              </q-card-section>
            </q-card>
          </q-expansion-item>

          <q-separator />

          <q-expansion-item
            :default-opened="!isPersonalEmpty"
            icon="medication_liquid"
            :label="$t('label.testResult')"
            header-class="text-primary">
            <q-separator />
            <q-card>
              <q-card-section>
                <div class="row">
                  <div class="col-5">{{ $t('label.date') }}:</div>
                  <div class="col">{{ formatDate(test.date) }}</div>
                </div>
                <div class="row">
                  <div class="col-5">{{ $t('label.testResult') }}:</div>
                  <div class="col">{{ test.result }}</div>
                </div>
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </q-list>
      </q-card-section>

      <q-card-actions align="right">
      <!--
        <q-btn @click="markSubmitted" flat color="grey-9" label="Mark Submitted" v-close-popup />
        <q-btn @click="submitLater" flat color="grey-9" label="Submit Later" v-close-popup />
        -->
        <q-btn type="submit" :loading="loading" flat color="primary" :label="$t('label.send')" class="btn-submit" />
      </q-card-actions>

    </form>
  </q-card>
</template>

<script>

import { defineComponent } from 'vue'
import { date } from 'quasar'
import { useStoreResults } from 'stores/storeResults'
import { useStoreAuth } from 'stores/storeAuth'
import { useStoreSettings } from 'stores/storeSettings'
import { villageOptions, conditionOptions, genderOptions } from 'src/options/personalOptions'

export default defineComponent({
  props: ['testResult', 'resultId'],
  setup() {
    const store = useStoreResults()
    const storeAuth = useStoreAuth()
    const storeSettings = useStoreSettings()

    return {
      store,
      storeAuth,
      storeSettings
    }
  },
  data() {
    return {
      gender_opt: genderOptions,
      village_opt: villageOptions,
      personal: {
        firstName: this.store.personal.firstName,
        lastName: this.store.personal.lastName,
        vaccinationId: this.store.personal.vaccinationId,
        dob: this.store.personal.dob,
        gender: this.store.personal.gender,
        village: this.store.personal.village,
        conditions: this.store.personal.conditions || [],
        phone: this.store.personal.phone,
        email: this.store.personal.email || this.storeAuth.email,
      },
      test: {},
      loading: false,
    }
  },
  methods: {
    submitForm() {
      this.$refs.firstName.validate()
      this.$refs.lastName.validate()

      if (!this.$refs.firstName.hasError &&
          !this.$refs.lastName.hasError) {

        this.loading = true
        // validation passed
        this.store.updatePersonal(this.personal)

        // Post results to Google Form. Using a proxy to prevent CORS error
        let endpoint = '/api'

        const isDev = this.storeSettings.settings.isDevMode
        let googleForm = endpoint
        let mapping = {}

        if (isDev) {
          // dev form
          googleForm += '/forms/u/0/d/e/1FAIpQLSc41GKKitf_6kXal5n4xIeSM_w0Czw2GX7-i8bIR0CJYLNG6A/formResponse'

          mapping = {
            tests: {
              date: 'entry.1915046253',
              result: 'entry.699482213',
              isSubmitted: '',
              dateSubmitted: '',
              personal: {
                firstName: 'entry.1278994752',
                lastName: 'entry.1285649044',
                vaccinationId: 'entry.992834568',
                dob: 'entry.556991948',
                gender: 'entry.1224698774',
                village: 'entry.682058042',
                conditions: 'entry.389107404',
                phone: 'entry.1810101260',
                email: 'entry.1016446264',
              }
            }
          }
        }
        else {
          // live form
          googleForm += '/forms/u/0/d/e/1FAIpQLSepjuDUzEza-YA0YUIr0bM8M4Jkn-tp6h1F1Cq6Zed1sBkRqQ/formResponse'

          mapping = {
            tests: {
              date: 'entry.1283207881',
              result: 'entry.1395453298',
              isSubmitted: '',
              dateSubmitted: '',
              personal: {
                firstName: 	'entry.590404003',
                lastName: 'entry.1886925018',
                vaccinationId: 'entry.1454131097',
                dob: 'entry.1984486821',
                gender: 'entry.1660490641',
                village: 'entry.359444209',
                conditions: 'entry.41058729',
                phone: 'entry.1560344217',
                email: 'entry.101602910',
              }
            }
          }

        }

        let requestOptions = {
          method: 'POST',
        }

        let params = ''
        let personalKeys = Object.keys(this.personal)

        let personMap = mapping['tests']['personal']

        personalKeys.forEach((key) => {
          if(personMap[key] && this.personal[key]) {
            if (key === 'conditions') {
              this.personal[key].forEach((condition) => {
                params += personMap[key] + '=' + condition + '&'
              })
            }
            else if (key === 'dob') {
              let someDate = date.extractDate(this.personal[key], 'DD/MM/YYYY')
              params += personMap[key] + '=' + date.formatDate(someDate, 'YYYY-MM-DD') + '&'
            }
            else {
              params += personMap[key] + '=' + this.personal[key] + '&'
            }
          }
        })

        let testKeys = ['date', 'result']
        let testMap = mapping['tests']
        testKeys.forEach((key) => {
          if(testMap[key] && this.test[key]) {
            if (key === 'date') {
              let someDate = date.extractDate(this.test[key], 'DD/MM/YYYY')
              params += testMap[key] + '=' + date.formatDate(someDate, 'YYYY-MM-DD') + '&'
            }
            else {
              params += testMap[key] + '=' + this.test[key] + '&'
            }
          }
        })

        if (params) {
          params = params.substring(0,params.length-1)
        }

        fetch(googleForm + '?' + params, requestOptions)
          .then(async response => {
            if (response.ok) {
              // form sent!
              this.test.isSubmitted = true
              this.test.dateSubmitted = date.formatDate(Date.now(), 'YYYY/MM/DD')
              this.test.personal = Object.assign({}, this.personal)
              this.test.profileId = this.store.profileId

              this.store.updateResult(this.resultId, this.test)

              const quotes = [
                "You rock!",
                "Seki a oe!",
                "Faafetai lava",
                "Malo!",
                "Best a oe!",
              ]
              let randomNumber = Math.floor(Math.random() * quotes.length)

              this.$q.notify({
                message: quotes[randomNumber],
                icon: 'send',
              })

              this.$emit('close')
            }
            else {
              this.loading = false
              // form error
              console.log(response, 'error')
              this.$q.notify({
                message: 'Somethings wrong, please contact the developer.',
                icon: 'warning',
                color: 'warning',
              })
            }
          })
          .catch(error => {
            this.loading = false

            console.log('error')
            console.log(error)
          })
      }
      else {
        this.loading = false

        this.$q.notify({
          message: 'Please check your form and re-submit',
          icon: 'warning',
          color: 'warning',
        })
      }
    },
    submitLater() {
      // TODO - implement in UI
      this.store.updatePersonal(this.personal)
    },
    markSubmitted() {
      // TODO - implement in UI
      this.store.updatePersonal(this.personal)
      this.test.isSubmitted = true
      this.store.updateResult(this.resultId, this.test)
    },
    formatDate(timeStamp) {
      const someDate = date.extractDate(timeStamp, 'DD/MM/YYYY')
      return date.formatDate(someDate, 'D MMMM, YYYY')
    },
    filterFn (val, update) {
      if (val === '') {
        update(() => {
          this.village_opt = villageOptions
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        this.village_opt = villageOptions.filter(v => v.label.toLowerCase().indexOf(needle) > -1)
      })
    },
    optionsFn (date1) {
      let newDate = date.subtractFromDate(Date.now(), { years: 200 })
      return date1 >= date.formatDate(newDate, 'YYYY/MM/DD') && date1 <= date.formatDate(Date.now(), 'YYYY/MM/DD')
    },
  },
  computed: {
    isPersonalEmpty() {
      let personal = this.store.personal
      let firstName = personal.firstName
      let lastName = personal.lastName
      return firstName === '' && lastName === ''
    },
    navMin() {
      let newDate = date.subtractFromDate(Date.now(), { years: 200 })
      return date.formatDate(newDate, 'YYYY/MM')
    },
    navMax() {
      return date.formatDate(Date.now(), 'YYYY/MM')
    },
    sortedConditions() {
      let options = conditionOptions

      options.sort((a, b) => {
        let optAProp = a.label.toLowerCase(),
            optBProp = b.label.toLowerCase()

        if (optAProp > optBProp) return 1
        else if (optAProp < optBProp) return -1
        else return 0
      })

      return options
    },
  },
  created() {
    Object.assign(this.test, this.testResult)
  },
  // emits: ['close'],
})
</script>
