<template>
  <div class="play">

    <!-- navbar here -->
    <mu-appbar>
      <mu-icon-button icon="navigate_before" slot="left" v-on:click="backpage"/>
      <div class="logo">
        iPlayer
      </div>
    </mu-appbar>

    <!-- player here-->
    <div class="bgImg">
      <img :src="audio.picUrl" />
      <!-- 封面CD -->
      <mu-avatar  slot="left" :size="300" :src="audio.picUrl"/>
    </div>
    
    <div class="controlBar">
        <mu-content-block>
          {{audio.songName}} - {{audio.singer}}
        </mu-content-block>
        <div class="controlBarSlide">
          <span class="slideTime">{{audio.currentTime}}</span>
          <mu-slider v-bind:value="progressPercent" @change="editprogress" class="demo-slider"/>
          <span class="slideTime">{{audio.duration}}</span>
        </div>
        
    </div>


  </div>
</template>

<script>


export default {
  
  name: 'play',
  data(){
    return{
      
    }
  },
  components: {
    
  },
  computed:{
      audio(){
        return this.$store.getters.audio;
      },
      progressPercent(){
        return this.$store.getters.audio.progressPercent;
      }
  },
  methods:{
    backpage(){
      window.history.go(-1);
    },
    
    editprogress(value){
      
      this.$store.commit('editProgress',value)
    }
  }
}
</script>
  

<style lang="css">
  @media screen and (max-width: 414px){
    .bgImg .mu-avatar{
      height: 260px!important;
      width: 260px!important;
      margin-left: -130px!important;
    }
  }
  .bgImg{
    position:fixed;
    height:100%;
    width:100%;
    background: #fff;
    z-index:-1;
  }
  .bgImg>img{
    width: 100%;
    filter:blur(15px);
    -webkit-filter: blur(15px); 
    -moz-filter: blur(15px);
    -ms-filter: blur(15px);
  }
  .bgImg .mu-avatar{
    position: absolute;
    left: 50%;
    margin-left: -150px;
    top: 30px;
  }
  .controlBar{
    position: fixed;
    width: 100%;
    height: 180px;
    background: #fff;
    bottom: 0;
    z-index: 11;
    text-align:center;
  }
  
  .mu-slider{
    width: 70%!important;
    display: inline-block!important;
    margin-bottom: -7px!important;
  }
  
  
  .slideTime{
    width: 29px;
    display: inline-block;
  }
  .mu-content-block{
    font-size: 18px;
    color: #777
  }
  .mu-slider{
    display: inline-block;
    margin:0 3px -7px;
    width: 70%;
  }
  
  
</style>
