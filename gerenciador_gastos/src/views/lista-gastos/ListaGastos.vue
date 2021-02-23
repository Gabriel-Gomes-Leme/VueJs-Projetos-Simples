<template>
<div>
   <div class="lista-gastos">
      <div class="month-navigation">
        <div class="month-link" :class="{active:month.month===activeMonth.month}"
         @click="setActiveMonth(month)" v-for="(month,i) in groupedMonths" :key="i">
          <div class="month-info">{{month.month}}</div>
          <div class="money-info">{{month.total}}</div>
        </div>
      </div>
  </div>
  <div class="container gastos-lista">
    <div v-if="activeMonth.data && !activeMonth.data.length">
      <h1 class="display-1">Nenhum gasto cadastrado </h1>
    </div>
    <div v-else> 
      <Gasto v-for="(item, index) in activeMonth.data" :data="item" :key="index"/>
    </div>
  </div>
</div>
</template>

<script>
import groupBy from 'lodash.groupby'
import moment from 'moment'
import Gasto from './Gasto'
export default {
    name:'ListaGastos',
    components:{Gasto},
    data(){
      return{
        gastos:[],
        activeMonth:{}
      }
    },
    mounted(){
      this.setActiveMonth()
    },
    created(){
      this.getData()
    },
    computed:{
      groupedMonths(){
        let groupedMonths=[]
        const addCurrentMonth=()=>{
          groupedMonths.push({
            data:[],
            total:0,
            month:moment().format('MM/YYYY')
          })
        }

        if (this.gastos.length) {
            const months = groupBy(this.gastos, i => (
              moment(i.createdAt).format('MM/YYYY')
            ))
          const sortedMonths= Object.keys(months).sort((a,b)=>{
            return moment(`${a} 01`,' MM/YYYY HH').isBefore(moment(`${b} 01`, 'MM/YYYY HH'))
            ? -1 : +1
          })
          groupedMonths= sortedMonths.map(month => ({
            month,
            data:months[month],
            total:months[month].map(i=> +i.valor).reduce((a,c)=>a+c, 0)
          }))
          const lastMonth=moment(groupedMonths[groupedMonths.length-1].month, 'MM/YYYY')
          if (!lastMonth.isSame(moment(), 'month')){
              addCurrentMonth()
          } // verifica se o último mês é igual ao mês atual
        }
        else{
          addCurrentMonth()
        } 
        return groupedMonths
      }
    },
    methods:{
        getData(){
            const ref=this.$firebase.database().ref(`/${window.uid}`)
            ref.on('value', snapshot=>{
            const values = snapshot.val()
            this.gastos= Object.keys(values).map(i=>values[i])
            console.log(this.gastos)
           })
      },
      setActiveMonth(month=null){
        this.activeMonth= month || this.groupedMonths[this.groupedMonths.length-1]
      },
    }
}
</script>

<style>
.month-navigation{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
.month-navigation .month-link{
  width: 100%;
  height: 80px;
  background-color: var(--feature);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-left: 1px solid black;
  border-right: 1px solid black;
  transition: all 0.4s ease;
  cursor: pointer;
}
.month-navigation .month-link:hover{
  transform: scale(0.9);
  background-color: var(--feature);
}
.month-info{
  font-size: 1.3rem;
  font-weight: bolder;
}
.money-info{
  font-size: 1.1rem;
  color: var(--dark-max);
  font-weight: bolder;
}
.container{
  padding: 15px 0;
  font-size: 1.4rem;

}
.month-link.active{
  background-color: var(--feature-dark);
}

</style>