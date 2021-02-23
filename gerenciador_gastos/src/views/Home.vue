<template>
  <div class="home">
    <div class="row">
    <div class="col-12 col-lg-6 home-box">
        <h4>Você gastou no total:</h4>
        <h1 v-money-format="totals.totalGasto"></h1>
        <h5> Em {{gastos.length}} compras </h5>
    </div>
    <div class="col-12 col-lg-6 home-box">
        <h4>A média de gastos é de:</h4>
        <h1 v-money-format="totals.media"></h1>
    </div>
    <div class="col-12 col-lg-6 home-box">
        <h4>A maior compra foi</h4>
        <h1 v-money-format="totals.maiorCompra.valor"></h1>
        <h5 v-date-format="totals.maiorCompra.createdAt"> </h5>
    </div>
    <div class="col-12 col-lg-6 home-box">
        <h4>A menor compra foi</h4>
        <h1 v-money-format="totals.menorCompra.valor"></h1>
        <h5 v-date-format="totals.menorCompra.createdAt">  </h5>
    </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  data(){
    return{
      gastos:[]
    }
  },
  computed:{
    totals(){
      const { gastos : exp }=this
      const valores={
        totalGasto:0,
        media:0,
        maiorCompra:{},
        menorCompra:{}
      }
      if (exp.length){
           valores.totalGasto = exp.map(e=> +e.valor)
          .reduce((acc, cur) => acc + cur, 0).toFixed(2)

          valores.media=(valores.totalGasto/exp.length).toFixed(2)

          valores.maiorCompra=exp.sort((a,b) => +b.valor - +a.valor)[0]
          valores.menorCompra=exp.sort((a,b) => +a.valor - +b.valor)[0]
      }
      return valores
    }
  },
  created(){
    this.getData()
  },
  methods:{
    getData(){
      const ref = this.$firebase.database().ref(`/${window.uid}`)
        ref.on('value', payload=>{
          const values=payload.val()
          this.gastos=Object.keys(values).map(i=> values[i]) //transforma o objeto retornado em um ARRAY
          console.log(this.gastos)
        }) // vai escutar se teve alguma alteração e já vai refletir na home
    }
  }

}
</script>
<style scoped>
.home{
  padding: 10px;
}
  .home .home-box{
    width: 100%;
    height: calc(50vh - 10px);
    border: 1px solid var(--dark-medium);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .home .home-box h1{
    color: var(--feature-low);
  }
  .home .home-box h5{
    color: var(--alert);
  }
  .home .home-box:nth-child(2){
    border-left: none;
  }
  .home .home-box:nth-child(4){
    border-left: none;
    border-top:none;
  }
  .home .home-box:nth-child(3){
    border-top:none;
  }
</style>
