import Vue from 'vue'
import App from './App.vue'
import router from './router'
import helper from './shared/Helper'
//import {Global} from './shared/Global'
//import axios from 'axios'
import 'bootstrap/dist/css/sb-admin-2.min.css';
//import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import 'bootstrap/dist/js/bootstrap.min.js';
import Maska from 'maska'
import VueCurrencyFilter from 'vue-currency-filter'
import 'vue-search-select/dist/VueSearchSelect.css'

Vue.use(Maska)
 Vue.config.productionTip = false
 Vue.use(helper)
 Vue.use(VueCurrencyFilter,{
  symbol: '', // El símbolo, por ejemplo €
  thousandsSeparator: ',', // Separador de miles
  fractionCount: 2, // ¿Cuántos decimales mostrar?
  fractionSeparator: '.', // Separador de decimales
  symbolPosition: '', // Posición del símbolo. Puede ser al inicio ('front') o al final ('') es decir, si queremos que sea al final, en lugar de front ponemos una cadena vacía ''
  symbolSpacing: false // Indica si debe poner un espacio entre el símbolo y la cantidad
 })
 
Vue.mixin({
  methods: {
      checkUser: function () {
        let datoslocales = JSON.parse(localStorage.getItem('spx_localdata'));
        if(!datoslocales){
          this.logOutApp()
      }
    }  
  },
})
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
