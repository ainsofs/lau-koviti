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
          <q-expansion-item
            :default-opened="isPersonalEmpty"
            icon="person"
            label="Personal details"
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
            label="Test result"
            header-class="text-primary">
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
        <q-btn type="submit" flat color="primary" label="Send" class="btn-submit" />
      </q-card-actions>

    </form>
  </q-card>
</template>

<script>

import { defineComponent } from 'vue'
import { date } from 'quasar'
import { useStoreResults } from 'stores/storeResults'
import { useStoreAuth } from 'stores/storeAuth'
import { villageOptions, conditionOptions, genderOptions } from 'src/options/personalOptions'

export default defineComponent({
  props: ['testResult', 'resultId'],
  setup() {
    const store = useStoreResults()
    const storeAuth = useStoreAuth()

    return {
      store,
      storeAuth
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
    }
  },
  methods: {
    submitForm() {
      this.$refs.firstName.validate()
      this.$refs.lastName.validate()

      if (!this.$refs.firstName.hasError &&
          !this.$refs.lastName.hasError) {
        // validation passed
        this.store.updatePersonal(this.personal)

        // Post results to Google Form. Using a proxy to prevent CORS error
        let endpoint = '/api'

        let googleForm = endpoint + '/forms/u/0/d/e/1FAIpQLSc41GKKitf_6kXal5n4xIeSM_w0Czw2GX7-i8bIR0CJYLNG6A/formResponse'
        // forms/d/e/1FAIpQLSc41GKKitf_6kXal5n4xIeSM_w0Czw2GX7-i8bIR0CJYLNG6A/
        let requestOptions = {
          method: 'POST',
        }

        let mapping = {
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

              this.store.updateResult(this.resultId, this.test)

              this.$q.notify({
                message: 'Sent!',
                icon: 'send',
              })

              this.$emit('close')
            }
            else {
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
            console.log('error')
            console.log(error)
          })
      }
      else {
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
