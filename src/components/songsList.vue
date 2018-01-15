<template>
  <div class="songsList">

    <!-- navbar here -->
    <mu-appbar>
      <mu-icon-button icon="navigate_before" slot="left" v-on:click="backpage"/>
      <div class="logo">
        iPlayer
      </div>
    </mu-appbar>

    <!-- banner here-->

    <div class="listBgImg">
      <img :src="playlist.coverImgUrl" />
      <!-- 封面CD -->
      <mu-avatar  slot="left" :size="120" :src="playlist.coverImgUrl"/>
      
    </div>
    
    <mu-list>       
      <mu-sub-header>{{playlist.name}}</mu-sub-header>
      <template v-for="(item,index) in playlist.tracks">
        <mu-list-item  :title="item.name" @click="getSong(item.id,item.name,item.ar[0].name,item.al.name,item.ar[0].id)">
          <mu-avatar :src="item.al.picUrl" slot="leftAvatar"/>
          <span slot="describe">
            <span style="color: rgba(0, 0, 0, .87)">{{item.ar[0].name}} -</span> {{item.al.name}}
          </span>
        </mu-list-item>
        <mu-divider/>
      </template>
    </mu-list>
    
    <div class="footer-rights">
      <h4>版权归Godown Huang所有，请<a href="https://github.com/WE2008311">联系我</a>。</h4>
    </div>



  </div>
</template>

<script>


export default {
  
  name: 'songsList',
  data(){
    return{

    }
  },
  components: {
    
  },
  computed:{
      playlist(){
        return this.$store.getters.playlist;
      }
      
  },
  methods:{
    backpage(){
      window.history.go(-1);
    },
    getSong(id,name,singer,album,arid){
      this.$store.dispatch('getSong',{id,name,singer,album,arid});
      debugger;
      this.$store.dispatch('play',true);
    }
  }
}
</script>
  

<style lang="css">
    
  .listBgImg{
    height:200px;
    width:100%;
    background: #fff;
    overflow: hidden;
  }
  .listBgImg>img{
    width: 100%;
    filter:blur(30px);
    -webkit-filter: blur(30px); 
    -moz-filter: blur(30px);
    -ms-filter: blur(30px);
  }
  .listBgImg .mu-avatar{
    position: absolute;
    left: 50%;
    margin-left: -60px;
    top: 130px;
  }
  .mu-list .mu-sub-header{
    /* position: absolute; */
    top: 260px;
    font-size: 16px;
    /* text-align: center; */
  }
  
  

</style>