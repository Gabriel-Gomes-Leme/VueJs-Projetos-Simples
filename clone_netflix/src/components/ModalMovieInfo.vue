<template>
  <div class="modal-movie">
      <h2>{{movie.name}}</h2>
      <h3 class="mt-2"> Sinopse </h3>
      <span class="mt-2">{{movie.overview}}</span>
      <p class="mt-2">Vote Average: {{movie.vote_average}}</p>
      <p class="mt-1">Popularidade: {{movie.popularity}}</p>
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
        top:50px;
    }
}
.modal-movie{
    position: fixed;
    top: -100%;
    left: 0;
    right: 0;
    margin: 0 auto;
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
    p{
        color:var(--destaque);
    }

    @media screen and (min-width:300px){
        width: 95%;
    }
    
    @media screen and (min-width:768px){
        width: 85%;
    }
    
    @media screen and (min-width:992px){
        width: 60%;
    }
}
</style>