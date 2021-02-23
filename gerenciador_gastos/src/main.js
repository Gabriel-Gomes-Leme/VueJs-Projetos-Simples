import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import FirebaseVue from './firebase'
import './assets/scss/app.scss'
import './util/directives'
Vue.use(FirebaseVue)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
