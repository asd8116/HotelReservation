import Vue from 'vue'

import axios from 'axios'
import VueAxios from 'vue-axios'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

import App from './App.vue'
import router from './router'
import store from './store'
import Bus from './utils/bus'
import './scss/index.scss'

Vue.config.productionTip = false
// axios.defaults.withCredentials = true
Vue.use(VueAxios, axios)
Vue.use(Loading, {
  canCancel: false,
  color: '#000000',
  loader: 'spinner', // spinner/dots/bars
  width: 64,
  height: 64,
  backgroundColor: '#ffffff',
  isFullPage: true,
  opacity: 0.7
})

new Vue({
  data () {
    return {
      bus: Bus // Bind our event bus to our $root Vue model
    }
  },
  router,
  store,
  render: h => h(App)
}).$mount('#app')
