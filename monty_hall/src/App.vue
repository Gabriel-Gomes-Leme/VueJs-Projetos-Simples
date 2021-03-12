<template>
  <div id="app">
      <h1> Problema de Monty Hall </h1>
      <div class="form">
        <div v-if="!started">
          <label for="portsAmount"> Quantas portas ?</label> 
          <input type="text" id="portsAmount" size="3" v-model.number="portsAmount">
        </div>
        <div v-if="!started">
          <label for="selectedPort"> Porta selecionada : </label> 
          <input type="text" id="selectedPort" size="3" v-model.number="selectedPort">
        </div>
        <button v-if="!started" @click="started=true"> Iniciar </button>
        <button v-if="started" @click="started=false"> Reiniciar </button>
      </div>
      <div class="doors" v-if="started">
        <div v-for="i in portsAmount" :key="i">
              <Door :hasGift="i===selectedPort" :number="i"/>
        </div>
      </div>
  </div>
</template>

<script>
import Door from './components/Door'
export default {
  name: 'App',
  components: {
    Door
  },
  data(){
    return{
      started:false,
      portsAmount:3,
      selectedPort:null
    }
  }
}
</script>

<style>
*{
  box-sizing: border-box;
}
body{
  background-image: linear-gradient(to left, rgb(14, 22, 68), rgb(66, 88, 117));
}
#app {
  font-family:'Courier New', Courier, monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
#app h1{
  border: 1px solid black;
  background-color: rgba(0, 0, 0, 0.4);
  padding: 20px;
  margin-bottom: 50px;
}
.form{
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
}
.form, .form input, .form button{
  margin-bottom: 10px;
  font-size: 2rem;
}
.doors{
 align-self: stretch;
 display: flex;
 justify-content: space-around;
 flex-wrap: wrap;
}
</style>
