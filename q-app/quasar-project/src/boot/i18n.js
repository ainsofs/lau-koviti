import { createI18n } from "vue-i18n"
import messages from "src/i18n"
import { LocalStorage } from "quasar"

export default ({ app }) => {
  let langVal = LocalStorage.getItem("language") || "en-US"

  const i18n = createI18n({
    legacy: false,
    locale: langVal,
    messages,
  })

  app.use(i18n)
}
