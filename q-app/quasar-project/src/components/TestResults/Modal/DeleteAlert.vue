<template>
  <q-card>
    <q-card-section class="row items-center">
      <q-icon name="warning" color="red" text-color="white" />
      <span class="q-ml-sm">Really delete?</span>
    </q-card-section>

    <q-card-actions align="right">
      <q-btn flat label="Cancel" color="primary" v-close-popup />
      <q-btn @click="confirmDelete" flat label="Delete" color="red" />
    </q-card-actions>
  </q-card>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DeleteAlert',
  emits: ['delete'],
  methods: {
    confirmDelete() {
      this.$emit('delete')
    }
  }

})
</script>

