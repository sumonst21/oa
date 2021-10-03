import Vue from 'vue'
import App from './App.vue'
import VueGtag from "vue-gtag";
import router from './router';

Vue.config.productionTip = false

Vue.use(VueGtag, {
  config: { id: "G-LPV4BWE4E7" }
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')