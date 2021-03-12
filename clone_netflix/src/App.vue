<template>
  <div id="app">
    <div class="loading" v-if="movieList<=0">
        <div class="circle">
        </div>
        <h1> Netflix </h1>
    </div>
    <Header :black="setBlackHeader" />
    <FeaturedMovie v-if="featureData" :item="featureData"/>
    <div class="lists">
      <section v-for="(item, key) in movieList" :key="key">
        <MovieRow :title="item.title" :items="item.items" />
      </section>
    </div>
    <footer>
      <h4> Feito pelo Gabriel, utilizando Vue.Js</h4>
      <h5> Direitos de imagem para Netflix </h5>
      <span> Dados pegos do site: themoviedb.org</span>
    </footer>
  </div>
</template>

<script>
import tmdb from './tmdb.js'
import Header from './components/Header'
import FeaturedMovie from './components/FeaturedMovie'
import MovieRow from './components/MovieRow'
export default {
  name: 'App',
  components:{
    Header,
    FeaturedMovie,
    MovieRow
  },
  mounted(){
    const loadAll = async () =>{
      //pegando a lista total
      let list = await tmdb.getHomeList()
      this.movieList=list

      //pegando o filme em destaque (featured)
      let originals = list.filter(i=>i.slug==='originals')
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1))
      let chosen = originals[0].items.results[randomChosen]
      let chosenInfo = await tmdb.getMovieInfo(chosen.id, 'tv')
      console.log(chosenInfo)
      this.featureData = chosenInfo
    }
    loadAll();

    const scrollListener=()=>{
      if (window.scrollY > 15){
        this.setBlackHeader=true
      }
      else{
        this.setBlackHeader=false
      }
    }
    window.addEventListener('scroll', scrollListener)
    return ()=>{
       window.removeEventListener('scroll', scrollListener)
    }
  },
  data(){
    return{
      movieList:[],
      featureData:null,
      setBlackHeader:false
    }
  },
}
</script>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
*{
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body{
  font-family: 'Roboto', sans-serif !important;
  background-color: var(--primary-color) !important;
  color: var(--primary-text) !important;
}
.lists{
  margin-top: -150px;
}
footer{
  width: 100%;
  padding: 20px 0;
  display: flex !important;
  flex-direction: column;
  justify-content: center !important;
  align-items: center !important;
  text-align: center;
}
@keyframes rotate{
  to{
    transform: rotate(360deg);
  }
}
.loading{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  background: #111;
  .circle{
    width: 250px;
    height: 250px;
    border-top: 15px solid var(--red);
    border-radius: 100%;
    animation:rotate 1.4s linear infinite;
  }
  h1{
    position: absolute;
    color: var(--red);
  }
}
</style>
