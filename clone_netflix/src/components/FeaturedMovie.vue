<template>
  <section class="featured" :style="{backgroundSize:cover, backgroundPosition:center, backgroundImage:url}">
      <div class="featured-vertical">
        <div class="featured-horizontal">
            <div class="container-fluid pl-4">
                <div class="row">
                    <div class="col-10 offset-1 col-lg-5 offset-l-0">
                        <div class="featured-name"> {{item.original_name}} </div>
                        <div class="featured-info mt-3">
                            <div class="stats">
                                <div class="featured-points">{{item.vote_average}} pontos</div>
                                <div class="featured-year ml-3">{{firstdate.getFullYear()}}</div>
                                <div class="featured-seasons ml-3">
                                    {{item.number_of_seasons}} temporada{{item.number_of_seasons >1 ? 's' : ''}}
                                </div>
                            </div>

                            <div class="featured-description mt-3">
                                {{maxString}}
                            </div>
                            <div class="featured-buttons mt-2">
                                <a href="#" class="btn btn-primary"> <i class="fas fa-play"></i> Assistir </a>
                                <a href="#" class="btn btn-danger ml-2"><i class="fas fa-plus"></i>  Minha lista </a>
                            </div>
                            <div class="featured-genres mt-2">
                                {{item.genres.length > 1 ? 'Gêneros' : 'Gênero'}} : {{genres}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
  </section>
</template>

<script>
export default {
    name:'FeaturedMovie',
    props:{
        item:{type:Object, required:true}
    },
    data(){
        return{
            cover:'cover',
            center:'center',
            url:`url(https://image.tmdb.org/t/p/original${this.item.backdrop_path})`,
            firstdate: new Date(this.item.first_air_date),
        }
    },
    computed:{
        genres(){
            let genresName=[]
            for (let i in this.item.genres){
                genresName.push(this.item.genres[i].name)
            }
            return genresName.join(', ')
        },
        maxString(){
            let strDescription = this.item.overview
            return strDescription.substring(0,220) + '...'
        }
    }
}
</script>

<style lang="scss">
.featured{
    width: 100%;
    height: 100vh;
    .featured-vertical{
        @extend .featured;
        background: linear-gradient(to top, var(--primary-color) 10%, transparent 90%);

            .featured-horizontal{
                @extend .featured-vertical;
                display: flex;
                flex-direction: column;
                justify-content: center;
                background: linear-gradient(to right, var(--primary-color) 20%, transparent 70%);
                padding-bottom: 150px;
                padding-top:70px;
             }
    }
    .featured-name{
        font-weight: bold;
        
        @media screen and (min-width:300px){
            font-size: var(--text-big);
        }
        @media screen and (min-width:768px){
            font-size: var(--text-large);
        }
    }
    .featured-info{
        font-weight: bold;
        
        .stats{
            display: flex;
            flex-wrap: nowrap;
            justify-content: flex-start;
            font-size: var(--text-small-max);
        }
        .featured-points{
            color: var(--destaque);
        }
        .featured-description{
            text-align: justify;
            color: var(--secondary-text);
        }
        .featured-genres{
            font-size: var(--text-small-max);
            @extend .featured-description;
        }

        @media screen and (min-width:300px){
            font-size: var(--text-small-max);
        }
        @media screen and (min-width:768px){
            font-size: var(--text-small);
        }
    }
}
</style>