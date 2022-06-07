<template>
  <q-page class="q-pa-md col">
    <div class="text-weight-medium q-pb-md">{{ $t('pages.help.name') }}</div>

    <p>{{ $t('pages.help.p1') }}.</p>

    <p>{{ $t('pages.help.p2') }}.</p>

    <i18n-t keypath="pages.help.p3" tag="p">
      <a target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSepjuDUzEza-YA0YUIr0bM8M4Jkn-tp6h1F1Cq6Zed1sBkRqQ/viewform">{{ $t('label.officialForm') }}.</a>
    </i18n-t>

  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HelpPage',
})
</script>
