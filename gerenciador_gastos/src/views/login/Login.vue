<template>
    <form @submit.prevent="login()" class="form-login">
          <div class="login-card">
              <div class="container">
                 <h1 class="display-3">Login </h1>
                  <div class="row">
                      <div class="col-sm-12">
                          <div class="form-box">
                              <input type="email" class="form-field" required v-model="email">
                              <label for="email" class="text">E-mail</label>
                              <span class="line"></span>
                          </div>
                      </div>
                  </div>
                  <div class="row">
                      <div class="col-sm-12">
                          <div class="form-box">
                              <input type="password" class="form-field" required v-model="password">
                              <label for="senha" class="text">Senha</label>
                              <span class="line"></span>
                          </div>
                      </div>
                  </div>
                  <div class="row">
                      <div class="col-sm-12">
                          <div class="form-box">
                              <button class="btn btn-primary btn-login" :disabled="loading"> 
                                  <template v-if="!loading">
                                     Entrar <i class="fas fa-sign-in-alt"></i> 
                                  </template>
                                  <template v-else>
                                     <i class="fas fa-spinner fa-spin"></i>
                                  </template>
                              </button>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
    </form>
</template>

<script>
export default {
    name:'Login',
    data(){
        return{
            email:'',
            password:'',
            loading:false
        }
    },
    methods:{
        async login(){ //requisição assincrona, ele tem que esperar algo acontecer, para terminar
            this.loading=true
            const {email, password}=this
            try{
                const res= await this.$firebase.auth().signInWithEmailAndPassword(email, password) // esperar a requisição acontecer para terminar a request
                window.uid=res.user.uid // por aqui da para saber se o usuário está logado
                this.$root.$emit('Notificacao::show', {
                    type:'success',
                    message:'Login realizado com sucesso'
                })
                this.$router.push({name:'Home'})

            }
            catch(err){
                this.$root.$emit('Notificacao::show', {
                    type:'danger',
                    message:'Não foi possível realizar o Login! verifique se os dados estão corretos'
                })
            }
            this.loading=false
        }
    },
    beforeRouteEnter(to, from, next){
        next((vm)=>{
            if (window.uid){
                vm.$router.push({name:'Home'})
            }
        })  
    }
}
</script>

<style>
.form-login{
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: var(--dark-max);
}
.form-login h1{
    color:var(--feature);
    margin-bottom: 15px;
    text-align: center;
    font-weight: 600;
}
.login-card{
    position: relative;
    background-color: var(--dark-transparent);
    width: 85%;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
}
@media only screen and (min-width: 640px){
    .login-card{
        width: 80%;
    }
}
@media only screen and (min-width: 762px){
    .login-card{
        width: 550px;
    }
}
@media only screen and (min-width: 992px){
    .login-card{
        width: 50%;
    }
}
@media only screen and (min-width: 1200px){
    .login-card{
        width: 35%;
    }
}
.container .form-box{
    width: 100%;
    position: relative;
    height: 45px;
    color: var(--feature-low);
    margin-top: 30px;
    margin-bottom: 30px;
}
.container .form-box input{
    position: relative;
    height: 100%;
    width: 100%;
    box-shadow: none;
    border: 0;
    background-color: transparent;
    outline: none;
    font-size: 17px;
    padding:0 10px;
    z-index: 1;
    color: var(--lighter);
}
.container .form-box .text{
    position: absolute;
    font-size: 19px;
    top: -40px;
    left: -20px;
    z-index: 2;
    line-height: 45px;
    pointer-events: none;
    text-indent: 10px;
    transition: all 0.5s ease;
}
.container .form-box .line{
    width: 100%;
    height: 2px;
    position: absolute;
    left: 0;
    bottom: 0;
    background-color: var(--feature-dark);
    pointer-events: none;
    transition: all 0.5s ease-out;
}
.container .form-box input:focus ~ .line{
    height: 100%;
}
.btn-login{
    width: 100%;
    height: 45px;
}
</style>