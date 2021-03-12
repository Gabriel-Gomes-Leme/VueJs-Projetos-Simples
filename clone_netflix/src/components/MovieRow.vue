<template>
  <div class='movieRow'>
      <h2> {{title}} </h2>
      <div class="movieRow-left" @click="handleLeftArrow">
          <i class="fas fa-chevron-left" style="font-size:30px"></i>
      </div>
      <div class="movieRow-right" @click="handleRightArrow">
          <i class="fas fa-chevron-right" style="font-size:30px"></i>
      </div>
        <div class="movieRow-listarea">
            <div class="movieRow-list" :style="{marginLeft:scrollX + 'px', width:items.results.length * 150 + 'px'}">
                <div class="movieRow-item" v-for="(item, key) in items.results" :key="key">
                    <img :src="url+item.poster_path" :alt="item.original_title" @click="show(item)" />  
                </div>
            </div>
        </div> 
        <Overlay v-if="showModal" />
         <i class="fas fa-times close-modal" v-if="showModal" @click="close"></i>
        <ModalMovieInfo v-if="showModal" :movie="movieInfo" />
  </div>
</template>

<script>
import Overlay from './Overlay'
import ModalMovieInfo from './ModalMovieInfo'
export default {
    name:'MovieRow',
    components:{Overlay,ModalMovieInfo},
    data(){
        return{
            url:'https://image.tmdb.org/t/p/w300',
            scrollX:-400,
            showModal:false,
            movieInfo:{}
        }
    },
    props:{
        title:{type:String, required:true},
        items:{type:Object, required:true}
    },
    methods:{
        handleLeftArrow(){
            let x = scrollX + Math.round(window.innerWidth / 2)
            if (x > 0){
                x=0
            }
             this.scrollX = x
        },
        handleRightArrow(){
            let x = this.scrollX - Math.round(window.innerWidth / 2)
            let listWidth = this.items.results.length * 150
            if ((window.innerWidth - listWidth) > x){
                x = (window.innerWidth - listWidth) - 60
            }
             this.scrollX = x
        },
        show(item){
            this.movieInfo = item
            this.showModal=true
        },
        close(){
            this.showModal=false
        }
    }
}
</script>

<style lang="scss">
.movieRow{
    margin-bottom: 30px;

    h2{
        margin: 0 0 0 30px;
    }

    .movieRow-listarea{
        overflow-x: hidden;
        padding-left: 30px;

        .movieRow-list{
            transition: all 0.3s ease;
        }

        .movieRow-item{
            display: inline-block;
            width: 150px;
            cursor: pointer;

            img{
                width: 100%;
                transform: scale(0.9);
                transition: all 0.3s ease;
                &:hover{
                    transform: scale(1);
                }
            }
        }
    }
    .movieRow-left, .movieRow-right{
        position: absolute;
        width: 40px;
        height: 225px;
        background-color: rgba(0,0,0,0.6);
        z-index: 99;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        cursor: pointer;
        transition: all 0.3s ease;

        @media screen and (min-width:300px){
             opacity: 1;
        }
        @media screen and (min-width:992px){
            opacity: 0;
        }
    }
    .movieRow-left{
        left: 0;
    }
    .movieRow-right{
        right: 0;
    }
    &:hover{
        .movieRow-left, .movieRow-right{
            opacity: 1;
        }
    }
}
@keyframes modal-on{
    to{
        top:25%;
    }
}
.close-modal{
    position: fixed;
    top: 40px;
    right: 40px;
    font-size: var(--text-big);
    cursor: pointer;
    z-index: 1200;
    color: var(--secondary-text);
    transition: all 0.2s ease;
    &:hover{
        transform: scale(0.95);
    }
}
</style>