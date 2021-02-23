<template>
  <div id="app">
    <Notificacao />
    <Loading />
    <div class="container-fluid" v-if="isLogged">
      <div class="row">
        <div class="col-lg-2 side-bar-navigation">
            <Navbar/>
        </div>
        <div class="col-lg-10">
            <router-view/>
        </div>
      </div>
    </div>
    <router-view v-else />

  </div>
</template>

<script>
import Loading from './components/global/Loading'
import Navbar from './components/layout/Navbar'
import Notificacao from './components/layout/Notificacao'
export default {
  components: { Loading, Navbar, Notificacao },
  data(){
    return{
      isLogged:false
    }
  },
  name:'App',
  mounted(){
    this.$firebase.auth().onAuthStateChanged(user=>{
      window.uid= user ? user.uid : null
        this.isLogged= !!user
        this.$router.push({name: window.uid ? 'Home' : 'Login'})
        setTimeout(()=>{
           this.$root.$emit('Loading::hide')
        }, 300)
    })
  },
}
</script>

<style lang="scss">
#app{
  min-height: 100vh;
  background-color: var(--dark-max);
  color:var(--light);
}
.side-bar-navigation{
  background-color: var(--darker);
}
</style>
