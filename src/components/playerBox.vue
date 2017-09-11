<template>
  <div class="playerBox">
      
      <audio ref="myAudio" :src="audio.location" @ended="audioEnd" id="playerBar"></audio>

      <div class="controlBarBtn" v-show="judgement()">
        
          <mu-icon-button icon="skip_previous"/>
          <mu-icon-button class="addPlus" icon="play_arrow" @click="play"/>
          <mu-icon-button icon="skip_next"/>
      </div>
  </div>
  
</template>

<script>



export default {



  name: 'playerBox',
  data(){
    
    return{
      
    }
  },
  components: {
    
  },

  computed:{
    audio(){
      return this.$store.getters.audio;
    }
  },
  methods:{
    play(){
      this.$store.commit('play');
    },
    audioEnd(event){
      this.$store.commit('audioEnd',event);
    },
    judgement(){
      let path=this.$route.path;
      if(path=="/play"){
        return true;
      }else{
        return false;
      }
    }
  }
  
}
</script>
  

<style lang="less" >
  .controlBarBtn{
    position: absolute;
    z-index:12;
    width: 243px;
    margin-left: -121.5px;
    
    top: 83%;
    left: 50%;
  }

  .controlBarBtn i.mu-icon{
    font-size: 36px;
    color: #03a9f4;
    left: 50%;
    margin-left: -18px;
    position: absolute;
    top: 10%;
  }
  
  .controlBarBtn .addPlus{
    top: 16px;
    width: 80px!important;
    height: 80px!important;
    margin: 0 30px!important;
  }
  .controlBarBtn .addPlus i.mu-icon{
    font-size: 60px;
    margin-left: -30px;
    top: 10%;
  }
</style>