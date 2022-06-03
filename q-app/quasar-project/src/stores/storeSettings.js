import { defineStore } from 'pinia';

export const useStoreSettings = defineStore("storeSettings", {
  state: () => ({
    settings: {
      warnDuplicate: false,
      showTooltips: true,
      isDevMode: true,
    },
  }),

  actions: {
    toggleSetting(key, keyVal) {
      if (key in this.settings) {
        this.state.settings[key] = keyVal;
      }
    },
  },
});
