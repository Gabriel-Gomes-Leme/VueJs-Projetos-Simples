<template>
  <v-toolbar app>
  <v-toolbar-title class="headline text-uppercase mr-4">
    <span>Stock</span>
    <span class="font-weight-light">Trader</span>
    </v-toolbar-title>
    <v-toolbar-items>
      <v-btn flat to="/">Início </v-btn>
      <v-btn flat to="/portfolio">Portfolio </v-btn>
      <v-btn flat to="/stocks">Ações </v-btn>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn flat @click="endDay"> Finalizar o dia</v-btn>
      <v-menu offset-y>
        <v-btn flat slot="activator">Salvar e carregar </v-btn>
        <v-list>
            <v-list-tile @click="saveData">
              <v-list-tile-title>
                Salvar dados
              </v-list-tile-title>
            </v-list-tile>
              <v-list-tile @click="loadDataLocal">
              <v-list-tile-title>
                Carregar dados
              </v-list-tile-title>
            </v-list-tile>
        </v-list>
      </v-menu>
      <v-layout align-center>
       <span :class="saldoColor">
         Saldo : {{funds | currency}}
       </span>
      </v-layout>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  computed:{
    funds(){
      return this.$store.getters.funds
    },
    saldoColor(){
      if (this.funds>=4000){
        return 'saldoAlto'
      }
      else{
        if(this.funds>=2500){
          return 'saldoMedio'
        }
        else{
           return 'saldoBaixo'
       }
      }
   
    }
  },
  methods:{
    ...mapActions(['randomizeStocks', 'loadData']),
    endDay(){
      this.randomizeStocks()
    },
    saveData(){
      const {funds, stockPortfolio, stocks}=this.$store.getters // foi tirado os 3 valores de this.$store.getters
      this.$http.put('data.json',{funds, stockPortfolio, stocks})
    },
    loadDataLocal(){ // o local é para não gerar conflito com o map action
        this.loadData();
    }
  }

}
</script>

<style>
.saldoBaixo{
  color: darkred;
  font-weight: 800;
}
.saldoAlto{
  color: seagreen;
    font-weight: 800;
}
.saldoMedio{
   color: orange;
    font-weight: 800;
}
</style>