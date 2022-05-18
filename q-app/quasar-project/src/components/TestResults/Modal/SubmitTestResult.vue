<template>
  <q-card>
    <q-card-section class="row items-center">
      <div class="text-h6">Submit Test Result</div>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>

    <form @submit.prevent="submitForm">
      <q-card-section class="q-pt-none">

      <div class="q-gutter-md" >
        <q-input outlined v-model="personal.firstName" label="First name" hint="Igoa Muamua" />

        <q-input outlined v-model="personal.lastName" label="Last name" hint="Fa'ai'u" />

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
          Itaiga:
          <q-option-group
            :options="gender_opt"
            type="radio"
            v-model="personal.gender"
          />
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
          Do you have any underlying conditions?
          <div class="q-pa-md">
            <q-option-group
              :options="condition_opt"
              type="checkbox"
              v-model="personal.conditions"
            />
          </div>
        </div>

        <q-input outlined v-model="personal.phone" label="Phone number" hint="Numera telefogi" />

        <q-input outlined v-model="personal.email" label="Email" hint="Imeli" />

      </div>

      </q-card-section>

      <q-card-actions align="right">
        <q-btn rounded icon="send" type="submit" color="primary" label="Submit" class="q-mb-md" />
        <q-btn rounded icon="schedule" class="bg-secondary q-mb-xl" label="Submit Later" />
        <q-btn rounded icon="check" color="green" class="bg-secondary q-mb-md" label="Mark Submitted" />
      </q-card-actions>

    </form>
  </q-card>
</template>

<script>

import { defineComponent } from 'vue'
import { date } from 'quasar'
import { useStoreResults } from 'stores/storeResults'

export default defineComponent({
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
      test: {
        date: '',
        result: 'p',
        isSubmitted: false,
      },
    }
  },
  methods: {
    submitForm() {
      this.store.updatePersonal(this.personal)
    }
  }
})
</script>
