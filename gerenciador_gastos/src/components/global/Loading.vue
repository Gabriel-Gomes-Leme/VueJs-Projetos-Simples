<template>
  <div class="load" v-if="visible">
      <i class="fas fa-spinner fa-spin"></i>
      <h5> Aguarde alguns segundos...</h5>
  </div>

</template>

<script>
export default {
  name:'Loading',
  data(){
    return{
      visible:true,
    }
  },
  created(){
    this.$root.$on('Loading::show', ()=> {this.visible=true})
    this.$root.$on('Loading::hide', ()=> {this.visible=false})
  },
  methods:{
    alternarLoading(){
      this.visible=!this.visible
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/variables';
.load{
  position: absolute;
  top:0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--darker);
  color: var(--feature);
  z-index: 100;
  font-size: 50px;
}

.load h5{
  margin-top: 10px;
}
</style>
