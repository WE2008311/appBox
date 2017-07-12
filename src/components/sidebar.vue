<template>
  <div class="sidebar">
    <div class="panel panel-default">
      <div class="panel-heading">
        <h4 class="text-left">
          任务列表
          <i class="glyphicon glyphicon-refresh pull-right" v-on:click="reList"></i>
        </h4>   
      </div>
      <div class="panel-body sidebar-context">
        <div>
          <div v-for="(item,index) in items" class="panel panel-default">
            <div class="panel-heading">
              <h4>
                <input @click="itemCheck(index)" type="checkbox" v-bind:checked="item.isFinished">
                {{item.task}}
                <i class="glyphicon glyphicon-remove pull-right" v-on:click="deleteTask(index)"></i>
                <i class="glyphicon glyphicon-edit pull-right" v-on:click="clickTask(item)"></i>
              </h4>
            </div>
            <div class="panel-body">
              <p>
                {{item.setTime}}
              </p>
              <p>
                {{item.details}}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'sidebar',
    data() {
      return {
        
      }
    },
    computed:{
      items(){
        return this.$store.getters.items;
      },
      activeTask(){
        return this.$store.getters.activeTask;
      }
    },
    methods:{
      deleteTask(index){
        this.$store.commit('deleteTask',index);
      },
      itemCheck(index){
        this.$store.commit('toggleCheck',index);
      },
      clickTask(item){
        this.$store.commit('setActivetask',item);
      },
      reList(){
        this.$store.commit('reList')
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  ul {
    list-style: none;
  }
  .sidebar-context{
    max-height: 8rem;
    overflow: scroll; 
  }
  i.glyphicon{
    font-size: .275rem;
    cursor: pointer;
    margin-left: .25rem;
  }

</style>
