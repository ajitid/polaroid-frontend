import Vue from "vue";

import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import api from "./utils/api";

import Button from "./components/atoms/Button.vue";
import RLink from "./components/atoms/RLink.vue";
import Input from "./components/atoms/Input.vue";
import Label from "./components/atoms/Label.vue";
import Form from "./components/atoms/Form.vue";

Vue.config.productionTip = false;

Vue.prototype.$api = api;

Vue.directive("focus", {
  inserted: function(el) {
    el.focus();
  }
});

Vue.component("Button", Button);
Vue.component("RLink", RLink);
Vue.component("Input", Input);
Vue.component("Label", Label);
Vue.component("Form", Form);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
