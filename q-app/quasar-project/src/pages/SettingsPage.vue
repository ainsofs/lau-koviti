<template>
  <q-page class="q-pa-md col">
    <q-list bordered padding>
      <q-item-label header>Settings</q-item-label>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Dev Mode</q-item-label>
          <q-item-label caption>Submit tests to a Demo form.</q-item-label>
        </q-item-section>
        <q-item-section side top>
          <q-toggle v-model="isDevMode" val="friend" />
        </q-item-section>
      </q-item>

    </q-list>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { useStoreSettings } from 'stores/storeSettings'

export default defineComponent({
  name: 'SettingsPage',
  setup() {
    const store = useStoreSettings()

    return {
      store
    }
  },
  data() {
    return {
      isDarkMode: this.store.settings.isDarkMode,
      warnDuplicate: this.store.settings.warnDuplicate,
      showTooltips: this.store.settings.showTooltips,
      isDevMode: this.store.settings.isDevMode,
    }
  }
})
</script>
