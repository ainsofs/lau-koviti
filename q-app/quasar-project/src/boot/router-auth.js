import { LocalStorage } from "quasar"

export default ({ router }) => {
  router.beforeEach((to, from, next) => {

    // restrict access to login and registration pages when logged in
    let loggedIn = LocalStorage.getItem("loggedIn")
    if (loggedIn && to.path === "/user") {
      next("/")
    } else {
      next()
    }
  })
}
