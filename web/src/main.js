import Vue from 'vue'
import App from './App.vue'
import vSelect from 'vue-select'
import 'vue2-timepicker/dist/VueTimepicker.css'
import "@fullcalendar/core/main.css";
import 'vue-select/dist/vue-select.css';
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import '@fullcalendar/resource-timeline/main.css';

Vue.config.productionTip = false
Vue.component('v-select', vSelect)

new Vue({
  render: h => h(App)
}).$mount('#app')
