import Vue from 'vue'
import App from './App.vue'
import 'vue2-timepicker/dist/VueTimepicker.css'
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import '@fullcalendar/resource-timeline/main.css';

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
