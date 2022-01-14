import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import GLOBAL from './plugins/global_variable'
import './registerServiceWorker'
// import './assets/css/base.css'
// import './assets/css/index.css'
// import './assets/css/LearnOne.css'
// import './assets/css/TestOne.css'
Vue.config.productionTip = false

axios.defaults.baseURL=GLOBAL.baseURL

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
