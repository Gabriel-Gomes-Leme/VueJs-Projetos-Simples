<template>
  <v-flex class="pr-3 pb-3" xs12 md6 lg4>
    <v-card class="blue darken-5 white--text">
      <v-card-title class="headline">
        <strong>{{stock.name}} <small>Preço: {{stock.price | currency}} | Qtd: {{stock.quantity}}</small></strong>
      </v-card-title>
    </v-card>
    <v-card>
      <v-container fill-height><!-- fill height = toda largura -->
        <v-text-field :error="insuficientQuantity" label="Quantidade" type="number" v-model.number="quantity"/>
        <v-btn class="green darken-3 white--text" @click="sellStock" :disabled="insuficientQuantity || quantity<=0 || !Number.isInteger(quantity)">
          {{insuficientQuantity ? 'Quantidade insuficiente' : 'Vender'}}
        </v-btn>
      </v-container>
    </v-card>
  </v-flex>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  props:['stock'],
  data(){
    return{
      quantity:0
    }
  },
  computed:{
    insuficientQuantity(){
      return this.quantity > this.stock.quantity
    }
  },
  methods:{
    ...mapActions({sellStockAction: 'sellStock'}),
    sellStock(){
      const order={
        stockId:this.stock.id,
        stockPrice:this.stock.price,
        quantity:this.quantity
      }
      this.$store.dispatch('sellStock', order) //dispatch =dispara ação   |   commit=mutation
      this.quantity=0
    }
  }

}
</script>

<style>

</style>