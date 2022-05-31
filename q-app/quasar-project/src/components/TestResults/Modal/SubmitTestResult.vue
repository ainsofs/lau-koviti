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

const villageOptions = [
  { label: "Aai o Fiti", value: "Aai o Fiti" },
  { label: "Aai o Niue", value: "Aai o Niue" },
  { label: "Aele Fou", value: "Aele Fou" },
  { label: "Afega", value: "Afega" },
  { label: "Afia", value: "Afia" },
  { label: "Afiamalu East", value: "Afiamalu East" },
  { label: "Afiamalu West", value: "Afiamalu West" },
  { label: "Alafou", value: "Alafou" },
  { label: "Alafua", value: "Alafua" },
  { label: "Alamagoto", value: "Alamagoto" },
  { label: "Alamutu", value: "Alamutu" },
  { label: "Aleisa East", value: "Aleisa East" },
  { label: "Aleisa West", value: "Aleisa West" },
  { label: "Amaile", value: "Amaile" },
  { label: "Aopo", value: "Aopo" },
  { label: "Apai", value: "Apai" },
  { label: "Apia", value: "Apia" },
  { label: "Apolima Fou", value: "Apolima Fou" },
  { label: "Apolima Island", value: "Apolima Island" },
  { label: "Asaga", value: "Asaga" },
  { label: "Auala", value: "Auala" },
  { label: "Aufaga", value: "Aufaga" },
  { label: "Avao", value: "Avao" },
  { label: "Avata", value: "Avata" },
  { label: "Avele", value: "Avele" },
  { label: "Choose", value: "Choose" },
  { label: "Elise Fou", value: "Elise Fou" },
  { label: "Eva", value: "Eva" },
  { label: "Eveeve", value: "Eveeve" },
  { label: "Faala", value: "Faala" },
  { label: "Faatoialemanu", value: "Faatoialemanu" },
  { label: "Faga", value: "Faga" },
  { label: "Fagaee", value: "Fagaee" },
  { label: "Fagafau", value: "Fagafau" },
  { label: "Fagalii", value: "Fagalii" },
  { label: "Fagamalo", value: "Fagamalo" },
  { label: "Fagasa", value: "Fagasa" },
  { label: "Faiaai", value: "Faiaai" },
  { label: "Falealupo", value: "Falealupo" },
  { label: "Faleapuna", value: "Faleapuna" },
  { label: "Faleaseela", value: "Faleaseela" },
  { label: "Faleasiu", value: "Faleasiu" },
  { label: "Faleatiu", value: "Faleatiu" },
  { label: "Falefa", value: "Falefa" },
  { label: "Falefia", value: "Falefia" },
  { label: "Falelauniu", value: "Falelauniu" },
  { label: "Falelima", value: "Falelima" },
  { label: "Faleolo", value: "Faleolo" },
  { label: "Falepuna", value: "Falepuna" },
  { label: "Faletagaloa", value: "Faletagaloa" },
  { label: "Faleu", value: "Faleu" },
  { label: "Faleula", value: "Faleula" },
  { label: "Falevai", value: "Falevai" },
  { label: "Falevao", value: "Falevao" },
  { label: "Fasitoo Tai", value: "Fasitoo Tai" },
  { label: "Fasitoo Uta", value: "Fasitoo Uta" },
  { label: "Fataloa", value: "Fataloa" },
  { label: "Fatausi", value: "Fatausi" },
  { label: "Fatitu", value: "Fatitu" },
  { label: "Fatuvalu", value: "Fatuvalu" },
  { label: "Fausaga", value: "Fausaga" },
  { label: "Foailalo", value: "Foailalo" },
  { label: "Foailuga", value: "Foailuga" },
  { label: "Fogapoa", value: "Fogapoa" },
  { label: "Fogasavaii", value: "Fogasavaii" },
  { label: "Fogatuli", value: "Fogatuli" },
  { label: "Foua", value: "Foua" },
  { label: "Fuailoloo", value: "Fuailoloo" },
  { label: "Fugalei", value: "Fugalei" },
  { label: "Fuifatu", value: "Fuifatu" },
  { label: "Fusi Anoamaa", value: "Fusi Anoamaa" },
  { label: "Fusi Faasaleleaga", value: "Fusi Faasaleleaga" },
  { label: "Fusi Safata", value: "Fusi Safata" },
  { label: "Gagaifolevao", value: "Gagaifolevao" },
  { label: "Gataivai", value: "Gataivai" },
  { label: "Gautavai", value: "Gautavai" },
  { label: "Lalomalava", value: "Lalomalava" },
  { label: "Lalomanu", value: "Lalomanu" },
  { label: "Lalomauga", value: "Lalomauga" },
  { label: "Lalovaea East", value: "Lalovaea East" },
  { label: "Lalovaea West", value: "Lalovaea West" },
  { label: "Lalovi", value: "Lalovi" },
  { label: "Lano", value: "Lano" },
  { label: "Laulii", value: "Laulii" },
  { label: "Leagiagi", value: "Leagiagi" },
  { label: "Lealatele", value: "Lealatele" },
  { label: "Leaupuni", value: "Leaupuni" },
  { label: "Leauvaa", value: "Leauvaa" },
  { label: "Lefagaoalii", value: "Lefagaoalii" },
  { label: "Leififi", value: "Leififi" },
  { label: "Lelata", value: "Lelata" },
  { label: "Lelepa", value: "Lelepa" },
  { label: "Leone", value: "Leone" },
  { label: "Lepa", value: "Lepa" },
  { label: "Lepale", value: "Lepale" },
  { label: "Lepea", value: "Lepea" },
  { label: "Lepuiai", value: "Lepuiai" },
  { label: "Letava", value: "Letava" },
  { label: "Letogo", value: "Letogo" },
  { label: "Letui", value: "Letui" },
  { label: "Leufisa", value: "Leufisa" },
  { label: "Leulumoega", value: "Leulumoega" },
  { label: "Leusoalii", value: "Leusoalii" },
  { label: "Levi Falelatai", value: "Levi Falelatai" },
  { label: "Levi Saleimoa", value: "Levi Saleimoa" },
  { label: "Levili", value: "Levili" },
  { label: "Lona", value: "Lona" },
  { label: "Lotofaga", value: "Lotofaga" },
  { label: "LotofagA", value: "LotofagA" },
  { label: "Lotopa", value: "Lotopa" },
  { label: "Lotopue", value: "Lotopue" },
  { label: "Lotosoa", value: "Lotosoa" },
  { label: "Luatuanuu", value: "Luatuanuu" },
  { label: "Lufilufi", value: "Lufilufi" },
  { label: "Luua", value: "Luua" },
  { label: "Maasina", value: "Maasina" },
  { label: "Magiagi Tai", value: "Magiagi Tai" },
  { label: "Magiagi Uta", value: "Magiagi Uta" },
  { label: "Malae", value: "Malae" },
  { label: "Malaela", value: "Malaela" },
  { label: "Malaemalu", value: "Malaemalu" },
  { label: "Malie", value: "Malie" },
  { label: "Malifa", value: "Malifa" },
  { label: "Malololelei", value: "Malololelei" },
  { label: "Malua", value: "Malua" },
  { label: "Maluafou", value: "Maluafou" },
  { label: "Manase", value: "Manase" },
  { label: "Maninoa", value: "Maninoa" },
  { label: "Manono Tai", value: "Manono Tai" },
  { label: "Manono Uta", value: "Manono Uta" },
  { label: "Manunu", value: "Manunu" },
  { label: "Maota Faasaleleaga", value: "Maota Faasaleleaga" },
  { label: "Matafaa", value: "Matafaa" },
  { label: "Matafele", value: "Matafele" },
  { label: "Matanofo", value: "Matanofo" },
  { label: "Matatufu", value: "Matatufu" },
  { label: "Matautu Falealili", value: "Matautu Falealili" },
  { label: "Matautu Falelatai", value: "Matautu Falelatai" },
  { label: "Matautu Lefaga", value: "Matautu Lefaga" },
  { label: "Matautu Tai", value: "Matautu Tai" },
  { label: "Matautu Uta", value: "Matautu Uta" },
  { label: "Matavai (Asau)", value: "Matavai (Asau)" },
  { label: "Matavai", value: "Matavai" },
  { label: "Mauga", value: "Mauga" },
  { label: "Moamoa Fou", value: "Moamoa Fou" },
  { label: "Moamoa", value: "Moamoa" },
  { label: "Moasula", value: "Moasula" },
  { label: "Moataa Uta", value: "Moataa Uta" },
  { label: "Moataa", value: "Moataa" },
  { label: "Motootua", value: "Motootua" },
  { label: "Mulifanua", value: "Mulifanua" },
  { label: "Mulinuu", value: "Mulinuu" },
  { label: "Mulivai Safata", value: "Mulivai Safata" },
  { label: "Mulivai", value: "Mulivai" },
  { label: "Musumusu", value: "Musumusu" },
  { label: "Mutiatele", value: "Mutiatele" },
  { label: "Nafanua", value: "Nafanua" },
  { label: "Nefunefu", value: "Nefunefu" },
  { label: "Neiafu Tai", value: "Neiafu Tai" },
  { label: "Neiafu Uta", value: "Neiafu Uta" },
  { label: "Nofoalii", value: "Nofoalii" },
  { label: "Nonoa", value: "Nonoa" },
  { label: "Nuu", value: "Nuu" },
  { label: "Nuusuatia", value: "Nuusuatia" },
  { label: "Paepaeala", value: "Paepaeala" },
  { label: "Paia", value: "Paia" },
  { label: "Palisi", value: "Palisi" },
  { label: "Papa Puleia", value: "Papa Puleia" },
  { label: "Papa Uta", value: "Papa Uta" },
  { label: "Papaloloa", value: "Papaloloa" },
  { label: "Papauta", value: "Papauta" },
  { label: "Pata", value: "Pata" },
  { label: "Patamea", value: "Patamea" },
  { label: "Pesega", value: "Pesega" },
  { label: "Pitonuu", value: "Pitonuu" },
  { label: "Piu", value: "Piu" },
  { label: "Poutasi", value: "Poutasi" },
  { label: "Puapua", value: "Puapua" },
  { label: "Puipaa", value: "Puipaa" },
  { label: "Puleia", value: "Puleia" },
  { label: "Saaga", value: "Saaga" },
  { label: "Saanapu Tai", value: "Saanapu Tai" },
  { label: "Saanapu Uta", value: "Saanapu Uta" },
  { label: "Saasaai", value: "Saasaai" },
  { label: "Safaatoa", value: "Safaatoa" },
  { label: "Safai", value: "Safai" },
  { label: "Safotu", value: "Safotu" },
  { label: "Safua", value: "Safua" },
  { label: "Safune", value: "Safune" },
  { label: "Sagone", value: "Sagone" },
  { label: "Saina", value: "Saina" },
  { label: "Saipipi", value: "Saipipi" },
  { label: "Salailua", value: "Salailua" },
  { label: "Salamumu Tai", value: "Salamumu Tai" },
  { label: "Salamumu Uta", value: "Salamumu Uta" },
  { label: "Salani", value: "Salani" },
  { label: "Saleaaumua", value: "Saleaaumua" },
  { label: "Saleapaga", value: "Saleapaga" },
  { label: "Saleaula", value: "Saleaula" },
  { label: "Saleia", value: "Saleia" },
  { label: "Saleilua", value: "Saleilua" },
  { label: "Saleimoa", value: "Saleimoa" },
  { label: "Salelavalu Tai", value: "Salelavalu Tai" },
  { label: "Salelavalu Uta", value: "Salelavalu Uta" },
  { label: "Salelesi", value: "Salelesi" },
  { label: "Salelologa", value: "Salelologa" },
  { label: "Salepouae", value: "Salepouae" },
  { label: "Salesatele", value: "Salesatele" },
  { label: "Saletagaloa", value: "Saletagaloa" },
  { label: "Saletele", value: "Saletele" },
  { label: "Saleufi", value: "Saleufi" },
  { label: "Salimu Faasaleleaga", value: "Salimu Faasaleleaga" },
  { label: "Salimu i Vaa o Fonoti", value: "Salimu i Vaa o Fonoti" },
  { label: "Salua", value: "Salua" },
  { label: "Samai", value: "Samai" },
  { label: "Samalaeulu", value: "Samalaeulu" },
  { label: "Samamea", value: "Samamea" },
  { label: "Samata Tai", value: "Samata Tai" },
  { label: "Samata Uta", value: "Samata Uta" },
  { label: "Samatau", value: "Samatau" },
  { label: "Samauga", value: "Samauga" },
  { label: "Samea", value: "Samea" },
  { label: "Samusu", value: "Samusu" },
  { label: "Saoluafata", value: "Saoluafata" },
  { label: "Sapapalii", value: "Sapapalii" },
  { label: "Sapini", value: "Sapini" },
  { label: "Sapoe", value: "Sapoe" },
  { label: "Sapulu", value: "Sapulu" },
  { label: "Sapunaoa", value: "Sapunaoa" },
  { label: "Sasina", value: "Sasina" },
  { label: "Satalafai", value: "Satalafai" },
  { label: "Satalo", value: "Satalo" },
  { label: "Sataoa Tai", value: "Sataoa Tai" },
  { label: "Sataoa Uta", value: "Sataoa Uta" },
  { label: "Satapuala", value: "Satapuala" },
  { label: "Sataua", value: "Sataua" },
  { label: "Satitoa", value: "Satitoa" },
  { label: "Satoalepai", value: "Satoalepai" },
  { label: "Satoi", value: "Satoi" },
  { label: "Satufia", value: "Satufia" },
  { label: "Satuiatua", value: "Satuiatua" },
  { label: "Satuilagi", value: "Satuilagi" },
  { label: "Satuimalufilufi", value: "Satuimalufilufi" },
  { label: "Sauano", value: "Sauano" },
  { label: "Sauniatu", value: "Sauniatu" },
  { label: "Savaia", value: "Savaia" },
  { label: "Savalalo", value: "Savalalo" },
  { label: "Seesee", value: "Seesee" },
  { label: "Sili", value: "Sili" },
  { label: "Sinamoga", value: "Sinamoga" },
  { label: "Siufaga Faasaleleaga", value: "Siufaga Faasaleleaga" },
  { label: "Siufaga Falelatai", value: "Siufaga Falelatai" },
  { label: "Siumu Uta", value: "Siumu Uta" },
  { label: "Siumu", value: "Siumu" },
  { label: "Siuniu", value: "Siuniu" },
  { label: "Siupapa", value: "Siupapa" },
  { label: "Siusega", value: "Siusega" },
  { label: "Siutu", value: "Siutu" },
  { label: "Sogi", value: "Sogi" },
  { label: "Solaua", value: "Solaua" },
  { label: "Solosolo", value: "Solosolo" },
  { label: "Taelefaga", value: "Taelefaga" },
  { label: "Tafagamanu", value: "Tafagamanu" },
  { label: "Tafaigata", value: "Tafaigata" },
  { label: "Tafatafa", value: "Tafatafa" },
  { label: "Tafitoala", value: "Tafitoala" },
  { label: "Tafua", value: "Tafua" },
  { label: "Taga", value: "Taga" },
  { label: "Talimatau", value: "Talimatau" },
  { label: "Tanoaleia", value: "Tanoaleia" },
  { label: "Tanugamanono", value: "Tanugamanono" },
  { label: "Tanumalala", value: "Tanumalala" },
  { label: "Tanumaleko", value: "Tanumaleko" },
  { label: "Tanumapua", value: "Tanumapua" },
  { label: "Tapatapao", value: "Tapatapao" },
  { label: "Tapueleele", value: "Tapueleele" },
  { label: "Tauese", value: "Tauese" },
  { label: "Taufusi", value: "Taufusi" },
  { label: "Tausagi", value: "Tausagi" },
  { label: "Tiapapata", value: "Tiapapata" },
  { label: "Tiavea", value: "Tiavea" },
  { label: "Tiavi", value: "Tiavi" },
  { label: "Tino I Iva", value: "Tino I Iva" },
  { label: "Toamua", value: "Toamua" },
  { label: "Togafuafua", value: "Togafuafua" },
  { label: "Togitogiga", value: "Togitogiga" },
  { label: "Toomatagi", value: "Toomatagi" },
  { label: "Tuaefu", value: "Tuaefu" },
  { label: "Tuanai", value: "Tuanai" },
  { label: "Tuanaimato East", value: "Tuanaimato East" },
  { label: "Tuanaimato West", value: "Tuanaimato West" },
  { label: "Tuasivi", value: "Tuasivi" },
  { label: "Tufuiopa", value: "Tufuiopa" },
  { label: "Tufulele", value: "Tufulele" },
  { label: "Tufutafoe", value: "Tufutafoe" },
  { label: "Tulaele", value: "Tulaele" },
  { label: "Tuloto", value: "Tuloto" },
  { label: "Uafato", value: "Uafato" },
  { label: "Ululoloa", value: "Ululoloa" },
  { label: "Ulutogia", value: "Ulutogia" },
  { label: "Utualii", value: "Utualii" },
  { label: "Utufaalalafa", value: "Utufaalalafa" },
  { label: "Utulaelae", value: "Utulaelae" },
  { label: "Utuloa", value: "Utuloa" },
  { label: "Vaega", value: "Vaega" },
  { label: "Vaiaata", value: "Vaiaata" },
  { label: "Vaiafai", value: "Vaiafai" },
  { label: "Vaiala Tai", value: "Vaiala Tai" },
  { label: "Vaiala Uta", value: "Vaiala Uta" },
  { label: "Vaiala", value: "Vaiala" },
  { label: "Vaiee", value: "Vaiee" },
  { label: "Vaifou", value: "Vaifou" },
  { label: "Vaigaga", value: "Vaigaga" },
  { label: "Vaigalu", value: "Vaigalu" },
  { label: "Vailele Tai", value: "Vailele Tai" },
  { label: "Vailele Uta", value: "Vailele Uta" },
  { label: "Vailima", value: "Vailima" },
  { label: "Vailoa Aleipata", value: "Vailoa Aleipata" },
  { label: "Vailoa Faleata", value: "Vailoa Faleata" },
  { label: "Vailoa Palauli", value: "Vailoa Palauli" },
  { label: "Vailoa Savaii", value: "Vailoa Savaii" },
  { label: "Vailuutai", value: "Vailuutai" },
  { label: "Vaimaga", value: "Vaimaga" },
  { label: "Vaimea", value: "Vaimea" },
  { label: "Vaimoso", value: "Vaimoso" },
  { label: "Vaiola", value: "Vaiola" },
  { label: "Vaipouli", value: "Vaipouli" },
  { label: "Vaipua", value: "Vaipua" },
  { label: "Vaipuna", value: "Vaipuna" },
  { label: "Vaisala", value: "Vaisala" },
  { label: "Vaisaulu", value: "Vaisaulu" },
  { label: "Vaisigano", value: "Vaisigano" },
  { label: "Vaitele Fou", value: "Vaitele Fou" },
  { label: "Vaitele Tai", value: "Vaitele Tai" },
  { label: "Vaitele Uta", value: "Vaitele Uta" },
  { label: "Vaitoloa", value: "Vaitoloa" },
  { label: "Vaitoomuli", value: "Vaitoomuli" },
  { label: "Vaiusu", value: "Vaiusu" },
  { label: "Vaivase Tai", value: "Vaivase Tai" },
  { label: "Vaivase Uta", value: "Vaivase Uta" },
  { label: "Vaoala", value: "Vaoala" },
  { label: "Vaotupua", value: "Vaotupua" },
  { label: "Vaovai", value: "Vaovai" },
  { label: "Vavau", value: "Vavau" },
  { label: "Vinifou", value: "Vinifou" },

]

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
      gender_opt: [
        { label: "Male/ Ali'i", value: "Male/ Ali'i" },
        { label: "Female/ Tama'ita'i", value: "Female/ Tama'ita'i" },
      ],
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
      let options = [
        { label: "Diabetes / Ma'i Suka", value: "Diabetes / Ma'i Suka" },
        { label: "Hypertension / Toto Maualuga", value: "Hypertension / Toto Maualuga" },
        { label: "Cardiac disease / Ma'i Fatu", value: "Cardiac disease / Ma'i Fatu" },
        { label: "Chronic lung disease Ma'i o le Māmā", value: "Chronic lung disease Ma'i o le Māmā" },
        { label: "Cerebrovascular disease / Gasegase punitia o alatoto", value: "Cerebrovascular disease / Gasegase punitia o alatoto" },
        { label: "Dementia / Valevale matua", value: "Dementia / Valevale matua" },
        { label: "Mental disorders / A'afiaga o le mafaufau", value: "Mental disorders / A'afiaga o le mafaufau" },
        { label: "Chronic kidney disease / Aafiaga o fatu ga'o", value: "Chronic kidney disease / Aafiaga o fatu ga'o" },
        { label: "Immunosuppression / Vaivai malosiaga faalenatura", value: "Immunosuppression / Vaivai malosiaga faalenatura" },
        { label: "HIV / HIV", value: "HIV / HIV" },
        { label: "Obesity / Tino puta", value: "Obesity / Tino puta" },
        { label: "Cancer / Kanesa", value: "Cancer / Kanesa" },
      ]
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
