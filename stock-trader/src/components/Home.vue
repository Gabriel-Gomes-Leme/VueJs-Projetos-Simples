<template>
    <div>
      <h1 class="display-3 font-weight-light mb-4">Negocie e Consulte suas Ações </h1>
      <v-sheet :elevation="6" class="pa-3 blue darken-1">
          <v-icon class="white--text mr-3">info</v-icon>
          <span class="headline white--text font-weight-light">Você pode salvar & carregar os dados</span>
      </v-sheet>
         <v-sheet :elevation="6" class="pa-3 green darken-2 mt-3">
          <v-icon class="white--text mr-3">info</v-icon>
          <span class="headline white--text font-weight-light">Cique em finalizar dia para avançar para o próximo</span>
      </v-sheet>
      <v-divider class="my-4"/>
      <p class="display-1"> <strong>Seu saldo : </strong> {{funds | currency}}</p>
  </div>
</template>

<script>
export default { // fazer o mixin para a cor do saldo
  computed:{
    funds(){
      return this.$store.getters.funds
    }
  }
}
</script>

<style>

</style>