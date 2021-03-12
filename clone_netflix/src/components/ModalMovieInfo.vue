<template>
  <div class="modal-movie">
      <h2>{{movie.name}}</h2>
      <h3 class="mt-2"> Sinopse </h3>
      <span class="mt-2">{{movie.overview}}</span>
  </div>
</template>

<script>
export default {
    name:'ModalMovieInfo',
    props:{
        movie:{type:Object, required:true}
    }
}
</script>

<style lang="scss">
@keyframes modal-on{
    to{
        top:100px;
    }
}
.modal-movie{
    position: fixed;
    top: -100%;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 600px;
    padding: 30px;
    height: auto;
    background: var(--primary-color);
    transition: all 0.3s ease;
    animation: modal-on 0.8s linear forwards;
    z-index: 1100;
    text-align: justify;
    h2{
        color: var(--red);
    }
    span{
        color: var(--primary-text);
    }
}
</style>