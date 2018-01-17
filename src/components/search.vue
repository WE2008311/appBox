<template>
  <div class="search">

    <!-- navbar here -->
    <mu-appbar>
      <mu-icon-button icon="navigate_before" slot="left" v-on:click="backpage"/>
      <div class="logo searchLogo">
        iPlayer
      </div>
      <mu-text-field icon="search" class="appbar-search-field"  slot="right" hintText="想听什么歌？" v-model="searchKey"/>
      <mu-flat-button color="white" label="搜索" slot="right" @click="getSearch(searchKey)"/>
    </mu-appbar>

    <!-- banner here-->

    
    <mu-list>       
      <template v-for="(item,index) in result.songs">
        <mu-list-item  :title="item.name" @click="getSong(item.id,item.name,item.artists[0].name,item.album.name,item.artists[0].id)">
          <mu-avatar slot="leftAvatar" backgroundColor="#fff" color="#bdbdbd">{{index+1}}</mu-avatar>
          <span slot="describe">
            <span style="color: rgba(0, 0, 0, .87)">{{item.artists[0].name}} -</span> {{item.album.name}}
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
  
  name: 'search',
  data(){
    return{
      searchKey:''
    }
  },
  computed:{
    result(){
      return this.$store.getters.result;
    }
  },
  
  components: {
    
  },
  
  methods:{
    backpage(){
      window.history.go(-1);
    },
    getSearch(value){
      this.$store.commit('getSearch',value);
    },
    getSong(id,name,singer,album,arid){
      
      
      this.$store.dispatch('getSong',{id,name,singer,album,arid});
      
      
    }
    
  }
}
</script>
  

<style lang="less">
  @media screen and (max-width: 525px){
    .searchLogo{
      display: none;
    }
    .appbar-search-field{
      width: 200px!important;
    }
  }
  
  .appbar-search-field {
    color: #FFF;
    margin-top: 10px;
    margin-bottom: 0;
    &.focus-state {
      color: #FFF;
    }
    .mu-icon {
      color: #FFF;
    }
    .mu-text-field-hint {
      color: fade(#FFF, 54%);
    }
    .mu-text-field-input {
      color: #FFF;
    }
    
    .mu-text-field-focus-line {
      background-color: #FFF;
    }
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
