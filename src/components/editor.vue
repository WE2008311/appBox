<template>
  <div class="sidebar">
    <div class="panel panel-default">
      <div class="panel-heading">
        <h4 class="text-left">任务编辑</h4>
      </div>
      <div class="panel-body">
         <p>任务名称</p>
         <input type="text" class="form-control task-input" placeholder="任务名称" v-bind:value="task" v-on:input="saveTask">
         <p>任务详情</p>
         <textarea class="form-control details-input" rows="3" placeholder="任务详情" v-bind:value="details" v-on:input="saveDetails"></textarea>
         <p>任务期限</p>
         <div class="input-group date form_date" data-date="" data-date-format="dd MM yyyy" data-link-field="dtp_input2" data-link-format="yyyy-mm-dd">
            <input class="form-control settime-input" type="text" v-bind:value="setTime">
		        <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
         </div>
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
      save(){
        this.$store.commit('editTask',this.taskInput);
        this.$store.commit('editDetails',this.detailsInput);
        this.$store.commit('editSettime',this.settimeInput);
        this.$store.commit('clearAll');
      },
      dateDefind(){
        var self=this;
        $('.form_date').datetimepicker({
          language:  'zh-CN',
          format:'yyyy-mm-dd',
          weekStart: 1,
          todayBtn:  1,
		      autoclose: 1,
	      	todayHighlight: 1,
	      	startView: 2,
	      	minView: 2,
	      	forceParse: 0
        }),
        $('.form_date').datetimepicker()
        .on('hide',function(e){
          self.settimeInput=$('.settime-input').val();
        })
      }
    },
    mounted:function(){
      this.dateDefind();
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
