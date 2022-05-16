<template>
  <q-page class="flex flex-center">
    <div class="container mt-3 col-lg-5">
      <div class="alert alert-info text-muted small">
        <i class="fa fa-info-circle"></i>
        This form demonstrates Bootstrap 4 clientside validation. It is for research on a COVID-19 test collection app.
        It does not submit your data anywhere.
        Click submit to see the form in action.
      </div>
      <h2 class="mb-3 h4">COVID-19 Rapid Test Self-Reporting Form</h2>

      <!-- Form -->
      <form class="needs-validation bg-light rounded p-3 mb-3 " novalidate>
        <h5>Personal Details</h5>
        <fieldset>
          <div class="row mb-3">
            <div class="form-group col-sm">
              <q-input v-model="text" label="Igoa Muamua" placeholder="First name" >
                <template v-slot:prepend>
                  <q-icon name="fa fa-address-book" />
                </template>
              </q-input>
            </div>
            <div class="form-group col-sm">
              <q-input v-model="text" label="Fa'ai'u" placeholder="Last name" >
                <template v-slot:prepend>
                  <q-icon name="fa fa-address-book" />
                </template>
              </q-input>
            </div>
          </div>
          <div class="form-group mb-3">
            <q-input v-model="text" label="Numera o le pepa tui" placeholder="Vaccination ID (Patient ID in Tamanu system)" hint="Faataitaiga - ABCD654321 / Example - ABCD654321" >
              <template v-slot:prepend>
                <q-icon name="fa fa-medkit" />
              </template>
            </q-input>
          </div>
          <div class="form-group mb-3">
            <q-input v-model="date" type="date" placeholder="Date of Birth" hint="Aso Fanau/ Type your DOB or click on the icon to select using the calendar feature">
              <template v-slot:prepend>
                <q-icon name="fa fa-calendar" />
              </template>
            </q-input>
          </div>
          <div class="form-group mb-3">
            <label>Ituaiga/ Gender</label>
            <q-radio v-model="gender" val="m" label="Male/ Ali'i" />
            <q-radio v-model="gender" val="f" label="Female/ Tama'ita'i" />
          </div>
          <div class="form-group mb-3">
            <label for="select">Nuu / Afioaga</label>
            <div>
              <select id="select" name="select" aria-describedby="selectHelpBlock" class="custom-select">
                <option value="rabbit">Rabbit</option>
                <option value="duck">Duck</option>
                <option value="fish">Fish</option>
              </select>
              <span id="selectHelpBlock" class="form-text text-muted small">Village</span>
            </div>
          </div>
          <div class="form-group mb-3">
            <label>O e a’afia i fa’amai o lo’o taua i lalo?</label>
            <div class="d-flex flex-column">
              <div class="custom-control custom-checkbox custom-control-inline">
                <input name="checkbox" id="checkbox_0" type="checkbox" class="custom-control-input" value="1" aria-describedby="checkboxHelpBlock">
                <label for="checkbox_0" class="custom-control-label">Diabetes / Ma'i Suka</label>
              </div>
              <div class="custom-control custom-checkbox custom-control-inline">
                <input name="checkbox" id="checkbox_1" type="checkbox" class="custom-control-input" value="2" aria-describedby="checkboxHelpBlock">
                <label for="checkbox_1" class="custom-control-label">Hypertension / Toto Maualuga</label>
              </div>
              <div class="custom-control custom-checkbox custom-control-inline">
                <input name="checkbox" id="checkbox_2" type="checkbox" class="custom-control-input" value="3" aria-describedby="checkboxHelpBlock">
                <label for="checkbox_2" class="custom-control-label">Cardiac disease / Ma'i Fatu</label>
              </div>
              <div class="custom-control custom-checkbox custom-control-inline">
                <input name="checkbox" id="checkbox_3" type="checkbox" aria-describedby="checkboxHelpBlock" class="custom-control-input" value="4">
                <label for="checkbox_3" class="custom-control-label">Chronic lung disease Ma'i o le Māmā</label>
              </div>
              <div class="custom-control custom-checkbox custom-control-inline">
                <input name="checkbox" id="checkbox_4" type="checkbox" aria-describedby="checkboxHelpBlock" class="custom-control-input" value="5">
                <label for="checkbox_4" class="custom-control-label">Cerebrovascular disease / Gasegase punitia o alatoto</label>
              </div>
              <div class="custom-control custom-checkbox custom-control-inline">
                <input name="checkbox" id="checkbox_5" type="checkbox" aria-describedby="checkboxHelpBlock" class="custom-control-input" value="6">
                <label for="checkbox_5" class="custom-control-label">Dementia / Valevale matua</label>
              </div>
              <div class="custom-control custom-checkbox custom-control-inline">
                <input name="checkbox" id="checkbox_6" type="checkbox" aria-describedby="checkboxHelpBlock" class="custom-control-input" value="7">
                <label for="checkbox_6" class="custom-control-label">Mental disorders / A'afiaga o le mafaufau</label>
              </div>
              <div class="custom-control custom-checkbox custom-control-inline">
                <input name="checkbox" id="checkbox_7" type="checkbox" aria-describedby="checkboxHelpBlock" class="custom-control-input" value="8">
                <label for="checkbox_7" class="custom-control-label">Chronic kidney disease / Aafiaga o fatu ga'o</label>
              </div>
              <div class="custom-control custom-checkbox custom-control-inline">
                <input name="checkbox" id="checkbox_8" type="checkbox" aria-describedby="checkboxHelpBlock" class="custom-control-input" value="9">
                <label for="checkbox_8" class="custom-control-label">Immunosuppression / Vaivai malosiaga faalenatura</label>
              </div>
              <div class="custom-control custom-checkbox custom-control-inline">
                <input name="checkbox" id="checkbox_9" type="checkbox" aria-describedby="checkboxHelpBlock" class="custom-control-input" value="10">
                <label for="checkbox_9" class="custom-control-label">HIV / HIV</label>
              </div>
              <div class="custom-control custom-checkbox custom-control-inline">
                <input name="checkbox" id="checkbox_10" type="checkbox" aria-describedby="checkboxHelpBlock" class="custom-control-input" value="11">
                <label for="checkbox_10" class="custom-control-label">Obesity / Tino puta</label>
              </div>
              <div class="custom-control custom-checkbox custom-control-inline">
                <input name="checkbox" id="checkbox_11" type="checkbox" aria-describedby="checkboxHelpBlock" class="custom-control-input" value="12">
                <label for="checkbox_11" class="custom-control-label">Cancer / Kanesa</label>
              </div>
              <span id="checkboxHelpBlock" class="form-text text-muted small">Do you have any underlying conditions?</span>
            </div>
          </div>
          <div class="form-group mb-3">
            <label for="text4">Numera telefogi</label>
            <div class="input-group">
              <div class="input-group-prepend">
                <div class="input-group-text">
                  <i class="fa fa-phone"></i>
                </div>
              </div>
              <input id="text4" name="text4" placeholder="Phone number" type="text" class="form-control">
            </div>
          </div>
          <div class="form-group mb-3">
            <label for="text5">Imeli</label>
            <div class="input-group">
              <div class="input-group-prepend">
                <div class="input-group-text">
                  <i class="fa fa-at"></i>
                </div>
              </div>
              <input id="text5" name="text5" placeholder="Email address" type="email" class="form-control">
            </div>
          </div>
        </fieldset>
        <h5 class="mt-3">Test Results</h5>
        <fieldset>
          <div class="form-group mb-3">
            <label for="text6">Aso sa fa’atinoina ai le su’esu’ega</label>
            <div class="input-group">
              <div class="input-group-prepend">
                <div class="input-group-text">
                  <i class="fa fa-calendar"></i>
                </div>
              </div>
              <input id="text6" name="text6" placeholder="Date of Test" type="date" class="form-control" aria-describedby="text6HelpBlock" required>
              <div class="invalid-feedback">
                Please provide a date.
              </div>
            </div>
            <span id="text6HelpBlock" class="form-text text-muted small">Type the date of the test or click on the icon to select using the calendar feature</span>
          </div>
          <div class="form-group mb-3">
            <label>Faaiuga ole suesuega</label>
            <div class="d-flex flex-column">
              <div class="custom-control custom-radio custom-control-inline">
                <input name="radio1" id="radio1_0" type="radio" class="custom-control-input" value="1" aria-describedby="radio1HelpBlock" required>
                <label for="radio1_0" class="custom-control-label">Positive / Ua aafia</label>
              </div>
              <div class="custom-control custom-radio custom-control-inline">
                <input name="radio1" id="radio1_1" type="radio" class="custom-control-input" value="2" aria-describedby="radio1HelpBlock">
                <label for="radio1_1" class="custom-control-label">Negative / E lei aafia</label>
              </div>
              <div class="custom-control custom-radio custom-control-inline">
                <input name="radio1" id="radio1_2" type="radio" class="custom-control-input" value="3" aria-describedby="radio1HelpBlock">
                <label for="radio1_2" class="custom-control-label">Inconclusive / Le mautinoa</label>
              </div>
              <span id="radio1HelpBlock" class="form-text text-muted small">Test result</span>
            </div>
          </div>

          <!-- Buttons -->
          <div class="form-group text-right">
            <button name="submit" type="submit" class="btn btn-primary rounded-pill col-sm-3 col-md-2 shadow">Submit</button>
          </div>
        </fieldset>
      </form>

    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexPage',
  data: () => ({
    gender_list: ['Male', 'Female', ''],
    fname: '',
    lname: '',
    v_card: '',
    gender: 'm',
  })
})
</script>
