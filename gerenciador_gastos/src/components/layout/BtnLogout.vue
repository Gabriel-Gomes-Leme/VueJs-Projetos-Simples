<template>
  <button class="btn btn-outline-primary btn-logout" @click="logout()">
      Sair <i class="fas fa-sign-out-alt"></i>
  </button>
</template>

<script>
export default {
    methods:{
        async logout(){
            this.$root.$emit('Loading::show')
            await this.$firebase.auth().signOut()
            this.$router.push({name:'Login'})
            this.$root.$emit('Loading::hide')
        }
    }
}
</script>

<style>
.btn-logout{
    width: 100%;
    cursor: pointer;
    color: var(--feature) !important;
    margin-bottom: 20px;
}
.btn-logout:hover{
    background-color: var(--feature) !important;
}
</style>