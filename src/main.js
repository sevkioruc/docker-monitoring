import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin, BButton } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.component(BButton);

new Vue({
  el: '#app',
  render: h => h(App),
  components: {
    BButton
  }
})
