<template>
 <div v-if="show" :class="`alert-${type}`" class="alert alert-dismissible fade show">
   <span>{{message}}</span>
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" @click="close">
    <i class="fas fa-times-circle"></i>
  </button>
</div>
</template>

<script>
export default {
  data(){
    return{
      type:'',
      message:'',
      show:false
    }
  },
  created(){
    this.$root.$on('Notificacao::show', payload=>{
      this.show=true
      this.type=payload.type
      this.message=payload.message
      setTimeout(()=>{
        this.close()
      }, payload.timeout || 4000)
    })
  },
  methods:{
    close(){
      this.message=''
      this.type='danger',
      this.show=false
    }
  }
}
</script>

<style>
.alert{
  position: absolute !important;
  bottom: 15px;
  right: 15px;
  max-width: 400px;
  z-index: 1000;
}
.btn-close{
  border: none;
  background-color: transparent;
  position: absolute;
  top: 5px;
  right: 5px;
   color: var(--lighter);
}
.alert-success{
  background-color: var(--feature-dark) !important;
  color: var(--light) !important;
  border: none !important;
}
.alert-danger{
  background-color:darkred !important;
  color: var(--light) !important;
  border: none !important;
}
</style>