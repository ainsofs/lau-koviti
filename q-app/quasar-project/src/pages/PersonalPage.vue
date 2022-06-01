<template>
  <q-page class="q-pa-md col">
    <div class="text-weight-medium q-pb-md">Profile</div>
      <div class="q-pb-md">Update your profile details. They will be submitted with your test results.</div>
      <form  @submit.prevent="submitForm">
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
          <q-card-actions align="right">
          <!--
            <q-btn @click="markSubmitted" flat color="primary" label="Mark Submitted" v-close-popup />
            <q-btn @click="submitLater" flat color="primary" label="Submit Later" v-close-popup />
            -->
            <q-btn type="submit" flat color="primary" label="Save" class="btn-submit" />
          </q-card-actions>
        </q-card>
      </form>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { date } from 'quasar'
import { useStoreResults } from 'stores/storeResults'
import { useStoreAuth } from 'stores/storeAuth'
import { villageOptions, conditionOptions, genderOptions } from 'src/options/personalOptions'

export default defineComponent({
  name: 'PersonalPage',
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
        conditions: this.store.personal.conditions,
        phone: this.store.personal.phone,
        email: this.store.personal.email || this.storeAuth.email,
      },
    }
  },
  computed: {

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
  methods: {
    submitForm() {
      this.$refs.firstName.validate()
      this.$refs.lastName.validate()

      if (!this.$refs.firstName.hasError &&
          !this.$refs.lastName.hasError) {
        // validation passed
        this.store.updatePersonal(this.personal)
        this.$q.notify({ message: "Updated", icon: "announcement" })
      }
      else {

        this.$q.notify({
          message: 'Please check your form and re-submit',
          icon: 'warning',
          color: 'warning',
        })
      }

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

  }
})
</script>
