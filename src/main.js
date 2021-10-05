import Vue from 'vue'
import App from './App.vue'
import VueGtag from "vue-gtag";
import router from './router';
import store from './store'

Vue.config.productionTip = false

Vue.use(VueGtag, {
  config: { id: "G-LPV4BWE4E7" }
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')