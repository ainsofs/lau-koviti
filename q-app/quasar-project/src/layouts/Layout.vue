<template>
  <q-layout view="hHh lpR fFf">
    <q-header>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-space />
        <!-- guest -->
        <q-btn v-if="!store.loggedIn" dense flat no-wrap to="user">
          <q-avatar size="26px">
            <q-icon name="account_circle" size="md" />
          </q-avatar>
        </q-btn>

        <!-- authenticated -->
        <q-btn v-else dense flat no-wrap>
          <q-avatar size="26px" color="white" text-color="dark">
            {{ alias }}
          </q-avatar>
          <q-icon name="arrow_drop_down" size="16px" />

          <q-menu auto-close>
            <q-list dense> <!-- TODO add profiles
              <q-item clickable class="GL__menu-link">
                <q-item-section>Profile 1</q-item-section>
              </q-item>
              <q-item clickable class="GL__menu-link">
                <q-item-section>Profile 2</q-item-section>
              </q-item>
              <q-item clickable class="GL__menu-link">
                <q-item-section>Manage Profiles</q-item-section>
              </q-item>
              <q-separator /> -->
              <q-item clickable class="GL__menu-link" @click="logoutUser" >
                <q-item-section>Sign out</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>

      <div class="q-pa-md">
        <q-item to="/" class="text-white">
          <q-item-section>
            <div class="text-h4">La'u Koviti</div>
            <div class="text-subtitle1">{{ todaysDate }}</div>
          </q-item-section>
        </q-item>
      </div>

      <q-img src="statics/beach.jpg" class="absolute-top header-image" />

    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      :width="220"
    >
      <q-list>
        <q-item-label
          header
        >
          Navigation
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import { date } from 'quasar'
import { useStoreAuth } from 'stores/storeAuth'
import { useStoreResults } from 'stores/storeResults'

const linksList = [
  {
    title: 'Home',
    icon: 'home',
    link: '/'
  },
  // {
  //   title: 'Personal Details',
  //   icon: 'person',
  //   link: '/personal'
  // },
  {
    title: 'Settings',
    icon: 'settings',
    link: '/settings'
  },
  {
    title: 'Help',
    icon: 'help',
    link: '/help'
  },
]

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(false)
    const store = useStoreAuth()
    const storeResults = useStoreResults()

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      store,
      storeResults,
    }
  },

  methods: {
    logoutUser() {
      this.store.logoutUser()
    }
  },

  computed: {
    todaysDate() {
      return date.formatDate(Date.now(), 'dddd D MMMM, YYYY')
    },
    alias() {
      if (this.storeResults.personal.firstName.length)
        return this.storeResults.personal.firstName.substring(0,2)

      return "?"
    }
  }
})
</script>

<style lang="scss">
.header-image {
  height: 100%;
  z-index: -1;
  opacity: 0.2;
  filter: grayscale(100%)

}
</style>
