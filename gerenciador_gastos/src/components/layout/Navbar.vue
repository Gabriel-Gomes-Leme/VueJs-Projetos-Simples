<template>

<nav class="nav flex-column justify-content-between">
  <div>
    <h1 class="title"> Meus gastos </h1>
     <router-link class="nav-link mt-1" v-for="(router, i) in routerLinks"
        :key="i" :to="{name:router.name}" exact exact-active-class="active"> 
        {{router.meta.title}} <i class="fa" :class="`fa-${router.meta.icon}`"></i>
    </router-link>
    <NewExpense class="mt-3" />
  </div>
  <BtnLogout />
</nav>

</template>

<script>
import BtnLogout from './BtnLogout'
import NewExpense from './NewExpense'
export default {
    name:'Navbar',
    components:{BtnLogout, NewExpense},
    computed:{
        routerLinks(){
            return this.$router.options.routes.filter(r => r.name !== 'Login')
        }
    }
}
</script>

<style>
.nav{
    height: 100vh;
    width: calc(100% + 25px);
    margin-left: -12px;
}
@media only screen and (min-width: 300px){
.nav{
    height: 50vh;
}
.nav .nav-link{
    text-align: center;
}
}
@media only screen and (min-width: 992px){
.nav{
    height: 100vh;
}
.nav .nav-link{
    text-align: left;
}
}
.nav .title{
    font-size: 1.9em;
    text-align: center;
    padding: 20px 0;
    color: var(--feature);
}
.nav .nav-link{
    color: var(--lighter);
    transition: all 0.4s ease;
}
.nav .nav-link.active{
    color: var(--feature);
}
.nav .nav-link i{
    margin-left: 20px;
}
.nav .nav-link:hover{
    background-color: var(--feature-dark);
}
</style>
