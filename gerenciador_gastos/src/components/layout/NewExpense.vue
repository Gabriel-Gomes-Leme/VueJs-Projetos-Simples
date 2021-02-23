<template>
  <div class="w-100 d-flex justify-content-center">
      <button class="btn btn-lg btn-outline-primary" @click="modalVisible=true">
          Novo Gasto <i class="fas fa-plus"></i>
      </button>
      <OverlayModal :style="{display: modalVisible ? 'block' : 'none'}"/>
      <form @submit.prevent="submit">
           <div class="modal-gasto" :style="{display:modalVisible ? 'block' : 'none'}">
          <div class="modal-header">
              <h3> Adicionar um novo gasto </h3>  <i class="fas fa-times-circle" @click="modalVisible=false"></i>
          </div>
          <div class="modal-body">
              <div class="container">
                  <div class="row">
                      <div class="col-sm-12">
                          <div class="form-box">
                              <input type="text" class="form-field" required 
                              placeholder="descrição do gasto" v-model="gasto.descricao">
                              <label for="descricao" class="text">Descrição</label>
                              <span class="line"></span>
                          </div>
                      </div>
                  </div>
                  <div class="row">
                      <div class="col-sm-12">
                          <div class="form-box">
                              <input type="number" class="form-field" 
                              placeholder="valor do gasto" required v-model="gasto.valor">
                              <label for="valor" class="text">valor (R$)</label>
                              <span class="line"></span>
                          </div>
                      </div>
                  </div>
                    <div class="row">
                      <div class="col-sm-12">
                          <div class="form-box" accept="image/*">
                              <input type="file" class="d-none" ref="input" @change="handleFile($event)">
                              <button type="button" class="btn btn-outline-secondary w-100" @click="openFile">
                                  Adicionar Imagem 
                              </button>
                              <div class="image mt-2 w-100" v-if="gasto.image">
                                  {{gasto.image.name}} <i class="fas fa-minus-circle" @click="gasto.image=''"></i>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <div class="modal-footer">
              <button type="button" class="btn btn-danger" @click="modalVisible=false">
                  Cancelar <i class="fas fa-times-circle"></i>
              </button>
              <button  class="btn btn-primary">
                  Incluir novo gasto <i class="fas fa-save"></i>
              </button>
          </div>
      </div>
      </form>

  </div>
</template>

<script>
import OverlayModal from './OverlayModal'
export default {
    components:{OverlayModal},
    data(){
        return{
            gasto:{
                descricao:'',
                valor:'',
                image:''
            },
            modalVisible:false
        }
    },
    computed:{
        fileName(){
            const {image}=this.gasto
            if (image){
                const split=image.name.split('.')
                return `${split[0]}-${new Date().getTime()}.${split[1]}`
            }
            else{
                return ''
            }
        }
    },
    methods:{
         async submit(){
             let url=''
             try{
                this.$root.$emit('Loading::show')
                const ref=this.$firebase.database().ref(window.uid) // a referencia será o id do usuário
                const id=ref.push().key // vai gerar um hash único
                if (this.gasto.image){
                    const snapshot= await this.$firebase.storage()
                    .ref(window.uid).child(this.fileName).put(this.gasto.image)
                    url = await snapshot.ref.getDownloadURL()
                }
                const record={
                    id:id,
                    ...this.gasto,
                    image:url,
                    createdAt:new Date().getTime()
                }
                ref.child(id).set(record, err=>{
                    if (err){
                            this.$root.$emit('Notificacao::show', {
                            type:'danger',
                            message:'Não foi possível inserir um novo gasto',
                            timeout:4000
                         })
                    }
                    else{
                         this.$root.$emit('Notificacao::show', {
                            type:'success',
                            message:'Gasto inserido com sucesso !! :)',
                            timeout:4000
                         })
                        this.modalVisible=false
                    }
                    this.gasto.descricao=''
                    this.gasto.valor=''
                })
             }
             catch(e){
                this.$root.$emit('Notificacao::show', {
                 type:'danger',
                 message:'Não foi possível inserir um novo gasto',
                 timeout:4000
                  })
             }
             finally{
                this.$root.$emit('Loading::hide')
             }
        },
        openFile(){
            this.$refs.input.value=null
            this.$refs.input.click()
        },
        handleFile(e){
            this.gasto.image=e.target.files[0]
        }
    }
}
</script>

<style scoped>

.modal-gasto{
    position: fixed;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 500px;
    background-color: var(--light);
    z-index: 10;
    animation: modalOn 0.9s forwards;
    border-radius:8px;
}
.modal-header h3{
    color: var(--feature-dark);
    font-weight: 700;
}
.modal-header i{
    cursor: pointer;
    color: red;
    font-size: 1.8rem;
    transition:all 0.4s ease;
}
.modal-header i:hover{
    transform: scale(1.1);
}
.form-box .text{
    color: var(--feature-dark);
}
.form-box input{
    color: var(--darker) !important;
}
.form-box .line{
    background-color: var(--light) !important;
    border: 1px solid var(--feature-dark);
}
.image{
    text-align: center;
    color: var(--feature-dark);
}
.image i{
    color: darkred;
    cursor: pointer;
    transform: scale(1.1);
    transition: all 0.3s ease;
}
.image i:hover{
    color: red;
}
</style>