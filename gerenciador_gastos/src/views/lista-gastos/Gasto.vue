<template>
<div>
    <div class="gasto-item">
      <div class="row">
          <div class="col-5 descricao">{{data.descricao}}</div>
          <div class="col-3 valor" v-money-format="data.valor"></div>
          <div class="col-3 comprovante">
              <button class="btn btn-outline-primary w-55" v-if="data.image" @click="openComprovante()">Ver Anexo </button>
              </div>
          <div class="col-1 excluir"> <i class="fas fa-trash" @click="excluir(data.id)"></i></div>
          <div class="row">
            <div class="col-12 data" v-date-format="data.createdAt"></div>
          </div>
      </div>
  </div>
  <OverlayModal :style="{display: modalVisible ? 'block' : 'none'}"/>
  <div class="modal-image" :style="{display: modalVisible ? 'block' : 'none'}">
      <img :src="data.image"/>
     <i class="fas fa-times" @click="modalVisible=false"></i>
  </div>
</div>
</template>

<script>
import OverlayModal from '../../components/layout/OverlayModal'
export default {
name:'Gasto',
components:{OverlayModal},
    data(){
        return{
            modalVisible:false
        }
    },
    props:{
        data:{type:Object, required:true}
    },
    methods:{
        openComprovante(){
            this.modalVisible=true
        },
        excluir(id) {
            try{
                this.$firebase.database().ref(window.uid).child(id).remove()
                this.$root.$emit('Notificacao::show', {
                    type:'success',
                    message:'gasto removido com sucesso',
                    timeout:4000
                })
            }
            catch(e){
                this.$root.$emit('Notificacao::show', {
                    type:'danger',
                    message:'Não foi possível remover o gasto',
                    timeout:4000
                })
            }
        },

}}
</script>

<style>
@keyframes modalOn{
    from{
        top:-100%;
    }
    to{
        top:10%
    }
}
.modal-image{
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 400px;
    height: 400px;
    background-color: var(--light);
    z-index: 10;
    animation: modalOn 0.9s forwards;
    border-radius:50%;
}
@media only screen and (min-width:992px){
.modal-image{
    left: -15%;
}
}
.modal-image img{
    max-width: 100%;
    height: 100%;
    border-radius: 50%;
}
.modal-image i{
    position: absolute;
    cursor: pointer;
    top: 0;
    right: 0;
    color: cornsilk;
    font-size: 1.2em;
}
.gasto-item{
    background-color: var(--darker);
    padding: 20px;
    border-bottom: 2px solid var(--dark-medium);
    transition:all 0.4s ease
}

.gasto-item .data{
    font-size: 1rem;
    color: var(--feature-dark);
}
.gasto-item .descricao{
    font-size: 1.2rem;
    color: var(--feature);
    font-weight: 700;
    text-transform: uppercase;
}
@media only screen and (max-width:762px){
    .gasto-item .descricao{
        font-size: 14px;
    }
    .gasto-item .valor{
        font-size: 13px;
    }
}
.gasto-item .valor{
    color: var(--feature-low);
    font-size: 1.1rem;
}
.gasto-item .excluir{
    color: crimson;
}
.gasto-item i{
   cursor: pointer;
   transition: all 0.4s ease;
}
.gasto-item i:hover{
   color: darkred;
}

</style>