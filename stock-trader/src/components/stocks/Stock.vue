<template>
  <v-flex class="pr-3 pb-3" xs12 md6 lg4>
    <v-card class="green darken-5 white--text">
      <v-card-title class="headline">
        <strong>{{stock.name}} <small>{{stock.price | currency}}</small></strong>
      </v-card-title>
    </v-card>
    <v-card>
      <v-container fill-height><!-- fill height = toda largura -->
        <v-text-field :error="insuficientFunds" label="Quantidade" type="number" v-model.number="quantity"/>
        <v-btn class="green darken-3 white--text" @click="buyStock" :disabled="insuficientFunds || quantity<=0 || !Number.isInteger(quantity)">
          {{insuficientFunds ? 'Saldo insuficiente' : 'Comprar'}}
        </v-btn>
      </v-container>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  props:['stock'],
  data(){
    return{
      quantity:0
    }
  },
  computed:{
    funds(){
      return this.$store.getters.funds
    },
    insuficientFunds(){
      return this.quantity*this.stock.price > this.funds
    }
  },
  methods:{
    buyStock(){
      const order={
        stockId:this.stock.id,
        stockPrice:this.stock.price,
        quantity:this.quantity
      }
      this.$store.dispatch('buyStock', order) //dispatch =dispara ação   |   commit=mutation
      this.quantity=0
    }
  }

}
</script>

<style>

</style>