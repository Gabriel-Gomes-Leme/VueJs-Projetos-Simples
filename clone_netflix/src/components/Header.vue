<template>
  <header class="navigation pl-4 pr-4" :class="{'black':black}">
      <div class="header-logo">
        <img src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png" alt="Netflix">
      </div>
      <div class="header-user">
          <img src="../assets/user.png" alt="User">
      </div>
  </header>
</template>

<script>
export default {
    name:'Header',
    props:{
        black:{type:Boolean, required:true}
    }
}
</script>

<style lang="scss">
.navigation{
    position:fixed;
    z-index: 999;
    top:0;
    left: 0;
    right: 0;
    height: 70px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: transparent;
    transition: all 0.5s ease;
    .header-logo{
        height: 30px;
        img{
            height: 100%;
        }
    }
}
    .black{
        background: #141414;
    }
</style>