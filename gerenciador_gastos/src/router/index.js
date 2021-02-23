import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/login/Login'
import ListaGastos from '../views/lista-gastos/ListaGastos'
Vue.use(VueRouter)

const router = new VueRouter({
    routes : [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta:{
        icon:'home', title:'Home'
      }
    },
    {
      path:'/lista-gastos',
      name:'ListaGastos',
      component:ListaGastos,
      meta:{
        icon:'list-ul', title:'Lista Gastos'
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: { title: 'Login' },
    }
  ],
  mode: 'history',
  base: process.env.BASE_URL,
})
router.beforeEach((to, from, next) =>{
  document.title= `${to.meta.title} - Gastos`
  if (!window.uid && to.name !=='Login'){
    next({name:'Login'})
  }
  else{
    next()
  }
})
export default router
