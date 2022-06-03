<template>
  <q-page class="q-pa-md col">
    <div class="text-weight-medium q-pb-md">Manage Profiles</div>
    <div class="q-pb-md">Use profiles to record tests for multiple people. Useful for people not who dont have access to this app.</div>
    <div class="q-pb-md" v-if="!store.validProfileId">Which profile would you like to use?</div>
    <div class="row q-gutter-md q-pb-md">

      <div v-for="(p, key) in store.profiles" :key="key"
      class="hover-accent rounded-borders q-pa-lg cursor-pointer"
      :class="{'bg-accent text-grey-9': key === store.profileId}"
      @click="setProfile(key)">{{ p.firstName }}
      </div>
      <div>
        <q-btn
          padding="md"
          class="q-mt-xs"
          color="primary"
          icon="add"
          @click="prompt = true"
        />
      </div>
    </div>


    <q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Profile name</div>
        </q-card-section>

        <q-card-section class="q-pt-none row">
          <q-input ref="firstName" autofocus outlined @keyup.enter="createProfile" v-model="profile.firstName" label="First name" hint="Igoa Muamua" class="col q-pr-md" :rules="[ val => val.length || 'Please enter your name.' ]" />
        </q-card-section>

        <q-card-actions align="right" >
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Add Profile" @click="createProfile" color="primary" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { useStoreResults } from 'stores/storeResults'
import { useStoreAuth } from 'stores/storeAuth'

export default defineComponent({
  name: 'ManageProfilePage',
  setup() {
    const store = useStoreResults()
    const storeAuth = useStoreAuth()

    return {
      store,
      storeAuth
    }
  },
  data() {
    return {
      prompt: false,
      profile: {
        firstName: "",
        lastName: "",
      }
    }
  },
  methods: {
    createProfile() {
      this.$refs.firstName.validate()

      if (!this.$refs.firstName.hasError) {

        this.store.addProfile(this.profile)

        this.prompt = false
        this.profile.firstName = ""
      }
      else {

      }
    },
    setProfile(id) {
      this.store.setProfileId(id)

      // delay to show transition
      setTimeout(() => {
        this.$router.push("/personal")
      }, 300)
    }
  }
})
</script>

<style lang="scss">
.hover-accent {
  background: $light;
  transition: $animate-duration;
  color: $dark;
}

.hover-accent:hover {
  background: $accent;
  color: $grey-9;
}
</style>
