import { LocalStorage } from "quasar"

export default ({ router }) => {
  router.beforeEach((to, from, next) => {
    let loggedIn = LocalStorage.getItem("loggedIn")
    if (loggedIn && to.path === "/user") {
      next("/")
    } else {
      next()
    }
  })
}
