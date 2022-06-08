<template>
  <q-page class="q-pa-md col">
    <div class="text-weight-medium q-pb-md">{{ $t('pages.settings.name') }}</div>
    <q-card flat bordered>
      <q-card-section>

        <q-list >
          <q-item tag="label" v-ripple>
            <q-item-section>
              <q-item-label>{{ $t('pages.settings.p1') }}</q-item-label>
              <q-item-label caption>{{ $t('pages.settings.p1Caption') }}.</q-item-label>
            </q-item-section>
            <q-item-section side top>
              <q-toggle v-model="isDarkMode" />
            </q-item-section>
          </q-item>
          <q-item tag="label" v-ripple>
            <q-item-section>
              <q-item-label>{{ $t('pages.settings.p2') }}</q-item-label>
              <q-item-label caption>{{ $t('pages.settings.p2Caption') }}.</q-item-label>
            </q-item-section>
            <q-item-section side top>
              <q-toggle v-model="isDevMode" />
            </q-item-section>
          </q-item>

        </q-list>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { useQuasar } from 'quasar'
import { useStoreSettings } from 'stores/storeSettings'

export default defineComponent({
  name: 'SettingsPage',
  setup() {
    const store = useStoreSettings()
    const $q = useQuasar()

    return {
      store
    }
  },
  data() {
    return {
      isDarkMode: this.$q.dark.isActive,
      warnDuplicate: this.store.settings.warnDuplicate,
      showTooltips: this.store.settings.showTooltips,
      isDevMode: this.store.settings.isDevMode,
    }
  },
  watch: {
    isDarkMode(newVal, oldVal) {
      this.$q.dark.set(newVal)
    },
    isDevMode(newVal, oldVal) {
      this.store.settings.isDevMode = newVal
    }
  }
})
</script>
