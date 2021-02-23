import Vue from 'vue'
import moment from 'moment'
Vue.directive('date-format', (el, {value})=>{
    el.innerHTML=moment(value).format('DD/MM/YYYY [às] HH:MM:SS')
})
Vue.directive('money-format', (el, {value})=>{
    el.innerHTML=new Intl.NumberFormat('pt-BR', {
        currency:'BRL',
        style:'currency',
        minimumFractionDigits:2
    }).format(value || 0)
})