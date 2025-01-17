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
        <q-select
          v-model="locale"
          :options="localeOptions"
          dense
          borderless
          emit-value
          map-options
          options-dense
          class="lang-select"
        />
        <!-- guest -->
        <q-btn v-if="!store.loggedIn" dense flat no-wrap to="user">
          <q-avatar size="26px">
            <q-icon name="account_circle" size="md" />
          </q-avatar>
        </q-btn>

        <!-- authenticated -->
        <q-btn v-else dense flat no-wrap>
          <q-avatar size="26px" color="accent" text-color="dark">
            {{ alias }}
            <!-- unverified status -->
            <q-badge v-if="!store.isVerified" floating color="warning" rounded />
            <q-tooltip v-if="!store.isVerified">
              Verify your account to access your tests from any device.
            </q-tooltip>
            <!-- verified status -->
            <q-badge v-if="store.isVerified" floating color="positive" rounded />
          </q-avatar>
          <q-icon name="arrow_drop_down" size="16px" />

          <q-menu auto-close>
            <q-list dense>
              <q-item clickable class="GL__menu-link" v-for="(p, key) in storeResults.profiles" :key="key" @click="setProfile(key)">
                <q-item-section side>
                  <q-avatar size="26px" color="secondary" text-color="white">
                    {{ p.firstName.substring(0,2).toUpperCase() }}
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  {{ p.firstName }}
                </q-item-section>
              </q-item>
              <q-item clickable class="GL__menu-link" to="/manage">
                <q-item-section>{{ $t('pages.manageProfiles.name') }}</q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable class="GL__menu-link" @click="logoutUser" >
                <q-item-section>{{ $t('label.signOut') }}</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>

      <div>
        <q-item to="/" class="text-white">
          <q-item-section>
            <div class="text-h4">La'u Kōviti</div>
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
      :width="180"
    >
      <q-list class="q-pt-md">

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

    <q-footer class="bg-primary text-white lt-sm">
      <q-tabs active-color="accent">
        <q-route-tab to="/personal" icon="person" />
        <q-route-tab to="/" icon="home" />
        <q-route-tab to="/settings" icon="settings" />
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script>
import { defineComponent, ref, watch } from 'vue'
import { useQuasar, date, LocalStorage } from 'quasar'
import { useI18n } from 'vue-i18n'
import { useStoreAuth } from 'stores/storeAuth'
import { useStoreResults } from 'stores/storeResults'
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  {
    title: 'Home',
    icon: 'home',
    link: '/',
    key: 'home',
  },
  {
    title: 'Profile',
    icon: 'person',
    link: '/personal',
    key: 'profile',
  },
  {
    title: 'Settings',
    icon: 'settings',
    link: '/settings',
    key: 'settings',
  },
  {
    title: 'Help',
    icon: 'help',
    link: '/help',
    key: 'help',
  },
]

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const $q = useQuasar()
    const { locale } = useI18n({ useScope: 'global' })
    const leftDrawerOpen = ref(false)
    const store = useStoreAuth()
    const storeResults = useStoreResults()

    watch(locale, val => {
      // dynamically set the lang pack
      LocalStorage.set("language", val)

      import(
        'quasar/lang/' + val
        ).then(lang => {
          $q.lang.set(lang.default)
        })
    })

    return {
      // essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      store,
      storeResults,
      locale,
      localeOptions: [
        { value: 'en-US', label: 'English' },
        { value: 'sm', label: 'Fa\'asāmoa' }
      ],
    }
  },

  methods: {
    logoutUser() {
      this.store.logoutUser()
    },
    setProfile(id) {
      this.storeResults.setProfileId(id)
      this.$router.push("/")
    }
  },

  computed: {
    essentialLinks() {

      linksList.forEach((link) => {
        link.title = this.$t('pages.' + link.key + '.name')
      })

      return linksList
    },
    todaysDate() {
      // hack to trigger updating the date when lang changes
      let close = this.$q.lang.label.close
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

.lang-select {
  .q-field__native, .q-icon {
    color: $light !important;
    opacity: .8;
  }
  :hover {
    opacity: 1;
  }
}

</style>
