import { Quasar, LocalStorage } from "quasar"

export default async () => {
  const langIso = LocalStorage.getItem("language") || "sm"

  try {
    await import(
      'quasar/lang/' + langIso
    ).then(lang => {
      Quasar.lang.set(lang.default)
    })
  }
  catch (err) {
    console.log(err)
  }
}
