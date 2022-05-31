
const routes = [
  {
    path: "/",
    component: () => import("layouts/Layout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      { path: "/personal", component: () => import("pages/PersonalPage.vue") },
      { path: "/settings", component: () => import("pages/SettingsPage.vue") },
      { path: "/help", component: () => import("pages/HelpPage.vue") },
      { path: "/submit-test", component: () => import("pages/SubmitTest.vue") },
      { path: '/user', component: () => import('pages/AuthPage.vue') }
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes
