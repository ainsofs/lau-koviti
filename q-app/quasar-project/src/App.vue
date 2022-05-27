<template>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue'
import { useStoreAuth } from 'stores/storeAuth'

export default defineComponent({
  name: 'App',
  setup() {
    const store = useStoreAuth()

    return {
      store
    }
  },
  mounted() {
    this.store.handleAuthStateChange()
  }
})
</script>
