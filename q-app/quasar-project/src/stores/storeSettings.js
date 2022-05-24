import { defineStore } from 'pinia';

export const useStoreSettings = defineStore("storeSettings", {
  state: () => ({
    settings: {
      isDarkMode: false,
      warnDuplicate: false,
      showTooltips: true,
      isDevMode: true,
    },
  }),

  getters: {
    getSettings() {
      return state.settings;
    },
  },

  actions: {
    toggleSetting(key) {
      if (key in this.settings) {
        this.settings[key] = !state.settings[key];
      }
    },
  },
});
