import Vue from "vue";
import Router from "vue-router";
import Feed from "./views/Feed.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "feed",
      component: Feed
    },
    {
      path: "/account/login",
      name: "accountLogin",
      component: () =>
        import(/* webpackChunkName: "accountLogin" */ "./views/account/Login.vue")
    },
    {
      path: "/users/:username",
      name: "userProfile",
      component: () =>
        import(/* webpackChunkName: "userProfile" */ "./views/users/UserProfile.vue")
    }
  ]
});
