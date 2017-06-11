<template>
  <div class="sidebar">
    <div class="panel panel-default">
      <div class="panel-heading">
        <h3 class="text-left">任务编辑</h3>
      </div>
      <div class="panel-body">
         <p>任务名称</p>
         <input type="text" class="form-control task-input" placeholder="任务名称" v-bind:value="task" v-on:input="saveTask">
         <p>任务详情</p>
         <textarea class="form-control details-input" rows="3" placeholder="任务详情" v-bind:value="details" v-on:input="saveDetails"></textarea>
         <p>任务期限</p>
         <input type="text" class="form-control settime-input" placeholder="格式：20170606" v-bind:value="setTime" v-on:input="saveSettime">
         <h3><i class="glyphicon glyphicon-ok pull-right" v-on:click="save"></i></h3>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'editor',
    data() {
      return {

      }
    },
    computed:{
      items(){
        return this.$store.getters.items;
      },
      task(){
        this.taskInput=this.$store.getters.activeTask.task;
        return this.$store.getters.activeTask.task;
      },
      details(){
        this.detailsInput=this.$store.getters.activeTask.details;
        return this.$store.getters.activeTask.details;
      },
      setTime(){
        this.settimeInput=this.$store.getters.activeTask.setTime;
        return this.$store.getters.activeTask.setTime;
      }
    },
    methods:{
      saveTask(e){
        this.taskInput=e.target.value;
      },
      saveDetails(e){
        this.detailsInput=e.target.value;
      },
      saveSettime(e){
        this.settimeInput=e.target.value;
      },
      save(){
        this.$store.commit('editTask',this.taskInput);
        this.$store.commit('editDetails',this.detailsInput);
        this.$store.commit('editSettime',this.settimeInput);
        this.$store.commit('clearAll');
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 input,textarea{
     margin-bottom: .3rem;
 }
 i{
   cursor: pointer;
   margin-right: .2rem;
 }
</style>
