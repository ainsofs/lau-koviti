<template>
  <q-page class="q-pa-md absolute full-width full-height column">
    <q-list bordered padding>
      <q-item-label header>Settings</q-item-label>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Dark Mode</q-item-label>
        </q-item-section>
        <q-item-section side >
          <q-toggle color="blue" v-model="isDarkMode" val="battery" />
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Demo Mode</q-item-label>
        </q-item-section>
        <q-item-section side top>
          <q-toggle v-model="isDemoMode" val="friend" />
        </q-item-section>
      </q-item>

    </q-list>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SettingsPage',
  data() {
    return {
      isDarkMode: false,
      isDemoMode: true,
    }
  }
})
</script>
