<template>
  <div class="player">

    <!-- banner here-->
    <router-view></router-view>

    <!-- navbar here -->
    <mu-paper>
      <mu-bottom-nav :value="bottomNav" @change="handleChange">
        <mu-bottom-nav-item value="popular" title="流行" icon="music_note" to="/popular"/>
        <mu-bottom-nav-item value="play" title="播放" icon="play_arrow" to="/play"/>
        <mu-bottom-nav-item value="search" title="搜索" icon="search" to="/search"/>
      </mu-bottom-nav>
    </mu-paper>

    <!-- html5 player here -->
    <playerBox></playerBox>

  </div>
</template>

<script>

import playerBox from './playerBox.vue'

export default {



  name: 'player',
  data(){
    const pa=this.$route.path;
    const Pa=pa.slice(1);

    return{
      bottomNav: Pa
    }
  },
  components: {
    playerBox
  },
  methods:{
    handleChange (val) {
      this.bottomNav = val
    },
    changebar(){
      const va=this.$route.path;
      const Va=va.slice(1);
      this.bottomNav = Va
    }
  },
  watch:{
    "$route":"changebar"
  }
}
</script>
  

<style lang="less" >
  .mu-bottom-nav{
    position: fixed!important;
    bottom: 0px;
    background: #fafafa!important;
    z-index: 5;
    
  }
</style>
