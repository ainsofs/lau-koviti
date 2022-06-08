<template>

  <q-card>
    <q-card-section class="row items-center q-pb-none">
      <div class="text-h6">{{ $t('modals.delete.name') }}</div>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>

    <q-card-section>
      {{ $t('modals.delete.p1') }}
    </q-card-section>

    <q-card-actions align="right">
      <q-btn flat :label="$t('label.cancel')" v-close-popup />
      <q-btn @click="confirmDelete" flat :label="$t('label.delete')" color="red" />
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

