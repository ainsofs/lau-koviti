<template>
  <q-page class="q-pa-md absolute full-width full-height column">
    <template class="column">
      <h4 class="q-pb-md q-ma-none">Submit test result</h4>

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
            @filter="filterFn"
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

      </div>

      <q-btn @click="saveTest" rounded icon="send" color="primary" label="Submit" class="q-mb-md" />
      <q-btn @click="saveTest" rounded icon="schedule" class="bg-secondary q-mb-xl" label="Submit Later" />
      <q-btn @click="saveTest" rounded icon="check" color="green" class="bg-secondary q-mb-md" label="Mark Submitted" />

    </template>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexPage',
  data() {
    return {
      gender_opt: [
        { label: "Male/ Ali'i", value: 'p' },
        { label: "Female/ Tama'ita'i", value: 'n' },
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
        firstName: '',
        lastName: '',
        vaccinationId: '',
        dob: '',
        gender: '',
        village: '',
        conditions: [],
        phone: '',
        email: '',
      },
      test: {
        date: '',
        result: 'p',
        isSubmitted: false,
      },
    }
  },
  methods: {
    saveTest() {
      alert('saved')
      this.$router.push('/')
    },
    // filterFn (val, update, abort) {
    //   update(() => {
    //     const needle = val.toLowerCase()
    //     village_opt.value = stringOptions.filter(v => v.toLowerCase().indexOf(needle) > -1)
    //   })
    // }
  }
})
</script>
