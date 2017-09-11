<template>
  <div class="popular">

    <!-- navbar here -->
    <mu-appbar>
      <div class="logo">
        iPlayer
      </div>
    </mu-appbar>

    <!-- banner here-->
    <mu-card>
        <swiper :options="swiperOption">
          <swiper-slide v-for="(item,index) in banners" :key="index">
            <mu-card-media>
              <img :src="item.pic">
            </mu-card-media>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
    </mu-card>
    
    <div class="gridlist-demo-container" >
      <mu-grid-list class="gridlist-demo">
        <mu-sub-header>热门歌单</mu-sub-header>
           <mu-grid-tile v-for="(item, index) in list" :key="index">
            <img :src="item.coverImgUrl"/>
            <span slot="title">{{item.name}}</span>
            <mu-icon-button icon="play_arrow" slot="action" @click="getListDetail(item.id)"/>
         </mu-grid-tile>
      </mu-grid-list>
    </div>
    
    <div class="footer-rights">
      <h4>版权归Godown Huang所有，请<a href="https://github.com/WE2008311">联系我</a>。</h4>
    </div>


  </div>
</template>

<script>
import {swiper,swiperSlide} from 'vue-awesome-swiper'
import axios from 'axios'

export default {

  name: 'popular',
  data(){
    return{
      swiperOption: {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        autoplay: 4000,
        loop:true
      },
      banners:[],
      list: []
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  computed:{
    
  },
  created(){
    this.initPopular()
    
  },
  methods:{
    initPopular(){
      
      axios.get('http://localhost:3000/banner').then(res=> {
             this.banners=res.data.banners;
      }),
      axios.get('http://localhost:3000/top/playlist/highquality?limit=8').then(res=> {
             this.list=res.data.playlists;
      })
    },
    getListDetail(id){
      this.$router.push({path: '/songsList'})
      this.$store.commit('playlist',id);
    }
  }
}
</script>
  

<style lang="css">
  @media screen and (min-width: 960px){
    .mu-card-media>img{
      height: 400px!important;
    }
    .mu-grid-list>div:nth-child(n+2){
      width:25%!important;
    }
  }

  .mu-grid-tile>img{
    width: 100%;
  }

  .gridlist-demo-container{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  
  .gridlist-demo{
    width: 100%;
    overflow-y: auto;
  }
  .footer-rights>h4{
    color: #e1e1e1;
    font-weight: 100;
    font-size:.056rem;
    height:90px;
    padding-top: 10px;
    text-align: center;
  }
</style>
