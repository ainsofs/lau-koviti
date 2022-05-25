<template>

  <q-card>
    <q-card-section class="row items-center q-pb-none">
      <div class="text-h6">Really delete?</div>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>

    <q-card-section>
      Please be sure. This cannot be undone.
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

